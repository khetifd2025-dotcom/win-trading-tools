import AdminSetupNotice from "@/components/AdminSetupNotice";
import AdminSidebar from "@/components/AdminSidebar";
import { mockLeads } from "@/lib/leads";
import { createAdminMetadata } from "@/lib/seo";
import { getRequestOrigin } from "@/lib/server-url";
import type { LeadRecord } from "@/lib/supabase";

export const metadata = createAdminMetadata({
  title: "Admin Leads",
  description: "View checklist and email leads for WIN Trading Tools.",
  path: "/admin/leads"
});

export const dynamic = "force-dynamic";

function formatIsoDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toISOString().replace("T", " ").slice(0, 16);
}

async function getLeads() {
  try {
    const origin = await getRequestOrigin();
    const response = await fetch(`${origin}/api/admin/leads`, { cache: "no-store" });
    const data = (await response.json()) as {
      ok?: boolean;
      fallback?: boolean;
      leads?: LeadRecord[];
      message?: string;
    };

    if (!response.ok || !data.ok || !data.leads) {
      return {
        leads: mockLeads,
        source: "fallback" as const,
        message: data.message || "Could not load Supabase leads. Showing mock leads."
      };
    }

    return {
      leads: data.leads,
      source: data.fallback ? ("fallback" as const) : ("supabase" as const),
      message: data.message || (data.fallback ? "Showing mock leads." : "Showing real leads from Supabase.")
    };
  } catch {
    return {
      leads: mockLeads,
      source: "fallback" as const,
      message: "Could not reach the admin leads API. Showing mock leads."
    };
  }
}

export default async function AdminLeadsPage() {
  const { leads, source, message } = await getLeads();

  return (
    <div className="container-shell grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Leads.</h1>
        <AdminSetupNotice />
        <div
          className={
            source === "supabase"
              ? "mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50"
              : "mt-4 rounded-lg border border-gold-400/30 bg-gold-400/10 p-4 text-sm leading-6 text-gold-50"
          }
        >
          {message}
        </div>

        <div className="card mt-8 overflow-x-auto rounded-lg">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-zinc-800 text-xs uppercase tracking-[0.18em] text-zinc-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Trading level</th>
                <th className="px-4 py-3">Main market</th>
                <th className="px-4 py-3">Created at</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {leads.map((lead) => (
                <tr key={`${lead.email}-${lead.created_at}`}>
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{lead.trading_level || "-"}</td>
                  <td className="px-4 py-3">{lead.main_market || "-"}</td>
                  <td className="px-4 py-3">{formatIsoDate(lead.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
