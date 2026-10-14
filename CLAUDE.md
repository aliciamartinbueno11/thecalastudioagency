# Cala Studio — contexto del proyecto

Resumen de marca y decisiones tomadas. Léelo antes de cambiar textos, diseño o infraestructura.

## Qué es

**Cala Studio** es una agencia de marketing digital española con sede en la Costa del Sol (Málaga).
Idea central: hacer marketing bien hecho, entendible y útil para el negocio.
Web: https://thecalastudio.com · Email: hola@thecalastudio.com

Tiene **dos líneas de negocio**, claramente separadas:

1. **Cala Studio**: marketing, branding, web, estrategia y tecnología.
2. **Cala Weddings · by Cala Studio** (nombre provisional): diseño gráfico y digital integral para bodas. Página `/bodas`.
   **No es wedding planner**: no organiza bodas ni fabrica/imprime. Diseña y entrega archivos listos para producción; como mucho ayuda a pedir presupuestos de imprenta.

## Público objetivo

- **Cala Studio**: pymes, marcas, negocios locales, profesionales, proyectos que empiezan y empresas que ya hacen marketing pero necesitan ordenarlo. Hay que escribir para gente que **no domina el marketing**, no para otros marketers.
- **Cala Weddings**: parejas que buscan una boda con identidad propia y estética de diseño. Prioridad Málaga y Costa del Sol, sin limitar: lo digital sirve para cualquier lugar.

## Oferta

**Cala Studio** (`src/data/services.ts`): 01 Estrategia · 02 Redes sociales · 03 Publicidad digital (Meta Ads, Google Ads) · 04 Web & Landing Pages · 05 Branding & Creatividad · 06 Automatización & IA (IA solo cuando aporta, nunca como moda).
Método: Entender → Ordenar → Crear → Medir.

**Cala Weddings** (`src/data/weddings.ts`), seis bloques: A Identidad visual · B Invitaciones y papelería · C Web de boda (RSVP, cuenta atrás, info, QR…) · D Diseño para el día (seating, señalética, cartelería…) · E Contenido digital y audiovisual · F Después de la boda.
Se puede contratar una pieza suelta o el diseño integral.

## Posicionamiento y tono

- Lema: **"Marketing con cabeza. Creatividad con intención."** Filosofía: **"Menos humo. Más criterio."**
- Sensación buscada: "esta gente sabe de marketing, tiene buen gusto y habla claro".
- Valores: transparencia (el cliente siempre sabe qué se hace, por qué, dónde va su dinero y qué resultados hay), cercanía, criterio, creatividad.
- Tono: español de España, directo, humano, seguro, frases cortas, pocos signos de exclamación.
- **Prohibido**: lenguaje de gurú, "siguiente nivel", "360º", "potenciamos marcas", "transformamos negocios", "somos apasionados", "experiencias únicas", "resultados extraordinarios", promesas imposibles.
- Cala Weddings habla de **"vosotros"** (p. ej. "Contadnos vuestra idea").

## Identidad visual

- **Cala Studio**: aguamarina `#42DCC6` como acento (botones, detalles, líneas), aguamarina oscuro `#159C8E` en titulares, crema `#F8F7F2`, negro `#171717`. Para texto pequeño en aguamarina se usa `#0B6B61` por contraste.
  Tipografías: Bricolage Grotesque (titulares, estrecha), Instrument Sans (texto), Instrument Serif cursiva (palabras destacadas).
  Lenguaje gráfico: carta náutica abstracta (líneas finas, coordenadas, figuras numeradas, cuarto de círculo = "cala"). Mediterráneo sutil, **sin olas, soles, playas ni clichés**.
  Logo: marco cuadrado con un cuarto de círculo aguamarina.
- **Coordenadas de marca**: Balcón de Europa, Nerja → **36°44′N · 3°52′O** (elegidas por la fundadora porque la representan). Están en `src/data/site.ts`.
- **Cala Weddings**: paleta cálida lino `#FAF6EF`, arena `#ECE4D6`, piedra `#D6CBB9`, tinta `#24201B`, acento mar `#2B6F66` y aguamarina muy puntual. Serif editorial Instrument Serif (redonda + cursiva, solo en `/bodas`). Elemento gráfico: el **arco**. Nada de flores rosas, corazones, pasteles ni cursivas recargadas.

## Decisiones técnicas

- Next.js 16 + TypeScript + Tailwind 4, **exportación estática** (`out/`). Sin librerías de animación (CSS + un IntersectionObserver, respetando `prefers-reduced-motion`).
- Despliegue en **Cloudflare Workers** (proyecto `thecalastudioagency`) con `npx wrangler deploy`. `wrangler.jsonc` compila y sirve `out/`; `worker/index.ts` atiende los formularios. `keep_vars: true` para no perder variables del panel.
- Formularios: `POST /api/contacto` y `POST /api/bodas` (`functions/api/*`), validación compartida cliente/servidor (`src/lib/contact.ts`, `src/lib/wedding-contact.ts`), campo trampa antispam. Envío por **Resend** (`src/lib/email.ts`) a hola@thecalastudio.com desde web@thecalastudio.com. Solo se muestra "enviado" si el email sale de verdad.
- `RESEND_API_KEY` va en Cloudflare → Settings → **Runtime variables and secrets** (tipo Secret), no en las variables de Build.
- Correo: hola@thecalastudio.com usa **Cloudflare Email Routing** (reenvío a un correo personal; no es un buzón con contraseña).
- Repo de trabajo: `alimarbu/calastudio`, rama `claude/cala-studio-web-design-zwv9x2`. Cloudflare puede estar conectado a un fork en otra cuenta: tras cada push hay que pulsar **Sync fork**.
- Menú con 6 entradas (Inicio, Servicios, Proyectos, Bodas, Nosotros, Contacto); por debajo de 1280 px se usa el menú desplegable.

## Reglas de contenido

- **No inventar** clientes, testimonios, cifras, fotos de proyectos reales ni resultados. Lo conceptual se marca como "Diseño conceptual" (p. ej. la pareja ficticia "Clara & Teo" de Cala Weddings).
- Proyectos de Cala Studio: los tres actuales son placeholders (`src/data/projects.ts`).

## Instagram

Kit en `marca/instagram/`: foto de perfil, 5 portadas de destacadas, historia de estreno y 6 publicaciones en **3:4 (1080×1440)**, que es el formato de la cuadrícula del perfil. Biografía y pies de foto en `LEEME.md`. Se regeneran con `node marca/instagram/generar.mjs` tras `npm run build`.

## Pendiente

- Proyectos reales de Cala Studio y fotos reales para Cala Weddings.
- Datos legales (razón social, NIF, dirección) en aviso legal y privacidad; añadir a privacidad los datos del formulario de bodas.
- Enlaces reales de Instagram y LinkedIn en `src/data/site.ts`.
- Confirmar promesas del texto: "respondemos en menos de 48 h", "pocos clientes a la vez", "sin permanencias infladas".
- Nombre definitivo de la línea de bodas.
