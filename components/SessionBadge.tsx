"use client";

import { cn } from "@/lib/utils";

export default function SessionBadge({
  label,
  active
}: {
  label: string;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        "rounded-md border px-3 py-1 text-xs font-medium",
        active
          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
          : "border-zinc-700 bg-zinc-950 text-zinc-400"
      )}
    >
      {label}
    </span>
  );
}
