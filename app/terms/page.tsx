import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms of Use for WIN Trading Tools, including educational use, no financial advice, no guaranteed results, user responsibility, and limitation of liability.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <div className="container-shell py-12">
      <article className="card mx-auto max-w-3xl rounded-lg p-6">
        <h1 className="text-4xl font-semibold text-white">Terms of Use</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">Last updated: May 23, 2026</p>
        <div className="mt-8 grid gap-6 text-sm leading-7 text-zinc-300">
          <section>
            <h2 className="text-xl font-semibold text-white">Educational use</h2>
            <p className="mt-2">
              WIN Trading Tools provides educational calculators, checklists, articles, templates, and resources for traders. The site is not a broker, adviser, signal service, or investment manager.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">No financial advice</h2>
            <p className="mt-2">
              Nothing on this website is financial advice, investment advice, tax advice, legal advice, or a recommendation to buy, sell, or hold any instrument.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">No guaranteed results</h2>
            <p className="mt-2">
              We do not promise trading profits, income, fixed winrate, account growth, or successful challenge outcomes. Any examples are educational and hypothetical.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">User responsibility</h2>
            <p className="mt-2">
              You are responsible for your own trading decisions, risk management, broker selection, compliance obligations, and use of any tool or product.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Limitation of liability</h2>
            <p className="mt-2">
              To the fullest extent permitted by law, WIN Trading Tools is not liable for trading losses, data errors, service interruptions, missed opportunities, or decisions made based on website content.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
