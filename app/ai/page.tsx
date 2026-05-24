import Link from "next/link";
import AdPlaceholder from "@/components/AdPlaceholder";
import AiChat from "@/components/AiChat";
import RiskWarning from "@/components/RiskWarning";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Trading Assistant",
  description:
    "Ask trading questions or upload chart screenshots for educational AI analysis focused on forex, XAUUSD, risk planning, sessions, and checklists.",
  path: "/ai"
});

export default function AiPage() {
  return (
    <div className="container-shell py-12">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold-200">AI assistant</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            Ask questions or upload chart images for AI analysis.
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            Use the AI assistant to review trading concepts, risk planning, session context, checklist discipline, and visible chart structure from screenshots. It is built for education and preparation, not trade signals.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
            >
              Use free tools
            </Link>
            <Link
              href="/free-checklist"
              className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
            >
              Download checklist
            </Link>
          </div>

          <div className="mt-8">
            <RiskWarning />
          </div>

          <div className="mt-8">
            <AdPlaceholder size="rectangle" />
          </div>
        </div>

        <AiChat />
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            title: "Chart screenshots",
            body: "Upload a chart image and ask for visible structure, liquidity context, risk questions, or checklist observations."
          },
          {
            title: "Risk planning",
            body: "Ask how to think about lot size, risk reward, daily limits, or journal metrics before entering a trade."
          },
          {
            title: "Educational review",
            body: "Use the assistant to explain SMC terms, session behavior, breakout confirmation, or common trading mistakes."
          }
        ].map((item) => (
          <article key={item.title} className="card rounded-lg p-5">
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
