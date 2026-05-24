import { isSupabasePublicConfigured } from "@/lib/supabase";

export default function AdminSetupNotice() {
  const publicConfigured = isSupabasePublicConfigured();

  if (publicConfigured) {
    return (
      <div className="mt-5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-50">
        Supabase public configuration is present. Admin API routes will use the server-only service role key when it is configured.
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-lg border border-gold-400/30 bg-gold-400/10 p-4 text-sm leading-6 text-gold-50">
      Supabase Auth/database is not fully configured yet. Admin pages show mock or static data safely until Supabase environment variables and authentication are connected.
    </div>
  );
}
