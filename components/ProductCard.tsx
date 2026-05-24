"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: product.slug })
      });
      const data = (await response.json()) as { url?: string; error?: string; message?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setMessage(data.error || data.message || "Checkout is not configured yet.");
    } catch {
      setMessage("Checkout is not available right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article id={product.slug} className="card flex h-full scroll-mt-24 flex-col rounded-lg p-5">
      <div className="mb-5 grid aspect-[16/9] place-items-center rounded-md border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-gold-900/30">
        <span className="text-xs uppercase tracking-[0.24em] text-gold-100">{product.productType}</span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">{product.name}</h2>
        <span className="rounded-md bg-zinc-950 px-2 py-1 text-sm font-semibold text-gold-200">
          {formatCurrency(product.price, product.currency.toUpperCase())}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{product.description}</p>
      <ul className="mt-4 grid gap-2 text-sm text-zinc-300">
        {product.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleBuy}
        disabled={loading}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ShoppingCart size={16} />
        {loading ? "Preparing..." : "Buy with Stripe"}
      </button>
      {message ? <p className="mt-3 text-sm text-zinc-400">{message}</p> : null}
    </article>
  );
}
