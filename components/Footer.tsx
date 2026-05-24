import Link from "next/link";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import { BLOG_CATEGORIES, SHORT_RISK_TEXT, SITE_NAME } from "@/lib/constants";
import { products } from "@/lib/products";
import { tools } from "@/lib/tools";

const COPYRIGHT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-black/70">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-gold-400/40 bg-gold-400/10 text-sm font-black text-gold-200">
              W
            </span>
            <span className="font-semibold text-white">{SITE_NAME}</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-zinc-400">{SHORT_RISK_TEXT}</p>
          <p className="mt-4 text-xs text-zinc-500">
            Copyright {COPYRIGHT_YEAR} WIN Trading Tools. All rights reserved.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Tools</h2>
          <div className="mt-4 grid gap-2 text-sm text-zinc-400">
            {tools.slice(0, 6).map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="hover:text-gold-200">
                {tool.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Explore</h2>
          <div className="mt-4 grid gap-2 text-sm text-zinc-400">
            <Link href="/ai" className="hover:text-gold-200">
              AI Trading Assistant
            </Link>
            {BLOG_CATEGORIES.slice(0, 5).map((category) => (
              <Link key={category} href="/blog" className="hover:text-gold-200">
                {category}
              </Link>
            ))}
            {products.slice(0, 3).map((product) => (
              <Link key={product.slug} href="/products" className="hover:text-gold-200">
                {product.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Get the checklist</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Join the free list for trading checklists, risk planning notes, and tool updates.
          </p>
          <div className="mt-4">
            <EmailCaptureForm compact />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="container-shell flex flex-wrap gap-4 py-5 text-xs text-zinc-500">
          <Link href="/privacy" className="hover:text-zinc-200">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zinc-200">Terms of Use</Link>
          <Link href="/affiliate-disclosure" className="hover:text-zinc-200">Affiliate Disclosure</Link>
          <Link href="/risk-disclaimer" className="hover:text-zinc-200">Risk Disclaimer</Link>
          <Link href="/contact" className="hover:text-zinc-200">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
