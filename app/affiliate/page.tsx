import { ExternalLink } from "lucide-react";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import RiskWarning from "@/components/RiskWarning";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Trading Tool Affiliate Resources",
  description: "Affiliate resource page for charting platforms, VPS tools, journals, prop firm tools, and risk management resources with clear disclosure.",
  path: "/affiliate"
});

const affiliateGroups = [
  {
    title: "Trading charting platforms",
    items: [
      {
        name: "Charting Platform Partner",
        category: "Charting tools",
        bestFor: "Traders who need clean chart layouts and alerts",
        pros: ["Flexible charting", "Large indicator ecosystem", "Useful alerts"],
        cons: ["Paid plans may be needed", "Features vary by region"],
        href: "https://example.com/charting-platform?ref=win-trading-tools"
      }
    ]
  },
  {
    title: "VPS tools",
    items: [
      {
        name: "Trading VPS Partner",
        category: "VPS tools",
        bestFor: "Traders running platforms or automation close to broker servers",
        pros: ["Always-on server", "Lower downtime risk", "Remote access"],
        cons: ["Monthly cost", "Requires setup and maintenance"],
        href: "https://example.com/trading-vps?ref=win-trading-tools"
      }
    ]
  },
  {
    title: "Trading journal tools",
    items: [
      {
        name: "Journal Platform Partner",
        category: "Trading journal tools",
        bestFor: "Traders tracking execution quality and statistics",
        pros: ["Performance analytics", "Trade tagging", "Review dashboards"],
        cons: ["Manual review still required", "Broker sync varies"],
        href: "https://example.com/trading-journal?ref=win-trading-tools"
      }
    ]
  },
  {
    title: "Prop firm tools",
    items: [
      {
        name: "Prop Firm Research Partner",
        category: "Prop firm tools",
        bestFor: "Traders comparing rules and drawdown structures",
        pros: ["Rule comparison", "Challenge planning", "Risk rule reminders"],
        cons: ["Rules can change", "Passing is never guaranteed"],
        href: "https://example.com/prop-firm-tools?ref=win-trading-tools"
      }
    ]
  },
  {
    title: "Risk management tools",
    items: [
      {
        name: "Risk Dashboard Partner",
        category: "Risk management tools",
        bestFor: "Traders who need daily limits and position checks",
        pros: ["Risk tracking", "Position planning", "Process reminders"],
        cons: ["Does not replace discipline", "Inputs must be accurate"],
        href: "https://example.com/risk-dashboard?ref=win-trading-tools"
      }
    ]
  },
  {
    title: "Forex calculators",
    items: [
      {
        name: "Calculator Suite Partner",
        category: "Forex calculators",
        bestFor: "Traders comparing pip value, margin, and position size",
        pros: ["Fast estimates", "Multiple markets", "Useful for planning"],
        cons: ["Broker specs still matter", "Not a signal provider"],
        href: "https://example.com/forex-calculators?ref=win-trading-tools"
      }
    ]
  }
];

export default function AffiliatePage() {
  return (
    <div className="container-shell py-12">
      <section className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Affiliate resources</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Trading tools and platform resources.</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          This page is structured for future affiliate monetization. Links are placeholders until a real partner is added and reviewed.
        </p>
      </section>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <div className="mt-10 grid gap-10">
        {affiliateGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-2xl font-semibold text-white">{group.title}</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <article key={item.name} className="card rounded-lg p-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-md border border-gold-400/30 bg-gold-400/10 px-2 py-1 text-xs text-gold-100">
                      Affiliate link
                    </span>
                    <span className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.bestFor}</p>
                  <div className="mt-4 grid gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-emerald-200">Pros</p>
                      <ul className="mt-2 grid gap-1 text-zinc-300">
                        {item.pros.map((pro) => (
                          <li key={pro}>- {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-red-200">Cons</p>
                      <ul className="mt-2 grid gap-1 text-zinc-300">
                        {item.cons.map((con) => (
                          <li key={con}>- {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <a
                    href={item.href}
                    rel="nofollow sponsored noopener noreferrer"
                    target="_blank"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
                  >
                    Visit partner <ExternalLink size={16} />
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10">
        <RiskWarning compact />
      </div>
    </div>
  );
}
