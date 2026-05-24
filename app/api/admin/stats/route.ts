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
      totalLeads: mockLeads.length
    });
  }

  const { count, error } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: `Could not count Supabase leads: ${error.message}`
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    fallback: false,
    totalLeads: count || 0
  });
}
