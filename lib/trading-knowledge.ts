import { okLeoKnowledgeDocs } from "@/lib/ok-leo-knowledge";

export type TradingKnowledgeDoc = {
  id: string;
  title: string;
  source: string;
  keywords: string[];
  summary: string;
  summaryTh: string;
  checks: string[];
  checksTh: string[];
};

export const tradingKnowledgeDocs: TradingKnowledgeDoc[] = [
  {
    id: "manual-level-true-fake-break",
    title: "Manual Level True/Fake Break Analyzer",
    source: "ok leo/WIN_Manual_Level_True_Fake_Break_Analyzer_PRO.txt",
    keywords: [
      "breakout",
      "fakeout",
      "fake break",
      "true break",
      "manual level",
      "retest",
      "wick",
      "body close",
      "atr",
      "volume",
      "ทะลุ",
      "เบรก",
      "หลอก",
      "รีเทส"
    ],
    summary:
      "True break quality is judged by body close beyond the level, enough ATR distance, strong candle body, controlled opposite wick, optional volume confirmation, and retest confirmation for A+ quality. Fake break quality is judged by sweep beyond the level, close back inside, strong wick rejection, and opposite candle behavior.",
    summaryTh:
      "คุณภาพ true break ดูจาก body close เกิน level, ระยะ break เทียบ ATR พอ, body แข็งแรง, wick ฝั่งตรงข้ามไม่ใหญ่เกินไป, volume confirm ถ้าเปิดใช้ และ retest สำหรับ A+ ส่วน fake break ดูจาก sweep เกิน level แล้วปิดกลับ, wick rejection ชัด และ candle กลับทิศ",
    checks: [
      "Do not treat a wick through a level as a confirmed breakout.",
      "A stronger true break needs body close, displacement, ATR distance, and controlled opposite wick.",
      "A fake break often sweeps beyond the level but closes back inside the range.",
      "A+ confirmation waits for retest hold after the break.",
      "Volume can improve confidence but does not guarantee the outcome."
    ],
    checksTh: [
      "อย่านับ wick ทะลุ level เป็น breakout ที่ confirm แล้ว",
      "true break ที่แข็งแรงควรมี body close, displacement, ระยะ ATR และ wick ฝั่งตรงข้ามไม่รุนแรง",
      "fake break มัก sweep เกิน level แล้วปิดกลับเข้ากรอบ",
      "A+ confirmation ควรรอ retest hold หลัง break",
      "volume ช่วยเพิ่มความมั่นใจได้ แต่ไม่การันตีผลลัพธ์"
    ]
  },
  {
    id: "win-setup-risk-validation",
    title: "WIN Setup Risk Validation",
    source: "ok leo/backend/app/services/win_setup_builder_service.py",
    keywords: [
      "risk",
      "lot",
      "position",
      "entry",
      "stop",
      "stop loss",
      "take profit",
      "tp",
      "rr",
      "risk reward",
      "spread",
      "session mismatch",
      "setup score",
      "เสี่ยง",
      "ล็อต",
      "สต็อป",
      "กำไร"
    ],
    summary:
      "A trade setup must pass basic validation before scoring: symbol and strategy are required, entry/stop/final target must exist, account balance and risk percent must be positive, buy stops must stay below entry, sell stops must stay above entry, and targets must be on the correct side. Weak validation caps the score and action guidance can become avoid/wait.",
    summaryTh:
      "setup ต้องผ่าน validation ก่อนให้คะแนน: ต้องมี symbol/strategy, entry/stop/final target, balance และ risk percent ต้องมากกว่า 0, buy ต้องมี stop ต่ำกว่า entry และ target อยู่เหนือ entry, sell ต้องกลับกัน ถ้า validation แย่ score จะถูก cap และคำแนะนำจะเป็น avoid/wait",
    checks: [
      "If spread is too wide or session is mismatched, avoid instead of forcing entry.",
      "If structure is not ready, wait for BOS/CHoCH.",
      "If a sweep happened but no displacement followed, wait for displacement.",
      "Score 85+ is A+ quality; 70-84 is valid but selective; below 70 needs confirmation.",
      "Risk calculation should normalize lot size to broker min, max, and step."
    ],
    checksTh: [
      "ถ้า spread กว้างหรือ session ไม่เหมาะ ให้หลีกเลี่ยง ไม่ควรฝืนเข้า",
      "ถ้า structure ยังไม่พร้อม ให้รอ BOS/CHoCH",
      "ถ้ามี sweep แต่ยังไม่มี displacement ให้รอต่อ",
      "คะแนน 85+ คือ A+ quality, 70-84 ใช้ได้แต่ต้องเลือกมาก, ต่ำกว่า 70 ต้องรอ confirmation",
      "การคำนวณ lot ควร normalize ตาม min, max และ step ของ broker"
    ]
  },
  {
    id: "xauusd-market-modes",
    title: "XAUUSD Market Modes",
    source: "ok leo/backend/app/services/xauusd_market_modes_service.py",
    keywords: [
      "gold",
      "xauusd",
      "market mode",
      "trend",
      "sideway",
      "range",
      "breakout hold",
      "pullback",
      "midpoint",
      "equilibrium",
      "liquidity target",
      "ทอง",
      "ไซด์เวย์",
      "เทรนด์",
      "กรอบ"
    ],
    summary:
      "XAUUSD mode analysis compares trend pressure with sideway/range pressure. Trend mode improves when structure direction, pullback respect, breakout hold, confirmation, and volatility align. Sideway mode improves when range quality, edge sweep, midpoint respect, and mixed confirmation are stronger than breakout hold.",
    summaryTh:
      "การอ่าน XAUUSD mode เปรียบเทียบแรง trend กับ sideway/range. Trend แข็งขึ้นเมื่อ structure direction, pullback respect, breakout hold, confirmation และ volatility ไปทางเดียวกัน ส่วน sideway แข็งขึ้นเมื่อ range quality, edge sweep, midpoint respect และ confirmation เด่นกว่า breakout hold",
    checks: [
      "If confirmation is too low, state should be wait, not forced trend or sideway.",
      "Trend mode needs enough gap over sideway score.",
      "Sideway mode needs range score and edge/midpoint behavior to dominate.",
      "Mixed mode means both sides have evidence and the trader should be selective.",
      "XAUUSD can shift mode quickly around USD news and New York volatility."
    ],
    checksTh: [
      "ถ้า confirmation ต่ำ ควรเป็น wait ไม่ใช่ฝืนบอก trend หรือ sideway",
      "trend mode ต้องมีคะแนนชนะ sideway ชัดพอ",
      "sideway mode ต้องมี range score และพฤติกรรม edge/midpoint เด่น",
      "mixed mode คือมีหลักฐานทั้งสองฝั่ง ต้องเลือก setup มากขึ้น",
      "XAUUSD เปลี่ยน mode ได้เร็วช่วงข่าว USD และ New York volatility"
    ]
  },
  {
    id: "zone-detection-ob-fvg-supply-demand",
    title: "Zone Detection: OB, FVG, Supply/Demand",
    source: "ok leo/backend/app/services/zone_detection_service.py",
    keywords: [
      "order block",
      "ob",
      "fvg",
      "fair value gap",
      "supply",
      "demand",
      "zone",
      "displacement",
      "equilibrium",
      "premium",
      "discount",
      "โซน",
      "ซัพพลาย",
      "ดีมานด์"
    ],
    summary:
      "Zones are selected from recent bars, not the whole chart. Strong order blocks are based on displacement candles where the prior opposite candle forms the zone. FVGs require a strong middle displacement candle and a gap between the first and current candle. Supply/demand uses prominent recent swings with padding, and equilibrium is the midpoint of the recent dealing range.",
    summaryTh:
      "โซนควรเลือกจากแท่งล่าสุด ไม่ใช่ทั้งกราฟ OB ที่ดีมาจาก displacement candle โดยใช้แท่งก่อนหน้าที่เป็น opposite candle เป็นโซน FVG ต้องมี middle candle ที่ displacement ชัดและมี gap ระหว่างแท่งแรกกับแท่งปัจจุบัน supply/demand ใช้ swing สำคัญล่าสุดพร้อม padding และ equilibrium คือ midpoint ของ dealing range ล่าสุด",
    checks: [
      "Avoid marking every candle as an order block.",
      "Displacement and body strength matter for both OB and FVG quality.",
      "Use recent major supply/demand, not random old zones.",
      "Check whether price is in premium, discount, or around equilibrium before entry.",
      "A zone is only useful when invalidation and risk reward are clear."
    ],
    checksTh: [
      "อย่ามาร์กทุกแท่งเป็น order block",
      "displacement และ body strength สำคัญกับคุณภาพ OB/FVG",
      "ใช้ supply/demand สำคัญล่าสุด ไม่ใช่โซนเก่าแบบสุ่ม",
      "เช็กว่าราคาอยู่ premium, discount หรือ equilibrium ก่อนเข้า",
      "โซนจะมีประโยชน์ก็ต่อเมื่อ invalidation และ RR ชัด"
    ]
  },
  {
    id: "session-liquidity-timing",
    title: "Session and Liquidity Timing",
    source: "ok leo/backend/app/services/win_setup_service.py",
    keywords: [
      "session",
      "asia",
      "london",
      "new york",
      "timing",
      "liquidity",
      "momentum",
      "timeframe",
      "เวลา",
      "ตลาด",
      "ลอนดอน",
      "นิวยอร์ก"
    ],
    summary:
      "Session timing adds confidence but should not stand alone. London and New York generally receive stronger timing bonuses than Asia or after-hours. Higher timeframes such as M15/H1/H4 can improve timing quality, while neutral momentum or weak session alignment should keep the setup on standby.",
    summaryTh:
      "session timing ช่วยเพิ่ม confidence แต่ไม่ควรใช้เดี่ยว ๆ London และ New York มักได้ timing bonus มากกว่า Asia/after-hours ส่วน timeframe อย่าง M15/H1/H4 ช่วยเพิ่มคุณภาพ timing ได้ ถ้า momentum neutral หรือ session alignment อ่อน ควร standby",
    checks: [
      "Do not enter only because London or New York is open.",
      "Combine session with structure, liquidity, momentum, and risk.",
      "If session timing is weak, wait for cleaner confirmation.",
      "After-hours conditions should reduce confidence.",
      "News can override normal session behavior."
    ],
    checksTh: [
      "อย่าเข้าเพราะ London หรือ New York เปิดอย่างเดียว",
      "ต้องรวม session กับ structure, liquidity, momentum และ risk",
      "ถ้า session timing อ่อน ให้รอ confirmation ที่ชัดกว่า",
      "ช่วง after-hours ควรลด confidence",
      "ข่าวแรงสามารถ override พฤติกรรม session ปกติได้"
    ]
  },
  {
    id: "live-signal-confidence",
    title: "Live Signal Confidence Model",
    source: "ok leo/backend/app/services/win_setup_service.py",
    keywords: [
      "confidence",
      "signal",
      "bias",
      "buy",
      "sell",
      "neutral",
      "momentum",
      "setup",
      "entry ready",
      "มั่นใจ",
      "สัญญาณ",
      "buy",
      "sell"
    ],
    summary:
      "Signal confidence combines structure, liquidity, and timing. Direction should stay neutral when directional edge is weak or confidence is below the minimum setup score. A valid direction still needs risk controls, stop buffer, and reward-to-risk planning.",
    summaryTh:
      "confidence ของสัญญาณรวม structure, liquidity และ timing ถ้า directional edge อ่อนหรือ confidence ต่ำกว่า minimum setup score ควรเป็น neutral แม้มี bias ก็ยังต้องมี risk control, stop buffer และ reward-to-risk plan",
    checks: [
      "Neutral is a valid decision when structure is mixed.",
      "Positive or negative momentum alone is not enough.",
      "Confidence below the setup threshold should keep the trade on standby.",
      "Entry, stop, and target must be calculated from risk, not emotion.",
      "The model supports planning; it does not guarantee market direction."
    ],
    checksTh: [
      "neutral เป็นการตัดสินใจที่ถูกได้เมื่อ structure ผสม",
      "momentum บวกหรือลบอย่างเดียวไม่พอ",
      "confidence ต่ำกว่า threshold ควร standby",
      "entry, stop, target ต้องคำนวณจาก risk ไม่ใช่อารมณ์",
      "โมเดลช่วยวางแผน ไม่ได้การันตีทิศทางตลาด"
    ]
  },
  ...okLeoKnowledgeDocs
];

function normalize(value: string) {
  return value.toLowerCase();
}

export function getTradingKnowledgeMatches(message: string, limit = 3) {
  const normalized = normalize(message);

  const scored = tradingKnowledgeDocs
    .map((doc) => {
      const keywordScore = doc.keywords.reduce((score, keyword) => {
        return normalized.includes(normalize(keyword)) ? score + 4 : score;
      }, 0);
      const titleScore = doc.title
        .toLowerCase()
        .split(/\W+/)
        .filter(Boolean)
        .reduce((score, token) => (normalized.includes(token) ? score + 1 : score), 0);

      return {
        doc,
        score: keywordScore + titleScore
      };
    })
    .sort((a, b) => b.score - a.score);

  const matches = scored.filter((item) => item.score > 0).map((item) => item.doc);
  if (matches.length > 0) {
    return matches.slice(0, limit);
  }

  return tradingKnowledgeDocs
    .filter((doc) =>
      ["win-setup-risk-validation", "xauusd-market-modes", "session-liquidity-timing"].includes(doc.id)
    )
    .slice(0, limit);
}

export function formatTradingKnowledge(matches: TradingKnowledgeDoc[], thai: boolean) {
  return matches
    .map((doc) => {
      const checks = thai ? doc.checksTh : doc.checks;
      const summary = thai ? doc.summaryTh : doc.summary;
      const heading = thai ? `จากฐานความรู้ ${doc.title}` : `Knowledge: ${doc.title}`;
      const source = thai ? `ที่มา: ${doc.source}` : `Source: ${doc.source}`;
      return [
        heading,
        summary,
        source,
        ...checks.slice(0, 4).map((check) => `- ${check}`)
      ].join("\n");
    })
    .join("\n\n");
}
