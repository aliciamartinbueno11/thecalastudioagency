import { About } from "@/components/sections/About";
import { Area } from "@/components/sections/Area";
import { ContactSection } from "@/components/sections/ContactSection";
import { Difference } from "@/components/sections/Difference";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Positioning } from "@/components/sections/Positioning";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { WeddingsTeaser } from "@/components/weddings/WeddingsTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <ServicesIndex />
      <Method />
      <Area />
      <Difference />
      <WeddingsTeaser />
      <About />
      <ContactSection />
    </>
  );
}
