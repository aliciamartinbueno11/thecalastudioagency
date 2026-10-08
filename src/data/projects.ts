/**
 * Proyectos placeholder.
 * Para sustituir un proyecto: cambia los textos aquí y reemplaza las imágenes
 * en /public/images/proyectos/ manteniendo las rutas (o actualiza `cover` y `gallery`).
 * Cada proyecto genera automáticamente su página en /proyectos/[slug].
 */
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
  challenge: string;
  approach: string;
  work: string[];
  outcome: string;
  metrics: { value: string; label: string }[];
  gallery: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "proyecto-01",
    number: "01",
    title: "Proyecto 01",
    client: "Nombre del cliente",
    sector: "Restauración",
    year: "2026",
    services: ["Estrategia", "Social Media"],
    excerpt:
      "Ordenar unas redes que publicaban mucho y contaban poco, y darles una función clara: llenar mesas entre semana.",
    cover: { src: "/images/proyectos/proyecto-01.webp", alt: "Imagen de portada del Proyecto 01" },
    challenge:
      "El negocio publicaba a diario, pero sin un objetivo concreto. Había seguidores, no había reservas.",
    approach:
      "Empezamos por entender qué días y qué público necesitaba el local. A partir de ahí redefinimos la línea editorial y el calendario.",
    work: [
      "Auditoría de perfiles y competencia",
      "Nueva línea editorial y calendario",
      "Dirección de arte de foto y vídeo",
      "Informe mensual de reservas desde redes",
    ],
    outcome:
      "Menos publicaciones, mejor pensadas, y un seguimiento real de cuántas reservas llegan desde redes.",
    metrics: [
      { value: "00%", label: "Dato a sustituir" },
      { value: "00", label: "Dato a sustituir" },
      { value: "0×", label: "Dato a sustituir" },
    ],
    gallery: [
      { src: "/images/proyectos/proyecto-01-a.webp", alt: "Detalle del Proyecto 01" },
      { src: "/images/proyectos/proyecto-01-b.webp", alt: "Detalle del Proyecto 01" },
    ],
  },
  {
    slug: "proyecto-02",
    number: "02",
    title: "Proyecto 02",
    client: "Nombre del cliente",
    sector: "Estudio profesional",
    year: "2026",
    services: ["Branding", "Web"],
    excerpt:
      "Una identidad y una web que por fin explican bien lo que hace el estudio y a quién se dirige.",
    cover: { src: "/images/proyectos/proyecto-02.webp", alt: "Imagen de portada del Proyecto 02" },
    challenge:
      "La marca había crecido a base de parches: tres logotipos, una web antigua y un mensaje distinto en cada canal.",
    approach:
      "Definimos posicionamiento y tono antes de tocar el diseño. Después construimos un sistema visual sencillo y una web pensada para generar contactos.",
    work: [
      "Posicionamiento y mensajes clave",
      "Identidad visual y guía de uso",
      "Diseño y desarrollo web",
      "Medición de contactos",
    ],
    outcome:
      "Una marca coherente en todos los canales y una web que el equipo puede actualizar sin depender de nadie.",
    metrics: [
      { value: "00%", label: "Dato a sustituir" },
      { value: "00", label: "Dato a sustituir" },
      { value: "0 s", label: "Dato a sustituir" },
    ],
    gallery: [
      { src: "/images/proyectos/proyecto-02-a.webp", alt: "Detalle del Proyecto 02" },
      { src: "/images/proyectos/proyecto-02-b.webp", alt: "Detalle del Proyecto 02" },
    ],
  },
  {
    slug: "proyecto-03",
    number: "03",
    title: "Proyecto 03",
    client: "Nombre del cliente",
    sector: "E-commerce",
    year: "2026",
    services: ["Paid Media", "Automatización"],
    excerpt:
      "Campañas con un objetivo medible y un seguimiento automático de cada contacto, sin hojas de cálculo a mano.",
    cover: { src: "/images/proyectos/proyecto-03.webp", alt: "Imagen de portada del Proyecto 03" },
    challenge:
      "Se invertía en Meta y Google sin saber qué campaña traía ventas. Los contactos se gestionaban a mano.",
    approach:
      "Primero medición, después inversión. Configuramos conversiones, reorganizamos campañas y automatizamos el seguimiento.",
    work: [
      "Configuración de medición y conversiones",
      "Reestructuración de campañas en Meta y Google",
      "Automatización de seguimiento de contactos",
      "Panel de resultados semanal",
    ],
    outcome:
      "Cada euro invertido tiene ahora un dato al lado, y el equipo dedica su tiempo a vender en lugar de copiar datos.",
    metrics: [
      { value: "00%", label: "Dato a sustituir" },
      { value: "00 h", label: "Dato a sustituir" },
      { value: "0,0", label: "Dato a sustituir" },
    ],
    gallery: [
      { src: "/images/proyectos/proyecto-03-a.webp", alt: "Detalle del Proyecto 03" },
      { src: "/images/proyectos/proyecto-03-b.webp", alt: "Detalle del Proyecto 03" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
