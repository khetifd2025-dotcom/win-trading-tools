import "server-only";

import { headers } from "next/headers";
import { SITE_URL } from "@/lib/constants";

export async function getRequestOrigin() {
  const headerStore = await headers();
  const host = headerStore.get("host");
  if (!host) return SITE_URL;

  const forwardedProto = headerStore.get("x-forwarded-proto");
  const protocol = forwardedProto || (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}
