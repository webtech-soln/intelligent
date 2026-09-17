import { CHART_DATA, METRIC_TILES } from "@/lib/content";

/**
 * Static representation of an ERP operations dashboard used as the visual for
 * the ERP spotlight section.
 */
export function ErpDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-5.5 rounded-md border border-line bg-surface p-6.5 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.75">
          <h3 className="text-[17px] font-bold text-fg">Operations Overview</h3>
          <p className="font-mono text-[11px] text-fg-2">
            Fiscal year 2026 · All branches
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-brand-soft px-2.75 py-1.5">
          <span className="size-1.5 rounded-full bg-brand" />
          <span className="font-mono text-[11px] font-semibold text-brand">Live</span>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {METRIC_TILES.map((tile) => (
          <div
            key={tile.label}
            className="flex flex-col gap-1.5 rounded-sm bg-surface-2 p-4"
          >
            <span className="font-mono text-[10px] tracking-widest text-fg-2">
              {tile.label}
            </span>
            <span className="text-2xl font-bold tracking-[-0.021em] text-fg">
              {tile.value}
            </span>
            <span
              className={`font-mono text-[11px] font-semibold ${
                tile.up ? "text-[#1b8f5a]" : "text-[#c2410c]"
              }`}
            >
              {tile.delta}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3.5 rounded-sm border border-line px-4 pt-4.5 pb-3.5">
        <h4 className="text-[13px] font-semibold text-fg">Monthly throughput</h4>
        <div className="flex h-42.5 items-end gap-3">
          {CHART_DATA.map((bar) => (
            <div
              key={bar.month}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <div
                style={{ height: `${bar.value}px` }}
                className={`w-full rounded-t-[4px] ${
                  bar.value > 100 ? "bg-gold" : "bg-brand"
                }`}
              />
              <span className="font-mono text-[10px] text-fg-2">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
