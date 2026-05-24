import { NextResponse } from "next/server";
import { mockLeads } from "@/lib/leads";
import { createSupabaseServiceRoleClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createSupabaseServiceRoleClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      fallback: true,
      leads: mockLeads,
      message: "Supabase admin environment variables are not configured. Showing mock leads."
    });
  }

  const { data, error } = await supabase
    .from("leads")
    .select("id,name,email,trading_level,main_market,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: `Could not load Supabase leads: ${error.message}`
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    fallback: false,
    leads: data || [],
    message: "Showing real leads from Supabase."
  });
}
