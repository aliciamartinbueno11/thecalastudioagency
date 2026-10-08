import { projects } from "@/data/projects";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectsShowcase() {
  const [first, second, third] = projects;
  return (
    <section aria-labelledby="proyectos-title" className="py-24 lg:py-36">
      <div className="container-cala">
        <SectionHeading
          index="04"
          label="Proyectos"
          id="proyectos-title"
          title={
            <>
              Trabajo que se puede <span className="accent text-agua-deep">enseñar.</span>
            </>
          }
          intro="Una selección de proyectos. Contamos qué había, qué hicimos y qué cambió."
        />

        {/* Composición asimétrica en dos columnas, como una doble página */}
        <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-x-8 lg:mt-24">
          <div className="flex flex-col gap-16 md:col-span-7 md:gap-28">
            {first ? (
              <div data-reveal>
                <ProjectCard project={first} aspect="landscape" sizes="(min-width: 768px) 58vw, 100vw" />
              </div>
            ) : null}
            {third ? (
              <div data-reveal className="md:ml-[18%]">
                <ProjectCard project={third} aspect="square" sizes="(min-width: 768px) 48vw, 100vw" />
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-16 md:col-span-5 md:pt-48">
            {second ? (
              <div data-reveal style={revealDelay(150)}>
                <ProjectCard project={second} aspect="portrait" sizes="(min-width: 768px) 42vw, 100vw" />
              </div>
            ) : null}
            <div data-reveal className="md:mt-auto md:pb-24">
              <p className="label text-mute">Más casos</p>
              <p className="display-wide mt-3 max-w-xs text-2xl leading-tight">
                Puntos de partida distintos, el mismo método.
              </p>
              <ButtonLink href="/proyectos" variant="link" className="mt-6">
                Ver todos los proyectos
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
