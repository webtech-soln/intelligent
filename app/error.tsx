"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { SITE } from "@/lib/content";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-ink py-24 lg:py-32">
      <Container className="flex flex-col gap-6">
        <p className="font-mono text-xs font-semibold tracking-[0.167em] text-gold">
          SOMETHING WENT WRONG
        </p>
        <h1 className="max-w-[720px] text-[2rem] font-extrabold leading-[1.12] tracking-[-0.026em] text-fg-inv lg:text-[2.875rem]">
          That didn&apos;t work as expected
        </h1>
        <p className="max-w-[560px] text-[17px] leading-[1.65] text-fg-inv-2">
          Please try again. If it keeps happening, email us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">
            {SITE.email}
          </a>{" "}
          or call {SITE.phone} and we&apos;ll pick it up from there.
        </p>

        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-sm bg-gold px-[26px] py-[14px] text-sm font-bold tracking-[0.014em] text-ink transition-colors hover:bg-[#e0a50d]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-sm border border-line-inv px-[25px] py-[13px] text-sm font-semibold tracking-[0.014em] text-fg-inv transition-colors hover:bg-white/8"
          >
            Back to home
          </Link>
        </div>

        {error.digest ? (
          <p className="pt-2 font-mono text-xs text-fg-inv-2">
            Reference: {error.digest}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
