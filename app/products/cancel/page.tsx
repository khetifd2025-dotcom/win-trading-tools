import Link from "next/link";
import RiskWarning from "@/components/RiskWarning";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Checkout Canceled",
  description: "Your WIN Trading Tools checkout was canceled.",
  path: "/products/cancel",
  noIndex: true
});

export default function ProductCancelPage() {
  return (
    <div className="container-shell py-12">
      <section className="card mx-auto max-w-3xl rounded-lg p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Checkout canceled</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">No payment was completed.</h1>
        <p className="mt-4 text-base leading-7 text-zinc-300">
          Your Stripe Checkout session was canceled. You can return to the products page or download the free checklist instead.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
          >
            Back to products
          </Link>
          <Link
            href="/free-checklist"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
          >
            Free checklist
          </Link>
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-3xl">
        <RiskWarning />
      </div>
    </div>
  );
}
