export const site = {
  name: "Cala Studio",
  tagline: "Marketing con cabeza.",
  title: "Cala Studio | Agencia de Marketing Digital",
  description:
    "Estrategia, redes sociales, publicidad, web, creatividad y automatización para marcas que quieren hacer marketing con criterio.",
  // Cambia el dominio en la variable de entorno NEXT_PUBLIC_SITE_URL al publicar.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://calastudio.es",
  locale: "es_ES",
  email: "hola@calastudio.es",
  phone: "",
  // Coordenadas que aparecen como detalle gráfico. Sustitúyelas por las del estudio.
  coordinates: { lat: "39°28′N", lng: "0°22′O" },
  location: "Mediterráneo, España",
  social: {
    instagram: "https://www.instagram.com/calastudio",
    linkedin: "https://www.linkedin.com/company/calastudio",
  },
} as const;

export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const legalNav = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
] as const;

export const cta = {
  primary: { label: "Cuéntanos tu proyecto", href: "/contacto" },
  secondary: { label: "Ver servicios", href: "/servicios" },
} as const;
