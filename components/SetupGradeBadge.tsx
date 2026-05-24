"use client";

import { cn } from "@/lib/utils";

export default function SetupGradeBadge({ grade }: { grade: string }) {
  const positive = ["Good", "Strong", "Excellent", "A", "A+"].includes(grade);
  const neutral = ["B", "Wait for Confirmation"].includes(grade);

  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-3 py-1 text-sm font-semibold",
        positive && "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
        neutral && "border-gold-400/40 bg-gold-400/10 text-gold-100",
        !positive && !neutral && "border-red-400/40 bg-red-400/10 text-red-100"
      )}
    >
      {grade}
    </span>
  );
}
