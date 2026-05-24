import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Affiliate Disclosure",
  description: "Affiliate disclosure for WIN Trading Tools.",
  path: "/affiliate-disclosure"
});

export default function AffiliateDisclosurePage() {
  return (
    <div className="container-shell py-12">
      <article className="card mx-auto max-w-3xl rounded-lg p-6">
        <h1 className="text-4xl font-semibold text-white">Affiliate Disclosure</h1>
        <div className="mt-8 grid gap-6 text-sm leading-7 text-zinc-300">
          <p>
            Some links may be affiliate links. The website may earn a commission if users purchase through those links, at no extra cost to the user.
          </p>
          <p>
            Affiliate compensation does not guarantee that a product is right for every trader. We aim to identify where a tool may be useful, what tradeoffs exist, and when users should do their own due diligence.
          </p>
          <p>
            We do not publish fake reviews, fake income claims, guaranteed trading outcomes, or guaranteed product results.
          </p>
        </div>
      </article>
    </div>
  );
}
