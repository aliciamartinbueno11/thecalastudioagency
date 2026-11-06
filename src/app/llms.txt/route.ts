import { blogPosts } from "@/data/blog";
import { formatPrice, services } from "@/data/services";
import { site } from "@/data/site";
import { weddingBrand } from "@/data/weddings";

export const dynamic = "force-static";

/**
 * /llms.txt: resumen en texto plano para asistentes de IA (ChatGPT, Perplexity, Claude…).
 * Se genera con los mismos datos que la web, así que siempre está al día.
 */
export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.name} es un estudio de marketing digital con base en Nerja (Málaga, España). Trabaja con negocios de ${site.areas.join(", ")}. Precios orientativos sin IVA, publicados en la web.

## Servicios

${services.map((s) => `- [${s.name}](${site.url}/servicios#${s.slug}): ${s.short} ${formatPrice(s.price)}.`).join("\n")}

## Cala Weddings

- [${weddingBrand.name}](${site.url}${weddingBrand.path}): ${weddingBrand.description}

## Blog

${blogPosts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`).join("\n")}

## Contacto

- [Formulario de contacto y presupuesto](${site.url}/contacto)
- Email: ${site.email}
- Instagram: ${site.social.instagram}
- LinkedIn: ${site.social.linkedin}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
