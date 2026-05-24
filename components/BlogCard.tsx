import Link from "next/link";
import type { BlogArticle } from "@/lib/blog";

export default function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <article className="card flex h-full flex-col rounded-lg p-5">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-md border border-gold-400/30 bg-gold-400/10 px-2 py-1 text-gold-100">
          {article.category}
        </span>
        <span className="text-zinc-500">{article.readingTime}</span>
      </div>
      <h2 className="text-lg font-semibold leading-snug text-white">
        <Link href={`/blog/${article.slug}`} className="hover:text-gold-200">
          {article.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{article.excerpt}</p>
      <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
        <span>{article.date}</span>
        <Link href={`/blog/${article.slug}`} className="font-medium text-gold-200 hover:text-gold-100">
          Read article
        </Link>
      </div>
    </article>
  );
}
