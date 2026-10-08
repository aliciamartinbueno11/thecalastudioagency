# Cala Studio — web

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Sin librerías de animación: las transiciones son CSS y un único `IntersectionObserver`.

La web se exporta como **sitio estático** (`out/`) y se publica en **Cloudflare Pages**. El formulario lo atiende una Pages Function (`functions/api/contacto.ts`).

```bash
npm install
npm run dev        # desarrollo
npm run build      # producción
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run placeholders  # regenera las imágenes placeholder de proyectos
npm run preview    # build + simulación local de Cloudflare Pages (incluye el formulario)
```

## Estructura

```
src/
  app/                 rutas (/, /servicios, /proyectos, /proyectos/[slug], /nosotros, /contacto, legales)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg apple-icon.png
  components/
    layout/            Header, MobileMenu, Footer, RevealObserver
    sections/          bloques de página (Hero, Positioning, ServicesIndex, Method…)
    ui/                piezas reutilizables (Button, SectionHeading, ServiceItem, ProjectCard, ContactForm, CTA, Logo)
    graphics/          Fig. 01 (carta náutica) y Fig. 02 (retícula de puntos)
  data/                contenidos: site, services, method, projects
  lib/                 utilidades, fuentes, validación del formulario, metadatos
public/images/proyectos/  imágenes de proyectos (sustituibles)
public/_headers           cabeceras HTTP para Cloudflare Pages
functions/api/contacto.ts formulario: validación + envío por email (Resend)
```

## Tareas antes de publicar

- **Dominio:** define `NEXT_PUBLIC_SITE_URL` (por defecto `https://calastudio.es`).
- **Datos de contacto y redes:** `src/data/site.ts` (email, Instagram, LinkedIn, coordenadas del estudio).
- **Proyectos:** edita `src/data/projects.ts` y reemplaza las imágenes en `public/images/proyectos/`. Cada proyecto nuevo genera su página `/proyectos/[slug]` automáticamente.
- **Textos legales:** completa los datos resaltados (`<mark>`) en aviso legal y privacidad.
- **Cookies:** la web no usa cookies de terceros; si se añade analítica, hará falta banner de consentimiento.

## Publicar en Cloudflare Pages

1. Cloudflare → **Workers & Pages** → **Create** → pestaña **Pages** → **Connect to Git** → repositorio `calastudio`.
2. Configuración de build:
   - Production branch: la rama que quieras publicar
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `out`
3. Variables (Settings → Variables and Secrets), para producción:
   - `NEXT_PUBLIC_SITE_URL` = `https://tudominio.es`
   - `RESEND_API_KEY` (secreto), `CONTACT_TO`, `CONTACT_FROM` — envío del formulario con [Resend](https://resend.com).
     Sin estas tres, el formulario muestra un aviso y el email de contacto.
4. **Custom domains** → añade tu dominio (si ya está en Cloudflare, los DNS se configuran solos).

Cada push a la rama de producción publica una versión nueva; las demás ramas generan URLs de previsualización.
