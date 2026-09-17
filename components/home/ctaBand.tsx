import { Container, Button } from "../ui";

import { SITE } from "@/lib/content";

export function CtaBand() {
  return (
    <section className="bg-gold py-18">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-3.5">
          <h2 className="text-[1.875rem] font-extrabold leading-[1.15] tracking-[-0.026em] text-ink lg:text-[2.625rem]">
            Let&apos;s scope your next system.
          </h2>
          <p className="text-[17px] leading-[1.6] text-gold-ink">
            Tell us what you&apos;re building. We&apos;ll come back with a plan,
            a timeline and a fixed price.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3.5">
          <Button href="/contact" variant="dark">
            Talk to our team
          </Button>
          <Button href={SITE.phoneHref} variant="gold-ghost">
            {SITE.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
}