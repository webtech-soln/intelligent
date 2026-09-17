import Link from "next/link";
import type { ReactNode } from "react";

/** Page gutter: 80px at the design width, tightened on small screens. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-360 px-6 sm:px-10 lg:px-20 ${className}`}>
      {children}
    </div>
  );
}

type ButtonVariant = "primary" | "ghost" | "dark" | "gold-ghost";

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-gold text-ink px-[26px] py-[14px] font-bold hover:bg-[#e0a50d]",
  ghost:
    "border border-line-inv text-fg-inv px-[25px] py-[13px] font-semibold hover:bg-white/8",
  dark: "bg-ink text-fg-inv px-[26px] py-[14px] font-bold hover:bg-ink-2",
  "gold-ghost":
    "border border-gold-ink/25 text-ink px-[25px] py-[13px] font-semibold hover:bg-gold-ink/8",
};

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm tracking-[0.014em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = `${BUTTON_BASE} ${BUTTON_STYLES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export function Eyebrow({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: "brand" | "gold";
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs font-semibold tracking-[0.167em] ${
        tone === "gold" ? "text-gold" : "text-brand"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * Section heading with the title on the left and an optional note pinned to the
 * baseline on the right, as used across the marketing pages.
 */
export function SectionHeader({
  eyebrow,
  title,
  note,
  tone = "light",
  titleClassName = "max-w-[640px]",
  noteClassName = "lg:w-[400px]",
}: {
  eyebrow: string;
  title: string;
  note?: string;
  tone?: "light" | "dark";
  titleClassName?: string;
  noteClassName?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-20">
      <div className="flex flex-1 flex-col gap-4.5">
        <Eyebrow tone={dark ? "gold" : "brand"}>{eyebrow}</Eyebrow>
        <h2
          className={`text-[2rem] font-extrabold leading-[1.12] tracking-[-0.026em] lg:text-[2.875rem] ${
            dark ? "text-fg-inv" : "text-fg"
          } ${titleClassName}`}
        >
          {title}
        </h2>
      </div>
      {note ? (
        <p
          className={`text-base leading-[1.7] ${
            dark ? "text-fg-inv-2" : "text-fg-2"
          } ${noteClassName}`}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

/** Blurred colour wash used behind the dark sections. */
export function Glow({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[190px] ${className}`}
    />
  );
}
