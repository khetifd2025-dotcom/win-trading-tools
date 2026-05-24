import { Activity, FileText, Package, Users } from "lucide-react";
import AdminSetupNotice from "@/components/AdminSetupNotice";
import AdminSidebar from "@/components/AdminSidebar";
import StatCard from "@/components/StatCard";
import { blogArticles } from "@/lib/blog";
import { mockLeads } from "@/lib/leads";
import { products } from "@/lib/products";
import { createAdminMetadata } from "@/lib/seo";
import { getRequestOrigin } from "@/lib/server-url";
import { tools } from "@/lib/tools";

export const metadata = createAdminMetadata({
  title: "Admin Dashboard",
  description: "WIN Trading Tools admin dashboard for leads, products, articles, and analytics.",
  path: "/admin"
});

export const dynamic = "force-dynamic";

async function getLeadCount() {
  try {
    const origin = await getRequestOrigin();
    const response = await fetch(`${origin}/api/admin/stats`, { cache: "no-store" });
    const data = (await response.json()) as { totalLeads?: number };
    return typeof data.totalLeads === "number" ? data.totalLeads : mockLeads.length;
  } catch {
    return mockLeads.length;
  }
}

export default async function AdminPage() {
  const leadCount = await getLeadCount();

  return (
    <div className="container-shell grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <div>
        <section>
          <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Admin dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Platform overview.</h1>
          <AdminSetupNotice />
        </section>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total leads" value={leadCount} helper="Supabase count or mock fallback" icon={Users} />
          <StatCard label="Total tools" value={tools.length} helper="Free SEO tool library" icon={Activity} />
          <StatCard label="Total articles" value={blogArticles.length} helper="Starter SEO content" icon={FileText} />
          <StatCard label="Total products" value={products.length} helper="Digital offers" icon={Package} />
        </div>

        <section className="card mt-8 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white">Recent activity</h2>
          <div className="mt-5 grid gap-3 text-sm text-zinc-300">
            {[
              "Lead captured from free checklist page",
              "Tool usage event recorded for lot size calculator",
              "Product checkout button clicked",
              "New blog article ready for publishing workflow"
            ].map((item) => (
              <div key={item} className="rounded-md border border-zinc-800 bg-zinc-950/70 p-3">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
