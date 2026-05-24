import { NextResponse } from "next/server";
import { buildFreeModeAnswer } from "@/lib/free-ai-assistant";

export const runtime = "nodejs";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4.1-mini";
const OPENAI_MODE = "openai";
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

type OpenAiErrorResponse = {
  error?: {
    message?: string;
    type?: string;
    code?: string;
    param?: string;
  };
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

async function readOpenAiError(response: Response) {
  try {
    const payload = (await response.json()) as OpenAiErrorResponse;
    return payload.error;
  } catch {
    return undefined;
  }
}

function mapOpenAiError(status: number, error?: OpenAiErrorResponse["error"]) {
  const code = error?.code || error?.type || "unknown_error";

  if (status === 400) {
    return {
      message:
        "AI request was rejected by OpenAI. Check OPENAI_MODEL and try a shorter prompt or smaller image.",
      code
    };
  }

  if (status === 401) {
    return {
      message: "AI authentication failed. Check OPENAI_API_KEY on the server.",
      code
    };
  }

  if (status === 403) {
    return {
      message:
        "AI key does not have access to this model or project. Check OpenAI project permissions and model access.",
      code
    };
  }

  if (status === 429) {
    return {
      message:
        "OpenAI rate limit or quota was reached. Check billing, credits, and usage limits in your OpenAI account.",
      code
    };
  }

  return {
    message: "AI service is unavailable right now. Try again later.",
    code
  };
}

function buildOpenAiContent(message: string, imageDataUrl: string) {
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

  return content;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as AiRequestBody;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const imageDataUrl = typeof body.imageDataUrl === "string" ? body.imageDataUrl.trim() : "";
    const hasImage = Boolean(imageDataUrl);

    if (!message && !hasImage) {
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

    const aiMode = process.env.AI_MODE?.trim().toLowerCase() || "free";
    if (aiMode !== OPENAI_MODE) {
      return NextResponse.json({
        ok: true,
        freeMode: true,
        mode: "free",
        answer: buildFreeModeAnswer(message, hasImage)
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        ok: true,
        freeMode: true,
        mode: "free",
        answer: buildFreeModeAnswer(message, hasImage)
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
            content: buildOpenAiContent(message, imageDataUrl)
          }
        ],
        max_output_tokens: 900
      })
    });

    if (!aiResponse.ok) {
      const openAiError = await readOpenAiError(aiResponse);
      const mappedError = mapOpenAiError(aiResponse.status, openAiError);

      console.error("OpenAI API error:", {
        status: aiResponse.status,
        code: mappedError.code,
        message: openAiError?.message
      });

      return NextResponse.json({
        ok: true,
        freeMode: true,
        mode: "free",
        providerStatus: aiResponse.status,
        providerCode: mappedError.code,
        providerMessage: mappedError.message,
        answer: buildFreeModeAnswer(message, hasImage)
      });
    }

    const payload = (await aiResponse.json()) as OpenAiResponse;
    const answer = extractOutputText(payload);

    if (!answer) {
      return NextResponse.json(
        { ok: false, error: "AI returned an empty response. Try a clearer prompt." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, mode: "openai", answer });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { ok: false, error: "AI chat is not available right now." },
      { status: 500 }
    );
  }
}
