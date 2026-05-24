import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, SlidersHorizontal, Target, TrendingUp } from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";
import BlogCard from "@/components/BlogCard";
import CTASection from "@/components/CTASection";
import ProductCard from "@/components/ProductCard";
import RiskWarning from "@/components/RiskWarning";
import ToolCard from "@/components/ToolCard";
import { blogArticles } from "@/lib/blog";
import { products } from "@/lib/products";
import { createMetadata } from "@/lib/seo";
import { tools } from "@/lib/tools";

export const metadata = createMetadata({
  title: "Free Forex & Gold Trading Tools",
  description: "Free calculators, checklists, XAUUSD tools, session timing, risk planning, SEO guides, and trading templates for educational trade preparation.",
  path: "/"
});

const helpItems = [
  {
    icon: ShieldCheck,
    title: "Risk control",
    text: "Calculate position size, daily limits, and planned risk before entering a trade."
  },
  {
    icon: Target,
    title: "Trade planning",
    text: "Compare entry, stop, target, and reward-to-risk with a repeatable process."
  },
  {
    icon: Clock,
    title: "Session timing",
    text: "View Asia, London, and New York timing for forex and XAUUSD preparation."
  },
  {
    icon: SlidersHorizontal,
    title: "Fake breakout filtering",
    text: "Use structured conditions before trusting a breakout or retest."
  },
  {
    icon: CheckCircle2,
    title: "Checklist discipline",
    text: "Slow down impulsive entries with clear pre-trade confirmation prompts."
  },
  {
    icon: TrendingUp,
    title: "Performance review",
    text: "Track journal metrics like expectancy, profit factor, and average win/loss."
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-zinc-800/70">
        <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-200">
              WIN Trading Tools
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Free Forex & Gold Trading Tools for Smarter Risk Management
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              Practical calculators, trading checklists, XAUUSD tools, session timing,
              risk planning, and SMC confirmation workflows for traders who want a
              clearer process before entry.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-gold-300"
              >
                Use Free Tools <ArrowRight size={16} />
              </Link>
              <Link
                href="/free-checklist"
                className="inline-flex items-center justify-center rounded-md border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-900"
              >
                Download Free Trading Checklist
              </Link>
            </div>
          </div>

          <div className="card rounded-lg p-5 shadow-glow">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Risk dashboard</p>
                <h2 className="mt-2 text-xl font-semibold text-white">XAUUSD trade plan</h2>
              </div>
              <span className="rounded-md bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                Planning mode
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Risk", "$25.00"],
                ["RR", "1:2.5"],
                ["Session", "London"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 h-44 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex h-full items-end gap-2">
                {[28, 52, 38, 70, 48, 82, 62, 90, 74, 96, 68, 86].map((height, index) => (
                  <span
                    key={height + index}
                    className="flex-1 rounded-t bg-gradient-to-t from-gold-700 to-gold-300"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Tools support preparation and review. They do not predict outcomes or remove trading risk.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Featured tools</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Plan risk before the trade is live.</h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-gold-200 hover:text-gold-100">
            View all tools
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.slice(0, 6).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-800/70 bg-zinc-950/40 py-14">
        <div className="container-shell">
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.24em] text-gold-200">How it helps</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">A practical workflow for chart preparation.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {helpItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-lg border border-zinc-800 bg-black/40 p-5">
                  <Icon className="text-gold-200" size={22} />
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-10 py-14 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-200">SEO guides</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Featured trading articles.</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-gold-200 hover:text-gold-100">
              Read the blog
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {blogArticles.slice(0, 3).map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
        <AdPlaceholder size="sidebar" />
      </section>

      <section className="container-shell py-6">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Digital products</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Templates for traders who want structure.</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-gold-200 hover:text-gold-100">
            View products
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="container-shell grid gap-8 py-14">
        <CTASection />
        <AdPlaceholder size="banner" />
        <RiskWarning />
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
          <Link href="/tools" className="hover:text-gold-200">Tools</Link>
          <Link href="/blog" className="hover:text-gold-200">Blog</Link>
          <Link href="/products" className="hover:text-gold-200">Products</Link>
          <Link href="/affiliate" className="hover:text-gold-200">Affiliate resources</Link>
          <Link href="/risk-disclaimer" className="hover:text-gold-200">Risk disclaimer</Link>
        </div>
      </section>
    </div>
  );
}
