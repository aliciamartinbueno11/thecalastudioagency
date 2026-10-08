import { About } from "@/components/sections/About";
import { ContactSection } from "@/components/sections/ContactSection";
import { Difference } from "@/components/sections/Difference";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Positioning } from "@/components/sections/Positioning";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ServicesIndex } from "@/components/sections/ServicesIndex";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <ServicesIndex />
      <Method />
      <ProjectsShowcase />
      <Difference />
      <About />
      <ContactSection />
    </>
  );
}
