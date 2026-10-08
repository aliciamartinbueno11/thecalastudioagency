import type { Metadata } from "next";
import { site } from "@/data/site";

/** Metadatos por página con Open Graph y canonical coherentes. */
export function pageMetadata({
  title,
  description = site.description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  return {
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
