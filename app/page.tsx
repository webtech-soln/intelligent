
import { Hero } from "@/components/home/hero"
import { Services } from "@/components/home/services"
import { ErpSpotlight } from "@/components/home/erpSpotlight"
import { Platforms} from "@/components/home/platforms"
import { Process } from "@/components/home/process"
import { Testimonial } from "@/components/home/testimonial"
import { CtaBand } from "@/components/home/ctaBand"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ErpSpotlight />
      <Platforms />
      <Process />
      <CtaBand />
    </>
  );
}
