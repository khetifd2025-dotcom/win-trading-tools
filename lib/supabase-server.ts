import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function createSupabaseServiceRoleClient(
  supabaseUrl?: string,
  supabaseServiceRoleKey?: string
): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceRoleKey) return null;

  try {
    return createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  } catch {
    return null;
  }
}
