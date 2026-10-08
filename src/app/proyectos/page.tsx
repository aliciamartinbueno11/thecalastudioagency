import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { revealDelay } from "@/lib/style";
import { CTA } from "@/components/ui/CTA";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PageHero } from "@/components/sections/PageHero";

export const metadata = pageMetadata({
  title: "Proyectos",
  description: "Casos de Cala Studio: qué había, qué hicimos y qué cambió.",
  path: "/proyectos",
});

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        label="Proyectos"
        title={
          <>
            Trabajo que se puede <span className="accent text-agua-deep">enseñar.</span>
          </>
        }
        intro="Cada caso cuenta el punto de partida, lo que hicimos y lo que cambió. Sin adornos."
      />
      <div className="container-cala grid gap-x-8 gap-y-20 pb-24 md:grid-cols-2 lg:pb-36">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            data-reveal
            style={revealDelay((i % 2) * 150)}
            className={i % 2 === 1 ? "md:mt-32" : undefined}
          >
            <ProjectCard
              project={project}
              aspect={i % 3 === 1 ? "portrait" : "landscape"}
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <CTA />
    </>
  );
}
