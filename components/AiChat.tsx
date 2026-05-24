"use client";

import { Bot, ImagePlus, Loader2, Send, User, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  error?: boolean;
};

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

function imageSizeLabel(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export default function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Send a trading question or upload a chart screenshot. Free mode can analyze your wording, match it to WIN trading checklists, and suggest educational next steps without using API credit. Trading involves risk and this is not financial advice."
    }
  ]);
  const [message, setMessage] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function clearImage() {
    setImageDataUrl("");
    setImageName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    setError("");
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Use PNG, JPG, WEBP, or GIF image files.");
      clearImage();
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError(`Image is ${imageSizeLabel(file.size)}. Keep uploads under 4 MB.`);
      clearImage();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageDataUrl(reader.result);
        setImageName(file.name);
      }
    };
    reader.onerror = () => {
      setError("Could not read the image. Try another file.");
      clearImage();
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedMessage = message.trim();
    if (!trimmedMessage && !imageDataUrl) {
      setError("Type a message or upload an image first.");
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmedMessage || "Please analyze this image.",
      imageUrl: imageDataUrl || undefined
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    clearImage();
    setStatus("loading");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          imageDataUrl: userMessage.imageUrl
        })
      });

      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || data.error) {
        throw new Error(data.error || "AI response failed.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.answer || "I could not generate a response. Try again with more context."
        }
      ]);
    } catch (submitError) {
      const messageText =
        submitError instanceof Error ? submitError.message : "AI chat is not available right now.";
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: messageText,
          error: true
        }
      ]);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <section className="card rounded-lg p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">AI Trading Assistant</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Ask about risk, session timing, journal review, or upload a chart screenshot for educational analysis.
          </p>
        </div>
        <span className="rounded-md border border-gold-400/30 bg-gold-400/10 px-2 py-1 text-xs font-medium text-gold-100">
          Free mode
        </span>
      </div>

      <div className="mt-5 grid max-h-[620px] gap-4 overflow-y-auto pr-1">
        {messages.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className={item.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                item.role === "user"
                  ? "max-w-[92%] rounded-lg border border-gold-400/30 bg-gold-400/10 p-4 sm:max-w-[82%]"
                  : "max-w-[92%] rounded-lg border border-zinc-800 bg-zinc-950/80 p-4 sm:max-w-[82%]"
              }
            >
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {item.role === "user" ? <User size={14} /> : <Bot size={14} />}
                {item.role === "user" ? "You" : "WIN AI"}
              </div>
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt="Uploaded chart or image"
                  width={640}
                  height={420}
                  unoptimized
                  className="mb-3 max-h-80 rounded-md border border-zinc-800 object-contain"
                />
              ) : null}
              <p
                className={
                  item.error
                    ? "whitespace-pre-wrap text-sm leading-6 text-red-200"
                    : "whitespace-pre-wrap text-sm leading-6 text-zinc-200"
                }
              >
                {item.content}
              </p>
            </div>
          </div>
        ))}

        {status === "loading" ? (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-300">
              <Loader2 className="animate-spin" size={16} />
              Analyzing...
            </div>
          </div>
        ) : null}
      </div>

      {imageDataUrl ? (
        <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/80 p-3">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={imageDataUrl}
              alt="Selected upload preview"
              width={56}
              height={56}
              unoptimized
              className="h-14 w-14 rounded-md border border-zinc-800 object-cover"
            />
            <p className="truncate text-sm text-zinc-300">{imageName || "Selected image"}</p>
          </div>
          <button
            type="button"
            onClick={clearImage}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-zinc-700 text-zinc-200 hover:bg-zinc-900"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
        <label className="grid gap-2 text-sm text-zinc-300">
          <span>Message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="focus-ring min-h-28 resize-y rounded-md border border-zinc-700 bg-zinc-950 px-3 py-3 text-white"
            placeholder="Ask for risk planning, chart observations, SMC checklist review, or session context..."
            maxLength={4000}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              onChange={handleImageChange}
              className="sr-only"
              id="ai-image-upload"
            />
            <label
              htmlFor="ai-image-upload"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
            >
              <ImagePlus size={16} />
              Upload image
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
            {status === "loading" ? "Sending..." : "Send"}
          </button>
        </div>

        {error ? <p className="text-sm text-red-200">{error}</p> : null}
      </form>
    </section>
  );
}
