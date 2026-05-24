import type { LeadRecord } from "@/lib/supabase";

export const mockLeads: LeadRecord[] = [
  {
    name: "Demo Trader",
    email: "demo@example.com",
    trading_level: "beginner",
    main_market: "XAUUSD",
    created_at: "2026-05-23T09:00:00Z"
  },
  {
    name: "Risk Planner",
    email: "risk@example.com",
    trading_level: "intermediate",
    main_market: "EURUSD",
    created_at: "2026-05-22T12:30:00Z"
  }
];
