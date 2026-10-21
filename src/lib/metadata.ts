import type { Metadata } from "next";
import { site } from "@/data/site";

/** Metadatos por página con Open Graph y canonical coherentes. */
export function pageMetadata({
  title,
  description = site.description,
  path,
  noindex = false,
}: {
  title?: string;
  description?: string;
  path: string;
  /** Páginas que no deben aparecer en buscadores (p. ej., contenido provisional) */
  noindex?: boolean;
}): Metadata {
  return {
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} | ${site.name}` : site.title,
      description,
      url: path,
    },
  };
}
