import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Risk Disclaimer",
  description: "Trading risk disclaimer for WIN Trading Tools.",
  path: "/risk-disclaimer"
});

export default function RiskDisclaimerPage() {
  return (
    <div className="container-shell py-12">
      <article className="card mx-auto max-w-3xl rounded-lg p-6">
        <h1 className="text-4xl font-semibold text-white">Risk Disclaimer</h1>
        <div className="mt-8 grid gap-6 text-sm leading-7 text-zinc-300">
          <p>
            Trading involves significant risk. This website is for educational and informational purposes only. Nothing on this website is financial advice, investment advice, or a guarantee of results. Users are responsible for their own trading decisions.
          </p>
          <p>
            Forex, gold, CFDs, crypto, indices, and other leveraged markets can move quickly and may result in losses greater than expected. Spreads, slippage, broker contract specifications, liquidity, and news events can affect outcomes.
          </p>
          <p>
            Calculators and checklists are planning aids. They do not predict price movement, guarantee winrate, guarantee profit, or remove the need for independent judgment.
          </p>
          <p>
            Do not trade money you cannot afford to lose. Consider speaking with a qualified professional before making financial decisions.
          </p>
        </div>
      </article>
    </div>
  );
}
