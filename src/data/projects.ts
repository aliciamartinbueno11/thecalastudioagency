/**
 * Proyectos de Cala Studio (marketing, marca y web).
 * Solo trabajos reales. Cada proyecto genera su página en /proyectos/[slug].
 * Las bodas viven en src/data/weddings.ts y también aparecen en /proyectos.
 */
export type ProjectImage = { src: string; alt: string; shape: "portrait" | "landscape" };

export type Project = {
  slug: string;
  number: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  services: string[];
  excerpt: string;
  cover: { src: string; alt: string };
  /** Imagen 5:4 para las tarjetas del listado (si no hay, se usa la portada) */
  card?: string;
  challenge: string;
  approach: string;
  work: string[];
  outcome: string;
  /** Datos verificables del proyecto. Nada de cifras inventadas: si no hay datos, se deja vacío. */
  metrics: { value: string; label: string }[];
  gallery: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "cala-studio",
    number: "01",
    title: "Cala Studio",
    client: "Cala Studio (marca propia)",
    sector: "Marketing y diseño",
    year: "2026",
    services: ["Branding", "Web", "Redes sociales"],
    excerpt:
      "Nuestro primer cliente fuimos nosotros: identidad, web y lanzamiento en Instagram con un mismo sistema visual.",
    cover: {
      src: "/images/proyectos/cala-studio/portada.webp",
      alt: "Tres publicaciones de Instagram de Cala Studio sobre fondo de papel: «Marketing con cabeza», «Menos humo, más criterio» y la retícula de puntos sobre negro",
    },
    card: "/images/proyectos/cala-studio/tarjeta.webp",
    challenge:
      "Una agencia nueva en Nerja tenía que explicar en pocos segundos qué hace distinto, y parecer la misma en la web, en Instagram y en un correo.",
    approach:
      "Antes de diseñar nada, escribimos el mensaje: marketing con cabeza, menos humo y más criterio. El símbolo sale del nombre, una cala vista desde arriba, y el lenguaje gráfico de una carta náutica: rumbo, coordenadas y un objetivo marcado.",
    work: [
      "Posicionamiento y mensajes clave",
      "Logotipo, paleta y tipografías",
      "Sistema gráfico de carta náutica",
      "Web con SEO local y formulario de presupuesto",
      "Kit de lanzamiento para Instagram",
    ],
    outcome:
      "Una marca que se reconoce sin ver el nombre, y un sistema que permite crear piezas nuevas sin empezar de cero ni perder la coherencia.",
    metrics: [
      { value: "6", label: "Publicaciones de arranque" },
      { value: "5", label: "Portadas de destacadas" },
      { value: "1", label: "Sistema para web y redes" },
    ],
    gallery: [
      {
        src: "/images/proyectos/cala-studio/historia.webp",
        alt: "Historia de Instagram de lanzamiento: «Ya estamos en marcha» con la carta náutica y el rumbo hacia el objetivo",
        shape: "portrait",
      },
      {
        src: "/images/proyectos/cala-studio/cuadricula.webp",
        alt: "Las seis primeras publicaciones de Instagram en cuadrícula: filosofía, servicios, método, diferencia y contacto",
        shape: "landscape",
      },
      {
        src: "/images/proyectos/cala-studio/destacadas.webp",
        alt: "Foto de perfil con el símbolo de Cala Studio y cinco portadas de historias destacadas con iconos de línea",
        shape: "landscape",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
