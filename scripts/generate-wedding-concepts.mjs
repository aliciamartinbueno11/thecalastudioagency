// Genera las imágenes conceptuales de Cala Weddings en /public/images/bodas.
// Son diseños conceptuales (pareja ficticia «Clara & Teo»), no trabajos reales:
// sustitúyelas por fotografías de bodas reales cuando las tengáis (mismas rutas).
// Requisitos: `npm run build` previo (usa las fuentes de out/) y Playwright.
// Uso: PLAYWRIGHT_PATH=$(npm root -g)/playwright node scripts/generate-wedding-concepts.mjs
import { readFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/images/bodas");
mkdirSync(outDir, { recursive: true });

const chunks = join(root, "out/_next/static/chunks");
const media = join(root, "out/_next/static/media");
const css = readdirSync(chunks).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(chunks, f), "utf8")).join("");
const fonts = (css.match(/@font-face\{[^}]*\}/g) || [])
  .filter((r) => !r.includes("Fallback"))
  .map((r) => r.replace(/url\(\.\.\/media\/([^)]+)\)/g, (_, f) => `url(data:font/woff2;base64,${readFileSync(join(media, f)).toString("base64")})`))
  .join("\n");

const W = 1200, H = 1500;
const noise = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .14 0 0 0 0 .12 0 0 0 0 .1 0 0 0 .55 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>`)}")`;

const page = (bg, body) => `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{position:relative;background:${bg};font-family:"Instrument Sans";color:#24201b;-webkit-font-smoothing:antialiased}
body:before{content:"";position:absolute;inset:0;background-image:${noise};opacity:.18;mix-blend-mode:multiply;pointer-events:none;z-index:50}
body:after{content:"";position:absolute;inset:0;background:linear-gradient(118deg,rgba(255,252,245,.55) 0%,rgba(255,252,245,0) 42%,rgba(36,32,27,.10) 100%);pointer-events:none;z-index:40}
.s{font-family:"Instrument Serif";font-weight:400;letter-spacing:-.01em;line-height:1}
.i{font-style:italic;color:#2b6f66}
.l{font-size:13px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:#675f55}
.paper{position:absolute;background:#fdfbf7;box-shadow:0 2px 2px rgba(36,32,27,.05),28px 38px 60px -18px rgba(36,32,27,.38)}
.paper:after{content:"";position:absolute;inset:0;background-image:${noise};opacity:.08;mix-blend-mode:multiply}
.c{display:flex;flex-direction:column;align-items:center;text-align:center}
.rule{width:56px;height:1px;background:rgba(36,32,27,.3)}
</style></head><body>${body}</body></html>`;

const mono = (size, color = "#24201b") => `<div style="position:relative;width:${size}px;height:${size * 1.2}px;display:grid;place-items:center;color:${color}">
<svg viewBox="0 0 100 120" style="position:absolute;inset:0;width:100%;height:100%"><path d="M6 118V50a44 44 0 0 1 88 0v68" fill="none" stroke="currentColor" stroke-width="1"/></svg>
<span class="s" style="font-size:${size * 0.42}px;padding-top:${size * 0.22}px">C<span class="i" style="font-size:.6em;padding:0 .06em">&amp;</span>T</span></div>`;

const scenes = {
  // Suite de invitación sobre lino
  "concepto-invitacion": page("#e9e0d1", `
    <div class="paper" style="left:120px;top:150px;width:560px;height:400px;background:#dccfbb;transform:rotate(-8deg)">
      <div style="position:absolute;left:0;right:0;top:0;height:210px;background:#d3c4ae;clip-path:polygon(0 0,100% 0,50% 100%)"></div>
      <div style="position:absolute;left:50%;top:180px;width:70px;height:70px;margin-left:-35px;border-radius:50%;background:#2b6f66;display:grid;place-items:center;color:#fdfbf7" class="s"><span style="font-size:30px">C&amp;T</span></div>
    </div>
    <div class="paper c" style="left:330px;top:330px;width:560px;height:790px;padding:80px 60px;transform:rotate(2deg)">
      ${mono(120)}
      <p class="l" style="margin-top:44px">Os invitamos a celebrar nuestra boda</p>
      <p class="s" style="font-size:96px;margin-top:40px">Clara <span class="i">&amp;</span> Teo</p>
      <div class="rule" style="margin:42px 0"></div>
      <p style="font-size:24px;line-height:1.6;color:rgba(36,32,27,.8)">Sábado, 12 de junio de 2027<br>a las seis de la tarde<br>Costa del Sol</p>
      <p class="l" style="margin-top:auto;font-size:11px">Confirmad asistencia antes del 1 de mayo</p>
    </div>
    <div class="paper c" style="left:740px;top:980px;width:330px;height:230px;padding:36px;transform:rotate(-5deg)">
      <p class="l" style="font-size:11px;color:#2b6f66">Confirmación</p>
      <p class="s" style="font-size:40px;margin-top:16px">¿Nos acompañáis?</p>
      <div style="margin-top:22px;width:80%;height:2px;background:rgba(36,32,27,.15)"></div>
      <div style="margin-top:16px;width:60%;height:2px;background:rgba(36,32,27,.15)"></div>
    </div>`),

  // Hoja de identidad: monograma, paleta y tipografía
  "concepto-identidad": page("#d9cebd", `
    <div class="paper" style="left:140px;top:150px;width:920px;height:1200px;padding:90px">
      <p class="l">Identidad · Clara &amp; Teo</p>
      <div style="display:flex;justify-content:center;margin-top:90px">${mono(260)}</div>
      <div style="display:flex;justify-content:center;gap:26px;margin-top:110px">
        ${["#faf6ef", "#ece4d6", "#d6cbb9", "#2b6f66", "#24201b"].map((c) => `<div class="c" style="gap:14px"><div style="width:100px;height:100px;border-radius:50%;background:${c};box-shadow:inset 0 0 0 1px rgba(36,32,27,.12)"></div><span class="l" style="font-size:10px">${c.toUpperCase()}</span></div>`).join("")}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:110px;border-top:1px solid rgba(36,32,27,.18);padding-top:40px">
        <p class="s" style="font-size:150px">Aa <span class="i">Aa</span></p>
        <p style="font-size:20px;line-height:1.6;color:#675f55;text-align:right">Instrument Serif<br>Instrument Sans</p>
      </div>
    </div>`),

  // Web de boda en el móvil
  "concepto-web": page("#ece4d6", `
    <div style="position:absolute;left:330px;top:150px;width:540px;height:1140px;border-radius:78px;background:#24201b;padding:18px;box-shadow:40px 50px 80px -20px rgba(36,32,27,.45);transform:rotate(-3deg)">
      <div class="c" style="width:100%;height:100%;border-radius:62px;background:#fdfbf7;padding:70px 46px 46px;overflow:hidden">
        <div style="width:100%;display:flex;justify-content:space-between;align-items:center"><span class="s" style="font-size:34px">C&amp;T</span><span class="l" style="font-size:12px">Programa · RSVP</span></div>
        <div style="margin-top:46px;width:330px;height:420px;border-radius:999px 999px 0 0;background:linear-gradient(160deg,#efe7da,#cbbfae)"></div>
        <p class="s" style="font-size:76px;margin-top:40px">Clara <span class="i">&amp;</span> Teo</p>
        <p class="l" style="margin-top:16px">12 · 06 · 2027</p>
        <div style="display:flex;gap:46px;margin-top:40px">${[["248", "días"], ["10", "horas"], ["32", "min"]].map(([n, l]) => `<div class="c"><span class="s" style="font-size:54px">${n}</span><span class="l" style="font-size:11px;margin-top:8px">${l}</span></div>`).join("")}</div>
        <div style="margin-top:auto;width:100%;border-radius:999px;background:#2b6f66;color:#fdfbf7;padding:26px;font-size:22px;font-weight:500">Confirmar asistencia</div>
      </div>
    </div>`),

  // Minuta y número de mesa
  "concepto-menu": page("#e7ddcd", `
    <div class="paper c" style="left:190px;top:170px;width:440px;height:1060px;padding:80px 50px;transform:rotate(-2deg)">
      ${mono(90)}
      <p class="s" style="font-size:84px;margin-top:40px">Menú</p>
      <div class="rule" style="margin:36px 0 20px"></div>
      ${["Entrantes", "Del mar", "De la tierra", "Postre"].map((c) => `<div class="c" style="margin-top:42px;width:100%"><p class="l" style="color:#2b6f66;font-size:12px">${c}</p><p class="s" style="font-size:30px;margin-top:14px;color:rgba(36,32,27,.75)">Plato de temporada</p></div>`).join("")}
    </div>
    <div class="paper c" style="left:700px;top:620px;width:330px;height:460px;padding:60px 40px;transform:rotate(4deg)">
      <p class="l" style="color:#2b6f66">Mesa</p>
      <p class="s" style="font-size:120px;margin-top:40px">Faro</p>
      <div class="rule" style="margin-top:50px"></div>
    </div>`),

  // Cartel de bienvenida y seating plan
  "concepto-seating": page("#d6cbb9", `
    <div class="c" style="position:absolute;left:110px;top:170px;width:520px;height:760px;border-radius:999px 999px 0 0;background:#f6f1e8;border:14px solid #fdfbf7;justify-content:center;padding:60px;box-shadow:34px 44px 70px -20px rgba(36,32,27,.45)">
      <p class="l">Bienvenidos a la boda de</p>
      <p class="s" style="font-size:96px;margin-top:40px">Clara<br><span class="i">&amp;</span> Teo</p>
      <div class="rule" style="margin:40px 0"></div>
      <p class="l">12 · 06 · 2027</p>
    </div>
    <div class="paper" style="left:520px;top:720px;width:580px;height:620px;padding:56px;transform:rotate(2deg)">
      <div style="display:flex;justify-content:space-between;align-items:flex-end"><p class="s" style="font-size:52px">Encontrad <span class="i">vuestra mesa</span></p></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px 26px;margin-top:46px">
        ${["Mar", "Arena", "Olivo", "Faro", "Brisa", "Cala"].map((t) => `<div style="border-top:1px solid rgba(36,32,27,.3);padding-top:14px"><p class="s" style="font-size:32px">${t}</p>${[0, 1, 2, 3].map(() => `<div style="margin-top:12px;width:85%;height:2px;background:rgba(36,32,27,.14)"></div>`).join("")}</div>`).join("")}
      </div>
    </div>`),
};

const browser = await chromium.launch();
for (const [name, html] of Object.entries(scenes)) {
  const p = await browser.newPage({ viewport: { width: W, height: H } });
  await p.setContent(html, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  const png = await p.screenshot();
  await sharp(png).webp({ quality: 82 }).toFile(join(outDir, `${name}.webp`));
  await p.close();
  console.log("✓", name);
}
await browser.close();
