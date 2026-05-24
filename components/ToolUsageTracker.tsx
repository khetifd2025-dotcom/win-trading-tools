"use client";

import { useEffect } from "react";

export default function ToolUsageTracker({ toolSlug }: { toolSlug: string }) {
  useEffect(() => {
    void fetch("/api/tool-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolName: toolSlug })
    }).catch(() => undefined);
  }, [toolSlug]);

  return null;
}
