// Genera el kit de Instagram de Cala Studio con las fuentes y colores de la web.
// Requisitos: haber ejecutado `npm run build` (usa las fuentes de out/) y tener Playwright.
// Uso: node marca/instagram/generar.mjs
import { readFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const outDir = join(here, "piezas");
mkdirSync(outDir, { recursive: true });

// @font-face de la web compilada, con rutas absolutas
const chunks = join(root, "out/_next/static/chunks");
const css = readdirSync(chunks).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(chunks, f), "utf8")).join("");
const fontFaces = (css.match(/@font-face\{[^}]*\}/g) || [])
  .filter((r) => !r.includes("Fallback"))
  // Fuentes incrustadas en base64 para que no dependan de rutas locales
  .map((r) => r.replace(/url\(\.\.\/media\/([^)]+)\)/g, (_, f) => `url(data:font/woff2;base64,${readFileSync(join(root, "out/_next/static/media", f)).toString("base64")})`))
  .join("\n");

const C = { agua: "#42DCC6", deep: "#159C8E", ink: "#171717", cream: "#F8F7F2", paper: "#EFEDE5", mute: "#62615C", line: "rgba(23,23,23,.16)" };

const base = (w, h, bg, body, color = C.ink) => `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${w}px;height:${h}px;background:${bg};color:${color};overflow:hidden}
body{font-family:"Instrument Sans";-webkit-font-smoothing:antialiased;position:relative}
.d{font-family:"Bricolage Grotesque";font-weight:600;font-stretch:84%;font-variation-settings:"opsz" 96;letter-spacing:-.022em;line-height:.92}
.a{font-family:"Instrument Serif";font-style:italic;font-weight:400;letter-spacing:-.01em}
.l{font-size:26px;font-weight:500;letter-spacing:.08em;text-transform:uppercase}
.s{position:relative;display:inline-block}.s:after{content:"";position:absolute;left:-2%;right:-2%;top:54%;height:.06em;background:currentColor}
.pad{position:absolute;inset:90px}
.row{display:flex;justify-content:space-between;align-items:center}
</style></head><body>${body}</body></html>`;

const mark = (size, frame, disc = C.agua) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><rect x="0.75" y="0.75" width="22.5" height="22.5" fill="none" stroke="${frame}" stroke-width="1.5"/><path d="M0.75 9.5A13.75 13.75 0 0 1 14.5 23.25H0.75Z" fill="${disc}"/></svg>`;

const header = (left, right, color = C.mute, line = C.line) => `<div class="row l" style="color:${color};border-bottom:2px solid ${line};padding-bottom:22px"><span>${left}</span><span>${right}</span></div>`;
const footer = (color = C.mute, line = C.line, extra = "thecalastudio.com") => `<div class="row l" style="position:absolute;left:0;right:0;bottom:0;color:${color};border-top:2px solid ${line};padding-top:22px"><span style="display:flex;gap:16px;align-items:center">${mark(34, color === C.mute ? C.ink : C.cream)} Cala Studio</span><span>${extra}</span></div>`;

const chart = (w) => `<svg width="${w}" height="${w * 0.8}" viewBox="0 0 600 480" style="overflow:visible">
<rect x=".5" y=".5" width="599" height="479" fill="none" stroke="${C.line}" stroke-width="2"/>
<clipPath id="c"><rect width="600" height="480"/></clipPath><g clip-path="url(#c)">
<path d="M0 480L210 480A210 210 0 0 0 0 270Z" fill="${C.agua}"/>
${[260, 310, 370, 440, 520, 610].map((r, i) => `<path d="M${r} 480A${r} ${r} 0 0 0 0 ${480 - r}" fill="none" stroke="${C.ink}" stroke-opacity="${i % 2 ? 0.25 : 0.45}" stroke-width="2" ${i === 3 ? 'stroke-dasharray="3 8"' : ""}/>`).join("")}</g>
<line x1="254" y1="302" x2="512" y2="112" stroke="${C.deep}" stroke-width="3" stroke-dasharray="8 9"/>
<circle cx="254" cy="302" r="11" fill="${C.ink}"/><text x="272" y="334" font-size="24" font-weight="500" fill="${C.ink}">Hoy</text>
<circle cx="512" cy="112" r="24" fill="none" stroke="${C.deep}" stroke-width="3"/><circle cx="512" cy="112" r="6" fill="${C.deep}"/>
<text x="490" y="190" font-size="24" font-weight="500" fill="${C.ink}" text-anchor="end">Objetivo</text></svg>`;

const W = 1080, H = 1350, SH = 1920;

const pieces = [
  // ---------- Foto de perfil ----------
  { name: "01-perfil-oscuro", w: 1080, h: 1080, html: base(1080, 1080, C.ink, `<div style="position:absolute;inset:0;display:grid;place-items:center">${mark(500, C.cream)}</div>`) },
  { name: "01-perfil-claro", w: 1080, h: 1080, html: base(1080, 1080, C.cream, `<div style="position:absolute;inset:0;display:grid;place-items:center">${mark(500, C.ink)}</div>`) },

  // ---------- Publicaciones (4:5) ----------
  { name: "post-1-marketing-con-cabeza", w: W, h: H, html: base(W, H, C.cream, `<div class="pad">
    ${header("Agencia de marketing digital", "39°28′N · 0°22′O")}
    <h1 class="d" style="font-size:148px;margin-top:90px">Marketing<br>con <span class="a" style="color:${C.deep}">cabeza.</span><br>Creatividad<br>con <span class="a" style="color:${C.deep}">intención.</span></h1>
    <div style="position:absolute;right:0;bottom:120px">${chart(430)}</div>
    ${footer()}</div>`) },

  { name: "post-2-menos-humo", w: W, h: H, html: base(W, H, C.cream, `<div class="pad">
    ${header('<span style="color:#0B6B61">(01)</span> Filosofía', "Cala Studio")}
    <h1 class="d" style="font-size:200px;margin-top:110px">Menos <span class="s" style="color:${C.mute}">humo</span>.<br>Más <span class="a" style="color:${C.deep}">criterio.</span></h1>
    <div style="margin-top:100px;border-top:2px solid ${C.line}">
      ${["Publicar por publicar", "Invertir por invertir", "Usar herramientas por moda"].map((t) => `<div style="display:flex;gap:28px;align-items:baseline;border-bottom:2px solid ${C.line};padding:28px 0;font-size:46px;color:rgba(23,23,23,.7)"><span style="font-size:28px;color:${C.mute}">✕</span><span class="s">${t}</span></div>`).join("")}
    </div>
    ${footer()}</div>`) },

  { name: "post-3-servicios", w: W, h: H, html: base(W, H, C.paper, `<div class="pad">
    ${header('<span style="color:#0B6B61">(02)</span> Servicios', "Lo que hacemos")}
    <h1 class="d" style="font-size:118px;margin-top:70px">Lo que hacemos,<br><span class="a" style="color:${C.deep}">sin rodeos.</span></h1>
    <div style="margin-top:60px;border-top:2px solid ${C.ink}">
      ${["Estrategia", "Redes sociales", "Publicidad digital", "Web & Landing Pages", "Branding & Creatividad", "Automatización & IA"].map((t, i) => `<div style="display:flex;gap:40px;align-items:baseline;border-bottom:2px solid ${C.line};padding:20px 0"><span class="l" style="color:${i === 0 ? "#0B6B61" : C.mute};width:60px">0${i + 1}</span><span style="font-family:'Bricolage Grotesque';font-weight:500;font-size:56px;letter-spacing:-.02em">${t}</span></div>`).join("")}
    </div>
    ${footer()}</div>`) },

  { name: "post-4-metodo", w: W, h: H, html: base(W, H, C.cream, `<div class="pad">
    ${header('<span style="color:#0B6B61">(03)</span> Cómo trabajamos', "Método")}
    <h1 class="d" style="font-size:104px;margin-top:70px">Cuatro pasos.<br><span class="a" style="color:${C.deep}">Siempre en este orden.</span></h1>
    <div style="margin-top:56px;position:relative;padding-left:56px">
      <span style="position:absolute;left:9px;top:20px;bottom:40px;width:2px;background:rgba(23,23,23,.25)"></span>
      ${[["Entender", "El negocio, el cliente y qué está pasando."], ["Ordenar", "Prioridades, canales y objetivos."], ["Crear", "Campañas, contenido y diseño."], ["Medir", "Qué funciona y dónde invertir."]].map(([t, d], i) => `<div style="position:relative;margin-bottom:34px"><span style="position:absolute;left:-56px;top:22px;width:20px;height:20px;border-radius:50%;border:2px solid ${C.ink};background:${i === 3 ? C.deep : C.cream}"></span><div class="d" style="font-size:88px">${t}<span style="color:${C.deep}">.</span></div><div style="font-size:32px;color:${C.mute};margin-top:8px">${d}</div></div>`).join("")}
    </div>
    ${footer()}</div>`) },

  { name: "post-5-diferencia", w: W, h: H, html: base(W, H, C.ink, `<div class="pad">
    ${header(`<span style="color:${C.agua}">(04)</span> Diferencia`, "Cala Studio", "#A5A49E", "rgba(248,247,242,.16)")}
    <h1 style="margin-top:80px"><span class="d" style="display:block;font-size:104px;color:rgba(248,247,242,.45)">No necesitas hacer <span class="s" style="color:rgba(248,247,242,.75)">más</span> marketing.</span>
    <span class="d" style="display:block;font-size:104px;margin-top:28px;color:${C.cream}">Necesitas saber qué marketing <span class="a" style="color:${C.agua}">merece la pena</span> hacer.</span></h1>
    <svg width="900" height="230" viewBox="0 0 900 230" style="margin-top:70px">
      ${Array.from({ length: 84 }, (_, i) => { const x = 20 + (i % 14) * 66, y = 20 + Math.floor(i / 14) * 38; const hit = [17, 24, 36, 47, 62, 72].includes(i); return hit ? `<circle cx="${x}" cy="${y}" r="15" fill="none" stroke="${C.agua}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="6" fill="${C.agua}"/>` : `<circle cx="${x}" cy="${y}" r="4" fill="rgba(248,247,242,.22)"/>`; }).join("")}
    </svg>
    ${footer("#A5A49E", "rgba(248,247,242,.16)", "84 opciones · 6 que merecen la pena")}</div>`, C.cream) },

  { name: "post-6-contacto", w: W, h: H, html: base(W, H, C.agua, `<div class="pad">
    ${header("(05) Contacto", "Hablemos", C.ink, "rgba(23,23,23,.25)")}
    <h1 class="d" style="font-size:190px;margin-top:110px">¿Tienes algo <span class="a">entre manos?</span></h1>
    <p style="font-size:44px;line-height:1.35;margin-top:60px;max-width:820px">Cuéntanos qué estás montando, qué quieres mejorar o qué no termina de funcionar.</p>
    <div style="position:absolute;left:0;bottom:120px;display:flex;align-items:center;gap:24px;background:${C.ink};color:${C.cream};border-radius:999px;padding:26px 26px 26px 44px;font-size:36px;font-weight:500">Link en la bio <span style="display:grid;place-items:center;width:62px;height:62px;border-radius:50%;background:${C.agua};color:${C.ink}">→</span></div>
    <div class="row l" style="position:absolute;left:0;right:0;bottom:0;border-top:2px solid rgba(23,23,23,.25);padding-top:22px"><span style="display:flex;gap:16px;align-items:center">${mark(34, C.ink, C.cream)} Cala Studio</span><span>hola@thecalastudio.com</span></div></div>`) },

  // ---------- Historia de lanzamiento (9:16) ----------
  { name: "historia-lanzamiento", w: W, h: SH, html: base(W, SH, C.cream, `<div style="position:absolute;inset:220px 90px 260px">
    ${header("Nueva web", "thecalastudio.com")}
    <h1 class="d" style="font-size:170px;margin-top:120px">Ya estamos<br><span class="a" style="color:${C.deep}">en marcha.</span></h1>
    <p style="font-size:46px;line-height:1.35;margin-top:60px;color:rgba(23,23,23,.8)">Estrategia, contenido, publicidad, web y tecnología para marcas que quieren hacer las cosas bien.</p>
    <div style="position:absolute;right:0;bottom:0">${chart(760)}</div></div>`) },
];

// ---------- Portadas de historias destacadas ----------
const glyphs = {
  servicios: `<g fill="none" stroke="${C.ink}" stroke-width="10"><line x1="60" y1="70" x2="300" y2="70"/><line x1="60" y1="180" x2="300" y2="180"/><line x1="60" y1="290" x2="300" y2="290"/></g><circle cx="60" cy="70" r="16" fill="${C.agua}"/>`,
  proyectos: `<rect x="40" y="40" width="280" height="280" fill="none" stroke="${C.ink}" stroke-width="10"/><path d="M45 150A170 170 0 0 1 215 315H45Z" fill="${C.agua}"/>`,
  metodo: `<line x1="40" y1="180" x2="320" y2="180" stroke="${C.ink}" stroke-width="10"/>${[50, 140, 230, 315].map((x, i) => `<circle cx="${x}" cy="180" r="24" fill="${i === 3 ? C.agua : C.cream}" stroke="${C.ink}" stroke-width="10"/>`).join("")}`,
  nosotros: `<circle cx="135" cy="180" r="100" fill="none" stroke="${C.ink}" stroke-width="10"/><circle cx="225" cy="180" r="100" fill="${C.agua}" fill-opacity=".85"/>`,
  contacto: `<circle cx="180" cy="180" r="140" fill="${C.agua}"/><path d="M125 235L235 125M150 125H235V210" fill="none" stroke="${C.ink}" stroke-width="12"/>`,
};
Object.entries(glyphs).forEach(([name, g], i) => {
  pieces.push({ name: `destacada-${i + 1}-${name}`, w: W, h: SH, html: base(W, SH, C.cream, `<div style="position:absolute;inset:0;display:grid;place-items:center"><svg width="380" height="380" viewBox="0 0 360 360">${g}</svg></div>`) });
});

const browser = await chromium.launch();
for (const p of pieces) {
  const page = await browser.newPage({ viewport: { width: p.w, height: p.h } });
  await page.setContent(p.html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: join(outDir, `${p.name}.png`) });
  await page.close();
  console.log("✓", p.name);
}
await browser.close();
