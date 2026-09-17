import { Container, SectionHeader } from "../ui";
import { ServiceCard } from "@/components/service-card";
import {
  SERVICES,
} from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="scroll-mt-21 bg-surface py-20 lg:py-27.5">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="WHAT WE DO"
          title="Services built around how your business actually works"
          note="From a first website to a full enterprise rollout, we cover the whole stack — design, build, deployment and long-term support."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}