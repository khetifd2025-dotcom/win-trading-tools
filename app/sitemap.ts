import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";
import { tools } from "@/lib/tools";

const staticRoutes = [
  "",
  "/ai",
  "/tools",
  "/blog",
  "/products",
  "/affiliate",
  "/free-checklist",
  "/contact",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
  "/risk-disclaimer"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...tools.map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9
    })),
    ...blogArticles.map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ];
}
