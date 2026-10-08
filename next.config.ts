import type { NextConfig } from "next";

// Exportación estática para Cloudflare Pages (carpeta `out/`).
// El formulario lo atiende la Pages Function de /functions/api/contacto.ts.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Las imágenes ya se sirven optimizadas en WebP desde /public
    unoptimized: true,
  },
};

export default nextConfig;
