import type { ComponentType } from "react";
import { formatPrice, packages, services } from "@/data/services";
import { weddingCatalog, weddingPackages } from "@/data/weddings";

/**
 * BLOG — índice de artículos.
 * Para publicar uno nuevo:
 *   1. Escribe el texto en src/content/blog/<slug>.mdx
 *   2. Añade aquí su ficha (título, resumen, fechas, preguntas frecuentes) y su `load`.
 * Las preguntas frecuentes se muestran al final del artículo y generan los datos
 * estructurados FAQPage, así que lo que se ve y lo que lee Google coincide siempre.
 */

export const blogAuthor = "Equipo Cala Studio";

export const blogCategories = {
  negocios: { label: "Negocios locales", cta: "/servicios" },
  bodas: { label: "Bodas", cta: "/bodas" },
} as const;

export type BlogCategory = keyof typeof blogCategories;

export type BlogPost = {
  slug: string;
  /** Titular del artículo (H1). Mejor en forma de pregunta. */
  title: string;
  /** Título para Google si el H1 es largo (≤ 60 caracteres aprox.) */
  seoTitle?: string;
  /** Resumen para Google y para el listado (≤ 160 caracteres) */
  description: string;
  category: BlogCategory;
  /** Fechas ISO (AAAA-MM-DD) */
  published: string;
  updated?: string;
  readingMinutes: number;
  /** Palabras clave principales, para datos estructurados */
  keywords: string[];
  faq: { q: string; a: string }[];
  /** Llamada a la acción del final */
  cta: { title: string; text: string; label: string; href: string };
  load: () => Promise<{ default: ComponentType }>;
};

const price = (slug: string) => services.find((s) => s.slug === slug)!.price;
const weddingFrom = (id: string) => weddingCatalog.find((c) => c.id === id)!.from;
const eur = (n: number) => `${n.toLocaleString("es-ES")} €`;

export const blogPosts: BlogPost[] = [
  {
    slug: "cuanto-cuesta-pagina-web-negocio-malaga",
    title: "¿Cuánto cuesta una página web para un negocio en Málaga?",
    seoTitle: "Cuánto cuesta una página web en Málaga: precios reales",
    description:
      "Precios reales de una web para negocios en Málaga y la Axarquía: plantilla, freelance o agencia, qué incluye cada opción y qué gastos hay cada año.",
    category: "negocios",
    published: "2026-11-06",
    readingMinutes: 7,
    keywords: ["precio página web Málaga", "cuánto cuesta una web", "diseño web Nerja", "web para negocio local"],
    faq: [
      {
        q: "¿Cuánto cuesta una página web sencilla para un negocio local?",
        a: `Una landing page profesional (una sola página bien hecha) suele costar entre 600 y 1.200 €. En Cala Studio parte de ${eur(price("web-landing-pages").from)} sin IVA. Una web completa de varias páginas está entre 1.500 y 4.000 € según el contenido y las funciones.`,
      },
      {
        q: "¿Qué gastos tiene una web cada año?",
        a: "Dominio (10–20 € al año), alojamiento (desde 0 € en hosting estático hasta 100–300 € en un WordPress bien mantenido) y, si lo necesitas, mantenimiento y actualizaciones. Pide siempre que te lo detallen por escrito antes de empezar.",
      },
      {
        q: "¿Cuánto se tarda en hacer una página web?",
        a: "Una landing page, de 2 a 4 semanas. Una web completa, de 4 a 8 semanas. Lo que más retrasa un proyecto casi nunca es el diseño: son los textos y las fotos que tiene que aportar el negocio.",
      },
      {
        q: "¿Merece la pena una web si ya tengo Instagram y ficha de Google?",
        a: "Sí, si quieres que te encuentren en Google por lo que haces y no solo por tu nombre. Las redes y la ficha de Google llevan visitas; la web es donde explicas bien tu servicio, enseñas precios y conviertes esa visita en un contacto.",
      },
      {
        q: "¿La web es mía cuando termina el proyecto?",
        a: "Debería serlo. Asegúrate de que el dominio está a tu nombre y de que te entregan los accesos y los archivos. Si no es así, cambiar de proveedor en el futuro será caro.",
      },
    ],
    cta: {
      title: "¿Quieres saber cuánto costaría la tuya?",
      text: `Te damos un presupuesto cerrado y por escrito. Landing pages desde ${eur(price("web-landing-pages").from)}; o el paquete Arranque (estrategia, marca y web) por ${eur(packages.find((p) => p.slug === "arranque")!.price.once!)}.`,
      label: "Pedir presupuesto",
      href: "/contacto",
    },
    load: () => import("@/content/blog/cuanto-cuesta-pagina-web-negocio-malaga.mdx"),
  },
  {
    slug: "cuanto-cuestan-invitaciones-de-boda-personalizadas",
    title: "¿Cuánto cuestan las invitaciones de boda personalizadas?",
    seoTitle: "Cuánto cuestan las invitaciones de boda personalizadas",
    description:
      "Precio del diseño y la impresión de invitaciones de boda personalizadas, qué encarece cada pieza, cuándo enviarlas y cómo ahorrar sin que se note.",
    category: "bodas",
    published: "2026-11-06",
    readingMinutes: 6,
    keywords: ["precio invitaciones de boda", "invitaciones de boda personalizadas", "papelería de boda Málaga", "cuándo enviar invitaciones de boda"],
    faq: [
      {
        q: "¿Cuánto cuesta el diseño de una invitación de boda personalizada?",
        a: `El diseño a medida suele estar entre 150 y 400 €, y es un pago único independientemente del número de invitados. En Cala Weddings parte de ${eur(weddingFrom("invitaciones"))} sin IVA.`,
      },
      {
        q: "¿Cuánto cuesta imprimir las invitaciones de boda?",
        a: "Depende del papel, el tamaño y los acabados. Como referencia, en impresión digital sobre buen papel suele salir entre 1,5 y 4 € por invitación con sobre; con letterpress, stamping o papel artesanal puede pasar de 6–10 € por unidad.",
      },
      {
        q: "¿Con cuánta antelación se envían las invitaciones de boda?",
        a: "Entre 2 y 3 meses antes de la boda. Si muchos invitados vienen de fuera o es una boda destino, mejor 3–4 meses, con un Save the Date enviado entre 6 y 12 meses antes.",
      },
      {
        q: "¿Son más baratas las invitaciones digitales?",
        a: "Sí: os ahorráis la impresión y el envío, que suelen ser la mayor parte del coste. Muchas parejas combinan una invitación digital o una web de boda con unas pocas invitaciones impresas para los abuelos y la familia cercana.",
      },
      {
        q: "¿Cuántas invitaciones hay que pedir?",
        a: "Una por hogar, no por invitado. Para 120 invitados suelen bastar unas 60–70 invitaciones. Pedid un 10 % más para errores, recuerdos y algún invitado de última hora.",
      },
    ],
    cta: {
      title: "¿Diseñamos las vuestras?",
      text: `Invitaciones desde ${eur(weddingFrom("invitaciones"))}, o toda la papelería de la boda en el paquete Papelería completa por ${eur(weddingPackages.find((p) => p.id === "papeleria")!.price)}. Os enviamos un presupuesto cerrado.`,
      label: "Ver Cala Weddings",
      href: "/bodas",
    },
    load: () => import("@/content/blog/cuanto-cuestan-invitaciones-de-boda-personalizadas.mdx"),
  },
];

/** Del más reciente al más antiguo */
export const sortedPosts = [...blogPosts].sort((a, b) => b.published.localeCompare(a.published));

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const postUpdated = (p: BlogPost) => p.updated ?? p.published;

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

/** Precios del catálogo, para usarlos dentro de los artículos sin copiar cifras a mano */
export const blogPrices = {
  service: (slug: string) => formatPrice(price(slug)),
  wedding: (id: string) => `desde ${eur(weddingFrom(id))}`,
  eur,
};
