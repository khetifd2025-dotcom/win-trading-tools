"use client";

import { useEffect, useMemo, useState } from "react";
import CalculatorInput from "@/components/CalculatorInput";
import SessionBadge from "@/components/SessionBadge";
import SetupGradeBadge from "@/components/SetupGradeBadge";
import {
  calculateChecklistScore,
  calculateCompounding,
  calculateDailyLossLimit,
  calculateLotSize,
  calculateNewsRisk,
  calculatePointValue,
  calculatePositionSize,
  calculateRiskReward,
  calculateTradeJournal,
  calculateXauusdProfit,
  getBreakoutResult,
  getSessionState,
  getSmcGrade,
  type TradeDirection
} from "@/lib/calculators";
import { formatCurrency, formatNumber, toNumber } from "@/lib/utils";

function ResultCard({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "neutral" | "good" | "bad" }) {
  const toneClass =
    tone === "good" ? "text-emerald-200" : tone === "bad" ? "text-red-200" : "text-white";

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <p className={`mt-2 text-xl font-semibold ${toneClass}`}>{value}</p>
    </div>
  );
}

function WarningList({ warnings }: { warnings: string[] }) {
  if (warnings.length === 0) return null;
  return (
    <div className="rounded-lg border border-gold-400/30 bg-gold-400/10 p-4">
      <p className="text-sm font-semibold text-gold-100">Planning warnings</p>
      <ul className="mt-2 grid gap-1 text-sm text-gold-50">
        {warnings.map((warning) => (
          <li key={warning}>- {warning}</li>
        ))}
      </ul>
    </div>
  );
}

function DirectionSelect({
  value,
  onChange
}: {
  value: TradeDirection;
  onChange: (value: TradeDirection) => void;
}) {
  return (
    <label className="grid gap-2 text-sm text-zinc-300">
      <span>Direction</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as TradeDirection)}
        className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
      >
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
    </label>
  );
}

function ChecklistTool({
  items,
  resultForScore,
  footer
}: {
  items: string[];
  resultForScore: (score: number) => string;
  footer?: string;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const checkedCount = items.filter((item) => checked[item]).length;
  const score = calculateChecklistScore(items.length, checkedCount);
  const result = resultForScore(score);

  return (
    <div className="grid gap-5">
      <div className="grid gap-3">
        {items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3 text-sm text-zinc-200"
          >
            <input
              type="checkbox"
              checked={Boolean(checked[item])}
              onChange={(event) =>
                setChecked((current) => ({ ...current, [item]: event.target.checked }))
              }
              className="mt-1 h-4 w-4 accent-gold-400"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Score" value={`${score}/100`} />
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Result</p>
          <div className="mt-2">
            <SetupGradeBadge grade={result} />
          </div>
        </div>
      </div>
      {footer ? <p className="text-sm leading-6 text-zinc-400">{footer}</p> : null}
    </div>
  );
}

function LotSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState("1000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [stopLossPoints, setStopLossPoints] = useState("100");
  const [pointValue, setPointValue] = useState("1");

  const result = calculateLotSize({
    accountBalance: toNumber(accountBalance),
    riskPercent: toNumber(riskPercent),
    stopLossPoints: toNumber(stopLossPoints),
    pointValue: toNumber(pointValue)
  });

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorInput label="Account balance" value={accountBalance} onChange={setAccountBalance} min="0" />
        <CalculatorInput label="Risk percentage" value={riskPercent} onChange={setRiskPercent} min="0" />
        <CalculatorInput label="Stop loss in points/pips" value={stopLossPoints} onChange={setStopLossPoints} min="0" />
        <CalculatorInput label="Point value per lot" value={pointValue} onChange={setPointValue} min="0" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Risk amount" value={formatCurrency(result.riskAmount)} />
        <ResultCard label="Suggested lot size" value={formatNumber(result.lotSize, 3)} />
      </div>
      <WarningList warnings={result.warnings} />
    </div>
  );
}

function RiskRewardCalculator() {
  const [direction, setDirection] = useState<TradeDirection>("buy");
  const [entryPrice, setEntryPrice] = useState("2350");
  const [stopLossPrice, setStopLossPrice] = useState("2348");
  const [takeProfitPrice, setTakeProfitPrice] = useState("2355");

  const result = calculateRiskReward({
    direction,
    entryPrice: toNumber(entryPrice),
    stopLossPrice: toNumber(stopLossPrice),
    takeProfitPrice: toNumber(takeProfitPrice)
  });

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <DirectionSelect value={direction} onChange={setDirection} />
        <CalculatorInput label="Entry price" value={entryPrice} onChange={setEntryPrice} />
        <CalculatorInput label="Stop loss price" value={stopLossPrice} onChange={setStopLossPrice} />
        <CalculatorInput label="Take profit price" value={takeProfitPrice} onChange={setTakeProfitPrice} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard label="Risk distance" value={formatNumber(result.riskDistance, 4)} />
        <ResultCard label="Reward distance" value={formatNumber(result.rewardDistance, 4)} />
        <ResultCard label="RR ratio" value={`1:${formatNumber(result.rrRatio, 2)}`} />
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Setup grade</p>
          <div className="mt-2">
            <SetupGradeBadge grade={result.setupGrade} />
          </div>
        </div>
      </div>
      <WarningList warnings={result.warnings} />
    </div>
  );
}

function XauusdProfitCalculator() {
  const [direction, setDirection] = useState<TradeDirection>("buy");
  const [entryPrice, setEntryPrice] = useState("2350");
  const [exitPrice, setExitPrice] = useState("2352.5");
  const [lotSize, setLotSize] = useState("0.1");

  const result = calculateXauusdProfit({
    direction,
    entryPrice: toNumber(entryPrice),
    exitPrice: toNumber(exitPrice),
    lotSize: toNumber(lotSize)
  });

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <DirectionSelect value={direction} onChange={setDirection} />
        <CalculatorInput label="Entry price" value={entryPrice} onChange={setEntryPrice} />
        <CalculatorInput label="Exit price" value={exitPrice} onChange={setExitPrice} />
        <CalculatorInput label="Lot size" value={lotSize} onChange={setLotSize} min="0" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard label="Points gained/lost" value={formatNumber(result.points, 2)} tone={result.profit >= 0 ? "good" : "bad"} />
        <ResultCard label="Estimated P/L" value={formatCurrency(result.profit)} tone={result.profit >= 0 ? "good" : "bad"} />
        <ResultCard label="Trade result" value={result.result} tone={result.profit > 0 ? "good" : result.profit < 0 ? "bad" : "neutral"} />
      </div>
      <p className="text-sm leading-6 text-zinc-400">
        XAUUSD estimate uses a simple approximation: 1.00 price movement with 1.00 lot is approximately $100. Broker contract size, spread, and commissions may differ.
      </p>
    </div>
  );
}

function PipPointCalculator() {
  const [marketType, setMarketType] = useState<"forex" | "gold">("gold");
  const [entryPrice, setEntryPrice] = useState("2350");
  const [exitPrice, setExitPrice] = useState("2351");
  const [lotSize, setLotSize] = useState("0.1");
  const [valuePerPoint, setValuePerPoint] = useState("100");

  const result = calculatePointValue({
    marketType,
    entryPrice: toNumber(entryPrice),
    exitPrice: toNumber(exitPrice),
    lotSize: toNumber(lotSize),
    valuePerPoint: toNumber(valuePerPoint)
  });

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-zinc-300">
          <span>Market type</span>
          <select
            value={marketType}
            onChange={(event) => setMarketType(event.target.value as "forex" | "gold")}
            className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          >
            <option value="gold">Gold</option>
            <option value="forex">Forex</option>
          </select>
        </label>
        <CalculatorInput label="Entry price" value={entryPrice} onChange={setEntryPrice} />
        <CalculatorInput label="Exit price" value={exitPrice} onChange={setExitPrice} />
        <CalculatorInput label="Lot size" value={lotSize} onChange={setLotSize} min="0" />
        <CalculatorInput label="Value per point" value={valuePerPoint} onChange={setValuePerPoint} min="0" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Point distance" value={formatNumber(result.pointDistance, 4)} />
        <ResultCard label="Estimated value" value={formatCurrency(result.estimatedValue)} />
      </div>
    </div>
  );
}

function PositionSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState("1000");
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [riskMode, setRiskMode] = useState<"percent" | "amount">("percent");
  const [riskPercent, setRiskPercent] = useState("1");
  const [riskAmount, setRiskAmount] = useState("10");
  const [stopLossPoints, setStopLossPoints] = useState("100");
  const [pointValue, setPointValue] = useState("1");

  const result = calculatePositionSize({
    accountBalance: toNumber(accountBalance),
    accountCurrency,
    riskMode,
    riskPercent: toNumber(riskPercent),
    riskAmount: toNumber(riskAmount),
    stopLossPoints: toNumber(stopLossPoints),
    pointValue: toNumber(pointValue)
  });

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorInput label="Account balance" value={accountBalance} onChange={setAccountBalance} min="0" />
        <CalculatorInput label="Account currency" value={accountCurrency} onChange={setAccountCurrency} type="text" />
        <label className="grid gap-2 text-sm text-zinc-300">
          <span>Risk input mode</span>
          <select
            value={riskMode}
            onChange={(event) => setRiskMode(event.target.value as "percent" | "amount")}
            className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          >
            <option value="percent">Risk percentage</option>
            <option value="amount">Direct risk amount</option>
          </select>
        </label>
        {riskMode === "percent" ? (
          <CalculatorInput label="Risk percentage" value={riskPercent} onChange={setRiskPercent} min="0" />
        ) : (
          <CalculatorInput label="Risk amount" value={riskAmount} onChange={setRiskAmount} min="0" />
        )}
        <CalculatorInput label="Stop loss in points/pips" value={stopLossPoints} onChange={setStopLossPoints} min="0" />
        <CalculatorInput label="Point value per lot" value={pointValue} onChange={setPointValue} min="0" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label={`Risk amount (${result.accountCurrency})`} value={formatNumber(result.riskAmount, 2)} />
        <ResultCard label="Position size" value={formatNumber(result.positionSize, 3)} />
      </div>
      <WarningList warnings={result.warnings} />
    </div>
  );
}

function TradingSessionConverter() {
  const [sessionState, setSessionState] = useState<ReturnType<typeof getSessionState> | null>(null);

  useEffect(() => {
    const updateSession = () => setSessionState(getSessionState(new Date()));
    const firstUpdate = window.setTimeout(updateSession, 0);
    const timer = window.setInterval(updateSession, 60_000);
    return () => {
      window.clearTimeout(firstUpdate);
      window.clearInterval(timer);
    };
  }, []);

  if (!sessionState) {
    return <p className="text-sm text-zinc-400">Loading local session time...</p>;
  }

  const activeNames = sessionState.activeSessions.map((session) => session.name);

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard label="Current local time" value={sessionState.localTime} />
        <ResultCard
          label="Active session"
          value={activeNames.length ? activeNames.join(" + ") : "No major session"}
        />
        <ResultCard label="Next session" value={sessionState.nextSession.name} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {sessionState.sessions.map((session) => {
          const active = activeNames.includes(session.name);
          return (
            <div key={session.name} className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-white">{session.name}</h3>
                <SessionBadge label={active ? "Active" : "Closed"} active={active} />
              </div>
              <p className="mt-2 text-sm text-zinc-500">
                {String(session.startUtc).padStart(2, "0")}:00 - {String(session.endUtc).padStart(2, "0")}:00 UTC
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-zinc-500">Best markets by session</p>
              <ul className="mt-2 grid gap-1 text-sm text-zinc-300">
                {session.markets.map((market) => (
                  <li key={market}>- {market}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="text-sm leading-6 text-zinc-400">
        Session behavior changes depending on news, volatility, liquidity, and market condition.
      </p>
    </div>
  );
}

function TradeJournalCalculator() {
  const [numberOfTrades, setNumberOfTrades] = useState("20");
  const [wins, setWins] = useState("10");
  const [losses, setLosses] = useState("10");
  const [averageWin, setAverageWin] = useState("45");
  const [averageLoss, setAverageLoss] = useState("30");
  const [fees, setFees] = useState("20");

  const result = calculateTradeJournal({
    numberOfTrades: toNumber(numberOfTrades),
    wins: toNumber(wins),
    losses: toNumber(losses),
    averageWin: toNumber(averageWin),
    averageLoss: toNumber(averageLoss),
    fees: toNumber(fees)
  });

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CalculatorInput label="Number of trades" value={numberOfTrades} onChange={setNumberOfTrades} min="0" />
        <CalculatorInput label="Wins" value={wins} onChange={setWins} min="0" />
        <CalculatorInput label="Losses" value={losses} onChange={setLosses} min="0" />
        <CalculatorInput label="Average win" value={averageWin} onChange={setAverageWin} min="0" />
        <CalculatorInput label="Average loss" value={averageLoss} onChange={setAverageLoss} min="0" />
        <CalculatorInput label="Fees / commissions" value={fees} onChange={setFees} min="0" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard label="Winrate" value={`${formatNumber(result.winrate, 2)}%`} />
        <ResultCard label="Gross profit" value={formatCurrency(result.grossProfit)} tone="good" />
        <ResultCard label="Gross loss" value={formatCurrency(result.grossLoss)} tone="bad" />
        <ResultCard label="Net profit" value={formatCurrency(result.netProfit)} tone={result.netProfit >= 0 ? "good" : "bad"} />
        <ResultCard label="Profit factor" value={Number.isFinite(result.profitFactor) ? formatNumber(result.profitFactor, 2) : "N/A"} />
        <ResultCard label="Expectancy" value={formatCurrency(result.expectancy)} tone={result.expectancy >= 0 ? "good" : "bad"} />
      </div>
    </div>
  );
}

function DailyLossLimitCalculator() {
  const [accountBalance, setAccountBalance] = useState("1000");
  const [maxDailyLossPercent, setMaxDailyLossPercent] = useState("3");
  const [riskPerTradePercent, setRiskPerTradePercent] = useState("1");

  const result = calculateDailyLossLimit({
    accountBalance: toNumber(accountBalance),
    maxDailyLossPercent: toNumber(maxDailyLossPercent),
    riskPerTradePercent: toNumber(riskPerTradePercent)
  });

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <CalculatorInput label="Account balance" value={accountBalance} onChange={setAccountBalance} min="0" />
        <CalculatorInput label="Max daily loss percent" value={maxDailyLossPercent} onChange={setMaxDailyLossPercent} min="0" />
        <CalculatorInput label="Risk per trade percent" value={riskPerTradePercent} onChange={setRiskPerTradePercent} min="0" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Max daily loss amount" value={formatCurrency(result.maxDailyLossAmount)} />
        <ResultCard label="Max losing trades before stop" value={String(result.maxLosingTrades)} />
      </div>
      <WarningList warnings={result.warnings} />
    </div>
  );
}

function CompoundingCalculator() {
  const [startingBalance, setStartingBalance] = useState("1000");
  const [monthlyReturnPercent, setMonthlyReturnPercent] = useState("3");
  const [months, setMonths] = useState("12");
  const [monthlyDeposit, setMonthlyDeposit] = useState("0");

  const result = calculateCompounding({
    startingBalance: toNumber(startingBalance),
    monthlyReturnPercent: toNumber(monthlyReturnPercent),
    months: Math.max(0, Math.floor(toNumber(months))),
    monthlyDeposit: toNumber(monthlyDeposit)
  });

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorInput label="Starting balance" value={startingBalance} onChange={setStartingBalance} min="0" />
        <CalculatorInput label="Average monthly return percent" value={monthlyReturnPercent} onChange={setMonthlyReturnPercent} />
        <CalculatorInput label="Number of months" value={months} onChange={setMonths} min="0" step="1" />
        <CalculatorInput label="Monthly deposit optional" value={monthlyDeposit} onChange={setMonthlyDeposit} min="0" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard label="Projected balance" value={formatCurrency(result.projectedBalance)} />
        <ResultCard label="Total deposits" value={formatCurrency(result.totalDeposits)} />
        <ResultCard label="Total growth" value={formatCurrency(result.totalGrowth)} tone={result.totalGrowth >= 0 ? "good" : "bad"} />
      </div>
      <p className="text-sm leading-6 text-zinc-400">
        Projection is hypothetical and not guaranteed. Real trading includes losing periods, execution costs, and changing market conditions.
      </p>
    </div>
  );
}

function NewsRiskChecklist() {
  const items = [
    "High impact USD news today",
    "FOMC / CPI / NFP / interest rate decision",
    "Spread is wider than usual",
    "Price is near major liquidity",
    "Volatility is abnormal",
    "Trade setup depends on tight stop loss"
  ];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const checkedCount = items.filter((item) => checked[item]).length;
  const result = useMemo(() => calculateNewsRisk(checkedCount, items.length), [checkedCount, items.length]);

  return (
    <div className="grid gap-5">
      <div className="grid gap-3">
        {items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-3 text-sm text-zinc-200"
          >
            <input
              type="checkbox"
              checked={Boolean(checked[item])}
              onChange={(event) =>
                setChecked((current) => ({ ...current, [item]: event.target.checked }))
              }
              className="mt-1 h-4 w-4 accent-gold-400"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="News risk score" value={`${result.score}/100`} />
        <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Risk level</p>
          <div className="mt-2">
            <SetupGradeBadge grade={`${result.level} news risk`} />
          </div>
        </div>
      </div>
      <p className="text-sm leading-6 text-zinc-400">{result.suggestion}</p>
    </div>
  );
}

export default function ToolCalculator({ toolSlug }: { toolSlug: string }) {
  const breakoutItems = [
    "Liquidity was swept before breakout",
    "Candle closed beyond level with body",
    "Strong displacement after breakout",
    "Retest holds the broken level",
    "HTF bias supports the breakout",
    "No major liquidity directly against the trade",
    "Session supports volatility",
    "Breakout did not happen into major supply/demand",
    "Risk reward is at least 1:2"
  ];

  const smcItems = [
    "HTF bias is clear",
    "Liquidity swept",
    "CHoCH or BOS confirmed by body close",
    "OB or FVG available",
    "Entry is in discount for buy or premium for sell",
    "Invalidation level is clear",
    "RR is at least 1:2",
    "Session timing supports the trade",
    "No high impact news risk nearby"
  ];

  switch (toolSlug) {
    case "lot-size-calculator":
      return <LotSizeCalculator />;
    case "risk-reward-calculator":
      return <RiskRewardCalculator />;
    case "xauusd-profit-calculator":
      return <XauusdProfitCalculator />;
    case "pip-point-calculator":
      return <PipPointCalculator />;
    case "position-size-calculator":
      return <PositionSizeCalculator />;
    case "trading-session-converter":
      return <TradingSessionConverter />;
    case "breakout-true-or-fake-checklist":
      return (
        <ChecklistTool
          items={breakoutItems}
          resultForScore={getBreakoutResult}
          footer="The score is a structured planning aid. It does not mean a breakout is guaranteed to continue."
        />
      );
    case "smc-entry-checklist":
      return (
        <ChecklistTool
          items={smcItems}
          resultForScore={(score) => getSmcGrade(score)}
          footer="A+ does not mean guaranteed win. It only means conditions are cleaner according to this checklist."
        />
      );
    case "trade-journal-profit-calculator":
      return <TradeJournalCalculator />;
    case "daily-loss-limit-calculator":
      return <DailyLossLimitCalculator />;
    case "compounding-calculator":
      return <CompoundingCalculator />;
    case "news-risk-checklist":
      return <NewsRiskChecklist />;
    default:
      return <p className="text-sm text-zinc-400">This tool is being prepared.</p>;
  }
}
