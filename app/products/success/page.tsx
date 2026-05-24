import Link from "next/link";
import RiskWarning from "@/components/RiskWarning";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Checkout Success",
  description: "Your WIN Trading Tools checkout was completed successfully.",
  path: "/products/success",
  noIndex: true
});

export default function ProductSuccessPage() {
  return (
    <div className="container-shell py-12">
      <section className="card mx-auto max-w-3xl rounded-lg p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-200">Payment complete</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Checkout successful.</h1>
        <p className="mt-4 text-base leading-7 text-zinc-300">
          Thank you for purchasing a WIN Trading Tools digital product. Stripe has completed the checkout flow.
        </p>
        <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-950/70 p-4">
          <h2 className="text-lg font-semibold text-white">Next steps</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-zinc-300">
            <li>Keep your Stripe receipt for your records.</li>
            <li>Digital download delivery can be connected here later with a webhook or secure download link.</li>
            <li>Use the product as an educational planning aid alongside the free tools.</li>
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
          >
            Back to products
          </Link>
          <Link
            href="/tools"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
          >
            Use free tools
          </Link>
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-3xl">
        <RiskWarning />
      </div>
    </div>
  );
}
