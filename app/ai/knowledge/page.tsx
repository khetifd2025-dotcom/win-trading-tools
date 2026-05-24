import Link from "next/link";
import RiskWarning from "@/components/RiskWarning";
import { createMetadata } from "@/lib/seo";
import { tradingKnowledgeDocs } from "@/lib/trading-knowledge";

export const metadata = createMetadata({
  title: "AI Trading Knowledge Base",
  description:
    "Review the bundled WIN Trade AI knowledge modules used by the free AI assistant, including SMC, liquidity, sessions, XAUUSD, news risk, harmonic patterns, and Elliott wave context.",
  path: "/ai/knowledge"
});

const okLeoDocs = tradingKnowledgeDocs.filter((doc) => doc.source.toLowerCase().includes("ok leo"));

export default function AiKnowledgePage() {
  return (
    <div className="container-shell py-12">
      <section className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">WIN AI knowledge</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Bundled trading knowledge from the OK Leo project.
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          These modules are curated from the local OK Leo trading project and bundled into this website so the
          Free mode AI assistant can answer with practical trading context without reading local Windows files
          or using API credit.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/ai"
            className="rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
          >
            Open AI chat
          </Link>
          <Link
            href="/tools"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
          >
            Use free tools
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <RiskWarning />
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {okLeoDocs.map((doc) => (
          <article key={doc.id} className="card rounded-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">{doc.title}</h2>
              <span className="rounded-md border border-gold-400/30 bg-gold-400/10 px-2 py-1 text-xs font-medium text-gold-100">
                OK Leo
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{doc.summary}</p>
            <p className="mt-3 break-words text-xs text-zinc-500">Source: {doc.source}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-300">
              {doc.checks.slice(0, 4).map((check) => (
                <li key={check}>- {check}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
