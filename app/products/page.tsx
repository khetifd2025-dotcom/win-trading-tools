import AdPlaceholder from "@/components/AdPlaceholder";
import ProductCard from "@/components/ProductCard";
import RiskWarning from "@/components/RiskWarning";
import { products } from "@/lib/products";
import { createMetadata, productJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Trading Templates and Digital Products",
  description: "Digital trading checklists, XAUUSD risk templates, journals, playbooks, and planning spreadsheets for educational use.",
  path: "/products"
});

export default function ProductsPage() {
  return (
    <div className="container-shell py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": products.map(productJsonLd)
          })
        }}
      />
      <section className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-gold-200">Digital products</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Trading templates for better preparation.</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          Downloadable PDFs, templates, and spreadsheets built around trade planning, risk management, and review routines. These are educational planning tools only and are not financial advice.
        </p>
      </section>

      <div className="mt-8">
        <AdPlaceholder size="banner" />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="mt-10">
        <RiskWarning />
      </div>
    </div>
  );
}
