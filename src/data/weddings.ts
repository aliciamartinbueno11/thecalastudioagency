/**
 * Contenidos de Cala Weddings (/bodas).
 * Todo lo editable de la página vive aquí: catálogo, proceso, preguntas e inspiración.
 */

export const weddingBrand = {
  name: "Cala Weddings",
  signature: "by Cala Studio",
  path: "/bodas",
  title: "Diseño de bodas: invitaciones, papelería y webs personalizadas",
  description:
    "Diseño integral para bodas en Málaga, la Costa del Sol y donde estéis: identidad visual, invitaciones personalizadas, papelería, webs de boda con RSVP y diseño para el gran día.",
};

export type WeddingCategory = {
  id: string;
  letter: string;
  title: string;
  short: string;
  intro: string;
  items: string[];
  note?: string;
};

export const weddingCatalog: WeddingCategory[] = [
  {
    id: "identidad",
    letter: "A",
    title: "Identidad visual de vuestra boda",
    short: "Identidad",
    intro: "El punto de partida: una idea propia que después se aplica a todo lo demás.",
    items: [
      "Concepto creativo y dirección artística",
      "Monogramas y logotipos personalizados",
      "Paleta de colores",
      "Tipografías",
      "Ilustraciones personalizadas",
      "Elementos gráficos propios",
      "Manual visual de la boda",
    ],
  },
  {
    id: "invitaciones",
    letter: "B",
    title: "Invitaciones y papelería",
    short: "Invitaciones",
    intro: "Lo primero que ven vuestros invitados. Y lo que se queda en la nevera hasta el día.",
    items: [
      "Save the Date",
      "Invitaciones digitales",
      "Invitaciones impresas",
      "Sobres personalizados",
      "Tarjetas de confirmación",
      "Tarjetas informativas",
      "Programas de ceremonia",
      "Minutas y menús",
      "Números y nombres de mesa",
      "Tarjetas de agradecimiento",
      "Etiquetas y pegatinas",
      "Tarjetas para regalos",
    ],
    note: "Preparamos los archivos listos para imprenta y, si lo necesitáis, os ayudamos a pedir presupuestos de producción.",
  },
  {
    id: "web",
    letter: "C",
    title: "Web de boda y experiencia digital",
    short: "Web de boda",
    intro: "Toda la información en un solo enlace, con vuestro diseño y confirmación de asistencia.",
    items: [
      "Diseño y desarrollo de webs personalizadas",
      "Historia de la pareja",
      "Cuenta atrás",
      "Información de ceremonia y celebración",
      "Mapas y localizaciones",
      "Alojamiento y transporte",
      "Formulario RSVP para confirmar asistencia",
      "Acompañantes y necesidades alimentarias",
      "Preguntas frecuentes",
      "Galería fotográfica",
      "Lista de bodas o enlaces de regalos",
      "Página para compartir fotos después de la boda",
      "Códigos QR personalizados",
    ],
    note: "Hay distintos niveles de personalización, desde una web sencilla hasta un proyecto completamente a medida.",
  },
  {
    id: "dia",
    letter: "D",
    title: "Diseño para el día de la boda",
    short: "El gran día",
    intro: "Que todo el espacio hable el mismo idioma, de la entrada a la última copa.",
    items: [
      "Seating plan",
      "Carteles de bienvenida",
      "Señalética de espacios",
      "Cartelería de barras y cócteles",
      "Cartas de bebidas",
      "Photocall y fondos gráficos",
      "Elementos para rincones temáticos",
      "Packaging de regalos",
      "Etiquetas para detalles de invitados",
      "Vinilos y aplicaciones gráficas",
      "Carteles para cada momento de la celebración",
    ],
    note: "Diseñamos y preparamos los archivos para producción. La fabricación la realiza una imprenta o proveedor externo.",
  },
  {
    id: "audiovisual",
    letter: "E",
    title: "Contenido digital y audiovisual",
    short: "Digital y vídeo",
    intro: "Para contarlo antes, proyectarlo durante y compartirlo después.",
    items: [
      "Invitaciones animadas",
      "Vídeos Save the Date",
      "Animaciones personalizadas",
      "Stories y contenido previo a la boda",
      "Plantillas para compartir fotografías",
      "Presentaciones y vídeos para proyectar",
      "Animaciones para pantallas durante el evento",
      "Diseños para álbumes digitales",
    ],
  },
  {
    id: "despues",
    letter: "F",
    title: "Después de la boda",
    short: "Después",
    intro: "La boda termina. Lo que se diseña para recordarla, no.",
    items: [
      "Tarjetas de agradecimiento",
      "Álbumes fotográficos diseñados",
      "Galerías digitales",
      "Recuerdos gráficos personalizados",
      "Piezas para compartir momentos especiales",
    ],
  },
];

export const weddingProcess = [
  { number: "01", title: "Nos contáis vuestra idea.", text: "Queremos conoceros y entender cómo imagináis vuestra boda." },
  { number: "02", title: "Diseñamos vuestro universo.", text: "Creamos una dirección visual que encaje con vosotros y con el estilo de la celebración." },
  { number: "03", title: "Damos forma a cada detalle.", text: "Convertimos esa identidad en las piezas digitales y físicas que necesitáis." },
  { number: "04", title: "Lo dejamos todo preparado.", text: "Entregamos los diseños listos para usar o para enviar a producción." },
];

export const weddingFaq = [
  {
    q: "¿Podemos contratar solo la invitación o solo la web?",
    a: "Sí. Podéis encargarnos una pieza concreta o todo el universo gráfico de la boda. Si empezáis por una pieza, la identidad queda lista para ampliarla después.",
  },
  {
    q: "¿Imprimís vosotros las invitaciones y la cartelería?",
    a: "Nuestro trabajo es el diseño. Os entregamos los archivos preparados para imprenta y, si lo necesitáis, os ayudamos a pedir presupuestos de producción.",
  },
  {
    q: "¿Trabajáis solo en Málaga?",
    a: "Estamos en la Costa del Sol, pero la mayor parte del trabajo es digital, así que podemos diseñar para parejas de cualquier lugar.",
  },
  {
    q: "¿Con cuánta antelación conviene escribiros?",
    a: "Cuanto antes, mejor: lo ideal es empezar antes de enviar el Save the Date. Aun así, si la fecha está cerca, escribidnos y vemos qué es posible.",
  },
  {
    q: "¿Cómo funciona la web de boda?",
    a: "Diseñamos una web con vuestra identidad, la información práctica y un formulario para confirmar asistencia. Recibís las respuestas organizadas y podéis compartirla con un enlace o un código QR.",
  },
];

/** Opciones del formulario de bodas */
export const weddingServiceOptions = [
  "Identidad visual",
  "Invitaciones y papelería",
  "Web de boda",
  "Diseño para el día",
  "Contenido digital y vídeo",
  "Después de la boda",
  "Aún no lo sabemos",
] as const;

export const weddingScopeOptions = [
  { value: "integral", label: "Diseño integral" },
  { value: "piezas", label: "Piezas individuales" },
  { value: "no-se", label: "Aún no lo sabemos" },
] as const;

/**
 * Inspiración y proyectos.
 * `kind: "concepto"` = diseño conceptual creado por Cala Studio (no es un encargo real).
 * Cuando tengáis bodas reales, añadidlas con `kind: "proyecto"` y sus fotos en /public/images/bodas/.
 */
export type WeddingWork = {
  id: string;
  kind: "concepto" | "proyecto";
  category: string;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
};

export const weddingWorks: WeddingWork[] = [
  {
    id: "identidad",
    kind: "concepto",
    category: "Identidad de boda",
    title: "Monograma y paleta",
    description: "Un monograma con arco, una paleta de arena, piedra y agua, y una tipografía editorial.",
    image: { src: "/images/bodas/concepto-identidad.webp", alt: "Diseño conceptual: hoja de identidad de boda con monograma, paleta de colores y tipografías", width: 1200, height: 1500 },
  },
  {
    id: "invitaciones",
    kind: "concepto",
    category: "Invitaciones",
    title: "Suite de invitación",
    description: "Invitación, tarjeta de confirmación y sobre con la misma identidad.",
    image: { src: "/images/bodas/concepto-invitacion.webp", alt: "Diseño conceptual: invitación de boda, tarjeta de confirmación y sobre sobre un fondo de lino", width: 1200, height: 1500 },
  },
  {
    id: "web",
    kind: "concepto",
    category: "Web de boda",
    title: "Web con RSVP",
    description: "Cuenta atrás, información práctica y confirmación de asistencia desde el móvil.",
    image: { src: "/images/bodas/concepto-web.webp", alt: "Diseño conceptual: web de boda en un teléfono móvil con cuenta atrás y botón para confirmar asistencia", width: 1200, height: 1500 },
  },
  {
    id: "papeleria",
    kind: "concepto",
    category: "Papelería de mesa",
    title: "Menú y número de mesa",
    description: "Minuta y número de mesa a juego con el resto de la boda.",
    image: { src: "/images/bodas/concepto-menu.webp", alt: "Diseño conceptual: minuta de boda y número de mesa", width: 1200, height: 1500 },
  },
  {
    id: "dia",
    kind: "concepto",
    category: "Aplicaciones físicas",
    title: "Bienvenida y seating plan",
    description: "Cartel de bienvenida y plano de mesas para la entrada de la celebración.",
    image: { src: "/images/bodas/concepto-seating.webp", alt: "Diseño conceptual: cartel de bienvenida y seating plan de una boda", width: 1200, height: 1500 },
  },
];

/**
 * Bodas reales (trabajos de Cala Studio).
 * Cada proyecto genera su página en /bodas/[slug].
 * Privacidad: sin nombres de la pareja ni de invitados, sin fecha exacta ni lugares concretos.
 * Las imágenes llevan esos datos recortados o difuminados.
 */
export type WeddingImage = { src: string; alt: string; width: number; height: number };

/** `plate`: la pieza se muestra sobre fondo arena, como un diseño apoyado en la mesa. */
export type WeddingFigure = { image: WeddingImage; plate?: boolean };

export type WeddingBlock =
  | { kind: "pair"; figures: [WeddingFigure, WeddingFigure]; caption: string }
  | { kind: "single"; figure: WeddingFigure; caption: string; size: "wide" | "full" }
  | { kind: "duo"; figures: [WeddingFigure, WeddingFigure]; captions: [string, string] };

export type WeddingChapter = {
  numeral: string;
  title: string;
  titleEm: string;
  text: string;
  blocks: WeddingBlock[];
};

export type WeddingProject = {
  slug: string;
  title: string;
  titleEm: string;
  category: string;
  place: string;
  year: string;
  excerpt: string;
  intro: string;
  palette: string;
  cover: WeddingImage;
  coverCaption: string;
  chapters: WeddingChapter[];
  services: { name: string; detail?: string }[];
  closing: string;
  privacyNote: string;
};

const lf = (file: string, alt: string, width: number, height: number): WeddingImage => ({
  src: `/images/bodas/linea-fina/${file}.webp`,
  alt,
  width,
  height,
});

export const weddingProjects: WeddingProject[] = [
  {
    slug: "linea-fina",
    title: "Línea",
    titleEm: "fina",
    category: "Papelería de boda",
    place: "Costa de Málaga",
    year: "2025",
    excerpt:
      "Sobres verdes cerrados a mano con lacre y flor seca, y una papelería del día en blanco y negro, dibujada a línea.",
    intro:
      "Una boda junto al mar contada en dos tiempos. Primero, sobres verdes cerrados a mano con lacre y flor seca. Después, una papelería del día en blanco y negro, dibujada a línea.",
    palette: "Verde oliva, oro viejo, blanco y tinta",
    cover: lf(
      "sobres-lacre",
      "Sobres de papel verde con borde rasgado, cerrados con sello de lacre dorado y un ramillete de flores secas blancas",
      1012,
      1800,
    ),
    coverCaption: "Sobres de papel verjurado con borde rasgado, lacre con rama de olivo y flor seca.",
    chapters: [
      {
        numeral: "I",
        title: "El primer",
        titleEm: "aviso",
        text: "El save the date llegó al móvil en formato story. La invitación llegó a casa en un sobre verde atado con gasa de seda y una etiqueta de papel vegetal.",
        blocks: [
          {
            kind: "pair",
            figures: [
              {
                image: lf(
                  "sobre-lazo",
                  "Sobre verde atado con cinta de gasa color crema, flores secas y una etiqueta de papel vegetal que dice Nuestra boda",
                  1350,
                  1800,
                ),
              },
              {
                image: lf(
                  "save-the-date",
                  "Save the date vertical en blanco y negro con dos manos cerrando un candado",
                  787,
                  1400,
                ),
                plate: true,
              },
            ],
            caption: "Sobre con lazo de gasa y etiqueta en vegetal. Save the date digital en formato story.",
          },
        ],
      },
      {
        numeral: "II",
        title: "La",
        titleEm: "invitación",
        text: "Una acuarela en verdes, agua y arena que recoge el color de los sobres. Tres columnas para lo esencial: ceremonia, fecha y banquete.",
        blocks: [
          {
            kind: "single",
            size: "wide",
            figure: {
              image: lf(
                "invitacion",
                "Invitación horizontal con fondo de acuarela verde y azul y tres columnas: Ceremonia, Septiembre y Banquete",
                1282,
                910,
              ),
              plate: true,
            },
            caption: "Invitación horizontal.",
          },
        ],
      },
      {
        numeral: "III",
        title: "El",
        titleEm: "día",
        text: "Para la celebración, el color se retira. Caligrafía para los títulos, una serif de alto contraste para el resto y una flor de línea que se repite de pieza en pieza.",
        blocks: [
          {
            kind: "pair",
            figures: [
              {
                image: lf(
                  "carta-coctel",
                  "Carta de cóctel con el título Cóctel en caligrafía y dos ramas florales de línea",
                  1126,
                  1400,
                ),
                plate: true,
              },
              {
                image: lf(
                  "minuta",
                  "Minuta vertical con el título Menú en caligrafía, cuatro apartados y una flor de línea gris",
                  917,
                  1400,
                ),
                plate: true,
              },
            ],
            caption: "Carta de cóctel y minuta individual.",
          },
          {
            kind: "duo",
            figures: [
              {
                image: lf(
                  "cartel-mesa",
                  "Detalle de cartel de mesa: la palabra Mesa en caligrafía sobre UNO en serif de gran tamaño",
                  1080,
                  740,
                ),
                plate: true,
              },
              {
                image: lf(
                  "etiqueta-vino",
                  "Etiqueta vertical con el texto Por nosotros, por vosotros, por el amor y un corazón dibujado",
                  991,
                  1400,
                ),
                plate: true,
              },
            ],
            captions: ["Cartel de mesa, detalle. Serie de diecisiete.", "Etiqueta para el vino de la casa."],
          },
          {
            kind: "single",
            size: "full",
            figure: {
              image: lf(
                "minuta-pliego",
                "Pliego con tres minutas verticales iguales con los apartados Cóctel, Menú y Bodega",
                1400,
                703,
              ),
              plate: true,
            },
            caption: "Minuta en pliego de tres para imprimir y cortar.",
          },
        ],
      },
    ],
    services: [
      { name: "Save the date", detail: "Digital, formato story" },
      { name: "Invitación" },
      { name: "Sobres y presentación", detail: "Lacre, flor seca, gasa y vegetal" },
      { name: "Carta de cóctel" },
      { name: "Minutas", detail: "Individual y en pliego" },
      { name: "Carteles de mesa", detail: "Serie de 17" },
      { name: "Etiqueta de vino" },
    ],
    closing: "Pocas palabras, mucho blanco y una sola línea que lo une todo.",
    privacyNote: "Por privacidad, los nombres, fechas, lugares y datos de invitados están recortados o difuminados.",
  },
];

export const getWeddingProject = (slug: string) => weddingProjects.find((p) => p.slug === slug);
