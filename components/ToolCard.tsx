import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TradingTool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: TradingTool }) {
  return (
    <article className="card flex h-full flex-col rounded-lg p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-md border border-gold-400/30 bg-gold-400/10 px-2 py-1 text-xs font-medium text-gold-100">
          {tool.marketTag}
        </span>
        <span className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300">
          {tool.difficulty}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-white">{tool.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{tool.description}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">{tool.category}</p>
      <Link
        href={`/tools/${tool.slug}`}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
      >
        Open tool <ArrowRight size={16} />
      </Link>
    </article>
  );
}
