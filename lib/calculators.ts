import { clamp } from "@/lib/utils";

export type TradeDirection = "buy" | "sell";

function nonNegative(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function calculateLotSize(input: {
  accountBalance: number;
  riskPercent: number;
  stopLossPoints: number;
  pointValue: number;
}) {
  const warnings: string[] = [];
  const accountBalance = nonNegative(input.accountBalance);
  const riskPercent = nonNegative(input.riskPercent);
  const stopLossPoints = nonNegative(input.stopLossPoints);
  const pointValue = nonNegative(input.pointValue);

  if (input.accountBalance <= 0) {
    warnings.push("Account balance should be greater than zero.");
  }
  if (riskPercent <= 0) {
    warnings.push("Risk percentage should be greater than zero.");
  }
  if (riskPercent > 3) {
    warnings.push("Risk above 3% per trade can create large drawdowns.");
  }
  if (input.stopLossPoints <= 0) {
    warnings.push("Stop loss distance must be greater than zero.");
  }
  if (input.pointValue <= 0) {
    warnings.push("Point value must be greater than zero.");
  }

  const riskAmount = accountBalance * (riskPercent / 100);
  const denominator = stopLossPoints * pointValue;
  const lotSize = denominator > 0 ? riskAmount / denominator : 0;

  return {
    riskAmount,
    lotSize,
    warnings
  };
}

export function calculateRiskReward(input: {
  direction: TradeDirection;
  entryPrice: number;
  stopLossPrice: number;
  takeProfitPrice: number;
}) {
  const warnings: string[] = [];
  const { direction, entryPrice, stopLossPrice, takeProfitPrice } = input;

  if (entryPrice <= 0 || stopLossPrice <= 0 || takeProfitPrice <= 0) {
    warnings.push("Prices should be greater than zero.");
  }
  if (direction === "buy") {
    if (stopLossPrice >= entryPrice) {
      warnings.push("For a buy setup, stop loss should be below entry.");
    }
    if (takeProfitPrice <= entryPrice) {
      warnings.push("For a buy setup, take profit should be above entry.");
    }
  }

  if (direction === "sell") {
    if (stopLossPrice <= entryPrice) {
      warnings.push("For a sell setup, stop loss should be above entry.");
    }
    if (takeProfitPrice >= entryPrice) {
      warnings.push("For a sell setup, take profit should be below entry.");
    }
  }

  const riskDistance = Math.abs(entryPrice - stopLossPrice);
  const rewardDistance = Math.abs(takeProfitPrice - entryPrice);
  if (riskDistance === 0) {
    warnings.push("Entry and stop loss cannot be the same price.");
  }
  if (rewardDistance === 0) {
    warnings.push("Entry and take profit cannot be the same price.");
  }
  const rrRatio = riskDistance > 0 ? rewardDistance / riskDistance : 0;

  let setupGrade = "Weak";
  if (rrRatio >= 4) setupGrade = "Excellent";
  else if (rrRatio >= 2.5) setupGrade = "Strong";
  else if (rrRatio >= 1.5) setupGrade = "Good";

  return {
    riskDistance,
    rewardDistance,
    rrRatio,
    setupGrade,
    warnings
  };
}

export function calculateXauusdProfit(input: {
  direction: TradeDirection;
  entryPrice: number;
  exitPrice: number;
  lotSize: number;
}) {
  const lotSize = nonNegative(input.lotSize);
  const priceDifference =
    input.direction === "buy"
      ? input.exitPrice - input.entryPrice
      : input.entryPrice - input.exitPrice;
  const profit = priceDifference * lotSize * 100;
  const result = profit > 0 ? "profit" : profit < 0 ? "loss" : "breakeven";

  return {
    points: priceDifference,
    profit,
    result
  };
}

export function calculatePointValue(input: {
  marketType: "forex" | "gold";
  entryPrice: number;
  exitPrice: number;
  lotSize: number;
  valuePerPoint: number;
}) {
  const lotSize = nonNegative(input.lotSize);
  const valuePerPoint = nonNegative(input.valuePerPoint);
  const pointDistance = Math.abs(input.exitPrice - input.entryPrice);
  const estimatedValue = pointDistance * lotSize * valuePerPoint;

  return {
    pointDistance,
    estimatedValue
  };
}

export function calculatePositionSize(input: {
  accountBalance: number;
  accountCurrency: string;
  riskMode: "percent" | "amount";
  riskPercent: number;
  riskAmount: number;
  stopLossPoints: number;
  pointValue: number;
}) {
  const accountBalance = nonNegative(input.accountBalance);
  const riskPercent = nonNegative(input.riskPercent);
  const riskAmountInput = nonNegative(input.riskAmount);
  const stopLossPoints = nonNegative(input.stopLossPoints);
  const pointValue = nonNegative(input.pointValue);
  const effectiveRiskAmount =
    input.riskMode === "amount"
      ? riskAmountInput
      : accountBalance * (riskPercent / 100);

  const denominator = stopLossPoints * pointValue;
  const positionSize = denominator > 0 ? effectiveRiskAmount / denominator : 0;
  const warnings: string[] = [];

  if (input.accountBalance <= 0) {
    warnings.push("Account balance should be greater than zero.");
  }
  if (input.riskMode === "amount" && input.riskAmount <= 0) {
    warnings.push("Risk amount should be greater than zero.");
  }
  if (input.riskMode === "percent" && riskPercent <= 0) {
    warnings.push("Risk percentage should be greater than zero.");
  }
  if (input.riskMode === "percent" && riskPercent > 3) {
    warnings.push("Risk per trade is above a conservative beginner range.");
  }
  if (input.stopLossPoints <= 0) {
    warnings.push("Stop loss distance must be greater than zero.");
  }

  return {
    accountCurrency: input.accountCurrency,
    riskAmount: effectiveRiskAmount,
    positionSize,
    warnings
  };
}

export const tradingSessions = [
  {
    name: "Asia",
    startUtc: 0,
    endUtc: 9,
    markets: ["USDJPY", "AUDJPY", "XAUUSD usually lower volatility unless news"]
  },
  {
    name: "London",
    startUtc: 7,
    endUtc: 16,
    markets: ["GBPUSD", "EURUSD", "XAUUSD"]
  },
  {
    name: "New York",
    startUtc: 12,
    endUtc: 21,
    markets: ["XAUUSD", "EURUSD", "GBPUSD", "NAS100"]
  }
];

export function getSessionState(now = new Date()) {
  const utcHour = now.getUTCHours() + now.getUTCMinutes() / 60;
  const activeSessions = tradingSessions.filter(
    (session) => utcHour >= session.startUtc && utcHour < session.endUtc
  );
  const nextSession =
    tradingSessions.find((session) => utcHour < session.startUtc) ||
    tradingSessions[0];

  return {
    localTime: now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    }),
    utcHour,
    activeSessions,
    nextSession,
    sessions: tradingSessions
  };
}

export function calculateChecklistScore(totalItems: number, checkedItems: number) {
  if (totalItems <= 0) return 0;
  return Math.round(clamp((checkedItems / totalItems) * 100, 0, 100));
}

export function getBreakoutResult(score: number) {
  if (score <= 40) return "Likely Fake Breakout";
  if (score <= 70) return "Wait for Confirmation";
  if (score <= 85) return "Stronger Breakout Confirmation";
  return "High Quality Breakout Conditions";
}

export function getSmcGrade(score: number) {
  if (score <= 40) return "C";
  if (score <= 60) return "B";
  if (score <= 80) return "A";
  return "A+";
}

export function calculateTradeJournal(input: {
  numberOfTrades: number;
  wins: number;
  losses: number;
  averageWin: number;
  averageLoss: number;
  fees: number;
}) {
  const wins = Math.floor(nonNegative(input.wins));
  const losses = Math.floor(nonNegative(input.losses));
  const numberOfTrades = Math.max(Math.floor(nonNegative(input.numberOfTrades)), wins + losses);
  const averageWin = nonNegative(input.averageWin);
  const averageLoss = nonNegative(input.averageLoss);
  const fees = nonNegative(input.fees);
  const winrate = numberOfTrades > 0 ? (wins / numberOfTrades) * 100 : 0;
  const grossProfit = wins * averageWin;
  const grossLoss = losses * averageLoss;
  const netProfit = grossProfit - grossLoss - fees;
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;
  const expectancy =
    numberOfTrades > 0 ? netProfit / numberOfTrades : 0;

  return {
    winrate,
    grossProfit,
    grossLoss,
    netProfit,
    profitFactor,
    expectancy
  };
}

export function calculateDailyLossLimit(input: {
  accountBalance: number;
  maxDailyLossPercent: number;
  riskPerTradePercent: number;
}) {
  const accountBalance = nonNegative(input.accountBalance);
  const maxDailyLossPercent = nonNegative(input.maxDailyLossPercent);
  const riskPerTradePercent = nonNegative(input.riskPerTradePercent);
  const maxDailyLossAmount = accountBalance * (maxDailyLossPercent / 100);
  const riskPerTradeAmount = accountBalance * (riskPerTradePercent / 100);
  const maxLosingTrades =
    riskPerTradeAmount > 0 ? Math.floor(maxDailyLossAmount / riskPerTradeAmount) : 0;
  const warnings: string[] = [];

  if (input.accountBalance <= 0) {
    warnings.push("Account balance should be greater than zero.");
  }
  if (maxDailyLossPercent <= 0) {
    warnings.push("Daily loss limit should be greater than zero.");
  }
  if (riskPerTradePercent <= 0) {
    warnings.push("Risk per trade should be greater than zero.");
  }
  if (riskPerTradePercent > 2) {
    warnings.push("Risk per trade above 2% can reach a daily stop quickly.");
  }
  if (riskPerTradePercent > maxDailyLossPercent) {
    warnings.push("One losing trade can exceed the daily loss limit.");
  }

  return {
    maxDailyLossAmount,
    maxLosingTrades,
    warnings
  };
}

export function calculateCompounding(input: {
  startingBalance: number;
  monthlyReturnPercent: number;
  months: number;
  monthlyDeposit: number;
}) {
  let balance = nonNegative(input.startingBalance);
  const monthlyReturnPercent = Math.max(-100, Number.isFinite(input.monthlyReturnPercent) ? input.monthlyReturnPercent : 0);
  const months = Math.floor(nonNegative(input.months));
  const monthlyDeposit = nonNegative(input.monthlyDeposit);
  let totalDeposits = balance;

  for (let month = 0; month < months; month += 1) {
    balance += monthlyDeposit;
    totalDeposits += monthlyDeposit;
    balance *= 1 + monthlyReturnPercent / 100;
  }

  return {
    projectedBalance: balance,
    totalDeposits,
    totalGrowth: balance - totalDeposits
  };
}

export function calculateNewsRisk(checkedItems: number, totalItems: number) {
  const score = calculateChecklistScore(totalItems, checkedItems);
  if (score >= 67) {
    return {
      score,
      level: "High",
      suggestion: "Consider reducing risk, waiting for spreads to normalize, or skipping the setup."
    };
  }
  if (score >= 34) {
    return {
      score,
      level: "Medium",
      suggestion: "Trade planning should account for wider spreads and faster price movement."
    };
  }
  return {
    score,
    level: "Low",
    suggestion: "News risk appears lower, but conditions can change quickly."
  };
}
