import type { Metadata } from "next";
import Image from "next/image";
import {
  Eye,
  Gauge,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Button, Container, Eyebrow, Glow, SectionHeader } from "@/components/ui";
import { SITE, VALUES, type ValueIcon } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Intelligent Tech Solutions is a registered technology company based in Cuyahoga Falls, Ohio, delivering custom software and market-tested ERP, CRM and restaurant systems.",
};

const VALUE_ICONS: Record<ValueIcon, LucideIcon> = {
  "shield-check": ShieldCheck,
  lightbulb: Lightbulb,
  handshake: Handshake,
  gauge: Gauge,
};

const STORY_PARAGRAPHS = [
  "We specialize in the development of custom websites and applications designed to improve business visibility, streamline operations and enhance user experience.",
  "Alongside custom work we also deliver trusted, market-tested software for ERP, CRM and restaurant management. These solutions have stood the test of time, with over 30 years in the market and thousands of active users.",
  "Whether you're a startup building your first online presence or an established enterprise optimizing complex processes, we provide the tools and the expertise to help you succeed in the digital age.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <Story />
      <MissionVision />
      <Values />
      <CtaBand />
    </>
  );
}

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-20 pb-24 lg:pt-[90px] lg:pb-[100px]">
      <Glow className="-top-[340px] left-[62%] size-[760px] bg-[#1567d3]/32" />

      <Container className="relative flex flex-col gap-[22px]">
        <h1 className="max-w-[880px] text-[2.5rem] font-extrabold leading-[1.08] tracking-[-0.027em] text-fg-inv sm:text-[3rem] lg:text-[3.75rem]">
          A technology company built around outcomes, not buzzwords
        </h1>
        <p className="max-w-[640px] text-[17px] leading-[1.65] text-fg-inv-2 lg:text-lg">
          {SITE.name} is a registered company based in {SITE.city}, Ohio,
          committed to delivering innovative and scalable digital solutions
          tailored to your business needs.
        </p>
      </Container>
    </section>
  );
}

function Story() {
  return (
    <section className="bg-surface py-20 lg:py-[110px]">
      <Container className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-[72px]">
        <div className="flex flex-1 flex-col gap-[22px]">
          <Eyebrow>OUR STORY</Eyebrow>
          <h2 className="text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.025em] text-fg lg:text-[2.5rem]">
            Two kinds of software, one standard of delivery
          </h2>
          {STORY_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="text-base leading-[1.8] text-fg-2">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="w-full lg:w-[520px]">
          <div className="relative h-[280px] w-full overflow-hidden rounded-md sm:h-[380px]">
            <Image
              src="/images/about-datacenter.png"
              alt="Rows of server racks inside a modern data centre"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function MissionVision() {
  const cards = [
    {
      id: "mission",
      Icon: Target,
      title: "Our Mission",
      accent: "bg-gold",
      iconClass: "text-ink",
      body: "To empower businesses through innovative software solutions that enhance efficiency and drive growth. We specialize in creating services like Web design, mobile applications and ERP products that enable us to provide the best value delivery — with ongoing support and industry expertise.",
    },
    {
      id: "vision",
      Icon: Eye,
      title: "Our Vision",
      accent: "bg-brand",
      iconClass: "text-fg-inv",
      body: "To be a leading software development partner recognized for our commitment to quality, innovation and customer satisfaction. We strive to make digital solutions that not only meet today's needs but also anticipate tomorrow's challenges.",
    },
  ];

  return (
    <section
      id="mission"
      className="relative scroll-mt-[84px] overflow-hidden bg-ink py-20 lg:py-[110px]"
    >
      <Glow className="top-[340px] left-[40%] size-[620px] bg-[#f5b517]/12" />

      <Container className="relative grid grid-cols-1 gap-6 lg:grid-cols-2">
        {cards.map(({ id, Icon, title, accent, iconClass, body }) => (
          <article
            key={id}
            className="flex flex-col gap-[18px] rounded-lg border border-line-inv bg-white/4 p-8 lg:p-11"
          >
            <span
              className={`flex size-14 items-center justify-center rounded-md ${accent}`}
            >
              <Icon className={`size-[26px] ${iconClass}`} />
            </span>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-fg-inv lg:text-[1.875rem]">
              {title}
            </h2>
            <p className="text-base leading-[1.8] text-fg-inv-2">{body}</p>
          </article>
        ))}
      </Container>
    </section>
  );
}

function Values() {
  return (
    <section className="bg-surface-2 py-20 lg:py-[110px]">
      <Container className="flex flex-col gap-13">
        <SectionHeader
          eyebrow="WHAT WE STAND FOR"
          title="Four principles behind every project"
          note="They're not slogans — they're the rules we use to decide what to build, what to recommend and when to say no."
          titleClassName="max-w-[600px]"
          noteClassName="lg:w-[380px]"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => {
            const Icon = VALUE_ICONS[value.icon];
            return (
              <article
                key={value.title}
                className="flex h-full flex-col gap-3.5 rounded-md border border-line bg-surface p-8"
              >
                <Icon className="size-[26px] text-brand" />
                <h3 className="text-[1.1875rem] font-bold leading-[1.3] tracking-[-0.016em] text-fg">
                  {value.title}
                </h3>
                <p className="text-sm leading-[1.7] text-fg-2">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="bg-gold py-[72px]">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-3.5">
          <h2 className="text-[1.875rem] font-extrabold leading-[1.15] tracking-[-0.026em] text-ink lg:text-[2.625rem]">
            Want to know if we&apos;re the right fit?
          </h2>
          <p className="text-[17px] leading-[1.6] text-gold-ink">
            A 30-minute call is usually enough to tell. No pitch deck, no
            obligation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3.5">
          <Button href="/contact" variant="dark">
            Book a call
          </Button>
          <Button href={`mailto:${SITE.email}`} variant="gold-ghost">
            {SITE.email}
          </Button>
        </div>
      </Container>
    </section>
  );
}
