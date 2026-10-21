export type Service = {
  slug: string;
  number: string;
  name: string;
  /** Opción equivalente del formulario de contacto */
  option: (typeof serviceOptions)[number];
  short: string;
  tags: string[];
  intro: string;
  includes: string[];
  fit: string;
  /** Precio orientativo, sin IVA */
  price: { from: number; unit?: "mes"; note?: string };
};

/**
 * PRECIOS ORIENTATIVOS — propuesta pendiente de validar por Cala Studio.
 * Cambia aquí las cifras: se actualizan en /servicios, en la portada y en los datos estructurados.
 */
export const pricingNote =
  "Precios orientativos sin IVA. El presupuesto final depende del alcance: te lo damos cerrado y por escrito antes de empezar.";

export const formatPrice = (p: Service["price"]) =>
  `Desde ${p.from.toLocaleString("es-ES")} €${p.unit ? ` / ${p.unit}` : ""}`;

export const services: Service[] = [
  {
    slug: "estrategia",
    number: "01",
    name: "Estrategia",
    option: "Estrategia",
    short: "Saber qué queremos conseguir antes de publicar o invertir un euro.",
    tags: ["Negocio", "Público", "Competencia", "Plan"],
    intro:
      "Analizamos el negocio, el posicionamiento, el público, la competencia y los canales. Con eso hacemos un plan que se puede ejecutar y revisar.",
    includes: [
      "Análisis de negocio y situación actual",
      "Posicionamiento y propuesta de valor",
      "Público y competencia",
      "Elección de canales y prioridades",
      "Plan de acción con objetivos medibles",
    ],
    fit: "Empiezas un proyecto, o ya haces marketing pero no tienes claro qué está funcionando.",
    price: { from: 450, note: "Plan inicial de marketing" },
  },
  {
    slug: "redes-sociales",
    number: "02",
    name: "Redes sociales",
    option: "Redes sociales",
    short: "Redes con una función dentro del negocio, no solo para estar activos.",
    tags: ["Contenido", "Copy", "Creatividad", "Análisis"],
    intro:
      "Estrategia, planificación de contenido, creatividad, copy, publicación y análisis. Cada perfil tiene un papel claro: atraer, convencer o fidelizar.",
    includes: [
      "Estrategia y línea editorial",
      "Calendario de contenido",
      "Diseño, foto y vídeo para redes",
      "Copy y publicación",
      "Informe mensual que se entiende",
    ],
    fit: "Publicas sin un objetivo claro o no tienes tiempo para hacerlo bien.",
    price: { from: 350, unit: "mes" },
  },
  {
    slug: "publicidad-digital",
    number: "03",
    name: "Publicidad digital",
    option: "Publicidad",
    short: "Meta Ads y Google Ads para captar, vender o darte a conocer.",
    tags: ["Meta Ads", "Google Ads", "Captación", "Ventas"],
    intro:
      "Campañas en Meta y Google enfocadas a captación, ventas o visibilidad, según lo que necesite el proyecto. Sabrás en todo momento dónde va cada euro.",
    includes: [
      "Planificación de campañas y presupuesto",
      "Creatividades y anuncios",
      "Configuración de medición y conversiones",
      "Optimización continua",
      "Informes claros de inversión y retorno",
    ],
    fit: "Quieres invertir en publicidad sin tirar el dinero, o ya inviertes y no sabes qué te devuelve.",
    price: { from: 250, unit: "mes", note: "Gestión. La inversión en anuncios va aparte" },
  },
  {
    slug: "web-landing-pages",
    number: "04",
    name: "Web & Landing Pages",
    option: "Web",
    short: "Páginas que explican bien lo que haces y convierten visitas en contactos.",
    tags: ["Diseño", "Desarrollo", "Conversión", "SEO base"],
    intro:
      "Diseñamos y desarrollamos webs y landing pages pensadas para comunicar bien y convertir. Rápidas, claras y fáciles de mantener.",
    includes: [
      "Estructura y contenidos",
      "Diseño visual a medida",
      "Desarrollo rápido y optimizado",
      "SEO técnico básico y analítica",
      "Landing pages para campañas",
    ],
    fit: "Tu web no transmite lo que eres o recibe visitas que no se convierten en nada.",
    price: { from: 750, note: "Landing page. Webs completas, desde 1500 €" },
  },
  {
    slug: "branding-creatividad",
    number: "05",
    name: "Branding & Creatividad",
    option: "Branding",
    short: "Una identidad reconocible y piezas que la gente recuerda.",
    tags: ["Identidad", "Campañas", "Piezas digitales"],
    intro:
      "Identidad visual, campañas, piezas digitales y materiales que hacen reconocible a la marca. Creatividad con un motivo detrás.",
    includes: [
      "Identidad visual y logotipo",
      "Sistema gráfico y guía de uso",
      "Conceptos de campaña",
      "Piezas digitales e impresas",
      "Dirección de arte de contenido",
    ],
    fit: "Tu marca no se distingue de la competencia o cada pieza parece de una empresa distinta.",
    price: { from: 900, note: "Identidad visual completa" },
  },
  {
    slug: "automatizacion-ia",
    number: "06",
    name: "Automatización & IA",
    option: "Automatización",
    short: "Tecnología cuando ahorra trabajo de verdad. No porque esté de moda.",
    tags: ["Procesos", "Integraciones", "IA aplicada"],
    intro:
      "Aplicamos inteligencia artificial y automatizaciones donde realmente aportan: ahorrar horas, ordenar procesos y conectar las herramientas que ya usas.",
    includes: [
      "Revisión de procesos repetitivos",
      "Automatización de captación y seguimiento",
      "Conexión entre CRM, formularios y email",
      "Uso práctico de IA en el día a día",
      "Formación al equipo",
    ],
    fit: "Pierdes horas en tareas repetitivas o tus herramientas no hablan entre sí.",
    price: { from: 400, note: "Por automatización" },
  },
];

export const serviceOptions = [
  "Estrategia",
  "Redes sociales",
  "Publicidad",
  "Web",
  "Branding",
  "Automatización",
  "Otro",
] as const;

/**
 * PAQUETES — varios servicios juntos con descuento.
 * «Por separado» y «Ahorras» se calculan solos a partir de los precios de arriba;
 * aquí solo se fija el precio del paquete.
 */
export type Package = {
  slug: string;
  name: string;
  tagline: string;
  /** Servicios que incluye (por slug), para calcular el precio por separado */
  services: string[];
  includes: string[];
  price: { once?: number; monthly?: number };
  featured?: boolean;
};

export const packages: Package[] = [
  {
    slug: "arranque",
    name: "Arranque",
    tagline: "Para negocios que empiezan o necesitan empezar de nuevo.",
    services: ["estrategia", "branding-creatividad", "web-landing-pages"],
    includes: [
      "Plan de marketing con objetivos medibles",
      "Identidad visual completa y guía de uso",
      "Landing page optimizada para captar contactos",
      "Analítica y SEO local básico",
    ],
    price: { once: 1490 },
  },
  {
    slug: "dia-a-dia",
    name: "Día a día",
    tagline: "Redes y anuncios trabajando juntos, cada mes.",
    services: ["redes-sociales", "publicidad-digital"],
    includes: [
      "Gestión de redes con calendario de contenido",
      "Campañas en Meta y Google (gestión)",
      "Creatividades para redes y anuncios",
      "Un único informe mensual que se entiende",
    ],
    price: { monthly: 450 },
    featured: true,
  },
  {
    slug: "todo-el-marketing",
    name: "Todo el marketing",
    tagline: "Nos encargamos del marketing completo, con un plan detrás.",
    services: ["estrategia", "redes-sociales", "publicidad-digital", "automatizacion-ia"],
    includes: [
      "Plan de estrategia inicial incluido",
      "Gestión de redes y campañas",
      "Una automatización de captación o seguimiento incluida",
      "Reunión mensual de resultados",
    ],
    price: { monthly: 520 },
  },
];

/** Precio de los servicios del paquete contratados por separado */
export function packageSeparate(pkg: Package) {
  const list = pkg.services.map((slug) => services.find((s) => s.slug === slug)!);
  return {
    once: list.filter((s) => !s.price.unit).reduce((sum, s) => sum + s.price.from, 0),
    monthly: list.filter((s) => s.price.unit === "mes").reduce((sum, s) => sum + s.price.from, 0),
  };
}

const eur = (n: number) => `${n.toLocaleString("es-ES")} €`;

/** «1490 €», «450 € / mes» */
export function formatPackagePrice(price: Package["price"]) {
  return [price.once ? eur(price.once) : null, price.monthly ? `${eur(price.monthly)} / mes` : null]
    .filter(Boolean)
    .join(" + ");
}

/** Texto de ahorro frente a contratar por separado */
export function packageSavings(pkg: Package) {
  const sep = packageSeparate(pkg);
  const once = sep.once - (pkg.price.once ?? 0);
  const monthly = sep.monthly - (pkg.price.monthly ?? 0);
  return {
    separate: formatPackagePrice({ once: sep.once, monthly: sep.monthly }),
    saving:
      once > 0 && monthly > 0
        ? `${eur(once)} al empezar y ${eur(monthly)} / mes`
        : once > 0
          ? eur(once)
          : `${eur(monthly)} / mes`,
  };
}
