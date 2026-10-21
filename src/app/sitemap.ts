export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { weddingProjects } from "@/data/weddings";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/servicios", priority: 0.9 },
    { path: "/bodas", priority: 0.9 },
    ...weddingProjects.map((p) => ({ path: `/bodas/${p.slug}`, priority: 0.7 })),
    { path: "/nosotros", priority: 0.7 },
    { path: "/contacto", priority: 0.9 },
    { path: "/aviso-legal", priority: 0.2 },
    { path: "/privacidad", priority: 0.2 },
    { path: "/cookies", priority: 0.2 },
  ];
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
