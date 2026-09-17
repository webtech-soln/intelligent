type IconProps = { className?: string };

/**
 * Brand glyphs are not part of the lucide set, so the four marks used in the
 * footer are inlined here at the same 24x24 grid lucide uses.
 */
export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5ZM10 9.75h4.95v1.6h.07c.69-1.24 2.37-2.05 4.06-2.05 4.34 0 5.14 2.72 5.14 6.26V21.5h-5.15v-5.3c0-1.27-.02-2.9-1.82-2.9-1.82 0-2.1 1.38-2.1 2.8v5.4H10V9.75Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33v7.03C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.53 3h3.04l-6.64 7.59L21.75 21h-6.12l-4.79-6.26L5.35 21H2.3l7.1-8.12L2.25 3h6.27l4.33 5.72L17.53 3Zm-1.07 16.17h1.69L7.62 4.74H5.81l10.65 14.43Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
