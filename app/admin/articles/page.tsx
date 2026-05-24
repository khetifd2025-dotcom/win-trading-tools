import AdminSetupNotice from "@/components/AdminSetupNotice";
import AdminSidebar from "@/components/AdminSidebar";
import { blogArticles } from "@/lib/blog";
import { createAdminMetadata } from "@/lib/seo";

export const metadata = createAdminMetadata({
  title: "Admin Articles",
  description: "Admin article list for WIN Trading Tools.",
  path: "/admin/articles"
});

export const dynamic = "force-dynamic";

export default function AdminArticlesPage() {
  return (
    <div className="container-shell grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Articles.</h1>
        <AdminSetupNotice />

        <div className="card mt-8 overflow-x-auto rounded-lg">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-zinc-800 text-xs uppercase tracking-[0.18em] text-zinc-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {blogArticles.map((article) => (
                <tr key={article.slug}>
                  <td className="px-4 py-3">{article.title}</td>
                  <td className="px-4 py-3">{article.category}</td>
                  <td className="px-4 py-3">Published</td>
                  <td className="px-4 py-3">{article.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
