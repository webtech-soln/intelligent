import { Container, Eyebrow, Button } from '../ui'
import { ErpDashboard } from "@/components/erp-dashboard";
import { CircleCheck } from "lucide-react"
import {
  ERP_MODULES,
} from "@/lib/content";

export function ErpSpotlight() {
  return (
    <section id="erp" className="scroll-mt-21 bg-surface-2 py-20 lg:py-27.5">
      <Container className="flex flex-col items-center gap-14 lg:flex-row lg:gap-18">
        <ErpDashboard />

        <div className="flex w-full flex-col gap-6 lg:w-130">
          <Eyebrow>NEW SERVICE · ERP</Eyebrow>
          <h2 className="text-[1.875rem] font-extrabold leading-[1.14] tracking-[-0.026em] text-fg lg:text-[2.625rem]">
            One system for finance, inventory, people and operations
          </h2>
          <p className="text-base leading-[1.75] text-fg-2">
            Our ERP practice implements market-tested platforms refined over 30
            years and running in thousands of businesses today. We handle
            scoping, configuration, data migration and training end to end.
          </p>

          <ul className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
            {ERP_MODULES.map((module) => (
              <li key={module} className="flex items-center gap-2.5">
                <CircleCheck className="size-4.5 shrink-0 text-brand" />
                <span className="text-[15px] font-medium text-fg">{module}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Button href="/contact">Book an ERP demo</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}