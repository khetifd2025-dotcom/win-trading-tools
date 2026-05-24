import EmailCaptureForm from "@/components/EmailCaptureForm";
import RiskWarning from "@/components/RiskWarning";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Download the Free Trading Checklist",
  description: "Get the free WIN Trading Tools checklist for pre-trade risk, session, news, and setup confirmation.",
  path: "/free-checklist"
});

export default function FreeChecklistPage() {
  return (
    <div className="container-shell py-12">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Lead magnet</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Download the Free Trading Checklist</h1>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            Use a simple checklist before entries to review risk, session timing, news conditions,
            liquidity, confirmation, and emotional readiness.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-zinc-300">
            {[
              "Pre-entry risk planning prompts",
              "Session and news checks",
              "Breakout and SMC confirmation reminders",
              "Daily loss limit reminder"
            ].map((item) => (
              <div key={item} className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-4">
                {item}
              </div>
            ))}
          </div>
        </div>

        <section className="card rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white">Send me the checklist</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Enter your details. If email delivery is not configured yet, the site will still save or simulate the lead safely.
          </p>
          <div className="mt-6">
            <EmailCaptureForm showTradingLevel showMainMarket />
          </div>
        </section>
      </section>

      <div className="mt-10">
        <RiskWarning />
      </div>
    </div>
  );
}
