"use client";

import { useState } from "react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !isValidEmail(email) || message.trim().length < 10) {
      setStatus("error");
      setFeedback("Enter your name, a valid email, and a message of at least 10 characters.");
      return;
    }

    setStatus("success");
    setFeedback(
      "Message validated. Contact delivery is ready to connect in v1; use support@example.com until the backend handler is enabled."
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-4 rounded-lg p-6">
      <label className="grid gap-2 text-sm text-zinc-300">
        <span>Name</span>
        <input
          className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
      <label className="grid gap-2 text-sm text-zinc-300">
        <span>Email</span>
        <input
          className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label className="grid gap-2 text-sm text-zinc-300">
        <span>Message</span>
        <textarea
          className="focus-ring min-h-40 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          placeholder="How can we help?"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </label>
      <button
        type="submit"
        className="rounded-md bg-gold-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
      >
        Validate message
      </button>
      {feedback ? (
        <p className={status === "error" ? "text-sm text-red-200" : "text-sm text-emerald-200"}>
          {feedback}
        </p>
      ) : null}
      <p className="text-xs text-zinc-500">Contact form backend is ready to connect in a future release.</p>
    </form>
  );
}
