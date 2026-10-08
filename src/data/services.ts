export type Service = {
  slug: string;
  number: string;
  name: string;
  short: string;
  tags: string[];
  intro: string;
  includes: string[];
  fit: string;
};

export const services: Service[] = [
  {
    slug: "estrategia",
    number: "01",
    name: "Estrategia",
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
  },
  {
    slug: "redes-sociales",
    number: "02",
    name: "Redes sociales",
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
  },
  {
    slug: "publicidad-digital",
    number: "03",
    name: "Publicidad digital",
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
  },
  {
    slug: "web-landing-pages",
    number: "04",
    name: "Web & Landing Pages",
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
  },
  {
    slug: "branding-creatividad",
    number: "05",
    name: "Branding & Creatividad",
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
  },
  {
    slug: "automatizacion-ia",
    number: "06",
    name: "Automatización & IA",
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
