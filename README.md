# Cala Studio — web

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Sin librerías de animación: las transiciones son CSS y un único `IntersectionObserver`.

La web se exporta como **sitio estático** (`out/`) y se publica en **Cloudflare** (Workers o Pages). El formulario lo atiende `worker/index.ts` en Workers o `functions/api/contacto.ts` en Pages.

```bash
npm install
npm run dev        # desarrollo
npm run build      # producción
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run placeholders  # regenera las imágenes placeholder de proyectos
npm run preview    # build + simulación local de Cloudflare (incluye el formulario)
npm run deploy     # publica en Cloudflare Workers (requiere sesión de wrangler)
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

- **Dominio:** define `NEXT_PUBLIC_SITE_URL` (por defecto `https://thecalastudio.com`).
- **Datos de contacto y redes:** `src/data/site.ts` (email, Instagram, LinkedIn, coordenadas del estudio).
- **Proyectos:** edita `src/data/projects.ts` y reemplaza las imágenes en `public/images/proyectos/`. Cada proyecto nuevo genera su página `/proyectos/[slug]` automáticamente.
- **Textos legales:** completa los datos resaltados (`<mark>`) en aviso legal y privacidad.
- **Cookies:** la web no usa cookies de terceros; si se añade analítica, hará falta banner de consentimiento.

## Publicar en Cloudflare

### Opción A — Workers (la que usa `wrangler deploy`)

`wrangler.jsonc` ya lo configura todo: `npx wrangler deploy` compila la web (`npm run build`), sube `out/` como archivos estáticos y publica `worker/index.ts`, que atiende el formulario.

- El campo `name` de `wrangler.jsonc` debe coincidir con el nombre del Worker en Cloudflare.
- Workers & Pages → tu Worker → **Settings → Build**: Deploy command `npx wrangler deploy` (Build command vacío).
- Variables de compilación (Settings → Build → Variables): `NEXT_PUBLIC_SITE_URL`.
- Variables del Worker (Settings → Variables and Secrets): `RESEND_API_KEY` (secreto). Los mensajes llegan a `hola@thecalastudio.com` desde `web@thecalastudio.com`; se pueden cambiar con `CONTACT_TO` y `CONTACT_FROM`.

### Opción B — Pages

Build command `npm run build`, output `out`. El formulario lo atiende `functions/api/contacto.ts`. Mismas variables.

Sin `RESEND_API_KEY`, el formulario muestra un aviso con el email de contacto.
