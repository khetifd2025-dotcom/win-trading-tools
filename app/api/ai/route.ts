import { NextResponse } from "next/server";

export const runtime = "nodejs";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4.1-mini";
const MAX_MESSAGE_LENGTH = 4000;
const MAX_IMAGE_DATA_URL_LENGTH = 6_500_000;

type AiRequestBody = {
  message?: unknown;
  imageDataUrl?: unknown;
};

type OpenAiResponse = {
  output_text?: unknown;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

function isValidImageDataUrl(value: string) {
  return /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(value);
}

function extractOutputText(payload: OpenAiResponse) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  return (
    payload.output
      ?.flatMap((item) => item.content || [])
      .map((content) => content.text)
      .filter((text): text is string => Boolean(text?.trim()))
      .join("\n\n")
      .trim() || ""
  );
}

function fallbackAnswer(hasImage: boolean) {
  return [
    "AI chat is not configured yet.",
    "Add OPENAI_API_KEY to your server environment to enable live text and image analysis.",
    hasImage
      ? "The image upload UI is ready, but image analysis needs the API key before it can run."
      : "You can still use the free calculators and checklists while AI is offline.",
    "Trading involves risk. AI responses are educational only and are not financial advice."
  ].join(" ");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as AiRequestBody;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const imageDataUrl = typeof body.imageDataUrl === "string" ? body.imageDataUrl.trim() : "";

    if (!message && !imageDataUrl) {
      return NextResponse.json(
        { ok: false, error: "Enter a message or upload an image first." },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { ok: false, error: "Message is too long. Keep it under 4,000 characters." },
        { status: 400 }
      );
    }

    if (imageDataUrl) {
      if (imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
        return NextResponse.json(
          { ok: false, error: "Image is too large. Upload a smaller PNG, JPG, WEBP, or GIF." },
          { status: 400 }
        );
      }

      if (!isValidImageDataUrl(imageDataUrl)) {
        return NextResponse.json(
          { ok: false, error: "Unsupported image format. Use PNG, JPG, WEBP, or GIF." },
          { status: 400 }
        );
      }
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        ok: true,
        fallback: true,
        answer: fallbackAnswer(Boolean(imageDataUrl))
      });
    }

    const content: Array<
      | { type: "input_text"; text: string }
      | { type: "input_image"; image_url: string; detail: "auto" }
    > = [
      {
        type: "input_text",
        text:
          message ||
          "Analyze the attached image and explain what is visible in a practical, educational way."
      }
    ];

    if (imageDataUrl) {
      content.push({
        type: "input_image",
        image_url: imageDataUrl,
        detail: "auto"
      });
    }

    const aiResponse = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
        instructions:
          "You are the WIN Trading Tools AI assistant. Help users understand forex, XAUUSD/gold, risk management, trading journals, sessions, and chart screenshots for educational planning only. If an image is provided, describe visible chart structure, text, price action context, risk planning questions, and checklist-style observations. Do not provide guaranteed outcomes, fixed winrates, income claims, or personalized financial advice. Do not tell the user exactly what to buy or sell. Encourage position sizing, daily loss limits, risk reward checks, and independent decision-making. Answer in the user's language when clear.",
        input: [
          {
            role: "user",
            content
          }
        ],
        max_output_tokens: 900
      })
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      const error =
        status === 401
          ? "AI authentication failed. Check OPENAI_API_KEY on the server."
          : "AI service is unavailable right now. Try again later.";

      return NextResponse.json({ ok: false, error }, { status: status === 401 ? 500 : 502 });
    }

    const payload = (await aiResponse.json()) as OpenAiResponse;
    const answer = extractOutputText(payload);

    if (!answer) {
      return NextResponse.json(
        { ok: false, error: "AI returned an empty response. Try a clearer prompt." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, answer });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { ok: false, error: "AI chat is not available right now." },
      { status: 500 }
    );
  }
}
