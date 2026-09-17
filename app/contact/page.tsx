import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { Container, Eyebrow, Glow } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { Faq } from "@/components/faq";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Send Intelligent Tech Solutions a project brief and we'll reply within one business day, or call our Cuyahoga Falls office during working hours.",
};

const DETAILS = [
  {
    Icon: MapPin,
    label: "OFFICE",
    value: SITE.city,
    meta: `${SITE.region}, United States`,
    href: null,
  },
  {
    Icon: Phone,
    label: "CALL US",
    value: SITE.phone,
    meta: SITE.hours,
    href: SITE.phoneHref,
  },
  {
    Icon: Mail,
    label: "EMAIL",
    value: SITE.email,
    meta: "We reply within 1 business day",
    href: `mailto:${SITE.email}`,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="bg-surface-2">
      <PageHero />
      <ContactMain />
      <FaqSection />
    </div>
  );
}

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-20 pb-24 lg:pt-22.5 lg:pb-25">
      <Glow className="-top-80 left-[61%] size-180 bg-brand/30" />

      <Container className="relative flex flex-col gap-5.5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <Link href="/" className="font-mono text-xs text-fg-inv-2 hover:text-fg-inv">
            Home
          </Link>
          <ChevronRight className="size-3.25 text-fg-inv-2" />
          <span className="font-mono text-xs text-gold">Contact us</span>
        </nav>

        <h1 className="max-w-205 text-[2.5rem] font-extrabold leading-[1.08] tracking-[-0.027em] text-fg-inv sm:text-[3rem] lg:text-[3.75rem]">
          Let&apos;s talk about what you&apos;re building
        </h1>
        <p className="max-w-150 text-[17px] leading-[1.65] text-fg-inv-2 lg:text-lg">
          Send us a brief and we&apos;ll reply within one business day with next
          steps — or call the office directly during working hours.
        </p>
      </Container>
    </section>
  );
}

function ContactMain() {
  return (
    <section className="pt-20 pb-20 lg:pt-22.5 lg:pb-27.5">
      <Container className="flex flex-col items-start gap-10 lg:flex-row">
        <ContactForm />

        <aside className="flex w-full flex-col gap-5 lg:w-100">
          <div className="flex flex-col overflow-hidden rounded-lg bg-ink">
            {DETAILS.map(({ Icon, label, value, meta, href }, index) => (
              <div
                key={label}
                className={`flex items-start gap-4 p-7 ${
                  index > 0 ? "border-t border-line-inv" : ""
                }`}
              >
                <span className="flex size-10.5 shrink-0 items-center justify-center rounded-sm bg-white/7">
                  <Icon className="size-4.75 text-gold" />
                </span>
                <div className="flex flex-col gap-1.25">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-fg-inv-2">
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="text-lg font-bold tracking-[-0.011em] text-fg-inv hover:text-gold"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-lg font-bold tracking-[-0.011em] text-fg-inv">
                      {value}
                    </span>
                  )}
                  <span className="text-[13px] leading-normal text-fg-inv-2">
                    {meta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="relative h-[250px] w-full overflow-hidden rounded-lg bg-surface-3">
            <Image
              src="/images/contact-map.png"
              alt={`Map of the ${SITE.city}, ${SITE.region} area`}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
            />
          </div> */}

          <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-7">
            <h2 className="text-lg font-bold tracking-[-0.011em] text-fg">
              Prefer a live conversation?
            </h2>
            <p className="text-sm leading-[1.7] text-fg-2">
              Book a 30-minute discovery call and we&apos;ll walk through your
              current systems and where the quick wins are.
            </p>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1.75 text-sm font-semibold text-brand hover:underline"
            >
              Book a discovery call
              <ArrowRight className="size-3.75" />
            </a>
          </div>
        </aside>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-surface py-20 lg:py-25">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-4.5 lg:w-100">
          <Eyebrow>BEFORE YOU WRITE</Eyebrow>
          <h2 className="text-[1.75rem] font-extrabold leading-[1.14] tracking-tight text-fg lg:text-[2.5rem]">
            Questions we get asked first
          </h2>
          <p className="text-[15px] leading-[1.7] text-fg-2">
            Still unsure? Write anyway — a two-line message is enough to start.
          </p>
        </div>

        <Faq />
      </Container>
    </section>
  );
}
