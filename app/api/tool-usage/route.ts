import { NextResponse } from "next/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { toolName?: string };
    const toolName = body.toolName?.trim();

    if (!toolName) {
      return NextResponse.json(
        { ok: false, message: "Tool name is required." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServiceRoleClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    if (supabase) {
      await supabase.from("tool_usage").insert({ tool_name: toolName });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true, fallback: true });
  }
}
