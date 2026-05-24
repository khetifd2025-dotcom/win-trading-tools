import BlogCard from "@/components/BlogCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { blogArticles } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Trading Blog",
  description: "SEO trading articles about XAUUSD, forex risk management, SMC, trading sessions, psychology, and tools.",
  path: "/blog"
});

export default function BlogPage() {
  return (
    <div className="container-shell py-12">
      <section className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Trading education</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Forex and gold trading guides.</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          Practical articles for traders learning risk management, XAUUSD planning, SMC confirmation, and session timing.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        {BLOG_CATEGORIES.map((category) => (
          <span key={category} className="rounded-md border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
            {category}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-5 md:grid-cols-2">
          {blogArticles.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
        <aside className="grid h-fit gap-5 lg:sticky lg:top-24">
          <AdPlaceholder size="sidebar" />
          <AdPlaceholder size="rectangle" />
        </aside>
      </div>
    </div>
  );
}
