import Link from "next/link";
import AdPlaceholder from "@/components/AdPlaceholder";
import CTASection from "@/components/CTASection";
import ToolCard from "@/components/ToolCard";
import RiskWarning from "@/components/RiskWarning";
import { createMetadata } from "@/lib/seo";
import { tools } from "@/lib/tools";

export const metadata = createMetadata({
  title: "Free Forex and Gold Trading Tools",
  description:
    "Use free forex and XAUUSD calculators, risk management tools, session timing, SMC checklists, breakout filters, journal calculators, and news risk checklists.",
  path: "/tools"
});

export default function ToolsPage() {
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  return (
    <div className="container-shell py-12">
      <section className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Trading tools</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Free forex and gold trading tools.</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          Plan lot size, risk reward, XAUUSD profit, session timing, SMC entries, breakout quality, journal metrics, daily loss limits, compounding scenarios, and news risk before you place a trade.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/free-checklist"
            className="rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
          >
            Download free checklist
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
          >
            Read trading guides
          </Link>
        </div>
      </section>

      <div className="mt-8">
        <AdPlaceholder size="banner" />
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <div key={category} className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-4">
            <h2 className="text-sm font-semibold text-white">{category}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {tools.filter((tool) => tool.category === category).length} practical tool
              {tools.filter((tool) => tool.category === category).length === 1 ? "" : "s"} for planning and review.
            </p>
          </div>
        ))}
      </section>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      <div className="mt-10">
        <RiskWarning />
      </div>

      <div className="mt-10">
        <CTASection />
      </div>
    </div>
  );
}
