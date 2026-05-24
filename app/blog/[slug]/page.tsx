import Link from "next/link";
import { notFound } from "next/navigation";
import AdPlaceholder from "@/components/AdPlaceholder";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import CTASection from "@/components/CTASection";
import RiskWarning from "@/components/RiskWarning";
import ToolCard from "@/components/ToolCard";
import BlogCard from "@/components/BlogCard";
import { blogArticles, getArticleBySlug, getRelatedArticles } from "@/lib/blog";
import { articleJsonLd, createArticleMetadata } from "@/lib/seo";
import { getRelatedTools } from "@/lib/tools";
import { slugify } from "@/lib/utils";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return createArticleMetadata(article);
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedTools = getRelatedTools(article.relatedTools);
  const relatedArticles = getRelatedArticles(article, 4);

  return (
    <div className="container-shell py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />

      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-semibold text-gold-200 hover:text-gold-100">
          Back to blog
        </Link>
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="rounded-md border border-gold-400/30 bg-gold-400/10 px-2 py-1 text-gold-100">
            {article.category}
          </span>
          <span className="rounded-md border border-zinc-700 px-2 py-1 text-zinc-300">
            {article.readingTime}
          </span>
          <span className="rounded-md border border-zinc-700 px-2 py-1 text-zinc-300">
            {article.date}
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold leading-tight text-white">{article.title}</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">{article.excerpt}</p>

        <section className="card mt-8 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-white">Table of contents</h2>
          <ol className="mt-4 grid gap-2 text-sm text-zinc-300">
            {article.content.map((section) => (
              <li key={section.heading}>
                <a href={`#${slugify(section.heading)}`} className="hover:text-gold-200">
                  {section.heading}
                </a>
              </li>
            ))}
            <li>
              <a href="#related-articles" className="hover:text-gold-200">
                Related articles
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-gold-200">
                FAQ
              </a>
            </li>
          </ol>
        </section>

        <div className="mt-8">
          <AdPlaceholder size="inArticle" />
        </div>

        <div className="prose prose-invert prose-zinc mt-8 max-w-none">
          {article.content.map((section, index) => (
            <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-zinc-300">
                  {paragraph}
                </p>
              ))}
              {section.heading === "Related tools" ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {relatedTools.slice(0, 4).map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="rounded-md border border-zinc-800 bg-zinc-950/70 p-3 text-sm font-medium text-gold-100 hover:border-gold-400/40"
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>
              ) : null}
              {section.heading === "Final checklist" ? (
                <ul className="mt-4 grid gap-2 text-sm text-zinc-300">
                  {article.finalChecklist.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {index === 1 ? (
                <div className="my-8">
                  <AdPlaceholder size="inArticle" />
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <section id="related-articles" className="card mt-10 scroll-mt-24 rounded-lg p-5">
          <h2 className="text-2xl font-semibold text-white">Related articles</h2>
          <div className="mt-4 grid gap-3 text-sm">
            {relatedArticles.slice(0, 4).map((relatedArticle) => (
              <Link
                key={relatedArticle.slug}
                href={`/blog/${relatedArticle.slug}`}
                className="rounded-md border border-zinc-800 bg-zinc-950/70 p-3 text-zinc-300 hover:border-gold-400/40 hover:text-gold-100"
              >
                {relatedArticle.title}
              </Link>
            ))}
          </div>
        </section>

        <section id="faq" className="card mt-8 scroll-mt-24 rounded-lg p-5">
          <h2 className="text-2xl font-semibold text-white">FAQ</h2>
          <div className="mt-4 grid gap-4">
            {article.faq.map((item) => (
              <div key={item.question} className="rounded-md border border-zinc-800 bg-zinc-950/70 p-4">
                <h3 className="font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-gold-400/30 bg-gold-400/10 p-5">
          <h2 className="text-lg font-semibold text-gold-50">Next step</h2>
          <p className="mt-2 text-sm leading-6 text-gold-50">{article.callToAction}</p>
        </section>
      </article>

      <section className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-8">
          <AffiliateDisclosure />
          <RiskWarning />
          <CTASection />

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Related articles</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <BlogCard key={relatedArticle.slug} article={relatedArticle} />
              ))}
            </div>
          </section>
        </div>

        <aside className="grid h-fit gap-5 lg:sticky lg:top-24">
          <AdPlaceholder size="sidebar" />
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Related tools</h2>
            <div className="grid gap-4">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
