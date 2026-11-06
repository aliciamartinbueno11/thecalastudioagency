import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Exportación estática para Cloudflare Pages (carpeta `out/`).
// El formulario lo atiende la Pages Function de /functions/api/contacto.ts.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Las imágenes ya se sirven optimizadas en WebP desde /public
    unoptimized: true,
  },
};

// Artículos del blog en MDX (src/content/blog). remark-gfm añade tablas y listas de tareas.
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm"]],
  },
});

export default withMDX(nextConfig);
