import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type LeadRecord = {
  id?: string;
  name: string;
  email: string;
  trading_level?: string | null;
  main_market?: string | null;
  created_at?: string;
};

export function isSupabasePublicConfigured() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseBrowserClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch {
    return null;
  }
}
