import type { TradingKnowledgeDoc } from "@/lib/trading-knowledge";

export const okLeoKnowledgeDocs: TradingKnowledgeDoc[] = [
  {
    id: "ok-leo-safe-ea-usage",
    title: "OK Leo Safe EA Usage Rules",
    source: "ok leo/docs/SAFE_USAGE_NOTES.md",
    keywords: [
      "ea",
      "expert advisor",
      "mt5",
      "safe usage",
      "demo",
      "fixed lot",
      "dynamic lot",
      "risk 0.25",
      "spread",
      "broker",
      "xauusd m1",
      "gold m1",
      "ปลอดภัย",
      "เดโม",
      "อีเอ",
      "สเปรด"
    ],
    summary:
      "The safe usage notes prefer demo validation first, fixed 0.01 lot for initial checks, cautious 0.25% risk mode for larger accounts, broker-specific spread and stop-level checks, and stricter inducement rules when too many weak sweeps appear.",
    summaryTh:
      "กฎใช้งานแบบปลอดภัยเน้นเริ่มจากเดโมก่อน ใช้ fixed lot 0.01 สำหรับตรวจระบบแรก ๆ ใช้ risk 0.25% เป็นทางเลือกที่ระวังกว่าสำหรับบัญชีใหญ่ ตรวจ min lot, stop level, spread, suffix และชั่วโมงเทรดของ broker และใช้ strict inducement logic เมื่อมี sweep อ่อนเยอะเกินไป",
    checks: [
      "Start on demo before live validation.",
      "Use fixed 0.01 lot before enabling dynamic lot.",
      "Check broker min lot, stop level, spread, suffix, and trading hours.",
      "Keep strict inducement filters when weak sweeps are frequent.",
      "Do not turn EA behavior into a guaranteed-profit claim."
    ],
    checksTh: [
      "เริ่มทดสอบบนเดโมก่อนใช้เงินจริง",
      "ใช้ fixed lot 0.01 ก่อนเปิด dynamic lot",
      "ตรวจ min lot, stop level, spread, suffix และเวลาเทรดของ broker",
      "ถ้า sweep อ่อนเยอะ ให้คง filter inducement แบบ strict",
      "อย่าพูดว่า EA หรือระบบใดการันตีกำไร"
    ]
  },
  {
    id: "ok-leo-market-structure-bos-choch",
    title: "OK Leo Market Structure BOS / CHoCH",
    source: "ok leo/backend/app/services/market_structure_service.py",
    keywords: [
      "market structure",
      "bos",
      "choch",
      "protected high",
      "protected low",
      "major swing",
      "minor swing",
      "bias",
      "range",
      "continuation",
      "reversal",
      "โครงสร้าง",
      "ไบแอส",
      "สวิง"
    ],
    summary:
      "Market structure is resolved from prominent swings, protected highs/lows, average range buffers, and body-close breaks. BOS confirms continuation with the current bias, while CHoCH signals a character shift when price breaks protected structure against the previous bias.",
    summaryTh:
      "Market structure อ่านจาก swing สำคัญ, protected high/low, buffer ตาม average range และการปิดราคา ไม่ใช่ wick ล้วน BOS ใช้ยืนยัน continuation ตาม bias ส่วน CHoCH คือการเปลี่ยน character เมื่อราคาทะลุ protected structure สวน bias เดิม",
    checks: [
      "Do not call BOS/CHoCH from a wick-only violation.",
      "Use protected highs/lows instead of random local candles.",
      "Separate major structure breaks from minor noise.",
      "If price is inside the protected range, treat the state as range or corrective.",
      "Wait when structure is mixed."
    ],
    checksTh: [
      "อย่านับ BOS/CHoCH จาก wick อย่างเดียว",
      "ใช้ protected high/low ไม่ใช่แท่งสุ่ม",
      "แยก major structure break ออกจาก minor noise",
      "ถ้าราคาอยู่ในกรอบ protected ให้ถือว่า range หรือ corrective",
      "ถ้า structure ผสม ให้รอก่อน"
    ]
  },
  {
    id: "ok-leo-liquidity-map-bsl-ssl",
    title: "OK Leo Liquidity Map: BSL / SSL / Equal Highs",
    source: "ok leo/backend/app/services/liquidity_detection_service.py",
    keywords: [
      "liquidity",
      "bsl",
      "ssl",
      "buy side liquidity",
      "sell side liquidity",
      "equal highs",
      "equal lows",
      "resting liquidity",
      "sweep",
      "liquidity map",
      "สภาพคล่อง",
      "กวาด liquidity",
      "equal high",
      "equal low"
    ],
    summary:
      "Liquidity mapping tracks recent prominent highs/lows as BSL and SSL, detects equal highs/lows with tolerance, and labels the latest sweep only when price pierces a target and closes back through it.",
    summaryTh:
      "Liquidity map ใช้ swing high/low สำคัญล่าสุดเป็น BSL และ SSL ตรวจ equal highs/equal lows ด้วย tolerance และนับ latest sweep เมื่อราคาทะลุ target แล้วปิดกลับ ไม่ใช่แค่แตะ level",
    checks: [
      "Map buy-side liquidity above price and sell-side liquidity below price.",
      "Equal highs/lows are stronger when levels cluster inside tolerance.",
      "A sweep needs a pierce plus close back, not just a touch.",
      "Use swept liquidity as context, not as an automatic entry.",
      "Keep nearest resting liquidity visible before planning TP."
    ],
    checksTh: [
      "มาร์ก BSL ด้านบนราคา และ SSL ด้านล่างราคา",
      "equal high/low น่าเชื่อขึ้นเมื่อระดับใกล้กันใน tolerance",
      "sweep ต้องมีทะลุแล้วปิดกลับ ไม่ใช่แค่แตะ",
      "ใช้ liquidity ที่ถูก sweep เป็น context ไม่ใช่ entry อัตโนมัติ",
      "ดู resting liquidity ใกล้ราคาก่อนวาง TP"
    ]
  },
  {
    id: "ok-leo-trap-displacement",
    title: "OK Leo Trap And Displacement Logic",
    source: "ok leo/backend/app/services/trap_detection_service.py",
    keywords: [
      "trap",
      "fake breakout",
      "fake breakdown",
      "displacement",
      "bsl sweep",
      "ssl sweep",
      "prior high",
      "prior low",
      "rejection",
      "หลอก",
      "fake break",
      "displacement candle"
    ],
    summary:
      "Trap logic looks for price running above recent highs and closing back below, or running below recent lows and closing back above. Strong displacement is added when the last candle body is large relative to the recent range.",
    summaryTh:
      "Trap logic มองหาราคาที่วิ่งเหนือ high ล่าสุดแล้วปิดกลับลงมา หรือวิ่งต่ำกว่า low ล่าสุดแล้วปิดกลับขึ้นมา และเพิ่มน้ำหนัก displacement เมื่อ body ของแท่งล่าสุดใหญ่เมื่อเทียบกับ range ล่าสุด",
    checks: [
      "A BSL sweep above prior highs can become a bearish trap only after rejection.",
      "An SSL sweep below prior lows can become a bullish trap only after reclaim.",
      "Large displacement after a trap improves quality.",
      "Do not enter before the trap has confirmation.",
      "Trap labels do not remove the need for SL and RR."
    ],
    checksTh: [
      "BSL sweep เหนือ high เดิมจะเป็น bearish trap ได้เมื่อมี rejection",
      "SSL sweep ใต้ low เดิมจะเป็น bullish trap ได้เมื่อมี reclaim",
      "displacement ใหญ่หลัง trap ช่วยเพิ่มคุณภาพ",
      "อย่าเข้าเทรดก่อน trap มี confirmation",
      "label trap ไม่ได้แทน SL และ RR"
    ]
  },
  {
    id: "ok-leo-pro-session-liquidity",
    title: "OK Leo Pro Session Liquidity Workflow",
    source: "ok leo/backend/app/services/pro_session_liquidity_service.py",
    keywords: [
      "session liquidity",
      "asia range",
      "london sweep",
      "new york continuation",
      "london ny overlap",
      "premium discount",
      "ob fvg",
      "session workflow",
      "asia high",
      "asia low",
      "ลอนดอน",
      "นิวยอร์ก",
      "เอเชีย"
    ],
    summary:
      "The pro session workflow separates Asia range, London sweep, New York continuation, premium/discount location, OB/FVG retest, and minimum RR. XAUUSD needs stronger displacement and usually a minimum 1:2 risk reward.",
    summaryTh:
      "Pro session workflow แยก Asia range, London sweep, New York continuation, ตำแหน่ง premium/discount, OB/FVG retest และ minimum RR สำหรับ XAUUSD ต้องการ displacement ชัดและโดยทั่วไปควรมี RR อย่างน้อย 1:2",
    checks: [
      "Do not mix Asia range logic with London or New York continuation.",
      "XAUUSD needs strong displacement and wider SL tolerance.",
      "GBPUSD needs clean CHoCH/BOS and at least around 1:1.8 RR.",
      "A session setup is weaker without retest or structure confirmation.",
      "News can override normal session behavior."
    ],
    checksTh: [
      "อย่าปน Asia range logic กับ London/NY continuation",
      "XAUUSD ต้องการ displacement ชัดและ SL tolerance กว้างขึ้น",
      "GBPUSD ต้องการ CHoCH/BOS สะอาดและ RR ประมาณ 1:1.8 ขึ้นไป",
      "session setup อ่อนลงถ้าไม่มี retest หรือ structure confirmation",
      "ข่าวแรงสามารถ override พฤติกรรม session ปกติ"
    ]
  },
  {
    id: "ok-leo-signal-validation",
    title: "OK Leo Realtime Signal Validation",
    source: "ok leo/backend/app/services/realtime_signal_validation_service.py",
    keywords: [
      "signal validation",
      "readiness",
      "trigger threshold",
      "wait threshold",
      "entry width",
      "max spread",
      "tradable",
      "ready",
      "invalidated",
      "signal",
      "สัญญาณ",
      "พร้อมเข้า",
      "รอ"
    ],
    summary:
      "Realtime signal validation only promotes a setup when direction, HTF bias, correct sweep, displacement, structure, first retest, session, risk model, entry width, spread, and path direction align. Otherwise the state remains WAIT, READY, or INVALIDATED.",
    summaryTh:
      "Realtime signal validation จะยกระดับ setup เมื่อ direction, HTF bias, sweep ที่ถูกฝั่ง, displacement, structure, first retest, session, risk model, entry width, spread และ path direction สอดคล้องกัน ไม่อย่างนั้นสถานะควรเป็น WAIT, READY หรือ INVALIDATED",
    checks: [
      "Trigger requires all core conditions, not only confidence.",
      "XAUUSD has specific max entry width and max spread assumptions.",
      "Session must fit the symbol profile.",
      "Invalid numeric levels should invalidate the idea.",
      "READY is not the same as TRIGGERED."
    ],
    checksTh: [
      "trigger ต้องครบ core conditions ไม่ใช่ดู confidence อย่างเดียว",
      "XAUUSD มีข้อจำกัด entry width และ max spread เฉพาะ",
      "session ต้องเหมาะกับ symbol profile",
      "ตัวเลข entry/SL/TP ที่ผิดควร invalidate ไอเดีย",
      "READY ไม่เหมือน TRIGGERED"
    ]
  },
  {
    id: "ok-leo-news-macro-analysis",
    title: "OK Leo News And Macro Risk Analysis",
    source: "ok leo/backend/app/services/news_analysis_service.py",
    keywords: [
      "news",
      "macro",
      "cpi",
      "nfp",
      "fomc",
      "fed",
      "powell",
      "yields",
      "safe haven",
      "hawkish",
      "dovish",
      "gold news",
      "ข่าว",
      "เฟด",
      "เงินเฟ้อ"
    ],
    summary:
      "News analysis classifies high-impact events, USD context, hawkish/dovish tone, yields, safe-haven flow, and asset-specific pressure. For gold, hawkish Fed or rising real yields can be bearish, while dovish tone, falling yields, or safe-haven demand can be supportive.",
    summaryTh:
      "News analysis แยกข่าว high impact, USD context, hawkish/dovish tone, yields, safe-haven flow และแรงกดดันเฉพาะสินทรัพย์ สำหรับทอง Fed hawkish หรือ real yields ขึ้นมักกดดัน ส่วน dovish tone, yields ลด หรือ safe-haven demand อาจสนับสนุนทอง",
    checks: [
      "Classify event risk before trusting technical signals around news.",
      "Gold can react to USD, real yields, safe-haven demand, and Fed tone.",
      "A headline bias is not a trade signal by itself.",
      "If risk level is high, reduce risk or wait.",
      "Do not use macro text to promise direction."
    ],
    checksTh: [
      "จัดระดับ news risk ก่อนเชื่อ technical signal ช่วงข่าว",
      "ทองตอบสนองต่อ USD, real yields, safe-haven demand และ Fed tone",
      "headline bias ไม่ใช่สัญญาณเข้าเทรดเดี่ยว ๆ",
      "ถ้า risk level สูง ให้ลด risk หรือรอ",
      "ห้ามใช้ข่าว macro ไปการันตีทิศทาง"
    ]
  },
  {
    id: "ok-leo-multi-agent-market-intelligence",
    title: "OK Leo Multi-Agent Market Intelligence",
    source: "ok leo/backend/app/services/multi_agent_intelligence_service.py",
    keywords: [
      "multi agent",
      "market intelligence",
      "news filter",
      "trend key level",
      "agent",
      "rss",
      "macro relevance",
      "key levels",
      "synthesis",
      "ข่าว",
      "agent",
      "วิเคราะห์หลายมุม"
    ],
    summary:
      "The multi-agent workflow separates news filtering, realtime news interpretation, trend/key-level analysis, and synthesis. It is designed to combine macro context with structure, liquidity, and zones instead of relying on a single signal.",
    summaryTh:
      "Multi-agent workflow แยกงานเป็น news filtering, realtime news interpretation, trend/key-level analysis และ synthesis เพื่อรวม macro context กับ structure, liquidity และ zones ไม่ใช่พึ่ง signal เดียว",
    checks: [
      "Use separate evidence streams for news, structure, liquidity, and zones.",
      "Synthesis should explain uncertainty instead of forcing a direction.",
      "If news sources fail, show that limitation clearly.",
      "Macro relevance should be filtered before analysis.",
      "Confidence is a planning aid, not certainty."
    ],
    checksTh: [
      "แยกหลักฐานข่าว, structure, liquidity และ zones",
      "synthesis ควรอธิบายความไม่แน่นอน ไม่ใช่ฝืนเลือกทิศทาง",
      "ถ้าข่าวโหลดไม่ได้ ต้องบอกข้อจำกัดชัดเจน",
      "ต้อง filter macro relevance ก่อนวิเคราะห์",
      "confidence เป็นตัวช่วยวางแผน ไม่ใช่ความแน่นอน"
    ]
  },
  {
    id: "ok-leo-smc-pro-journal",
    title: "OK Leo SMC Pro Journal And Backtest Review",
    source: "ok leo/backend/app/services/smc_pro_service.py",
    keywords: [
      "smc pro",
      "journal",
      "backtest",
      "manual record",
      "imported mt5",
      "closed sample",
      "win rate",
      "r multiple",
      "rr result",
      "performance analytics",
      "บันทึกเทรด",
      "รีวิว",
      "backtest"
    ],
    summary:
      "SMC Pro keeps live analysis separate from historical performance review. Analytics should come from saved manual records or imported MT5 executions only, with insufficient sample warnings when closed trades are too few.",
    summaryTh:
      "SMC Pro แยก live analysis ออกจาก historical performance review โดย analytics ควรมาจาก manual records ที่บันทึกไว้หรือ MT5 executions ที่ import เท่านั้น และต้องเตือน insufficient sample เมื่อ closed trades น้อยเกินไป",
    checks: [
      "Do not estimate win rate from mock or planned trades.",
      "Use closed outcomes for win rate.",
      "Use R-based metrics only when RR result exists.",
      "Keep live setup analysis separate from backtest review.",
      "Require enough samples before trusting subgroup rankings."
    ],
    checksTh: [
      "อย่าประเมิน winrate จาก mock หรือ planned trades",
      "ใช้ closed outcomes สำหรับ winrate",
      "ใช้ R-based metrics เฉพาะ record ที่มี RR result",
      "แยก live setup analysis จาก backtest review",
      "ต้องมี sample พอก่อนเชื่อการจัดอันดับ subgroup"
    ]
  },
  {
    id: "ok-leo-harmonic-prz",
    title: "OK Leo Harmonic Pattern PRZ Validation",
    source: "ok leo/backend/app/services/harmonic_pro_service.py",
    keywords: [
      "harmonic",
      "prz",
      "gartley",
      "bat",
      "butterfly",
      "crab",
      "deep crab",
      "cypher",
      "shark",
      "abcd",
      "ratio",
      "fibonacci",
      "ฮาร์โมนิก"
    ],
    summary:
      "Harmonic validation uses pattern-specific Fibonacci ratios, PRZ tolerance, pair profiles, minimum RR, and execution confirmation. Pattern completion is not enough; XAUUSD needs wider PRZ tolerance and obvious displacement before execution.",
    summaryTh:
      "Harmonic validation ใช้ Fibonacci ratio เฉพาะ pattern, PRZ tolerance, pair profile, minimum RR และ execution confirmation การครบ pattern ยังไม่พอ โดย XAUUSD ต้องใช้ PRZ tolerance กว้างขึ้นและต้องมี displacement ชัดก่อนเข้า",
    checks: [
      "Pattern completion does not equal entry.",
      "Validate B, C, and D ratios against the pattern rules.",
      "Wait for PRZ reaction, sweep, or structure shift.",
      "Reject weak RR even if the harmonic ratio looks clean.",
      "Adapt tolerance by pair volatility."
    ],
    checksTh: [
      "pattern complete ไม่เท่ากับเข้าเทรด",
      "ตรวจ B, C และ D ratios ตามกฎ pattern",
      "รอ PRZ reaction, sweep หรือ structure shift",
      "ตัด setup ที่ RR อ่อน แม้ ratio จะดูสวย",
      "ปรับ tolerance ตาม volatility ของคู่เงิน"
    ]
  },
  {
    id: "ok-leo-elliott-wave-hybrid-map",
    title: "OK Leo Elliott Wave + SMC + ICT Hybrid Map",
    source: "ok leo/backend/app/services/elliott_wave_service.py",
    keywords: [
      "elliott",
      "wave",
      "elliott wave",
      "hybrid",
      "smc ict",
      "wave expansion",
      "abc correction",
      "invalidation buffer",
      "h4 h1 m15 m5 m1",
      "คลื่น",
      "เอลเลียต",
      "wave"
    ],
    summary:
      "The Elliott hybrid map combines wave context, SMC confluence, macro context, zones, and pair-specific volatility settings across H4/H1/M15/M5/M1. It treats invalidation buffers and recommended setup styles differently for gold, forex, indices, and crypto.",
    summaryTh:
      "Elliott hybrid map รวม wave context, SMC confluence, macro context, zones และ pair-specific volatility settings ผ่าน H4/H1/M15/M5/M1 โดยใช้ invalidation buffer และ setup style ต่างกันสำหรับทอง, forex, indices และ crypto",
    checks: [
      "Use wave context as a map, not a prediction.",
      "Pair volatility changes invalidation buffer size.",
      "Confirm wave ideas with liquidity and structure.",
      "Indexes and crypto need wider volatility-aware buffers.",
      "Do not force a wave count when structure is unclear."
    ],
    checksTh: [
      "ใช้ wave context เป็นแผนที่ ไม่ใช่คำทำนาย",
      "volatility ของแต่ละสินทรัพย์เปลี่ยนขนาด invalidation buffer",
      "ยืนยัน wave idea ด้วย liquidity และ structure",
      "indices และ crypto ต้องใช้ buffer กว้างตาม volatility",
      "อย่าฝืน count คลื่นเมื่อ structure ไม่ชัด"
    ]
  },
  {
    id: "ok-leo-path-projection",
    title: "OK Leo Liquidity Path Projection",
    source: "ok leo/backend/app/services/path_projection_service.py",
    keywords: [
      "path projection",
      "liquidity path",
      "tp1",
      "tp2",
      "continuation target",
      "wave target",
      "average range",
      "target path",
      "projection",
      "เป้าหมาย",
      "เส้นทางราคา",
      "liquidity target"
    ],
    summary:
      "Path projection builds TP1, TP2, and continuation targets from bias, average range, wave target, and nearby liquidity. Bullish plans look toward BSL above price; bearish plans look toward SSL below price; neutral plans should wait for range resolution.",
    summaryTh:
      "Path projection สร้าง TP1, TP2 และ continuation target จาก bias, average range, wave target และ liquidity ใกล้ราคา แผน bullish มอง BSL ด้านบน แผน bearish มอง SSL ด้านล่าง ส่วน neutral ควรรอให้ range ชัดก่อน",
    checks: [
      "Targets should follow liquidity, not random round numbers.",
      "Use average range when clean liquidity targets are missing.",
      "Neutral bias should not force TP levels.",
      "TP path still needs RR and invalidation validation.",
      "Projection is hypothetical and not guaranteed."
    ],
    checksTh: [
      "target ควรตาม liquidity ไม่ใช่สุ่มเลขกลม",
      "ใช้ average range เมื่อไม่มี liquidity target ชัด",
      "neutral bias ไม่ควรฝืนตั้ง TP",
      "TP path ยังต้องตรวจ RR และ invalidation",
      "projection เป็นสมมติฐาน ไม่การันตีผลลัพธ์"
    ]
  }
];
