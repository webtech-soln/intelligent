"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button, Container } from "./ui";
import { NAV_LINKS, SITE } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <Container className="flex h-[84px] items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)} aria-label={SITE.name}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.href === pathname;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors hover:text-gold ${
                  active ? "font-semibold text-gold" : "font-medium text-fg-inv"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-[14px] lg:flex">
          <a
            href={SITE.phoneHref}
            className="font-mono text-[13px] text-fg-inv-2 transition-colors hover:text-fg-inv"
          >
            {SITE.phone}
          </a>
          <Button href="/contact">Get a Quote</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-sm p-2 text-fg-inv lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-line-inv lg:hidden">
          <Container className="flex flex-col gap-1 py-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-sm px-2 py-3 text-base ${
                  link.href === pathname
                    ? "font-semibold text-gold"
                    : "font-medium text-fg-inv"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <a href={SITE.phoneHref} className="px-2 font-mono text-[13px] text-fg-inv-2">
                {SITE.phone}
              </a>
              <Button href="/contact" className="w-full">
                Get a Quote
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
