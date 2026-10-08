# Cala Studio — web

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Sin librerías de animación: las transiciones son CSS y un único `IntersectionObserver`.

```bash
npm install
npm run dev        # desarrollo
npm run build      # producción
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run placeholders  # regenera las imágenes placeholder de proyectos
```

## Estructura

```
src/
  app/                 rutas (/, /servicios, /proyectos, /proyectos/[slug], /nosotros, /contacto, legales)
    api/contacto/      endpoint del formulario (validación en servidor)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg apple-icon.png
  components/
    layout/            Header, MobileMenu, Footer, RevealObserver
    sections/          bloques de página (Hero, Positioning, ServicesIndex, Method…)
    ui/                piezas reutilizables (Button, SectionHeading, ServiceItem, ProjectCard, ContactForm, CTA, Logo)
    graphics/          Fig. 01 (carta náutica) y Fig. 02 (retícula de puntos)
  data/                contenidos: site, services, method, projects
  lib/                 utilidades, fuentes, validación del formulario, metadatos
public/images/proyectos/  imágenes de proyectos (sustituibles)
```

## Tareas antes de publicar

- **Dominio:** define `NEXT_PUBLIC_SITE_URL` (por defecto `https://calastudio.es`).
- **Datos de contacto y redes:** `src/data/site.ts` (email, Instagram, LinkedIn, coordenadas del estudio).
- **Proyectos:** edita `src/data/projects.ts` y reemplaza las imágenes en `public/images/proyectos/`. Cada proyecto nuevo genera su página `/proyectos/[slug]` automáticamente.
- **Formulario:** `src/app/api/contacto/route.ts` valida y responde OK, pero falta conectar el envío real (email transaccional, CRM…). Está marcado con `TODO`.
- **Textos legales:** completa los datos resaltados (`<mark>`) en aviso legal y privacidad.
- **Cookies:** la web no usa cookies de terceros; si se añade analítica, hará falta banner de consentimiento.
