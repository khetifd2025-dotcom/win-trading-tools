import { formatTradingKnowledge, getTradingKnowledgeMatches } from "@/lib/trading-knowledge";

type Confidence = "low" | "medium" | "high";

type IntentId =
  | "chart_image_review"
  | "market_direction"
  | "breakout_validation"
  | "smc_checklist"
  | "risk_position"
  | "risk_reward"
  | "session_timing"
  | "news_risk"
  | "journal_review"
  | "advanced_model_review"
  | "general_planning";

type IntentProfile = {
  id: IntentId;
  label: string;
  labelTh: string;
  confidence: Confidence;
  quickTake: string;
  quickTakeTh: string;
  reasoning: string[];
  reasoningTh: string[];
  missingInfo: string[];
  missingInfoTh: string[];
  checklist: string[];
  checklistTh: string[];
  tools: string[];
};

type MessageContext = {
  market: string;
  timeframe: string;
  direction: string;
  numbers: string[];
  hasImage: boolean;
};

const BASE_RISK_WARNING =
  "Trading involves risk. This content is for educational purposes only and is not financial advice. Always manage your own risk.";

const BASE_RISK_WARNING_TH =
  "การเทรดมีความเสี่ยง คำตอบนี้มีไว้เพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางการเงิน และคุณต้องตัดสินใจบริหารความเสี่ยงด้วยตัวเอง";

function prefersThai(message: string) {
  return /[\u0E00-\u0E7F]/.test(message);
}

function normalize(message: string) {
  return message.toLowerCase();
}

function hasAny(normalized: string, keywords: string[]) {
  return keywords.some((keyword) => normalized.includes(keyword));
}

function score(normalized: string, keywords: string[]) {
  return keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? 1 : 0), 0);
}

function confidenceFromScore(value: number): Confidence {
  if (value >= 3) return "high";
  if (value >= 1) return "medium";
  return "low";
}

function confidenceLabel(confidence: Confidence, thai: boolean) {
  if (thai) {
    if (confidence === "high") return "สูง";
    if (confidence === "medium") return "กลาง";
    return "ต่ำ";
  }

  return confidence;
}

function extractContext(message: string, hasImage: boolean): MessageContext {
  const normalized = normalize(message);
  const numbers = Array.from(message.matchAll(/\b\d+(?:\.\d+)?\b/g))
    .map((match) => match[0])
    .slice(0, 8);

  let market = "not specified";
  if (hasAny(normalized, ["xauusd", "gold", "ทอง"])) market = "XAUUSD / Gold";
  else if (hasAny(normalized, ["eurusd"])) market = "EURUSD";
  else if (hasAny(normalized, ["gbpusd"])) market = "GBPUSD";
  else if (hasAny(normalized, ["usdjpy"])) market = "USDJPY";
  else if (hasAny(normalized, ["nas100", "nasdaq"])) market = "NAS100";
  else if (hasAny(normalized, ["btc", "bitcoin", "crypto"])) market = "Crypto";

  const timeframeMatch = message.match(/\b(M1|M5|M15|M30|H1|H4|D1|W1)\b/i);
  const timeframe = timeframeMatch ? timeframeMatch[1].toUpperCase() : "not specified";

  const directionWords: string[] = [];
  if (hasAny(normalized, ["buy", "long", "ขึ้น", "ซื้อ", "ไปบน", "ขาขึ้น"])) {
    directionWords.push("buy/up");
  }
  if (hasAny(normalized, ["sell", "short", "ลง", "ขาย", "ไปล่าง", "ขาลง"])) {
    directionWords.push("sell/down");
  }

  return {
    market,
    timeframe,
    direction: directionWords.length ? directionWords.join(" + ") : "not specified",
    numbers,
    hasImage
  };
}

function getIntentProfile(id: IntentId, confidence: Confidence): IntentProfile {
  const shared = {
    confidence,
    tools: ["Lot Size Calculator", "Risk Reward Calculator", "Daily Loss Limit Calculator"]
  };

  const profiles: Record<IntentId, IntentProfile> = {
    chart_image_review: {
      ...shared,
      id,
      label: "chart screenshot review",
      labelTh: "รีวิวภาพกราฟ/โครงสร้างจากรูป",
      quickTake:
        "Free mode can react to your text and give a chart review checklist, but it cannot inspect image pixels like a paid vision model.",
      quickTakeTh:
        "Free mode ตอบจากข้อความและ checklist ได้ แต่ยังไม่อ่าน pixel ในรูปเหมือน vision model แบบเสีย credit",
      reasoning: [
        "Use the screenshot as evidence to describe trend, liquidity, session, and risk.",
        "If you add the pair, timeframe, entry idea, SL, and TP, the answer becomes much more specific.",
        "A chart review should end with a risk decision, not a prediction."
      ],
      reasoningTh: [
        "ให้ใช้รูปเป็นหลักฐาน แล้วพิมพ์เพิ่มว่าเทรนด์, liquidity, session และ risk อยู่ตรงไหน",
        "ถ้าใส่คู่เงิน, timeframe, ไอเดียเข้า, SL และ TP คำตอบจะเจาะจงขึ้นมาก",
        "การรีวิวกราฟควรจบที่แผนความเสี่ยง ไม่ใช่การเดาทิศทาง"
      ],
      missingInfo: ["symbol", "timeframe", "key level", "entry idea", "stop loss", "take profit"],
      missingInfoTh: ["คู่เงิน", "timeframe", "ระดับสำคัญ", "ไอเดียเข้า", "stop loss", "take profit"],
      checklist: [
        "Mark higher-timeframe bias.",
        "Find the nearest liquidity above and below price.",
        "Check whether price is breaking, sweeping, or ranging.",
        "Validate SL and RR before any entry."
      ],
      checklistTh: [
        "มาร์ก bias จาก timeframe ใหญ่ก่อน",
        "หา liquidity ใกล้ราคาทั้งด้านบนและด้านล่าง",
        "เช็กว่าราคากำลัง breakout, sweep หรือ sideway",
        "ตรวจ SL และ RR ก่อนคิดเรื่องเข้าเทรด"
      ],
      tools: ["SMC Entry Checklist", "Breakout True or Fake Checklist", "Risk Reward Calculator"]
    },
    market_direction: {
      ...shared,
      id,
      label: "market direction question",
      labelTh: "คำถามเรื่องทิศทางตลาด",
      quickTake:
        "I cannot safely say up or down from one sentence or without live market data. Treat this as a planning question, not a signal.",
      quickTakeTh:
        "ผมยังสรุปขึ้นหรือลงจากประโยคเดียวหรือข้อมูลไม่สดไม่ได้ ให้ใช้เป็นการวางแผน ไม่ใช่สัญญาณเข้าเทรด",
      reasoning: [
        "Direction needs structure, liquidity, session, news, and risk context.",
        "For XAUUSD, London and New York can change volatility quickly.",
        "The better question is: what would confirm buy, what would invalidate it, and where is risk controlled?"
      ],
      reasoningTh: [
        "ทิศทางต้องดู structure, liquidity, session, news และ risk context รวมกัน",
        "สำหรับ XAUUSD ช่วง London/New York สามารถเปลี่ยน volatility ได้เร็ว",
        "คำถามที่ดีกว่าคือ อะไรยืนยัน buy, อะไรทำให้แผน invalid และควบคุม risk ตรงไหน"
      ],
      missingInfo: ["current price", "timeframe", "higher-timeframe bias", "nearest liquidity", "news risk"],
      missingInfoTh: ["ราคาปัจจุบัน", "timeframe", "bias จาก TF ใหญ่", "liquidity ใกล้ราคา", "ความเสี่ยงข่าว"],
      checklist: [
        "Do not chase direction without invalidation.",
        "Check active session and USD news first.",
        "Only consider a plan after entry, SL, TP, and RR are clear.",
        "If structure is mixed, neutral is a valid answer."
      ],
      checklistTh: [
        "อย่าไล่ทิศทางถ้ายังไม่มี invalidation",
        "เช็ก session และข่าว USD ก่อน",
        "ค่อยพิจารณาแผนเมื่อ entry, SL, TP และ RR ชัด",
        "ถ้า structure ยังผสม คำตอบแบบ neutral ถือว่าถูกต้อง"
      ],
      tools: ["Trading Session Converter", "News Risk Checklist", "Risk Reward Calculator"]
    },
    breakout_validation: {
      ...shared,
      id,
      label: "breakout validation",
      labelTh: "ตรวจ breakout จริงหรือหลอก",
      quickTake:
        "A breakout is not confirmed by a wick alone. Look for body close, displacement, retest, and risk reward.",
      quickTakeTh:
        "breakout ไม่ควรยืนยันจาก wick อย่างเดียว ต้องดู body close, displacement, retest และ risk reward",
      reasoning: [
        "A true break often has body close beyond the level and follow-through.",
        "A fake break often sweeps liquidity and closes back inside the range.",
        "Retest confirmation reduces chasing, but it still does not guarantee the outcome."
      ],
      reasoningTh: [
        "true break มักมี body close เกิน level และมีแรงต่อเนื่อง",
        "fake break มัก sweep liquidity แล้วปิดกลับเข้ากรอบ",
        "การรอ retest ลดการไล่ราคา แต่ไม่ได้การันตีผลลัพธ์"
      ],
      missingInfo: ["level being broken", "candle close", "session", "volume or displacement", "RR"],
      missingInfoTh: ["level ที่ถูกเบรก", "แท่งปิด", "session", "volume หรือ displacement", "RR"],
      checklist: [
        "Confirm body close beyond the level.",
        "Check displacement after the break.",
        "Wait for retest if the first move is extended.",
        "Avoid breakouts into major supply or demand."
      ],
      checklistTh: [
        "ยืนยันว่าแท่งปิด body เกิน level จริง",
        "ดู displacement หลังเบรก",
        "ถ้าราคาไปไกลแล้วให้รอ retest",
        "หลีกเลี่ยง breakout ที่วิ่งชน supply/demand ใหญ่ทันที"
      ],
      tools: ["Breakout True or Fake Checklist", "Risk Reward Calculator", "Trading Session Converter"]
    },
    smc_checklist: {
      ...shared,
      id,
      label: "SMC checklist review",
      labelTh: "รีวิว SMC checklist",
      quickTake:
        "SMC is strongest when bias, liquidity sweep, BOS/CHoCH, POI, invalidation, and RR line up.",
      quickTakeTh:
        "SMC จะแข็งแรงขึ้นเมื่อ bias, liquidity sweep, BOS/CHoCH, POI, invalidation และ RR ไปทางเดียวกัน",
      reasoning: [
        "Do not mark every candle as an order block.",
        "Liquidity sweep without displacement is usually not enough.",
        "A+ means cleaner conditions, not a guaranteed win."
      ],
      reasoningTh: [
        "อย่ามาร์กทุกแท่งเป็น order block",
        "liquidity sweep ที่ไม่มี displacement มักยังไม่พอ",
        "A+ หมายถึงเงื่อนไขสะอาดขึ้น ไม่ใช่ชนะการันตี"
      ],
      missingInfo: ["HTF bias", "liquidity sweep", "BOS/CHoCH", "OB or FVG", "invalidation", "RR"],
      missingInfoTh: ["HTF bias", "liquidity sweep", "BOS/CHoCH", "OB หรือ FVG", "invalidation", "RR"],
      checklist: [
        "Start from higher-timeframe bias.",
        "Confirm sweep and displacement.",
        "Use OB/FVG only when invalidation is clear.",
        "Avoid entries in the wrong premium/discount context."
      ],
      checklistTh: [
        "เริ่มจาก bias ของ timeframe ใหญ่",
        "ยืนยัน sweep และ displacement",
        "ใช้ OB/FVG เมื่อ invalidation ชัดเท่านั้น",
        "หลีกเลี่ยง entry ที่ผิด premium/discount context"
      ],
      tools: ["SMC Entry Checklist", "Risk Reward Calculator", "Lot Size Calculator"]
    },
    risk_position: {
      ...shared,
      id,
      label: "position sizing and risk",
      labelTh: "คำนวณความเสี่ยงและขนาด lot",
      quickTake:
        "Position size should start from risk amount and stop distance, not from confidence or the desire to recover losses.",
      quickTakeTh:
        "ขนาด lot ควรเริ่มจากจำนวนเงินที่ยอมเสี่ยงและระยะ stop ไม่ใช่ความมั่นใจหรือการอยากเอาคืน",
      reasoning: [
        "Risk amount = balance x risk percent / 100.",
        "Lot size depends on stop distance and point value.",
        "Risk above 3% per trade can make drawdown grow quickly."
      ],
      reasoningTh: [
        "risk amount = balance x risk percent / 100",
        "lot size ขึ้นกับระยะ stop และ point value",
        "การเสี่ยงเกิน 3% ต่อไม้ทำให้ drawdown โตเร็วมาก"
      ],
      missingInfo: ["account balance", "risk percent", "stop loss distance", "point value", "broker contract size"],
      missingInfoTh: ["balance", "risk percent", "ระยะ stop loss", "point value", "contract size ของ broker"],
      checklist: [
        "Choose risk percent before looking at lot size.",
        "Measure stop distance from structure, not emotion.",
        "Check broker point value and minimum lot step.",
        "Stop trading when the daily loss limit is reached."
      ],
      checklistTh: [
        "เลือก risk percent ก่อนดู lot size",
        "วัด stop จาก structure ไม่ใช่อารมณ์",
        "เช็ก point value และ lot step ของ broker",
        "หยุดเทรดเมื่อถึง daily loss limit"
      ],
      tools: ["Lot Size Calculator", "Position Size Calculator", "Daily Loss Limit Calculator"]
    },
    risk_reward: {
      ...shared,
      id,
      label: "risk reward review",
      labelTh: "รีวิว risk reward",
      quickTake:
        "Risk reward measures whether the target is worth the stop distance. It does not predict whether the trade will win.",
      quickTakeTh:
        "risk reward ใช้วัดว่า target คุ้มกับระยะ stop ไหม ไม่ได้ทำนายว่าไม้จะชนะ",
      reasoning: [
        "RR = reward distance / risk distance.",
        "Moving TP just to make RR look better is a common mistake.",
        "If SL is placed where normal noise can hit it, the plan may be fragile."
      ],
      reasoningTh: [
        "RR = reward distance / risk distance",
        "การเลื่อน TP ให้ตัวเลข RR ดูดีเป็นข้อผิดพลาดที่พบบ่อย",
        "ถ้า SL อยู่ตรง noise ปกติแตะง่าย แผนอาจเปราะ"
      ],
      missingInfo: ["direction", "entry", "stop loss", "take profit"],
      missingInfoTh: ["direction", "entry", "stop loss", "take profit"],
      checklist: [
        "Validate SL is on the correct side of entry.",
        "Measure risk and reward before entry.",
        "Reject setups where RR is weak and structure is unclear.",
        "Keep risk fixed even if the idea feels strong."
      ],
      checklistTh: [
        "ตรวจว่า SL อยู่ฝั่งที่ถูกต้องของ entry",
        "วัด risk และ reward ก่อนเข้า",
        "ตัด setup ที่ RR อ่อนและ structure ไม่ชัด",
        "คุม risk ให้คงที่ แม้รู้สึกว่า setup แข็งแรง"
      ],
      tools: ["Risk Reward Calculator", "Lot Size Calculator", "SMC Entry Checklist"]
    },
    session_timing: {
      ...shared,
      id,
      label: "session timing",
      labelTh: "วิเคราะห์ช่วงเวลาเทรด",
      quickTake:
        "Session timing helps judge participation, but it should never be the only reason to enter.",
      quickTakeTh:
        "session timing ช่วยดู participation แต่ไม่ควรเป็นเหตุผลเดียวในการเข้าเทรด",
      reasoning: [
        "Asia is often quieter for XAUUSD unless news changes volatility.",
        "London and New York usually create more movement, but also more risk.",
        "News can override normal session behavior."
      ],
      reasoningTh: [
        "Asia มักเงียบกว่าสำหรับ XAUUSD ถ้าไม่มีข่าว",
        "London และ New York มักมีแรงมากกว่า แต่ความเสี่ยงก็มากขึ้น",
        "ข่าวแรงสามารถ override พฤติกรรม session ปกติได้"
      ],
      missingInfo: ["local time", "market", "session", "news calendar", "spread condition"],
      missingInfoTh: ["เวลาท้องถิ่น", "ตลาด", "session", "ปฏิทินข่าว", "สภาพ spread"],
      checklist: [
        "Check active session.",
        "Check whether volatility supports the setup.",
        "Avoid after-hours entries with weak confirmation.",
        "Combine timing with structure and risk."
      ],
      checklistTh: [
        "เช็ก session ที่กำลังเปิด",
        "ดูว่า volatility สนับสนุน setup ไหม",
        "หลีกเลี่ยง after-hours ที่ confirmation อ่อน",
        "รวม timing กับ structure และ risk"
      ],
      tools: ["Trading Session Converter", "News Risk Checklist", "Risk Reward Calculator"]
    },
    news_risk: {
      ...shared,
      id,
      label: "news risk check",
      labelTh: "ตรวจความเสี่ยงข่าว",
      quickTake:
        "High-impact news can widen spreads, create slippage, and invalidate tight stops quickly.",
      quickTakeTh:
        "ข่าวแรงทำให้ spread กว้าง, slippage สูง และทำให้ stop แคบโดนเร็วได้",
      reasoning: [
        "XAUUSD reacts strongly to USD news such as CPI, NFP, FOMC, and rate decisions.",
        "If the setup depends on a tight stop near news, risk is higher.",
        "Waiting is a valid risk decision."
      ],
      reasoningTh: [
        "XAUUSD ตอบสนองแรงกับข่าว USD เช่น CPI, NFP, FOMC และ rate decision",
        "ถ้า setup ต้องใช้ stop แคบช่วงข่าว ความเสี่ยงสูงขึ้น",
        "การรอเป็นการตัดสินใจด้าน risk ที่ถูกต้องได้"
      ],
      missingInfo: ["news event", "time until release", "spread", "stop distance", "position size"],
      missingInfoTh: ["ข่าวอะไร", "เหลือเวลากี่นาที", "spread", "ระยะ stop", "position size"],
      checklist: [
        "Check whether high-impact USD news is near.",
        "Avoid tight stops if spread is abnormal.",
        "Reduce risk or wait if volatility is unstable.",
        "Do not treat news spikes as clean confirmation."
      ],
      checklistTh: [
        "เช็กว่ามีข่าว USD high impact ใกล้หรือไม่",
        "หลีกเลี่ยง stop แคบถ้า spread ผิดปกติ",
        "ลด risk หรือรอถ้า volatility ไม่นิ่ง",
        "อย่านับ spike ข่าวเป็น confirmation ที่สะอาด"
      ],
      tools: ["News Risk Checklist", "Daily Loss Limit Calculator", "Lot Size Calculator"]
    },
    journal_review: {
      ...shared,
      id,
      label: "trade journal review",
      labelTh: "รีวิว trading journal",
      quickTake:
        "A journal should review process quality, average win/loss, expectancy, and repeat mistakes, not only winrate.",
      quickTakeTh:
        "journal ควรรีวิวคุณภาพ process, average win/loss, expectancy และ mistake ซ้ำ ไม่ใช่ดู winrate อย่างเดียว",
      reasoning: [
        "Winrate can look good while expectancy is weak.",
        "Repeated mistakes usually show up by setup type, session, or emotional tags.",
        "After the daily loss limit is hit, the next best trade is usually no trade."
      ],
      reasoningTh: [
        "winrate อาจดูดีแต่ expectancy อ่อนก็ได้",
        "mistake ซ้ำมักเห็นจาก setup type, session หรือ emotion tag",
        "หลังชน daily loss limit ไม้ที่ดีที่สุดมักคือไม่เทรดต่อ"
      ],
      missingInfo: ["trades count", "wins", "losses", "average win", "average loss", "fees"],
      missingInfoTh: ["จำนวนไม้", "จำนวนชนะ", "จำนวนแพ้", "average win", "average loss", "fees"],
      checklist: [
        "Track setup type and session.",
        "Track average win and average loss.",
        "Tag emotional mistakes.",
        "Review only after the trading day is finished."
      ],
      checklistTh: [
        "บันทึก setup type และ session",
        "บันทึก average win และ average loss",
        "ติด tag อารมณ์หรือ mistake",
        "รีวิวหลังจบวันเทรด ไม่ใช่ระหว่างกำลังหัวร้อน"
      ],
      tools: ["Trade Journal Profit Calculator", "Daily Loss Limit Calculator", "Risk Reward Calculator"]
    },
    advanced_model_review: {
      ...shared,
      id,
      label: "advanced OK Leo model review",
      labelTh: "รีวิวโมเดลวิเคราะห์ขั้นสูงจาก OK Leo",
      quickTake:
        "Advanced models such as harmonic PRZ, Elliott wave, path projection, and EA safety rules should be used as confluence, not as guaranteed entry signals.",
      quickTakeTh:
        "โมเดลขั้นสูงอย่าง harmonic PRZ, Elliott wave, path projection และกฎ EA safety ควรใช้เป็น confluence ไม่ใช่สัญญาณเข้าเทรดที่การันตีผล",
      reasoning: [
        "Pattern, wave, and projection models are maps that need structure, liquidity, session, and risk validation.",
        "A completed pattern or wave count is weaker without invalidation and RR.",
        "When model evidence conflicts, waiting is a valid decision."
      ],
      reasoningTh: [
        "pattern, wave และ projection เป็นแผนที่ ต้องยืนยันด้วย structure, liquidity, session และ risk",
        "pattern complete หรือ wave count ยังอ่อนถ้าไม่มี invalidation และ RR",
        "เมื่อหลักฐานของโมเดลขัดกัน การรอคือการตัดสินใจที่ถูกต้องได้"
      ],
      missingInfo: [
        "model type",
        "symbol",
        "timeframe stack",
        "current price",
        "key liquidity",
        "invalidation",
        "RR"
      ],
      missingInfoTh: [
        "ประเภทโมเดล",
        "symbol",
        "timeframe stack",
        "ราคาปัจจุบัน",
        "key liquidity",
        "invalidation",
        "RR"
      ],
      checklist: [
        "Confirm what the model is measuring.",
        "Check whether the model aligns with market structure.",
        "Validate liquidity target and invalidation.",
        "Reject the idea if RR or spread is poor.",
        "Keep the final decision educational and risk-based."
      ],
      checklistTh: [
        "ยืนยันก่อนว่าโมเดลกำลังวัดอะไร",
        "เช็กว่าโมเดลสอดคล้องกับ market structure ไหม",
        "ตรวจ liquidity target และ invalidation",
        "ตัดไอเดียถ้า RR หรือ spread แย่",
        "ตัดสินใจจาก risk plan ไม่ใช่ความสวยของโมเดล"
      ],
      tools: ["Risk Reward Calculator", "Lot Size Calculator", "News Risk Checklist"]
    },
    general_planning: {
      ...shared,
      id,
      label: "general trading planning",
      labelTh: "วางแผนเทรดทั่วไป",
      quickTake:
        "I can help turn your question into a structured trading checklist, but I need market, timeframe, and risk details for precision.",
      quickTakeTh:
        "ผมช่วยแปลงคำถามเป็น checklist เทรดได้ แต่ถ้าต้องการแม่นขึ้นต้องมีตลาด, timeframe และข้อมูล risk",
      reasoning: [
        "Good trading questions include what you see, what would confirm it, and where the idea is wrong.",
        "Risk planning comes before prediction.",
        "The best answer may be wait when information is incomplete."
      ],
      reasoningTh: [
        "คำถามเทรดที่ดีควรมีสิ่งที่เห็น, สิ่งที่ยืนยัน และจุดที่ทำให้ไอเดียผิด",
        "วางแผน risk มาก่อนการเดาทิศทาง",
        "ถ้าข้อมูลไม่ครบ คำตอบที่ดีที่สุดอาจเป็นรอ"
      ],
      missingInfo: ["market", "timeframe", "setup type", "entry", "SL", "TP", "risk percent"],
      missingInfoTh: ["ตลาด", "timeframe", "ประเภท setup", "entry", "SL", "TP", "risk percent"],
      checklist: [
        "Define the setup type.",
        "Find invalidation.",
        "Check RR and position size.",
        "Check session and news.",
        "Write the plan before entering."
      ],
      checklistTh: [
        "กำหนดประเภท setup",
        "หาจุด invalidation",
        "เช็ก RR และ position size",
        "เช็ก session และข่าว",
        "เขียนแผนก่อนเข้า"
      ],
      tools: ["Lot Size Calculator", "Risk Reward Calculator", "SMC Entry Checklist"]
    }
  };

  return profiles[id];
}

function detectIntent(message: string, hasImage: boolean): IntentProfile {
  const normalized = normalize(message);
  const intentScores: Array<{ id: IntentId; value: number }> = [
    {
      id: "breakout_validation",
      value: score(normalized, ["breakout", "fakeout", "fake break", "true break", "ทะลุ", "เบรก", "หลอก"])
    },
    {
      id: "smc_checklist",
      value: score(normalized, ["smc", "liquidity", "bos", "choch", "order block", "fvg", "premium", "discount"])
    },
    {
      id: "risk_position",
      value: score(normalized, ["lot", "position", "size", "risk percent", "risk %", "ล็อต", "ขนาด", "เสี่ยง"])
    },
    {
      id: "risk_reward",
      value: score(normalized, ["rr", "risk reward", "reward", "take profit", "stop loss", "tp", "sl", "เป้ากำไร", "สต็อป"])
    },
    {
      id: "session_timing",
      value: score(normalized, ["session", "london", "new york", "asia", "เวลา", "ตลาด", "ลอนดอน", "นิวยอร์ก"])
    },
    {
      id: "news_risk",
      value: score(normalized, ["news", "cpi", "fomc", "nfp", "rate", "ข่าว"])
    },
    {
      id: "journal_review",
      value: score(normalized, ["journal", "winrate", "expectancy", "profit factor", "บันทึก", "จิตวิทยา"])
    },
    {
      id: "advanced_model_review",
      value: score(normalized, [
        "harmonic",
        "prz",
        "gartley",
        "bat",
        "butterfly",
        "crab",
        "cypher",
        "elliott",
        "wave",
        "path projection",
        "projection",
        "ea",
        "expert advisor",
        "multi agent",
        "fibonacci",
        "ฮาร์โมนิก",
        "คลื่น",
        "อีเอ"
      ])
    },
    {
      id: "market_direction",
      value: score(normalized, ["gold", "xauusd", "ทอง", "ขึ้น", "ลง", "up", "down", "buy", "sell", "ซื้อ", "ขาย"])
    }
  ];

  if (hasImage && intentScores.every((item) => item.value === 0)) {
    return getIntentProfile("chart_image_review", "medium");
  }

  const best = intentScores.sort((a, b) => b.value - a.value)[0];
  if (!best || best.value === 0) {
    return getIntentProfile(hasImage ? "chart_image_review" : "general_planning", hasImage ? "medium" : "low");
  }

  return getIntentProfile(best.id, confidenceFromScore(best.value));
}

function formatList(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function formatBullets(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function contextSummary(context: MessageContext, thai: boolean) {
  const numbers = context.numbers.length ? context.numbers.join(", ") : thai ? "ไม่พบตัวเลข" : "none found";

  if (thai) {
    const timeframe = context.timeframe === "not specified" ? "ไม่ระบุ" : context.timeframe;
    const direction = context.direction === "not specified" ? "ไม่ระบุ" : context.direction;

    return [
      `ตลาดที่ตรวจพบ: ${context.market}`,
      `timeframe: ${timeframe}`,
      `คำเกี่ยวกับทิศทาง: ${direction}`,
      `ตัวเลขที่พบในข้อความ: ${numbers}`,
      `มีรูปแนบ: ${context.hasImage ? "มี" : "ไม่มี"}`
    ].join("\n");
  }

  return [
    `Detected market: ${context.market}`,
    `Timeframe: ${context.timeframe}`,
    `Direction wording: ${context.direction}`,
    `Numbers found: ${numbers}`,
    `Image attached: ${context.hasImage ? "yes" : "no"}`
  ].join("\n");
}

export function buildFreeModeAnswer(message: string, hasImage: boolean) {
  const thai = prefersThai(message);
  const intent = detectIntent(message, hasImage);
  const context = extractContext(message, hasImage);
  const knowledgeMatches = getTradingKnowledgeMatches(message, 2);
  const knowledgeContext = formatTradingKnowledge(knowledgeMatches, thai);

  if (thai) {
    return [
      "ผมตอบด้วย Free mode แบบไม่ใช้ API credit ครับ",
      `ผมตีความคำถามของคุณว่า: ${intent.labelTh}`,
      `ระดับความมั่นใจในการตีความ: ${confidenceLabel(intent.confidence, true)}`,
      "",
      "คำตอบสั้น:",
      intent.quickTakeTh,
      "",
      "สิ่งที่ผมจับได้จากคำพูดคุณ:",
      contextSummary(context, true),
      "",
      "วิเคราะห์แบบ AI-style:",
      formatBullets(intent.reasoningTh),
      "",
      "ฐานความรู้ที่ใช้ประกอบ:",
      knowledgeContext,
      "",
      "ข้อมูลที่ยังขาดเพื่อให้วิเคราะห์แม่นขึ้น:",
      formatBullets(intent.missingInfoTh),
      "",
      "เช็กต่อก่อนตัดสินใจ:",
      formatList(intent.checklistTh),
      "",
      "เครื่องมือที่ควรใช้บนเว็บ:",
      formatBullets(intent.tools),
      "",
      BASE_RISK_WARNING_TH
    ].join("\n");
  }

  return [
    "I am answering in Free mode without using API credit.",
    `Interpreted intent: ${intent.label}`,
    `Intent confidence: ${confidenceLabel(intent.confidence, false)}`,
    "",
    "Quick take:",
    intent.quickTake,
    "",
    "What I detected from your wording:",
    contextSummary(context, false),
    "",
    "AI-style analysis:",
    formatBullets(intent.reasoning),
    "",
    "Knowledge used:",
    knowledgeContext,
    "",
    "Missing information for a sharper answer:",
    formatBullets(intent.missingInfo),
    "",
    "Next checklist:",
    formatList(intent.checklist),
    "",
    "Useful site tools:",
    formatBullets(intent.tools),
    "",
    BASE_RISK_WARNING
  ].join("\n");
}
