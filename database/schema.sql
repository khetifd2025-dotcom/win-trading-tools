create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  trading_level text,
  main_market text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  price numeric not null default 0,
  description text,
  features jsonb,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  category text,
  content text,
  published boolean default false,
  created_at timestamptz default now()
);

create table if not exists tool_usage (
  id uuid primary key default gen_random_uuid(),
  tool_name text not null,
  created_at timestamptz default now()
);

create table if not exists product_clicks (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null,
  created_at timestamptz default now()
);

create table if not exists affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  affiliate_name text not null,
  created_at timestamptz default now()
);

create index if not exists leads_email_idx on leads (email);
create index if not exists articles_slug_idx on articles (slug);
create index if not exists products_slug_idx on products (slug);
create index if not exists tool_usage_tool_name_idx on tool_usage (tool_name);

alter table leads enable row level security;
alter table products enable row level security;
alter table articles enable row level security;
alter table tool_usage enable row level security;
alter table product_clicks enable row level security;
alter table affiliate_clicks enable row level security;

-- Use the service role key from server-only API routes for inserts/admin reads.
-- Add public read policies only for content you intentionally expose from Supabase.
