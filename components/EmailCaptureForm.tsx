"use client";

import { useState } from "react";
import { MAIN_MARKETS, TRADING_LEVELS } from "@/lib/constants";

type Props = {
  compact?: boolean;
  showTradingLevel?: boolean;
  showMainMarket?: boolean;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EmailCaptureForm({
  compact = false,
  showTradingLevel = false,
  showMainMarket = true
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tradingLevel, setTradingLevel] = useState("beginner");
  const [mainMarket, setMainMarket] = useState("XAUUSD");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      setStatus("error");
      setMessage("Enter your name and email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          tradingLevel: showTradingLevel ? tradingLevel : undefined,
          mainMarket: showMainMarket ? mainMarket : undefined
        })
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message);
      setStatus("success");
      setMessage(data.message || "You're on the list. Check your inbox soon.");
      setName("");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "grid gap-2" : "grid gap-4"}>
      <div className={compact ? "grid gap-2" : "grid gap-3 sm:grid-cols-2"}>
        <label className="grid gap-2 text-sm text-zinc-300">
          <span>Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            placeholder="Your name"
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          <span>Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            placeholder="you@example.com"
            type="email"
            required
          />
        </label>
      </div>

      {showTradingLevel ? (
        <label className="grid gap-2 text-sm text-zinc-300">
          <span>Trading level</span>
          <select
            value={tradingLevel}
            onChange={(event) => setTradingLevel(event.target.value)}
            className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          >
            {TRADING_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      {showMainMarket ? (
        <label className="grid gap-2 text-sm text-zinc-300">
          <span>Main market</span>
          <select
            value={mainMarket}
            onChange={(event) => setMainMarket(event.target.value)}
            className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          >
            {MAIN_MARKETS.map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : "Download checklist"}
      </button>
      {message ? (
        <p className={status === "error" ? "text-sm text-red-200" : "text-sm text-emerald-200"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
