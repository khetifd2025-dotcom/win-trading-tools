export type ToolDifficulty = "Beginner" | "Intermediate";

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolProductCta = {
  title: string;
  description: string;
  productSlug: string;
  buttonLabel: string;
};

export type TradingTool = {
  title: string;
  slug: string;
  description: string;
  seoDescription: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  category: string;
  difficulty: ToolDifficulty;
  marketTag: string;
  relatedTools: string[];
  relatedArticles: string[];
  howToUse: string[];
  exampleUseCase: string;
  exampleCalculation: string[];
  commonMistakes: string[];
  whenNotToUse: string[];
  preTradeChecklist: string[];
  faq: ToolFaq[];
  productCta?: ToolProductCta;
  riskDisclaimer: string;
};

const TOOL_RISK_DISCLAIMER =
  "Trading involves risk. This tool is for educational and planning purposes only. It is not financial advice.";

export const tools: TradingTool[] = [
  {
    title: "Lot Size Calculator",
    slug: "lot-size-calculator",
    description: "Estimate lot size from account balance, risk percentage, stop loss distance, and point value.",
    seoDescription: "Free lot size calculator for forex and gold traders who want to control risk before entering a trade.",
    metaTitle: "Lot Size Calculator for Forex and XAUUSD Risk Planning",
    metaDescription:
      "Use the free Lot Size Calculator to estimate forex or XAUUSD lot size from balance, risk percent, stop loss distance, and point value.",
    intro:
      "This calculator helps you convert a trade idea into a position size before you enter. It is most useful when your stop loss is already defined and you want the trade risk to match your account plan instead of your emotions.",
    category: "Risk Management",
    difficulty: "Beginner",
    marketTag: "Forex",
    relatedTools: ["risk-reward-calculator", "position-size-calculator", "daily-loss-limit-calculator"],
    relatedArticles: [
      "how-to-use-a-lot-size-calculator",
      "how-to-calculate-lot-size-for-xauusd",
      "position-sizing-explained-for-forex-traders",
      "how-much-should-you-risk-per-trade"
    ],
    howToUse: [
      "Enter account balance and the percentage you plan to risk.",
      "Add the stop loss distance in pips or points.",
      "Use your broker contract details for point value per lot.",
      "Compare the result with your daily loss limit before placing the trade."
    ],
    exampleUseCase: "A trader with a $1,000 account risking 1% and using a 100 point stop can estimate whether the planned lot size is reasonable.",
    exampleCalculation: [
      "Account balance: $1,000.",
      "Risk per trade: 1%, which equals $10 of planned risk.",
      "Stop loss: 100 points and point value: $1 per point per 1.00 lot.",
      "Suggested lot size: $10 / (100 x $1) = 0.10 lots."
    ],
    commonMistakes: [
      "Using a point value that does not match the broker contract.",
      "Increasing risk after losses.",
      "Calculating lot size without a clear stop loss."
    ],
    whenNotToUse: [
      "Do not use the output as a trade signal. It only estimates size after you already have a plan.",
      "Do not rely on it if you have not checked your broker's symbol specification and contract size.",
      "Avoid using the result during abnormal spread, news spikes, or when your stop loss is only guessed."
    ],
    preTradeChecklist: [
      "Stop loss is placed at a logical invalidation level.",
      "Risk percentage fits your written trading plan.",
      "Daily loss limit still leaves room for the trade.",
      "Point value matches your broker's instrument details.",
      "Risk reward has been checked before entry."
    ],
    faq: [
      {
        question: "What is lot size in forex?",
        answer:
          "Lot size is the position amount used for a trade. A larger lot size makes each pip or point movement worth more money, so it should be chosen from risk first, not from confidence."
      },
      {
        question: "How do I calculate lot size for XAUUSD?",
        answer:
          "Choose a risk amount, measure the XAUUSD stop distance, confirm the broker point value, then divide risk amount by stop distance multiplied by point value."
      },
      {
        question: "What risk percentage should beginners use?",
        answer:
          "Many beginners use small fixed risk while they build consistency. The calculator warns above 3%, but your personal limit should come from your plan and tolerance."
      },
      {
        question: "Why does broker contract size matter?",
        answer:
          "Gold, indices, and some forex symbols can be configured differently by brokers. If the point value is wrong, the estimated lot size can be wrong too."
      }
    ],
    productCta: {
      title: "Want a reusable risk worksheet?",
      description:
        "The Forex Risk Calculator Spreadsheet gives you a structured place to plan lot size, daily limits, and trade notes outside the browser.",
      productSlug: "forex-risk-calculator-spreadsheet",
      buttonLabel: "View risk spreadsheet"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "Risk Reward Calculator",
    slug: "risk-reward-calculator",
    description: "Measure risk distance, reward distance, and RR ratio for buy or sell setups.",
    seoDescription: "Calculate forex and XAUUSD risk reward ratio with setup grading and direction validation.",
    metaTitle: "Risk Reward Calculator for Forex and Gold Trade Planning",
    metaDescription:
      "Calculate risk distance, reward distance, RR ratio, and setup grade for buy or sell forex and XAUUSD trades before entry.",
    intro:
      "The Risk Reward Calculator helps you test whether a trade idea has enough planned reward for the amount you are risking. It does not predict outcome; it simply keeps the math visible before execution.",
    category: "Trade Planning",
    difficulty: "Beginner",
    marketTag: "Risk",
    relatedTools: ["lot-size-calculator", "smc-entry-checklist", "breakout-true-or-fake-checklist"],
    relatedArticles: [
      "what-is-risk-reward-ratio-in-forex-trading",
      "how-to-use-1-to-2-risk-reward-ratio",
      "how-to-use-a-risk-reward-calculator",
      "how-to-confirm-a-breakout-before-entry"
    ],
    howToUse: [
      "Choose buy or sell direction.",
      "Enter the planned entry, stop loss, and take profit.",
      "Check whether the reward justifies the risk before entering.",
      "Use the setup grade as a planning prompt, not as a prediction."
    ],
    exampleUseCase: "A gold trader can compare a $2 stop and $5 target to see whether the setup offers at least 1:2 risk reward.",
    exampleCalculation: [
      "Buy entry: 2350.00.",
      "Stop loss: 2348.00, so risk distance is 2.00.",
      "Take profit: 2355.00, so reward distance is 5.00.",
      "RR ratio: 5.00 / 2.00 = 2.5, which the tool grades as Strong."
    ],
    commonMistakes: [
      "Moving the stop loss after entry to force a better ratio.",
      "Ignoring nearby liquidity or supply and demand zones.",
      "Taking weak RR setups during emotional trading."
    ],
    whenNotToUse: [
      "Do not use it when entry, stop, or target are undefined.",
      "Do not accept a high RR number if the target is unrealistic for the session or market condition.",
      "Do not use the grade to override news risk, poor liquidity, or a broken trading plan."
    ],
    preTradeChecklist: [
      "Direction matches your market bias.",
      "Stop loss is on the correct side of entry.",
      "Take profit is reachable before major opposing liquidity.",
      "RR is acceptable before position size is chosen.",
      "The setup has also passed your entry checklist."
    ],
    faq: [
      {
        question: "What is a good risk reward ratio?",
        answer:
          "Many traders look for at least 1:2, but a good ratio depends on setup quality, market structure, costs, and your tested trading plan."
      },
      {
        question: "Can a high RR trade still lose?",
        answer:
          "Yes. Risk reward describes the planned relationship between stop and target. It does not guarantee that price will reach the target."
      },
      {
        question: "Why does direction validation matter?",
        answer:
          "For buys, the stop should be below entry and the target above entry. For sells, the stop should be above entry and the target below entry."
      },
      {
        question: "Should I move my take profit to improve RR?",
        answer:
          "Only if market structure supports it. Extending a target just to make the ratio look better can create unrealistic plans."
      }
    ],
    productCta: {
      title: "Turn RR rules into a written plan",
      description:
        "The Trading Plan Template helps you define minimum RR, session rules, risk limits, and review prompts before live execution.",
      productSlug: "trading-plan-template",
      buttonLabel: "View trading plan template"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "XAUUSD Profit Calculator",
    slug: "xauusd-profit-calculator",
    description: "Estimate gold profit or loss using entry, exit, direction, and lot size.",
    seoDescription: "Free XAUUSD profit calculator using a simple gold price movement approximation for trade planning.",
    metaTitle: "XAUUSD Profit Calculator for Gold Trade P/L Estimates",
    metaDescription:
      "Estimate gold trading profit or loss from XAUUSD entry price, exit price, direction, and lot size using a simple planning approximation.",
    intro:
      "The XAUUSD Profit Calculator helps gold traders estimate how price movement and lot size translate into potential profit or loss. The estimate is useful for planning, but broker contract size, spread, commission, and execution can change the live result.",
    category: "Gold Trading",
    difficulty: "Beginner",
    marketTag: "XAUUSD",
    relatedTools: ["pip-point-calculator", "lot-size-calculator", "trading-session-converter"],
    relatedArticles: [
      "how-to-calculate-profit-and-loss-on-xauusd",
      "xauusd-lot-size-explained",
      "how-to-calculate-lot-size-for-xauusd",
      "best-risk-management-rules-for-gold-traders"
    ],
    howToUse: [
      "Select buy or sell direction.",
      "Enter the gold entry and exit price.",
      "Enter lot size and review the estimated profit or loss.",
      "Compare the output with your risk plan and broker statement after the trade."
    ],
    exampleUseCase: "If XAUUSD moves from 2350.00 to 2352.50 on a 0.10 lot buy, the tool estimates the dollar result.",
    exampleCalculation: [
      "Buy entry: 2350.00.",
      "Exit: 2352.50, so price moved 2.50 in favor of the buy.",
      "Lot size: 0.10.",
      "Estimated P/L: 2.50 x 0.10 x 100 = $25 before spread, commission, and broker adjustments."
    ],
    commonMistakes: [
      "Assuming all brokers use the same contract size.",
      "Ignoring spread and commission.",
      "Confusing price movement with pip value."
    ],
    whenNotToUse: [
      "Do not use the estimate as your final broker statement.",
      "Do not use it without checking contract size if your broker quotes gold differently.",
      "Do not ignore wider spreads during news, rollover, or low-liquidity periods."
    ],
    preTradeChecklist: [
      "Direction and prices are entered correctly.",
      "Lot size matches the risk plan.",
      "Spread and commission have been considered.",
      "Session and news conditions are acceptable.",
      "Potential loss is acceptable before potential profit is considered."
    ],
    faq: [
      {
        question: "How is XAUUSD profit calculated here?",
        answer:
          "The tool uses a simple approximation: a 1.00 gold price move at 1.00 lot is about $100, then scales that by lot size and direction."
      },
      {
        question: "Will this match my broker exactly?",
        answer:
          "Not always. Brokers may use different contract sizes, spreads, commissions, and execution rules, so use this as a planning estimate."
      },
      {
        question: "Can I use this for gold sells?",
        answer:
          "Yes. For sells, the tool treats entry minus exit as the price difference so falling price can show a positive estimate."
      },
      {
        question: "Should I calculate profit before risk?",
        answer:
          "Risk should come first. Estimate potential loss, position size, and risk reward before focusing on possible profit."
      }
    ],
    productCta: {
      title: "Plan gold trades in one worksheet",
      description:
        "The XAUUSD Risk Management Template includes stop distance, lot size, session notes, and broker contract reminders for gold traders.",
      productSlug: "xauusd-risk-management-template",
      buttonLabel: "View XAUUSD template"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "Pip / Point Calculator",
    slug: "pip-point-calculator",
    description: "Estimate point distance and trade value for forex or gold movements.",
    seoDescription: "Calculate pip or point distance and estimated value for forex and gold trades.",
    metaTitle: "Pip and Point Calculator for Forex and Gold Trades",
    metaDescription:
      "Calculate pip or point distance, lot-adjusted value, and estimated movement size for forex and XAUUSD planning.",
    intro:
      "This tool helps you measure the distance between two prices and estimate what that distance may be worth based on your point value input. It is designed for planning and review, especially when different symbols use different decimals.",
    category: "Trade Planning",
    difficulty: "Beginner",
    marketTag: "Forex",
    relatedTools: ["xauusd-profit-calculator", "position-size-calculator", "lot-size-calculator"],
    relatedArticles: [
      "xauusd-points-and-pips-explained",
      "position-sizing-explained-for-forex-traders",
      "how-to-use-a-position-size-calculator",
      "xauusd-lot-size-explained"
    ],
    howToUse: [
      "Choose forex or gold market type.",
      "Enter entry and exit prices.",
      "Add lot size and value per point for a rough estimate.",
      "Review whether the distance is realistic for your stop, target, and session."
    ],
    exampleUseCase: "A trader can compare the value of a 50 point move at different lot sizes before choosing position size.",
    exampleCalculation: [
      "Entry price: 1.0850.",
      "Exit price: 1.0900.",
      "Distance: 50 points based on the selected market format.",
      "If value per point is $1 and lot size is 0.50, estimated value is 50 x $1 x 0.50 = $25."
    ],
    commonMistakes: [
      "Using the same pip calculation across every symbol.",
      "Leaving out spread.",
      "Entering prices with the wrong decimal format."
    ],
    whenNotToUse: [
      "Do not use one symbol's pip value for a different symbol without checking specifications.",
      "Do not rely on the output when spread is unusually wide.",
      "Do not use the estimate as a replacement for broker margin or contract details."
    ],
    preTradeChecklist: [
      "Market type is selected correctly.",
      "Entry and exit prices use the right decimal format.",
      "Value per point comes from broker or tested data.",
      "Spread and commission are considered.",
      "Distance makes sense for current volatility."
    ],
    faq: [
      {
        question: "What is the difference between pips and points?",
        answer:
          "A pip is a standard forex movement unit for many currency pairs, while points are often used more broadly for smaller price increments or non-forex symbols like gold."
      },
      {
        question: "Can I use this for XAUUSD?",
        answer:
          "Yes, but use gold-specific point value and broker contract details because XAUUSD can vary across brokers."
      },
      {
        question: "Why do decimals matter?",
        answer:
          "Different pairs and symbols have different quote formats. A misplaced decimal can make the measured distance much larger or smaller than intended."
      },
      {
        question: "Does this include spread?",
        answer:
          "No. The calculator estimates raw price movement. You should account for spread, commission, and slippage separately."
      }
    ],
    productCta: {
      title: "Keep pip and point math organized",
      description:
        "The Forex Risk Calculator Spreadsheet gives you editable fields for point values, position sizing, and trade review.",
      productSlug: "forex-risk-calculator-spreadsheet",
      buttonLabel: "View spreadsheet"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "Position Size Calculator",
    slug: "position-size-calculator",
    description: "Calculate position size using either direct risk amount or risk percentage.",
    seoDescription: "Position size calculator for traders who want to plan risk by account balance, currency, and stop loss.",
    metaTitle: "Position Size Calculator for Forex Risk Management",
    metaDescription:
      "Calculate position size from account balance, fixed risk amount or risk percent, stop loss distance, and point value.",
    intro:
      "The Position Size Calculator helps you translate risk into trade size using either a fixed dollar amount or a percentage of account balance. It is useful when you want every setup to fit the same risk framework.",
    category: "Risk Management",
    difficulty: "Beginner",
    marketTag: "Risk",
    relatedTools: ["lot-size-calculator", "daily-loss-limit-calculator", "trade-journal-profit-calculator"],
    relatedArticles: [
      "position-sizing-explained-for-forex-traders",
      "how-to-use-a-position-size-calculator",
      "beginner-guide-to-forex-risk-control",
      "how-much-should-you-risk-per-trade"
    ],
    howToUse: [
      "Select whether risk is based on a percentage or fixed amount.",
      "Enter account balance, stop loss distance, and point value.",
      "Review suggested position size before placing a trade.",
      "Reduce size if news, spread, or volatility makes execution less stable."
    ],
    exampleUseCase: "A trader can decide whether a fixed $25 risk aligns with the planned stop loss distance.",
    exampleCalculation: [
      "Account balance: $2,500.",
      "Risk mode: fixed amount, $25.",
      "Stop loss: 50 points and point value: $1.",
      "Suggested position size: $25 / (50 x $1) = 0.50 lots."
    ],
    commonMistakes: [
      "Skipping position sizing on small accounts.",
      "Risking a random dollar amount based on confidence.",
      "Ignoring currency conversion."
    ],
    whenNotToUse: [
      "Do not use it when you do not know the stop loss distance.",
      "Do not use it if the point value is only guessed.",
      "Do not use it to justify oversized trades after a losing streak."
    ],
    preTradeChecklist: [
      "Risk mode is selected intentionally.",
      "Stop loss distance is measured from the chart.",
      "Point value and account currency are understood.",
      "The trade fits the daily loss limit.",
      "The same method will be used in the journal after the trade."
    ],
    faq: [
      {
        question: "What is position sizing?",
        answer:
          "Position sizing is the process of choosing trade size based on planned risk, stop distance, and instrument value."
      },
      {
        question: "Should I use fixed risk or percent risk?",
        answer:
          "Percent risk scales with account size, while fixed risk can feel simpler. The better choice depends on your plan, consistency, and account stage."
      },
      {
        question: "Is position size the same as lot size?",
        answer:
          "Lot size is one way a broker expresses position size. The concept is the same: choose size so the trade risk stays controlled."
      },
      {
        question: "Why does stop loss distance affect size?",
        answer:
          "A wider stop means each lot risks more money. To keep risk fixed, position size usually needs to be smaller."
      }
    ],
    productCta: {
      title: "Build position sizing into your routine",
      description:
        "The Forex Risk Calculator Spreadsheet includes position size, daily loss, and journal fields for repeated use.",
      productSlug: "forex-risk-calculator-spreadsheet",
      buttonLabel: "View risk spreadsheet"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "Trading Session Converter",
    slug: "trading-session-converter",
    description: "View Asia, London, and New York sessions using your browser local time.",
    seoDescription: "Trading session converter showing active forex and gold sessions, next session, and best markets by session.",
    metaTitle: "Trading Session Converter for Forex and XAUUSD",
    metaDescription:
      "Check Asia, London, and New York forex session timing in your local time with market notes for gold and major pairs.",
    intro:
      "The Trading Session Converter shows major market sessions in your browser local time so you can plan around participation and volatility. It is especially useful for gold and major forex pairs, but session behavior can change around news.",
    category: "Trading Sessions",
    difficulty: "Beginner",
    marketTag: "Sessions",
    relatedTools: ["xauusd-profit-calculator", "news-risk-checklist", "breakout-true-or-fake-checklist"],
    relatedArticles: [
      "best-trading-sessions-for-gold",
      "london-session-trading-guide",
      "new-york-session-gold-trading-guide",
      "asia-session-trading-guide"
    ],
    howToUse: [
      "Open the tool during your trading day.",
      "Check active sessions and upcoming session timing.",
      "Match trade ideas to the session that usually supports that market.",
      "Review news risk before assuming a normal session pattern."
    ],
    exampleUseCase: "A gold trader can see whether a setup appears during London or New York, when XAUUSD often has stronger participation.",
    exampleCalculation: [
      "Asia session: 00:00 to 09:00 UTC.",
      "London session: 07:00 to 16:00 UTC.",
      "New York session: 12:00 to 21:00 UTC.",
      "If London and New York overlap, XAUUSD may have more participation, but news and liquidity conditions still matter."
    ],
    commonMistakes: [
      "Assuming every session behaves the same every day.",
      "Ignoring news that changes volatility.",
      "Trading a market outside its active hours without a plan."
    ],
    whenNotToUse: [
      "Do not use session timing as a standalone entry signal.",
      "Do not assume volatility will appear just because a session opens.",
      "Do not ignore holidays, central bank events, or abnormal liquidity conditions."
    ],
    preTradeChecklist: [
      "Current active session supports the market you trade.",
      "Upcoming news has been checked.",
      "Spread is normal for the instrument.",
      "The setup has enough time and volatility to develop.",
      "Risk size is adjusted for session conditions."
    ],
    faq: [
      {
        question: "What are the main forex trading sessions?",
        answer:
          "The main sessions tracked here are Asia, London, and New York. Each session can bring different liquidity and volatility conditions."
      },
      {
        question: "What is the best session for XAUUSD?",
        answer:
          "Many gold traders focus on London, New York, or the overlap, but the best session depends on volatility, news, spread, and your strategy."
      },
      {
        question: "Does this tool adjust to my local time?",
        answer:
          "Yes. The session converter uses browser local time to show session status in a more practical way."
      },
      {
        question: "Can news override session behavior?",
        answer:
          "Yes. High-impact events can create unusual spreads, volatility, or liquidity even during sessions that usually behave predictably."
      }
    ],
    productCta: {
      title: "Plan gold trades by session",
      description:
        "The Gold Session Trading Guide helps you prepare for Asia, London, and New York conditions with practical planning prompts.",
      productSlug: "gold-session-trading-guide",
      buttonLabel: "View session guide"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "Breakout True or Fake Checklist",
    slug: "breakout-true-or-fake-checklist",
    description: "Score breakout quality using liquidity, displacement, retest, bias, and session conditions.",
    seoDescription: "Breakout checklist for traders who want to filter weaker breakouts and wait for confirmation.",
    metaTitle: "Breakout True or Fake Checklist for Price Action Traders",
    metaDescription:
      "Score breakout quality using liquidity sweep, candle close, displacement, retest, higher-timeframe bias, session, and RR conditions.",
    intro:
      "This checklist helps you slow down before chasing a breakout. It scores observable conditions such as liquidity, displacement, retest quality, session timing, and reward-to-risk so you can separate cleaner breakouts from impulsive entries.",
    category: "Price Action",
    difficulty: "Intermediate",
    marketTag: "SMC",
    relatedTools: ["risk-reward-calculator", "smc-entry-checklist", "trading-session-converter"],
    relatedArticles: [
      "how-to-avoid-fake-breakouts",
      "breakout-true-or-fake-checklist",
      "what-is-a-liquidity-sweep-in-trading",
      "bos-and-choch-explained-simply"
    ],
    howToUse: [
      "Check each condition that is objectively present.",
      "Use the score as a planning aid, not a signal service.",
      "Wait when the checklist shows unclear confirmation.",
      "Pair the result with risk reward and session checks before entry."
    ],
    exampleUseCase: "A trader watching resistance break can score whether liquidity was swept, price closed beyond the level, and the retest held.",
    exampleCalculation: [
      "A resistance breakout sweeps liquidity, closes with a body beyond the level, and shows strong displacement.",
      "The retest holds, London session supports volatility, and planned RR is 1:2.",
      "If 7 of 9 checklist items are present, the score is about 78.",
      "The result suggests stronger confirmation, not a guaranteed trade."
    ],
    commonMistakes: [
      "Buying the first wick above resistance.",
      "Ignoring higher-timeframe bias.",
      "Calling every failed move manipulation without evidence."
    ],
    whenNotToUse: [
      "Do not use it when the level is unclear or drawn after the move.",
      "Do not use it to chase a candle that is already far from invalidation.",
      "Do not ignore major news, spread, or opposing higher-timeframe supply and demand."
    ],
    preTradeChecklist: [
      "Liquidity context is clear before the breakout.",
      "Breakout candle closes beyond the level with body.",
      "Retest has not invalidated the breakout.",
      "RR is at least acceptable before entry.",
      "Session and news conditions support execution."
    ],
    faq: [
      {
        question: "What makes a breakout more reliable?",
        answer:
          "Cleaner breakouts often have a clear level, liquidity context, body close, displacement, retest, session support, and acceptable risk reward."
      },
      {
        question: "Does a high checklist score guarantee a breakout?",
        answer:
          "No. A high score only means more confirmation conditions are present. It does not remove market risk."
      },
      {
        question: "Why include liquidity sweep in a breakout checklist?",
        answer:
          "Liquidity context can help traders avoid reacting to the first stop run or wick through a level without confirmation."
      },
      {
        question: "Should I enter before the retest?",
        answer:
          "That depends on your tested plan. Many traders wait for retest or continuation confirmation to avoid chasing extended moves."
      }
    ],
    productCta: {
      title: "Study breakout confirmation in more detail",
      description:
        "The Breakout True/Fake Playbook expands this checklist into retest rules, failure examples, and planning pages.",
      productSlug: "breakout-true-fake-playbook",
      buttonLabel: "View breakout playbook"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "SMC Entry Checklist",
    slug: "smc-entry-checklist",
    description: "Grade smart money concept entries using bias, liquidity, structure shift, POI, and risk conditions.",
    seoDescription: "SMC entry checklist for beginner and intermediate traders using liquidity sweeps, CHoCH/BOS, OB, and FVG concepts.",
    metaTitle: "SMC Entry Checklist for Liquidity, BOS, OB, and FVG Setups",
    metaDescription:
      "Grade SMC entry quality with higher-timeframe bias, liquidity sweep, CHoCH or BOS, order block or FVG, premium/discount, session, and risk checks.",
    intro:
      "The SMC Entry Checklist turns common smart money concepts into a structured pre-entry review. It helps you check bias, liquidity, structure, point of interest, invalidation, and risk instead of forcing labels onto every chart.",
    category: "Smart Money Concept",
    difficulty: "Intermediate",
    marketTag: "SMC",
    relatedTools: ["breakout-true-or-fake-checklist", "risk-reward-calculator", "news-risk-checklist"],
    relatedArticles: [
      "smc-entry-checklist-for-beginners",
      "order-block-trading-basics",
      "fair-value-gap-trading-basics",
      "premium-and-discount-zones-in-trading"
    ],
    howToUse: [
      "Only check conditions that are clear on your chart.",
      "Use the grade to slow down impulsive entries.",
      "Combine the checklist with risk planning before entry.",
      "Treat the grade as a process score, not a certainty score."
    ],
    exampleUseCase: "A trader can grade a potential order block entry after liquidity sweep and market structure shift.",
    exampleCalculation: [
      "HTF bias is bearish and buy-side liquidity was swept.",
      "A body-close CHoCH appears, price returns to a premium order block, and invalidation is clear.",
      "If 7 of 9 conditions are checked, the setup scores around 78 and grades A.",
      "The grade means conditions are cleaner; it does not mean the trade must win."
    ],
    commonMistakes: [
      "Forcing SMC labels onto unclear price action.",
      "Entering before confirmation.",
      "Treating an A+ grade as certainty."
    ],
    whenNotToUse: [
      "Do not use it when higher-timeframe bias is unclear.",
      "Do not use it to justify entries without invalidation.",
      "Do not trade a high grade through high-impact news without separate risk rules."
    ],
    preTradeChecklist: [
      "HTF bias is written down before lower-timeframe entry.",
      "Liquidity event is visible, not assumed.",
      "BOS or CHoCH is confirmed by body close.",
      "POI, invalidation, and RR are all defined.",
      "News and session conditions do not conflict with the setup."
    ],
    faq: [
      {
        question: "What does an A+ SMC grade mean?",
        answer:
          "It means more checklist conditions are present. It does not mean the setup is guaranteed to win."
      },
      {
        question: "Do I need both an order block and FVG?",
        answer:
          "Not always. Some plans use one or the other, but the point of interest should be clear and aligned with bias, liquidity, and invalidation."
      },
      {
        question: "Why include premium and discount?",
        answer:
          "Premium and discount can help traders avoid buying too high or selling too low relative to the selected dealing range."
      },
      {
        question: "Can beginners use this SMC checklist?",
        answer:
          "Yes, but beginners should define each concept clearly and review examples before using the checklist in live conditions."
      }
    ],
    productCta: {
      title: "Use a printable SMC entry worksheet",
      description:
        "The SMC Entry Checklist product gives you a structured PDF for liquidity, structure, POI, invalidation, and risk review.",
      productSlug: "smc-entry-checklist",
      buttonLabel: "View SMC checklist"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "Trade Journal Profit Calculator",
    slug: "trade-journal-profit-calculator",
    description: "Calculate winrate, gross profit, gross loss, net profit, profit factor, and expectancy.",
    seoDescription: "Trade journal calculator for analyzing performance, expectancy, and profit factor without relying on feelings.",
    metaTitle: "Trade Journal Profit Calculator for Winrate and Expectancy",
    metaDescription:
      "Calculate winrate, gross profit, gross loss, net profit, profit factor, and expectancy from your trading journal statistics.",
    intro:
      "The Trade Journal Profit Calculator turns completed trades into performance metrics. It helps you review the difference between how a strategy feels and what the numbers actually show over a sample.",
    category: "Trading Journal",
    difficulty: "Beginner",
    marketTag: "Journal",
    relatedTools: ["daily-loss-limit-calculator", "position-size-calculator", "compounding-calculator"],
    relatedArticles: [
      "how-to-build-a-trading-journal",
      "trading-journal-metrics-every-trader-should-track",
      "trading-psychology-rules-for-beginners",
      "how-to-avoid-overtrading"
    ],
    howToUse: [
      "Enter completed trade stats from your journal.",
      "Compare average win and average loss.",
      "Review expectancy to understand whether your process has an edge.",
      "Use the results to improve rules, not to judge one isolated trade."
    ],
    exampleUseCase: "A trader with 20 trades can review whether the strategy is improving after commissions and losses.",
    exampleCalculation: [
      "Trades: 20, wins: 9, losses: 11.",
      "Average win: $45 and average loss: $25.",
      "Gross profit: 9 x $45 = $405; gross loss: 11 x $25 = $275.",
      "Before fees, profit factor is 405 / 275 = 1.47 and expectancy is positive."
    ],
    commonMistakes: [
      "Judging a strategy from two or three trades.",
      "Tracking screenshots but not numbers.",
      "Ignoring fees and spread."
    ],
    whenNotToUse: [
      "Do not use a tiny sample to decide a strategy is proven.",
      "Do not mix different strategies without tagging them first.",
      "Do not ignore open trades, partial exits, commissions, or rule violations in your review."
    ],
    preTradeChecklist: [
      "The setup type is tagged before entry.",
      "Risk amount and RR are written down.",
      "Screenshot or notes are ready for later review.",
      "Daily loss limit has not been reached.",
      "You know exactly what metric will be reviewed after the trade."
    ],
    faq: [
      {
        question: "What is expectancy in trading?",
        answer:
          "Expectancy estimates average result per trade using winrate, average win, and average loss. It is more useful over a meaningful sample."
      },
      {
        question: "Is winrate the most important journal metric?",
        answer:
          "Not by itself. A lower winrate can still be workable if average wins are much larger than average losses, and a high winrate can fail with large losses."
      },
      {
        question: "How many trades should I review?",
        answer:
          "More data is better. Review small batches for behavior, but avoid making big conclusions from only a few trades."
      },
      {
        question: "Should I include commissions and fees?",
        answer:
          "Yes. Fees, spread, and commissions can materially change net profit, profit factor, and expectancy."
      }
    ],
    productCta: {
      title: "Track execution quality, not only P/L",
      description:
        "The Gold Scalping Journal includes trade log, screenshot notes, mistake tags, and weekly review prompts.",
      productSlug: "gold-scalping-journal",
      buttonLabel: "View trading journal"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "Daily Loss Limit Calculator",
    slug: "daily-loss-limit-calculator",
    description: "Set a daily stop amount and estimate how many losing trades should stop the session.",
    seoDescription: "Daily loss limit calculator for forex traders who want risk controls before the trading day starts.",
    metaTitle: "Daily Loss Limit Calculator for Forex Risk Control",
    metaDescription:
      "Calculate max daily loss amount and losing trades before stopping based on account balance, daily loss percent, and risk per trade.",
    intro:
      "The Daily Loss Limit Calculator helps you define a session stop before emotions are involved. It is designed to prevent one bad day from becoming a much larger drawdown through revenge trading or oversized recovery attempts.",
    category: "Risk Management",
    difficulty: "Beginner",
    marketTag: "Risk",
    relatedTools: ["lot-size-calculator", "position-size-calculator", "trade-journal-profit-calculator"],
    relatedArticles: [
      "daily-loss-limit-rule-for-forex-traders",
      "how-to-use-a-daily-loss-limit-calculator",
      "how-to-stop-revenge-trading",
      "beginner-guide-to-forex-risk-control"
    ],
    howToUse: [
      "Enter account balance and maximum daily loss percentage.",
      "Enter the planned risk per trade.",
      "Stop trading when the daily limit is reached.",
      "Write the stop rule before the first trade of the day."
    ],
    exampleUseCase: "If a trader risks 1% per trade and has a 3% daily limit, three full losses should end the day.",
    exampleCalculation: [
      "Account balance: $5,000.",
      "Max daily loss: 3%, which equals $150.",
      "Risk per trade: 1%, which equals $50.",
      "Maximum full-risk losing trades before stopping: 3."
    ],
    commonMistakes: [
      "Increasing risk to recover losses.",
      "Changing the daily stop after a bad trade.",
      "Counting only closed losses while ignoring open risk."
    ],
    whenNotToUse: [
      "Do not use it as permission to keep trading until the limit is hit.",
      "Do not raise the daily limit during the session.",
      "Do not ignore emotional state, news risk, or repeated execution mistakes just because the limit remains available."
    ],
    preTradeChecklist: [
      "Daily loss amount is written down.",
      "Risk per trade fits the daily cap.",
      "Open positions and pending orders are included in risk.",
      "Stop-trading rule is clear before the session begins.",
      "You have a review plan if the limit is reached."
    ],
    faq: [
      {
        question: "What is a daily loss limit?",
        answer:
          "A daily loss limit is the maximum amount or percentage you allow yourself to lose in a trading day before stopping."
      },
      {
        question: "Why use a daily loss limit?",
        answer:
          "It helps protect the account from emotional decisions, revenge trading, and oversized recovery attempts after losses."
      },
      {
        question: "Should the daily limit change during the day?",
        answer:
          "Usually no. Changing the limit after losses can weaken discipline and increase drawdown risk."
      },
      {
        question: "Does this include open trades?",
        answer:
          "You should include open risk and pending exposure when deciding whether your daily loss limit is close or already reached."
      }
    ],
    productCta: {
      title: "Write your stop-trading rules clearly",
      description:
        "The Trading Plan Template includes sections for daily loss rules, risk per trade, session limits, and review prompts.",
      productSlug: "trading-plan-template",
      buttonLabel: "View trading plan template"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "Compounding Calculator",
    slug: "compounding-calculator",
    description: "Project hypothetical account growth using monthly return assumptions and deposits.",
    seoDescription: "Trading compounding calculator for hypothetical growth planning without guaranteed performance claims.",
    metaTitle: "Trading Compounding Calculator for Hypothetical Planning",
    metaDescription:
      "Project hypothetical trading account growth from starting balance, monthly return assumptions, months, and optional deposits.",
    intro:
      "The Compounding Calculator helps you model hypothetical growth scenarios so you can see how return assumptions and deposits interact over time. It should be used for planning discipline, not for expecting a guaranteed result.",
    category: "Planning",
    difficulty: "Beginner",
    marketTag: "Risk",
    relatedTools: ["trade-journal-profit-calculator", "daily-loss-limit-calculator", "position-size-calculator"],
    relatedArticles: [
      "how-to-use-a-compounding-calculator-safely",
      "trading-journal-metrics-every-trader-should-track",
      "why-most-forex-traders-lose-money",
      "beginner-guide-to-forex-risk-control"
    ],
    howToUse: [
      "Enter starting balance and hypothetical monthly return.",
      "Add the number of months and optional deposit.",
      "Use the projection for planning, not expectation.",
      "Stress-test the idea with lower return assumptions and losing months."
    ],
    exampleUseCase: "A trader can test how consistent deposits affect long-term account size under different hypothetical return assumptions.",
    exampleCalculation: [
      "Starting balance: $1,000.",
      "Hypothetical monthly return: 3%.",
      "Monthly deposit: $100 for 12 months.",
      "The projection shows one possible path, but real trading can include drawdowns, flat months, and losses."
    ],
    commonMistakes: [
      "Treating projections as promises.",
      "Ignoring losing months and drawdowns.",
      "Using unrealistic monthly return assumptions."
    ],
    whenNotToUse: [
      "Do not use it to promise future account size.",
      "Do not use aggressive return assumptions to justify oversized risk.",
      "Do not ignore drawdown, withdrawals, fees, taxes, or inconsistent performance."
    ],
    preTradeChecklist: [
      "Projection assumptions are realistic and written down.",
      "Risk per trade remains controlled.",
      "Daily loss limit is more important than growth target.",
      "Journal metrics support the assumptions.",
      "You have considered losing months and drawdowns."
    ],
    faq: [
      {
        question: "Is compounding guaranteed in trading?",
        answer:
          "No. Compounding projections are hypothetical. Real trading results can include losing months, drawdowns, fees, and inconsistent performance."
      },
      {
        question: "What monthly return should I enter?",
        answer:
          "Use conservative hypothetical scenarios for planning. Avoid entering unrealistic returns that encourage excessive risk."
      },
      {
        question: "Should deposits be included?",
        answer:
          "Optional deposits can show how savings behavior affects a projection, but they are separate from trading performance."
      },
      {
        question: "Can this replace a trading journal?",
        answer:
          "No. A journal shows actual performance data, while this calculator only models hypothetical scenarios."
      }
    ],
    productCta: {
      title: "Plan growth around rules, not hopes",
      description:
        "The Trading Plan Template helps you define risk limits, review cadence, and realistic process rules before thinking about growth targets.",
      productSlug: "trading-plan-template",
      buttonLabel: "View trading plan template"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  },
  {
    title: "News Risk Checklist",
    slug: "news-risk-checklist",
    description: "Estimate news risk by checking high-impact events, abnormal spreads, volatility, and stop sensitivity.",
    seoDescription: "News risk checklist for forex and gold traders planning around CPI, NFP, FOMC, and other high-impact events.",
    metaTitle: "News Risk Checklist for Forex and Gold Traders",
    metaDescription:
      "Check high-impact USD news, spread, volatility, liquidity, and stop sensitivity before trading forex or XAUUSD around news events.",
    intro:
      "The News Risk Checklist helps you decide whether conditions are too unstable for your normal trade plan. It is built for moments when CPI, NFP, FOMC, interest rate decisions, abnormal spreads, or liquidity sweeps can make tight plans fragile.",
    category: "Risk Management",
    difficulty: "Beginner",
    marketTag: "News",
    relatedTools: ["trading-session-converter", "daily-loss-limit-calculator", "risk-reward-calculator"],
    relatedArticles: [
      "how-news-affects-gold-trading",
      "high-impact-news-risk-checklist-for-traders",
      "new-york-session-gold-trading-guide",
      "how-to-know-when-not-to-trade"
    ],
    howToUse: [
      "Check each news or volatility condition before entry.",
      "Reduce risk or wait when the tool shows high risk.",
      "Recheck conditions around major USD releases.",
      "Use the result with session timing and daily loss limits."
    ],
    exampleUseCase: "A gold trader considering a tight-stop setup before CPI can review whether spreads and volatility make the plan fragile.",
    exampleCalculation: [
      "High-impact USD news is scheduled today.",
      "Price is near major liquidity and spread is wider than usual.",
      "The setup depends on a tight stop loss.",
      "The checklist would likely show elevated risk and suggest reducing risk or waiting."
    ],
    commonMistakes: [
      "Trading into high-impact news without a plan.",
      "Using tight stops during abnormal spread.",
      "Ignoring liquidity magnets near news time."
    ],
    whenNotToUse: [
      "Do not use it as a live economic calendar.",
      "Do not rely on it without checking actual news times from a trusted calendar.",
      "Do not treat low checklist risk as permission to ignore stop loss, spread, or position size."
    ],
    preTradeChecklist: [
      "Economic calendar has been checked.",
      "Spread is normal enough for the setup.",
      "Volatility matches your stop loss plan.",
      "Liquidity levels around news are identified.",
      "Risk is reduced or trade is skipped when conditions are unstable."
    ],
    faq: [
      {
        question: "What news events affect gold trading?",
        answer:
          "Gold can react strongly to CPI, NFP, FOMC, interest rate decisions, unemployment data, and unexpected USD or yield-related events."
      },
      {
        question: "Should beginners trade high-impact news?",
        answer:
          "Many beginners are better served by observing first because spreads, slippage, and volatility can change quickly around major releases."
      },
      {
        question: "Can news risk affect forex pairs too?",
        answer:
          "Yes. USD news can affect major pairs, gold, indices, and market sentiment, especially during London or New York sessions."
      },
      {
        question: "Does this replace an economic calendar?",
        answer:
          "No. Use this checklist with a reliable economic calendar and your broker's live spread conditions."
      }
    ],
    productCta: {
      title: "Add news rules to your session plan",
      description:
        "The Gold Session Trading Guide includes volatility and news-risk prompts for planning XAUUSD around active sessions.",
      productSlug: "gold-session-trading-guide",
      buttonLabel: "View gold session guide"
    },
    riskDisclaimer: TOOL_RISK_DISCLAIMER
  }
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(slugs: string[]) {
  return slugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is TradingTool => Boolean(tool));
}
