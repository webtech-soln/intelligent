import { Container, Eyebrow } from "../ui"

import {
  PROCESS_STEPS,
} from "@/lib/content";

export function Process() {
  return (
    <section className="bg-surface py-20 lg:py-27.5">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col gap-4.5">
          <Eyebrow>HOW WE WORK</Eyebrow>
          <h2 className="max-w-175 text-[2rem] font-extrabold leading-[1.12] tracking-[-0.026em] text-fg lg:text-[2.875rem]">
            A clear path from first call to go-live
          </h2>
        </div>

        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.number} className="flex flex-col gap-3.5">
              <span
                className={`h-0.5 w-full ${index === 0 ? "bg-gold" : "bg-line"}`}
              />
              <span className="font-mono text-[13px] font-semibold tracking-[0.077em] text-fg-2">
                {step.number}
              </span>
              <h3 className="text-2xl font-bold tracking-[-0.017em] text-fg">
                {step.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-fg-2">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}