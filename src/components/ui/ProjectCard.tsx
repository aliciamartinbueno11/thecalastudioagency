import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { Arrow } from "./Arrow";

type ProjectCardProps = {
  project: Project;
  aspect?: "landscape" | "portrait" | "square";
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const aspects = {
  landscape: "aspect-[5/4]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

export function ProjectCard({
  project,
  aspect = "landscape",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className,
}: ProjectCardProps) {
  return (
    <article className={cn("group/card", className)}>
      <Link href={`/proyectos/${project.slug}`} className="block">
        <div className={cn("relative overflow-hidden bg-paper", aspects[aspect])}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover/card:scale-[1.035]"
          />
          {/* Marco interior */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-cream/0 transition-colors duration-500 group-hover/card:border-cream/60" />

          {/* Información extra al hover (solo dispositivos con ratón) */}
          <div className="absolute inset-x-3 bottom-3 hidden translate-y-4 bg-cream p-5 opacity-0 transition-all duration-500 ease-out-soft group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100 [@media(hover:hover)]:block">
            <p className="text-[0.95rem] leading-relaxed text-ink">{project.excerpt}</p>
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-agua-ink">
              Ver caso <Arrow className="size-3.5" />
            </p>
          </div>

          <span className="label absolute left-5 top-5 bg-cream px-2 py-1 text-ink">
            {project.number}
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div>
            <h3 className="display-wide text-[clamp(1.6rem,2.6vw,2.25rem)] transition-colors group-hover/card:text-agua-deep">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm text-mute">{project.services.join(" + ")}</p>
          </div>
          <p className="label tabular text-mute sm:pt-2">
            {project.sector} · {project.year}
          </p>
        </div>
      </Link>
    </article>
  );
}
