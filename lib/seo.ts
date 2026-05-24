import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import type { BlogArticle } from "@/lib/blog";
import type { Product } from "@/lib/products";
import type { TradingTool } from "@/lib/tools";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  type = "website",
  noIndex = false
}: MetadataInput): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : undefined,
    alternates: {
      canonical: absoluteUrl(path)
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: absoluteUrl("/og-image.svg"),
          width: 1200,
          height: 630,
          alt: SITE_NAME
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/og-image.svg")]
    }
  };
}

export function createAdminMetadata(input: Omit<MetadataInput, "noIndex">): Metadata {
  return createMetadata({
    ...input,
    noIndex: true
  });
}

export const defaultMetadata = createMetadata({
  title: SITE_NAME,
  description: SITE_TAGLINE,
  path: "/"
});

export function createToolMetadata(tool: TradingTool): Metadata {
  return createMetadata({
    title: tool.metaTitle || tool.title,
    description: tool.metaDescription || tool.seoDescription,
    path: `/tools/${tool.slug}`
  });
}

export function createArticleMetadata(article: BlogArticle): Metadata {
  return createMetadata({
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    path: `/blog/${article.slug}`,
    type: "article"
  });
}

export function createProductMetadata(product: Product): Metadata {
  return createMetadata({
    title: product.name,
    description: product.description,
    path: "/products"
  });
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function toolJsonLd(tool: TradingTool) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.title,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: absoluteUrl(`/tools/${tool.slug}`),
        description: tool.metaDescription || tool.seoDescription,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };
}

export function articleJsonLd(article: BlogArticle) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.metaTitle || article.title,
        description: article.metaDescription || article.excerpt,
        author: {
          "@type": "Organization",
          name: article.author
        },
        datePublished: article.date,
        keywords: article.tags.join(", "),
        mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`)
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: SITE_NAME
    },
    offers: {
        "@type": "Offer",
        price: product.price.toFixed(2),
        priceCurrency: product.currency.toUpperCase(),
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/products")
      }
  };
}
