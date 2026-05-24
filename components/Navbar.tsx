"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/78 backdrop-blur-xl">
      <nav className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-md border border-gold-400/40 bg-gold-400/10 text-sm font-black text-gold-200">
            W
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-50 sm:text-base">
            {SITE_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white",
                  active && "bg-zinc-900 text-gold-200"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-100 lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-zinc-800 bg-black lg:hidden">
          <div className="container-shell grid gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-sm text-zinc-200 hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
