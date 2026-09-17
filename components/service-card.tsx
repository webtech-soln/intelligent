import {
  ArrowRight,
  Globe,
  Layers,
  LifeBuoy,
  Smartphone,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/lib/content";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  layers: Layers,
  users: Users,
  utensils: Utensils,
  "life-buoy": LifeBuoy,
};

export function ServiceCard({
  icon,
  title,
  description,
  featured = false,
}: {
  icon: ServiceIcon;
  title: string;
  description: string;
  featured?: boolean;
}) {
  const Icon = ICONS[icon];

  return (
    <article
      className={`flex h-full flex-col gap-4 rounded-md border p-[34px] transition-shadow hover:shadow-card ${
        featured ? "border-ink bg-ink" : "border-line bg-surface"
      }`}
    >
      <span
        className={`flex size-[52px] items-center justify-center rounded-sm ${
          featured ? "bg-gold" : "bg-brand-soft"
        }`}
      >
        <Icon className={`size-6 ${featured ? "text-ink" : "text-brand"}`} />
      </span>

      <h3
        className={`text-[1.3125rem] font-bold leading-[1.3] tracking-[-0.014em] ${
          featured ? "text-fg-inv" : "text-fg"
        }`}
      >
        {title}
      </h3>

      <p
        className={`text-[15px] leading-[1.7] ${
          featured ? "text-fg-inv-2" : "text-fg-2"
        }`}
      >
        {description}
      </p>

      <span
        className={`mt-auto flex items-center gap-[7px] pt-1 text-sm font-semibold ${
          featured ? "text-gold" : "text-brand"
        }`}
      >
        Learn more
        <ArrowRight className="size-[15px]" />
      </span>
    </article>
  );
}
