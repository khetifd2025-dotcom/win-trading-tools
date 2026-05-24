import { BarChart3, MousePointerClick, TrendingUp, Users } from "lucide-react";
import AdminSetupNotice from "@/components/AdminSetupNotice";
import AdminSidebar from "@/components/AdminSidebar";
import StatCard from "@/components/StatCard";
import { blogArticles } from "@/lib/blog";
import { createAdminMetadata } from "@/lib/seo";
import { tools } from "@/lib/tools";

export const metadata = createAdminMetadata({
  title: "Admin Analytics",
  description: "Mock analytics dashboard for WIN Trading Tools page views, tool usage, leads, clicks, top tools, and top articles.",
  path: "/admin/analytics"
});

export const dynamic = "force-dynamic";

export default function AdminAnalyticsPage() {
  return (
    <div className="container-shell grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Analytics.</h1>
        <AdminSetupNotice />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Page views" value="24,800" helper="Mock analytics" icon={BarChart3} />
          <StatCard label="Tool usage" value="8,420" helper="Tracked via /api/tool-usage" icon={TrendingUp} />
          <StatCard label="Lead submissions" value="612" helper="Checklist and footer forms" icon={Users} />
          <StatCard label="Product clicks" value="318" helper="Checkout button events" icon={MousePointerClick} />
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="card rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white">Top tools</h2>
            <div className="mt-5 grid gap-3">
              {tools.slice(0, 5).map((tool, index) => (
                <div key={tool.slug} className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-950/70 p-3 text-sm">
                  <span className="text-zinc-300">{tool.title}</span>
                  <span className="text-gold-200">{(5 - index) * 740}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white">Top articles</h2>
            <div className="mt-5 grid gap-3">
              {blogArticles.slice(0, 5).map((article, index) => (
                <div key={article.slug} className="flex items-center justify-between gap-4 rounded-md border border-zinc-800 bg-zinc-950/70 p-3 text-sm">
                  <span className="text-zinc-300">{article.title}</span>
                  <span className="text-gold-200">{(5 - index) * 530}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
