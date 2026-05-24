import { NextResponse } from "next/server";
import { formatTradingKnowledge, getTradingKnowledgeMatches } from "@/lib/trading-knowledge";

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

function fallbackAnswer(hasImage: boolean) {
  return buildFreeModeAnswer("", hasImage);
}

function prefersThai(message: string) {
  return /[\u0E00-\u0E7F]/.test(message);
}

function containsAny(message: string, keywords: string[]) {
  const normalized = message.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword));
}

function buildFreeModeAnswer(message: string, hasImage: boolean) {
  const thai = prefersThai(message);
  const normalized = message.toLowerCase();
  const knowledgeMatches = getTradingKnowledgeMatches(message);
  const knowledgeContext = formatTradingKnowledge(knowledgeMatches, thai);
  const knowledgeIntro = thai
    ? "ผมใช้ Free mode จากฐานความรู้ WIN Trade AI ที่ดึงมาจากโฟลเดอร์ ok leo ในโปรเจกต์เดิม โดยไม่ใช้ API credit."
    : "I am using Free mode with the bundled WIN Trade AI knowledge base extracted from the ok leo project, without using API credit.";

  if (hasImage) {
    return thai
      ? [
          knowledgeIntro,
          "ผมรับรูปได้แล้ว แต่โหมดฟรียังไม่วิเคราะห์ภาพจริงแบบ vision model.",
          "ให้ใช้รูปเป็น checklist แบบ manual: ดูแนวโน้ม HTF, จุด liquidity, โซน supply/demand, session, ข่าวแรง, stop loss, และ risk reward ก่อนตัดสินใจ.",
          knowledgeContext,
          "ถ้าต้องการวิเคราะห์ภาพจริง ต้องเปิด AI provider แบบมี API/credit ภายหลัง.",
          "การเทรดมีความเสี่ยง คำตอบนี้เพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางการเงิน."
        ].join("\n\n")
      : [
          knowledgeIntro,
          "I received the image, but free mode does not perform real image/vision analysis.",
          "Use the screenshot as a manual checklist: higher-timeframe bias, liquidity, supply/demand, session timing, news risk, stop loss location, and risk reward.",
          knowledgeContext,
          "Real image analysis can be enabled later with an AI provider API.",
          "Trading involves risk. This is educational only and is not financial advice."
        ].join("\n\n");
  }

  if (containsAny(normalized, ["gold", "xauusd", "ทอง", "ขึ้น", "ลง", "up", "down"])) {
    return thai
      ? [
          knowledgeIntro,
          "ผมบอกไม่ได้ว่าทองจะขึ้นหรือลงแบบ live เพราะโหมดฟรีไม่มีราคาตลาดสดและไม่ใช่สัญญาณเทรด.",
          "วิธีเช็กแบบปลอดภัยกว่า:",
          "1. ดู XAUUSD อยู่ session ไหน เช่น London/New York มักมี volatility สูงกว่า Asia",
          "2. เช็กข่าว USD เช่น CPI, NFP, FOMC, rate decision",
          "3. ดู HTF bias ก่อน แล้วค่อยดู liquidity sweep, BOS/CHoCH, หรือ breakout confirmation",
          "4. วัด stop loss และ RR ก่อนเข้า ถ้า RR ต่ำหรือ stop แคบช่วงข่าว ควรรอ",
          knowledgeContext,
          "ใช้ Trading Session Converter, News Risk Checklist, Risk Reward Calculator และ Lot Size Calculator บนเว็บช่วยวางแผน.",
          "การเทรดมีความเสี่ยง คำตอบนี้เพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำให้ซื้อหรือขาย."
        ].join("\n\n")
      : [
          knowledgeIntro,
          "I cannot tell whether gold is going up or down live because free mode has no real-time market data and this is not a trade signal.",
          "A safer planning checklist:",
          "1. Check the active session. London/New York often bring more XAUUSD volatility than Asia.",
          "2. Check USD news such as CPI, NFP, FOMC, and rate decisions.",
          "3. Start with higher-timeframe bias, then look for liquidity sweep, BOS/CHoCH, or breakout confirmation.",
          "4. Measure stop loss and RR before entry. If RR is weak or the stop is tight around news, waiting may be better.",
          knowledgeContext,
          "Use the Trading Session Converter, News Risk Checklist, Risk Reward Calculator, and Lot Size Calculator on this site.",
          "Trading involves risk. This is educational only and is not financial advice."
        ].join("\n\n");
  }

  if (containsAny(normalized, ["lot", "position", "size", "risk percent", "risk %", "position sizing", "ล็อต", "ขนาด", "เสี่ยง"])) {
    return thai
      ? [
          knowledgeIntro,
          "สำหรับ lot size ให้เริ่มจากความเสี่ยงก่อน ไม่ใช่จากความมั่นใจ.",
          "สูตรพื้นฐาน: risk amount = account balance x risk percent / 100 แล้ว lot size = risk amount / (stop loss points x point value).",
          "ตัวอย่าง: บัญชี $1,000 เสี่ยง 1% = $10 ถ้า stop 100 points และ point value = $1 ต่อ 1 lot ขนาดประมาณ 0.10 lot.",
          knowledgeContext,
          "ถ้า risk ต่อไม้เกิน 3% ควรระวัง เพราะ drawdown จะเร็วขึ้นมาก.",
          "การเทรดมีความเสี่ยง คำตอบนี้เพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางการเงิน."
        ].join("\n\n")
      : [
          knowledgeIntro,
          "For lot size, start from planned risk, not confidence.",
          "Basic formula: risk amount = account balance x risk percent / 100. Then lot size = risk amount / (stop loss points x point value).",
          "Example: $1,000 balance, 1% risk = $10. If stop loss is 100 points and point value is $1 per 1 lot, estimated size is 0.10 lot.",
          knowledgeContext,
          "Be careful when risk per trade is above 3%, because drawdown can grow quickly.",
          "Trading involves risk. This is educational only and is not financial advice."
        ].join("\n\n");
  }

  if (containsAny(normalized, ["rr", "risk reward", "reward", "take profit", "stop loss", "เป้ากำไร", "สต็อป"])) {
    return thai
      ? [
          knowledgeIntro,
          "Risk reward ใช้วัดว่ากำไรเป้าหมายคุ้มกับความเสี่ยงไหม.",
          "สูตร: RR = reward distance / risk distance.",
          "ตัวอย่าง: entry 2350, stop 2348, target 2355 ความเสี่ยง = 2.00 reward = 5.00 ดังนั้น RR = 2.5.",
          knowledgeContext,
          "RR สูงไม่ได้แปลว่าจะชนะ แต่ช่วยกรอง setup ที่ reward ไม่คุ้ม risk.",
          "ใช้ Risk Reward Calculator ก่อนเข้าเทรด และอย่าขยับ target แค่เพื่อทำให้ RR ดูดีขึ้น."
        ].join("\n\n")
      : [
          knowledgeIntro,
          "Risk reward measures whether the planned target is worth the planned risk.",
          "Formula: RR = reward distance / risk distance.",
          "Example: entry 2350, stop 2348, target 2355. Risk = 2.00, reward = 5.00, so RR = 2.5.",
          knowledgeContext,
          "A high RR does not guarantee a win, but it helps filter setups where reward does not justify risk.",
          "Use the Risk Reward Calculator before entry and avoid moving targets just to make RR look better."
        ].join("\n\n");
  }

  if (containsAny(normalized, ["session", "london", "new york", "asia", "เวลา", "ตลาด"])) {
    return thai
      ? [
          knowledgeIntro,
          "Session timing ช่วยดูว่า market มี participation พอไหม.",
          "Asia: มักนิ่งกว่า เหมาะกับบางคู่ JPY/AUD แต่ XAUUSD อาจช้าถ้าไม่มีข่าว.",
          "London: EURUSD, GBPUSD และ XAUUSD มักเริ่มมีแรง.",
          "New York: XAUUSD มักผันผวนมาก โดยเฉพาะช่วงข่าว USD.",
          knowledgeContext,
          "อย่าเข้าเทรดเพราะ session อย่างเดียว ต้องเช็กข่าว, spread, structure และ risk reward ด้วย."
        ].join("\n\n")
      : [
          knowledgeIntro,
          "Session timing helps you judge whether a market has enough participation.",
          "Asia is often quieter. London can bring stronger EURUSD, GBPUSD, and XAUUSD movement. New York often brings higher XAUUSD volatility, especially around USD news.",
          knowledgeContext,
          "Do not trade from session timing alone. Check news, spread, structure, and risk reward first."
        ].join("\n\n");
  }

  if (containsAny(normalized, ["smc", "liquidity", "bos", "choch", "order block", "fvg", "premium", "discount"])) {
    return thai
      ? [
          knowledgeIntro,
          "สำหรับ SMC ให้คิดเป็น checklist ไม่ใช่ label สวย ๆ บนกราฟ.",
          "เช็กตามลำดับ: HTF bias ชัดไหม, liquidity ถูก sweep ไหม, มี BOS/CHoCH ด้วย body close ไหม, POI เช่น OB/FVG อยู่ตรง premium/discount ที่เหมาะไหม, invalidation ชัดไหม, RR อย่างน้อยพอรับได้ไหม.",
          knowledgeContext,
          "A+ setup ไม่ได้แปลว่าชนะ มันแปลว่าเงื่อนไขสะอาดกว่า.",
          "การเทรดมีความเสี่ยงและต้องตัดสินใจเอง."
        ].join("\n\n")
      : [
          knowledgeIntro,
          "For SMC, think in checklists, not pretty labels.",
          "Check: clear HTF bias, liquidity sweep, BOS/CHoCH with body close, POI such as OB/FVG, premium or discount context, clear invalidation, and acceptable RR.",
          knowledgeContext,
          "An A+ setup does not mean a guaranteed win. It only means the conditions are cleaner.",
          "Trading involves risk and you are responsible for your decisions."
        ].join("\n\n");
  }

  if (containsAny(normalized, ["breakout", "fakeout", "fake breakout", "ทะลุ", "เบรก"])) {
    return thai
      ? [
          knowledgeIntro,
          "Breakout ที่น่าเช็กควรมีมากกว่าแค่ wick ทะลุระดับ.",
          "Checklist: มี liquidity sweep ก่อนหน้าไหม, candle ปิด body เกิน level ไหม, มี displacement ไหม, retest ถือ level ได้ไหม, HTF bias สนับสนุนไหม, session มี volatility ไหม, RR อย่างน้อย 1:2 ไหม.",
          knowledgeContext,
          "ถ้าขาดหลายข้อ ให้รอ confirmation ดีกว่าไล่ราคา.",
          "ไม่มี checklist ไหนการันตีผลลัพธ์ได้."
        ].join("\n\n")
      : [
          knowledgeIntro,
          "A breakout needs more than a wick through a level.",
          "Checklist: prior liquidity sweep, body close beyond the level, displacement, retest holding the level, HTF bias support, session volatility, and at least acceptable RR.",
          knowledgeContext,
          "If several items are missing, waiting for confirmation is usually cleaner than chasing price.",
          "No checklist can guarantee an outcome."
        ].join("\n\n");
  }

  if (containsAny(normalized, ["journal", "winrate", "expectancy", "profit factor", "บันทึก", "จิตวิทยา"])) {
    return thai
      ? [
          knowledgeIntro,
          "Journal ที่ดีควรวัด process ไม่ใช่แค่กำไรขาดทุน.",
          "ติดตาม: setup type, session, risk per trade, RR, win/loss, average win, average loss, fees, mistake tag, emotion tag, และ screenshot.",
          knowledgeContext,
          "Winrate อย่างเดียวไม่พอ ต้องดู average win/loss, profit factor และ expectancy ด้วย.",
          "ถ้าแพ้ติดกัน ให้หยุดตาม daily loss limit ก่อน แล้วค่อย review."
        ].join("\n\n")
      : [
          knowledgeIntro,
          "A good journal tracks process, not only P/L.",
          "Track setup type, session, risk per trade, RR, win/loss, average win, average loss, fees, mistake tag, emotion tag, and screenshot.",
          knowledgeContext,
          "Winrate alone is not enough. Review average win/loss, profit factor, and expectancy.",
          "After repeated losses, follow your daily loss limit first, then review."
        ].join("\n\n");
  }

  if (containsAny(normalized, ["news", "cpi", "fomc", "nfp", "rate", "ข่าว"])) {
    return thai
      ? [
          knowledgeIntro,
          "ข่าวแรงทำให้ spread, slippage และ volatility เปลี่ยนเร็ว โดยเฉพาะ XAUUSD.",
          "เช็กก่อนเข้า: วันนี้มี USD high impact news ไหม, spread กว้างผิดปกติไหม, ราคาอยู่ใกล้ liquidity ใหญ่ไหม, setup ใช้ stop แคบเกินไปไหม.",
          knowledgeContext,
          "ถ้า news risk สูง ให้ลด risk หรือรอหลังข่าวนิ่ง.",
          "นี่เป็นการวางแผนความเสี่ยง ไม่ใช่สัญญาณซื้อขาย."
        ].join("\n\n")
      : [
          knowledgeIntro,
          "High-impact news can change spread, slippage, and volatility quickly, especially on XAUUSD.",
          "Before entry, check USD high-impact news, abnormal spread, major liquidity nearby, and whether the setup depends on a tight stop.",
          knowledgeContext,
          "If news risk is high, consider reducing risk or waiting until conditions stabilize.",
          "This is risk planning, not a buy or sell signal."
        ].join("\n\n");
  }

  return thai
    ? [
        knowledgeIntro,
        "ผมช่วยวางแผนการเทรดแบบ educational ได้ โดยไม่ใช้ API credit.",
        "คุณสามารถถามเรื่อง lot size, risk reward, XAUUSD, session, SMC, breakout, news risk, daily loss limit หรือ journal review.",
        knowledgeContext,
        "ถ้าต้องการคำตอบแม่นขึ้น ให้ใส่ข้อมูลเพิ่ม เช่น market, entry, stop loss, take profit, session, account balance และ risk percent.",
        "ผมจะไม่ให้สัญญาณ buy/sell หรือการันตีกำไร เพราะการเทรดมีความเสี่ยงและไม่ใช่คำแนะนำทางการเงิน."
      ].join("\n\n")
    : [
        knowledgeIntro,
        "I can help with educational trading planning without using API credit.",
        "Ask about lot size, risk reward, XAUUSD, sessions, SMC, breakouts, news risk, daily loss limits, or journal review.",
        knowledgeContext,
        "For a better answer, include market, entry, stop loss, take profit, session, account balance, and risk percent.",
        "I will not provide buy/sell signals or guaranteed outcomes. Trading involves risk and this is not financial advice."
      ].join("\n\n");
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
      clientStatus: 502,
      message:
        "AI request was rejected by OpenAI. Check OPENAI_MODEL and try a shorter prompt or smaller image.",
      code
    };
  }

  if (status === 401) {
    return {
      clientStatus: 500,
      message: "AI authentication failed. Check OPENAI_API_KEY on the server.",
      code
    };
  }

  if (status === 403) {
    return {
      clientStatus: 500,
      message:
        "AI key does not have access to this model or project. Check OpenAI project permissions and model access.",
      code
    };
  }

  if (status === 429) {
    return {
      clientStatus: 502,
      message:
        "OpenAI rate limit or quota was reached. Check billing, credits, and usage limits in your OpenAI account.",
      code
    };
  }

  return {
    clientStatus: 502,
    message: "AI service is unavailable right now. Try again later.",
    code
  };
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

    const aiMode = process.env.AI_MODE?.trim().toLowerCase() || "free";
    if (aiMode !== OPENAI_MODE) {
      return NextResponse.json({
        ok: true,
        freeMode: true,
        mode: "free",
        answer: buildFreeModeAnswer(message, Boolean(imageDataUrl))
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        ok: true,
        freeMode: true,
        mode: "free",
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
        answer: buildFreeModeAnswer(message, Boolean(imageDataUrl))
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
