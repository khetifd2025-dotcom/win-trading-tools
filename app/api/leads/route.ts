import { NextResponse } from "next/server";
import { createSupabaseServiceRoleClient } from "@/lib/supabase-server";

type LeadPayload = {
  name?: string;
  email?: string;
  tradingLevel?: string;
  mainMarket?: string;
  trading_level?: string;
  main_market?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendLeadEmail(payload: Required<Pick<LeadPayload, "name" | "email">> & LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "WIN Trading Tools <onboarding@resend.dev>",
        to: payload.email,
        subject: "Your WIN Trading Checklist",
        html: `<p>Hi ${payload.name},</p><p>Your checklist request was received. The downloadable checklist delivery can be connected here.</p>`
      })
    });
  } catch {
    // Email should not block lead capture.
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const name = body.name?.trim() || "";
    const email = body.email?.trim().toLowerCase() || "";
    const tradingLevel = (body.tradingLevel || body.trading_level || "").trim() || null;
    const mainMarket = (body.mainMarket || body.main_market || "").trim() || null;

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Email format is invalid." },
        { status: 400 }
      );
    }

    const payload = {
      name,
      email,
      trading_level: tradingLevel,
      main_market: mainMarket,
      created_at: new Date().toISOString()
    };

    const supabase = createSupabaseServiceRoleClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    if (supabase) {
      const { error } = await supabase.from("leads").insert(payload);
      if (error) {
        return NextResponse.json(
          {
            ok: false,
            message: `Lead could not be saved: ${error.message}`
          },
          { status: 500 }
        );
      }
      await sendLeadEmail({ name, email, tradingLevel: tradingLevel || undefined, mainMarket: mainMarket || undefined });
      return NextResponse.json({
        ok: true,
        saved: true,
        message: "Checklist request saved. Check your inbox soon."
      });
    }

    await sendLeadEmail({ name, email, tradingLevel: tradingLevel || undefined, mainMarket: mainMarket || undefined });
    return NextResponse.json({
      ok: true,
      fallback: true,
      message: "Checklist request received. Supabase is not configured yet, so this used the safe development fallback."
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }
}
