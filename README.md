# WIN Trading Tools

Production-ready starter platform for a monetization-focused forex, gold, and risk-management website.

## Overview

WIN Trading Tools provides free calculators, checklists, trading education, digital product cards, affiliate resource pages, ad placeholders, lead capture, and an admin dashboard scaffold.

It also includes an AI Trading Assistant page. By default it runs in local free mode without using API credit; OpenAI mode can be enabled later with server-side environment variables.

Free mode uses a bundled WIN Trade AI knowledge base extracted from the local `ok leo` trading project. The production app does not read `C:\Users\ThinkPad\trade-ai\ok leo` directly because Vercel cannot access local Windows paths.

The site is educational only. It does not provide financial advice, guarantee profits, promise income, or claim a fixed winrate.

## Monetization model

- Free tools for organic traffic
- SEO blog articles for long-tail search
- Email lead capture with a free checklist
- Digital products through Stripe Checkout
- Affiliate comparison pages with visible disclosures
- Ad placeholder components for AdSense or other networks
- Admin dashboard structure for future premium/member features

## Tech stack

- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- Supabase database/auth structure
- Stripe Checkout route
- Resend email integration structure
- Free-mode AI-style trading assistant with optional OpenAI upgrade
- Vercel-ready deployment

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open `https://win-trading-tools.vercel.app` after deployment. For local development, the dev server still runs on `http://localhost:3000`.

## Build and lint

```bash
npm run build
npm run lint
```

## GitHub safety checklist

- Keep `.env.local`, `.env`, `.next`, `node_modules`, logs, and deployment artifacts out of Git.
- Use `.env.example` for empty placeholder variables only.
- Keep `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, and `RESEND_API_KEY` in server environments only.
- Run `npm run lint` and `npm run build` before pushing.

## Environment variables

Copy `.env.example` to `.env.local` and fill in values as needed.

```bash
NEXT_PUBLIC_SITE_URL=https://win-trading-tools.vercel.app

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

RESEND_API_KEY=

OPENAI_API_KEY=
OPENAI_MODEL=
AI_MODE=free

NEXT_PUBLIC_GA_ID=
```

All external services fail gracefully if env vars are missing. In production, set `NEXT_PUBLIC_SITE_URL` to `https://win-trading-tools.vercel.app`.

## Supabase setup

1. Create a Supabase project.
2. Run `database/schema.sql` in the SQL editor.
3. Add public URL and anon key to `.env.local`.
4. Add the service role key only to server environments. Never expose it in client code.
5. Configure Supabase Auth before using `/admin` in production.

## Stripe setup

1. Create a Stripe account.
2. Add `STRIPE_SECRET_KEY` to your server environment.
3. Set `NEXT_PUBLIC_SITE_URL` to your deployed domain.
4. The checkout route uses product slugs from `lib/products.ts` and creates inline Stripe Checkout prices.
5. Successful payments redirect to `/products/success`; canceled payments redirect to `/products/cancel`.

If Stripe is missing, `/api/checkout` returns: `Checkout is not configured yet.`

## Resend setup

1. Create a Resend API key.
2. Add `RESEND_API_KEY`.
3. Update the `from` address in `app/api/leads/route.ts` after domain verification.

Lead capture still works without Resend.

## AI assistant setup

By default, `/api/ai` uses local free mode and does not call OpenAI or use API credit.

To use free mode:

1. Set `AI_MODE=free` or leave `AI_MODE` blank.
2. Use `/ai` for educational AI-style trading assistance powered by the bundled knowledge in `lib/trading-knowledge.ts`.
3. Free mode analyzes the user's wording, detects intent such as XAUUSD direction questions, fake breakout checks, SMC review, risk sizing, session timing, news risk, or journal review, then returns a structured planning checklist.

To enable OpenAI mode later:

1. Set `AI_MODE=openai`.
2. Add `OPENAI_API_KEY` to your server environment.
3. Optionally set `OPENAI_MODEL`; if blank, the app uses `gpt-4.1-mini`.
4. Redeploy after changing environment variables.

The assistant does not provide financial advice, trade signals, guaranteed outcomes, or fixed winrate claims. If OpenAI mode is unavailable, `/api/ai` falls back to free mode instead of crashing.

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repo into Vercel.
3. Add env vars in Vercel Project Settings.
4. Deploy.
5. Submit `/sitemap.xml` to Google Search Console.

## Add a new tool

1. Add metadata to `lib/tools.ts`.
2. Add calculator logic to `lib/calculators.ts`.
3. Add UI handling in `components/ToolCalculator.tsx`.

## Add a new article

Add a new object to `blogArticles` in `lib/blog.ts`. The blog index, dynamic route, sitemap, metadata, and related article logic will update automatically.

## Add a new product

Add a product to `products` in `lib/products.ts`. The product grid and checkout slug mapping update automatically.

## Risk reminder

Trading involves significant risk. Keep risk warnings visible around calculators, checklists, articles, affiliate pages, products, and any trading decision support tools.
