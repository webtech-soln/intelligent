import { Container } from "../ui";
import { Quote } from "lucide-react"

export function Testimonial() {
  return (
    <section className="bg-surface-2 py-18 lg:py-25">
      <Container className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
        <span className="flex size-19 shrink-0 items-center justify-center rounded-md bg-gold">
          <Quote className="size-8 text-ink" />
        </span>

        <figure className="flex flex-col gap-6">
          <blockquote className="text-2xl font-semibold leading-[1.4] tracking-[-0.02em] text-fg lg:text-[1.875rem]">
            They replaced four disconnected tools with one ERP and had our team
            running on it in six weeks. The difference in how quickly we can
            answer a question about the business is night and day.
          </blockquote>
          <figcaption className="flex items-center gap-3">
            <span className="h-0.5 w-8 bg-brand" />
            <span className="font-mono text-[13px] text-fg-2">
              Operations Director · Regional distribution group, Ohio
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}