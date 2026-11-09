import { projects } from "./projects";
import { weddingProjects } from "./weddings";

/** Trabajo publicado: marketing online (Cala Studio) y bodas (Cala Weddings), por separado. */
export type WorkItem = {
  href: string;
  title: string;
  line: "Cala Studio" | "Cala Weddings";
  category: string;
  year: string;
  excerpt: string;
  image: { src: string; alt: string };
};

export const studioWork: WorkItem[] = projects.map((p) => ({
  href: `/proyectos/${p.slug}`,
  title: p.title,
  line: "Cala Studio" as const,
  category: p.services.join(", "),
  year: p.year,
  excerpt: p.excerpt,
  image: { src: p.card ?? p.cover.src, alt: p.cover.alt },
}));

export const weddingWork: WorkItem[] = weddingProjects.map((p) => ({
  href: `/bodas/${p.slug}`,
  title: `${p.title} ${p.titleEm}`,
  line: "Cala Weddings" as const,
  category: p.category,
  year: p.year,
  excerpt: p.excerpt,
  image: { src: p.cover.src, alt: p.cover.alt },
}));
