import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      productSlug?: unknown;
      slug?: unknown;
    };
    const productSlug =
      typeof body.productSlug === "string"
        ? body.productSlug
        : typeof body.slug === "string"
          ? body.slug
          : "";

    if (!productSlug.trim()) {
      return NextResponse.json(
        { ok: false, error: "Product slug is required." },
        { status: 400 }
      );
    }

    const session = await createCheckoutSession(productSlug.trim());
    if (!session.ok) {
      if (session.error === "Checkout is not configured yet.") {
        return NextResponse.json(
          { error: "Checkout is not configured yet." },
          { status: session.status || 503 }
        );
      }

      return NextResponse.json(session, { status: session.status || 400 });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { ok: false, error: "Checkout is not available right now." },
      { status: 500 }
    );
  }
}
