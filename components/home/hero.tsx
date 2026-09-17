import Image from "next/image";
import { Container, Button } from "../ui";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/images/hero-building.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-[#050e1ffa] to-[#050e1f80]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-[#050e1fcc] from-0% to-transparent to-55%"
      />

      <Container className="py-24 lg:py-37.5">
        <div className="flex max-w-190 flex-col gap-7">
          <span className="flex w-fit items-center gap-2.5 rounded-full border border-line-inv px-3.5 py-2">
            <span className="size-1.75 rounded-full bg-gold" />
            <span className="font-mono text-xs tracking-[0.033em] text-fg-inv-2">
              Registered technology company · Ohio, USA
            </span>
          </span>

          <h1 className="text-[2.75rem] font-extrabold leading-[1.06] tracking-tight text-fg-inv sm:text-[3.5rem] lg:text-[4rem]">
            Intelligent software for ambitious businesses.
          </h1>

          <p className="max-w-155 text-[17px] leading-[1.65] text-fg-inv-2">
            We design and build custom websites and applications — and deliver
            market-tested ERP, CRM and restaurant management systems trusted by
            our clients.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <Button href="/contact">Start your project</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}