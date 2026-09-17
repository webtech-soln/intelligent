type LogoProps = {
  /** Size of the square mark in pixels. */
  size?: number;
  className?: string;
};

/**
 * Logo mark + wordmark lockup. The mark is the vector artwork from the design
 * file, drawn on a 40x40 grid.
 */
export function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      <span className="flex flex-col gap-px">
        <span className="font-sans text-[15px] font-extrabold leading-[1.1] tracking-[0.04em] text-fg-inv">
          INTELLIGENT
        </span>
        <span className="font-sans text-[11px] font-semibold leading-[1.1] tracking-[0.145em] text-gold">
          TECH SOLUTIONS
        </span>
      </span>
    </span>
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <g transform="translate(3.2533 2.8267)">
        <path
          d="M28.66667 34.32l-23.97334 0c-2.34667 0-4.69333-1.81334-4.69333-4.61333l0-25.09334c0-2.18667 1.92-4.61333 4.69333-4.61333l23.97334 0c2.64001 0 4.77334 2.10667 4.77333 4.61333l0 25.12c0 2.77333-2.05334 4.58667-4.77333 4.58667z"
          fill="#003066"
        />
      </g>
      <g transform="translate(10.3467 23.1733)">
        <path
          d="M14.69333 0c-0.21333 1.78667-1.78667 4.4-5.04 4.4-3.25333 0-4.82667-2.61333-5.01333-4.4l-4.64 0c0.05333 0.4 0.05333 0.8 0.21333 0.96 0.18667 0.18666 1.52 0.16 2.02667 0.32 0.21333 0.77333 0.50667 1.36 0.93333 2l-1.04 1.70667c-0.13333 0.26667 1.14667 1.25333 1.76 1.89333 0.10667 0.08 0.24 0.18667 0.48 0.08l1.41334-0.96c0.64 0.34666 1.28 0.66667 2.10666 0.85333l0.37334 1.68c0.08 0.32 0.58667 0.26667 1.38666 0.26667 0.82667 0 1.33333 0.05333 1.33334-0.26667l0.34666-1.62666c0.90666-0.16 1.49333-0.45333 2.24-0.88l1.44 0.93333c0.24 0.16 0.42667 0.02667 0.50667-0.05333 0.45333-0.37333 1.62667-1.46667 1.6-1.65334 0.13333-0.13333-0.13333-0.48-1.01333-1.97333 0.45333-0.58667 0.74667-1.28 0.93333-2.02667l1.92-0.21333c0.21333-0.05333 0.29333 0 0.32-0.48 0.05334-0.18667 0-0.56 0-0.56l-4.56 0-0.02667 0z"
          fill="#f8c034"
        />
      </g>
      <g transform="translate(14.0267 10.3733)">
        <path
          d="M0 12.08l0-7.36 5.97334 4 7.25333-8.72 0 12.05333"
          fill="none"
          stroke="#3bb1ff"
          strokeWidth={0.64}
        />
      </g>
      <g transform="translate(20 19.76)">
        <path d="M0 0l0 6.98667" fill="none" stroke="#3bb1ff" strokeWidth={0.64} />
      </g>
      <g transform="translate(25.9467 9.1733)">
        <path
          d="M1.33333 0c-0.64 0-1.33333 0.61333-1.33333 1.25333 0 0.8 0.56 1.2 1.28 1.22667 0.69333 0.13333 1.30667-0.53333 1.30667-1.2 0-0.72-0.58667-1.28-1.25334-1.28z"
          fill="#3ab1ff"
        />
      </g>
      <g transform="translate(18.6933 17.6503)">
        <path
          d="M1.30667 0.00301c-0.8 0-1.30667 0.64-1.30667 1.33334 0 0.69333 0.66667 1.33333 1.30667 1.25333 0.66667-0.02667 1.33333-0.50667 1.2-1.52-0.10667-0.45333-0.58667-1.12-1.2-1.06667z"
          fill="#3ab1ff"
        />
      </g>
      <g transform="translate(12.6933 13.3326)">
        <path
          d="M1.38667 0.00074c-0.64 0-1.38667 0.64-1.38667 1.41334 0 0.69333 0.64 1.36 1.38667 1.36 0.74667 0 1.30667-0.66667 1.30666-1.38667 0-0.72-0.58667-1.41333-1.30666-1.38667z"
          fill="#3ab1ff"
        />
      </g>
    </svg>
  );
}
