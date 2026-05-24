import Link from "next/link";
import { notFound } from "next/navigation";
import AdPlaceholder from "@/components/AdPlaceholder";
import CTASection from "@/components/CTASection";
import ToolCalculator from "@/components/ToolCalculator";
import ToolCard from "@/components/ToolCard";
import ToolUsageTracker from "@/components/ToolUsageTracker";
import { getArticleBySlug, type BlogArticle } from "@/lib/blog";
import { getProductBySlug } from "@/lib/products";
import { createToolMetadata, toolJsonLd } from "@/lib/seo";
import { getRelatedTools, getToolBySlug, tools } from "@/lib/tools";
import { formatCurrency } from "@/lib/utils";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return createToolMetadata(tool);
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const relatedTools = getRelatedTools(tool.relatedTools);
  const relatedArticles = tool.relatedArticles
    .map((articleSlug) => getArticleBySlug(articleSlug))
    .filter((article): article is BlogArticle => Boolean(article));
  const product = tool.productCta ? getProductBySlug(tool.productCta.productSlug) : undefined;

  return (
    <div className="container-shell py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd(tool)) }}
      />
      <ToolUsageTracker toolSlug={tool.slug} />

      <section className="max-w-3xl">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-md border border-gold-400/30 bg-gold-400/10 px-2 py-1 text-xs font-medium text-gold-100">
            {tool.marketTag}
          </span>
          <span className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300">
            {tool.category}
          </span>
        </div>
        <h1 className="text-4xl font-semibold text-white">{tool.title}</h1>
        <p className="mt-4 text-base leading-7 text-zinc-300">{tool.intro}</p>
      </section>

      <section className="card mt-8 rounded-lg p-5 sm:p-6">
        <h2 className="text-2xl font-semibold text-white">Interactive tool</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Enter your trade plan details before entry. Results are estimates for planning and education only.
        </p>
        <div className="mt-6">
          <ToolCalculator toolSlug={tool.slug} />
        </div>
      </section>

      <div className="mt-8">
        <AdPlaceholder size="inArticle" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-8">
          <section className="card rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white">How to use this tool</h2>
            <ol className="mt-4 grid gap-3 text-sm leading-6 text-zinc-300">
              {tool.howToUse.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gold-400 text-xs font-bold text-black">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="card rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white">Example calculation</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-300">{tool.exampleUseCase}</p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-zinc-300">
              {tool.exampleCalculation.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white">Common mistakes</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-zinc-300">
              {tool.commonMistakes.map((mistake) => (
                <li key={mistake} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />
                  {mistake}
                </li>
              ))}
            </ul>
          </section>

          <section className="card rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white">When not to use this tool</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-zinc-300">
              {tool.whenNotToUse.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-gold-400/30 bg-gold-400/10 p-6">
            <h2 className="text-2xl font-semibold text-gold-50">Use this before your next trade</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-gold-50">
              {tool.preTradeChecklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/free-checklist"
                className="rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
              >
                Download free checklist
              </Link>
              <Link
                href="/tools"
                className="rounded-md border border-gold-400/30 px-4 py-2 text-sm font-semibold text-gold-50 hover:bg-gold-400/10"
              >
                Browse all tools
              </Link>
            </div>
          </section>

          {product && tool.productCta ? (
            <section className="card rounded-lg p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Related product</p>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{tool.productCta.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{tool.productCta.description}</p>
                  <p className="mt-3 text-sm font-semibold text-gold-100">
                    {product.name} - {formatCurrency(product.price)}
                  </p>
                </div>
                <Link
                  href={`/products#${product.slug}`}
                  className="inline-flex shrink-0 justify-center rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
                >
                  {tool.productCta.buttonLabel}
                </Link>
              </div>
            </section>
          ) : null}

          <section className="card rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white">Related blog articles</h2>
            <div className="mt-4 grid gap-3">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="rounded-md border border-zinc-800 bg-zinc-950/70 p-4 hover:border-gold-400/40"
                >
                  <span className="text-sm font-semibold text-white">{article.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-zinc-400">{article.excerpt}</span>
                </Link>
              ))}
            </div>
          </section>

          <div>
            <AdPlaceholder size="inArticle" />
          </div>

          <section className="card rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white">FAQ</h2>
            <div className="mt-4 grid gap-4">
              {tool.faq.map((item) => (
                <div key={item.question} className="rounded-md border border-zinc-800 bg-zinc-950/70 p-4">
                  <h3 className="font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
            <strong className="text-red-50">Risk disclaimer:</strong> {tool.riskDisclaimer}
          </section>

          <CTASection />
        </div>

        <aside className="grid h-fit gap-5 lg:sticky lg:top-24">
          <AdPlaceholder size="sidebar" />
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Related tools</h2>
            <div className="grid gap-4">
              {relatedTools.map((relatedTool) => (
                <ToolCard key={relatedTool.slug} tool={relatedTool} />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
