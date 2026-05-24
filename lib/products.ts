export type Product = {
  name: string;
  slug: string;
  price: number;
  currency: "usd";
  description: string;
  features: string[];
  productType: string;
  active: boolean;
};

export const products: Product[] = [
  {
    name: "WIN Trading Checklist PDF",
    slug: "win-trading-checklist-pdf",
    price: 19,
    currency: "usd",
    description: "A printable pre-trade checklist for risk, bias, session timing, and emotional discipline.",
    features: ["Pre-entry checklist", "Daily prep prompts", "Risk warning reminders", "Beginner-friendly format"],
    productType: "PDF",
    active: true
  },
  {
    name: "XAUUSD Risk Management Template",
    slug: "xauusd-risk-management-template",
    price: 29,
    currency: "usd",
    description: "Gold-focused risk planning template for stop distance, lot size, and session notes.",
    features: ["XAUUSD planning fields", "Risk per trade worksheet", "Daily loss limit section", "Broker contract notes"],
    productType: "Spreadsheet",
    active: true
  },
  {
    name: "Gold Scalping Journal",
    slug: "gold-scalping-journal",
    price: 25,
    currency: "usd",
    description: "A journal template designed for high-frequency gold traders tracking execution quality.",
    features: ["Trade log", "Screenshot notes", "Mistake tagging", "Weekly review"],
    productType: "Spreadsheet",
    active: true
  },
  {
    name: "SMC Entry Checklist",
    slug: "smc-entry-checklist",
    price: 17,
    currency: "usd",
    description: "A structured SMC checklist for liquidity, structure, POI, session, and invalidation.",
    features: ["A+ to C grading", "Liquidity sweep prompts", "POI confirmation list", "Risk controls"],
    productType: "PDF",
    active: true
  },
  {
    name: "Breakout True/Fake Playbook",
    slug: "breakout-true-fake-playbook",
    price: 39,
    currency: "usd",
    description: "Educational breakout framework covering confirmation, retests, and common traps.",
    features: ["Breakout scoring model", "Retest checklist", "Failure examples", "Trade planning pages"],
    productType: "Playbook",
    active: true
  },
  {
    name: "Trading Plan Template",
    slug: "trading-plan-template",
    price: 15,
    currency: "usd",
    description: "A practical plan template for rules, markets, sessions, risk, and review cadence.",
    features: ["Rule builder", "Risk profile", "Session plan", "Weekly review prompts"],
    productType: "Template",
    active: true
  },
  {
    name: "Forex Risk Calculator Spreadsheet",
    slug: "forex-risk-calculator-spreadsheet",
    price: 22,
    currency: "usd",
    description: "Spreadsheet calculator for position sizing, daily limits, and trade tracking.",
    features: ["Lot size worksheet", "Daily risk tracker", "Trade summary", "Editable fields"],
    productType: "Spreadsheet",
    active: true
  },
  {
    name: "Gold Session Trading Guide",
    slug: "gold-session-trading-guide",
    price: 27,
    currency: "usd",
    description: "Guide to planning XAUUSD trades around Asia, London, and New York conditions.",
    features: ["Session behavior notes", "Volatility checklist", "News risk section", "Planning examples"],
    productType: "Guide",
    active: true
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductUnitAmount(product: Product) {
  return Math.round(product.price * 100);
}

export const productPriceMap = Object.fromEntries(
  products.map((product) => [product.slug, getProductUnitAmount(product)])
) as Record<string, number>;
