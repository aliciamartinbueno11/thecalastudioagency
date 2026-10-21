import { projects } from "./projects";
import { weddingProjects } from "./weddings";

/** Todo el trabajo publicado, de Cala Studio y de Cala Weddings, en un solo listado. */
export type WorkItem = {
  href: string;
  title: string;
  line: "Cala Studio" | "Cala Weddings";
  category: string;
  year: string;
  excerpt: string;
  image: { src: string; alt: string };
};

export const work: WorkItem[] = [
  ...projects.map((p) => ({
    href: `/proyectos/${p.slug}`,
    title: p.title,
    line: "Cala Studio" as const,
    category: p.services.join(", "),
    year: p.year,
    excerpt: p.excerpt,
    image: { src: p.card ?? p.cover.src, alt: p.cover.alt },
  })),
  ...weddingProjects.map((p) => ({
    href: `/bodas/${p.slug}`,
    title: `${p.title} ${p.titleEm}`,
    line: "Cala Weddings" as const,
    category: p.category,
    year: p.year,
    excerpt: p.excerpt,
    image: { src: p.cover.src, alt: p.cover.alt },
  })),
];
