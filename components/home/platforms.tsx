import { CircleCheck, Box, ChartColumn, Store, Utensils, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, SectionHeader, Glow } from "../ui"


import {
  PLATFORMS,
  type PlatformIcon,
} from "@/lib/content";

const PLATFORM_ICONS: Record<PlatformIcon, LucideIcon> = {
  box: Box,
  utensils: Utensils,
  "chart-column": ChartColumn,
  store: Store,
};

export function Platforms() {
  return (
    <section
      id="platforms"
      className="relative scroll-mt-21 overflow-hidden bg-ink py-20 lg:py-27.5"
    >
      <Glow className="-top-70 -left-50 size-[180 bg-brand/28" />

      <Container className="relative flex flex-col gap-12">
        <SectionHeader
          tone="dark"
          eyebrow="ESTABLISHED SOFTWARE"
          title="Proven platforms, not experiments"
          note="Alongside custom development we implement market-tested business software that has stood the test of time — over 30 years in the market and thousands of active users."
          titleClassName="max-w-[600px]"
          noteClassName="lg:w-[440px]"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform) => {
            const Icon = PLATFORM_ICONS[platform.icon];
            return (
              <article
                key={platform.name}
                className="flex flex-col gap-3.5 rounded-md border border-line-inv bg-white/4 p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-sm bg-white/7">
                  <Icon className="size-5 text-gold" />
                </span>
                <h3 className="text-xl font-bold tracking-[-0.015em] text-fg-inv">
                  {platform.name}
                </h3>
                <p className="font-mono text-[11px] tracking-[0.109em] text-gold">
                  {platform.category}
                </p>
                <p className="text-sm leading-[1.65] text-fg-inv-2">
                  {platform.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}