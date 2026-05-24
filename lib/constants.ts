export const SITE_NAME = "WIN Trading Tools";
export const SITE_TAGLINE =
  "Free Forex & Gold Trading Tools for Smarter Risk Management";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://win-trading-tools.vercel.app";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/ai", label: "AI Chat" },
  { href: "/blog", label: "Blog" },
  { href: "/products", label: "Products" },
  { href: "/affiliate", label: "Affiliate" },
  { href: "/free-checklist", label: "Free Checklist" }
];

export const BLOG_CATEGORIES = [
  "Gold Trading",
  "Forex Risk Management",
  "Smart Money Concept",
  "Trading Sessions",
  "Trading Psychology",
  "Trading Tools",
  "Beginner Trading"
];

export const TRADING_LEVELS = ["beginner", "intermediate", "advanced"] as const;

export const MAIN_MARKETS = [
  "XAUUSD",
  "EURUSD",
  "GBPUSD",
  "USDJPY",
  "Crypto",
  "Other"
] as const;

export const SHORT_RISK_TEXT =
  "Trading involves significant risk. Tools and articles are educational only and are not financial advice.";
