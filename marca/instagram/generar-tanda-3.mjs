// Genera la tanda 3 de Instagram (oferta de lanzamiento) con las fuentes y colores de la web.
// Requisitos: haber ejecutado `npm run build` (usa las fuentes de out/) y tener Google Chrome.
// Uso: node marca/instagram/generar-tanda-3.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const outDir = join(here, "piezas/tanda-3-oferta");
mkdirSync(outDir, { recursive: true });

const chunks = join(root, "out/_next/static/chunks");
const css = readdirSync(chunks).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(chunks, f), "utf8")).join("");
const fontFaces = (css.match(/@font-face\{[^}]*\}/g) || [])
  .filter((r) => !r.includes("Fallback"))
  .map((r) => r.replace(/url\(\.\.\/media\/([^)]+)\)/g, (_, f) => `url(data:font/woff2;base64,${readFileSync(join(root, "out/_next/static/media", f)).toString("base64")})`))
  .join("\n");

const C = { agua: "#42DCC6", deep: "#159C8E", ink: "#171717", cream: "#F8F7F2", paper: "#EFEDE5", mute: "#62615C", line: "rgba(23,23,23,.16)", muteDark: "#A5A49E", lineDark: "rgba(248,247,242,.16)" };
const W = 1080, H = 1440, SH = 1920;

const base = (w, h, bg, body, color = C.ink) => `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${w}px;height:${h}px;background:${bg};color:${color};overflow:hidden}
body{font-family:"Instrument Sans";-webkit-font-smoothing:antialiased;position:relative}
.d{font-family:"Bricolage Grotesque";font-weight:600;font-stretch:84%;font-variation-settings:"opsz" 96;letter-spacing:-.022em;line-height:.96}
.a{font-family:"Instrument Serif";font-style:italic;font-weight:400;letter-spacing:-.01em}
.l{font-size:26px;font-weight:500;letter-spacing:.08em;text-transform:uppercase}
.p{font-size:48px;line-height:1.3}
.pad{position:absolute;inset:90px}
.row{display:flex;justify-content:space-between;align-items:center}
</style></head><body>${body}</body></html>`;

const mark = (size, frame, disc = C.agua) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><rect x="0.75" y="0.75" width="22.5" height="22.5" fill="none" stroke="${frame}" stroke-width="1.5"/><path d="M0.75 9.5A13.75 13.75 0 0 1 14.5 23.25H0.75Z" fill="${disc}"/></svg>`;

const THEMES = {
  cream: { bg: C.cream, fg: C.ink, mute: C.mute, line: C.line, accent: C.deep, frame: C.ink, disc: C.agua, num: "#0B6B61" },
  paper: { bg: C.paper, fg: C.ink, mute: C.mute, line: C.line, accent: C.deep, frame: C.ink, disc: C.agua, num: "#0B6B61" },
  ink: { bg: C.ink, fg: C.cream, mute: C.muteDark, line: C.lineDark, accent: C.agua, frame: C.cream, disc: C.agua, num: C.agua },
  agua: { bg: C.agua, fg: C.ink, mute: C.ink, line: "rgba(23,23,23,.25)", accent: C.ink, frame: C.ink, disc: C.cream, num: C.ink },
};

const header = (t, left, right) => `<div class="row l" style="color:${t.mute};border-bottom:2px solid ${t.line};padding-bottom:22px"><span>${left}</span><span>${right}</span></div>`;
const footer = (t, right, handle = "@calastudio.agency") => `<div class="row l" style="position:absolute;left:0;right:0;bottom:0;color:${t.mute};border-top:2px solid ${t.line};padding-top:22px"><span style="display:flex;gap:16px;align-items:center;text-transform:none;letter-spacing:.02em">${mark(34, t.frame, t.disc)} ${handle}</span><span>${right}</span></div>`;
const em = (t, s) => `<span class="a" style="color:${t.accent}">${s}</span>`;

const img = (path) => `data:image/webp;base64,${readFileSync(join(root, "public/images", path)).toString("base64")}`;

// ---------- Plantillas de lámina ----------
const slide = (theme, topic, n, total, inner, handle) => {
  const t = THEMES[theme];
  return { w: W, h: H, html: base(W, H, t.bg, `<div class="pad">${header(t, topic, "Cala Studio")}${inner(t)}${footer(t, total ? `${n}/${total}` : "thecalastudio.com", handle)}</div>`, t.fg) };
};
const cover = (theme, topic, n, total, title, sub, size = 170, extra = "", handle) =>
  slide(theme, topic, n, total, (t) => `<h1 class="d" style="font-size:${size}px;margin-top:110px">${title(t)}</h1><p class="p" style="margin-top:56px;color:${t.mute}">${sub}</p>${extra}`, handle);
const stake = (topic, n, total, text, handle) =>
  slide("ink", topic, n, total, (t) => `<p class="d" style="position:absolute;left:0;right:0;bottom:130px;font-size:124px;line-height:1.02">${text(t)}</p>`, handle);
const point = (theme, topic, n, total, num, title, text, handle) =>
  slide(theme, topic, n, total, (t) => `<div class="a" style="font-size:440px;line-height:1;color:${t.accent};margin-top:30px">${num}</div><div style="position:absolute;left:0;right:0;bottom:130px"><h2 class="d" style="font-size:132px">${title}</h2><p style="font-size:56px;line-height:1.28;margin-top:40px;color:${t.fg}">${text}</p></div>`, handle);
const recap = (topic, n, total, title, items, note = "", handle) =>
  slide("paper", topic, n, total, (t) => `<h2 class="d" style="font-size:100px;margin-top:80px">${title(t)}</h2><div style="margin-top:60px;border-top:2px solid ${C.ink}">${items.map((it, i) => `<div style="display:flex;gap:36px;align-items:baseline;border-bottom:2px solid ${t.line};padding:36px 0"><span class="l" style="color:${t.num};width:56px">0${i + 1}</span><span style="font-family:'Bricolage Grotesque';font-weight:500;font-size:74px;letter-spacing:-.02em">${it}</span></div>`).join("")}</div>${note ? `<p style="font-size:42px;line-height:1.3;margin-top:44px">${note}</p>` : ""}`, handle);
const close = (topic, n, total, title, size = 150, handle) =>
  slide("agua", topic, n, total, (t) => `${arcs(t)}<h2 class="d" style="position:absolute;left:0;right:0;bottom:130px;font-size:${size}px">${title}</h2>`, handle);
const photo = (topic, n, total, src, title, text, note, handle) =>
  slide("cream", topic, n, total, (t) => `<div style="margin-top:36px;height:640px;background:${C.paper} url(${img(src)}) center/${note ? "contain" : "cover"} no-repeat;position:relative">${note ? `<span style="position:absolute;left:18px;bottom:18px;background:${C.cream};padding:8px 16px;font-size:26px">${note}</span>` : ""}</div><h2 class="d" style="font-size:96px;margin-top:40px">${title}</h2><p style="font-size:44px;line-height:1.28;margin-top:24px">${text}</p>`, handle);

const arcs = (t) => `<svg width="900" height="470" viewBox="0 0 900 470" style="position:absolute;left:0;top:90px;overflow:hidden">${[150, 240, 340, 450, 570].map((r, i) => `<path d="M${900 - r} 0A${r} ${r} 0 0 0 900 ${r}" fill="none" stroke="${t.fg}" stroke-opacity="${i % 2 ? 0.3 : 0.55}" stroke-width="2"/>`).join("")}<path d="M780 0A120 120 0 0 0 900 120V0Z" fill="${C.cream}"/></svg>`;

const pieces = {};
const add = (name, p) => { pieces[name] = p; };
const series = (prefix, list) => list.forEach((p, i) => add(`${prefix}-${String(i + 1).padStart(2, "0")}`, p));
const story = (theme, tag, inner) => {
  const t = THEMES[theme];
  return { w: W, h: SH, html: base(W, SH, t.bg, `<div style="position:absolute;left:90px;right:90px;top:250px;bottom:320px">${header(t, tag, "Cala Studio")}${inner(t)}</div>`, t.fg) };
};
const says = (theme, tag, text, size = 130) => story(theme, tag, () => `<p class="d" style="position:absolute;left:0;right:0;bottom:0;font-size:${size * 1.12}px;line-height:1">${text}</p>`);
// Hueco libre abajo para colocar la pegatina en Instagram
const ask = (theme, tag, text, size = 110) => story(theme, tag, () => `<p class="d" style="font-size:${size}px;line-height:1;margin-top:90px">${text}</p>`);
// Rótulo con fondo transparente para poner encima del vídeo
const overlay = (text) => ({ w: W, h: SH, transparent: true, html: base(W, SH, "transparent", `<div style="position:absolute;left:90px;right:90px;bottom:400px;background:${C.cream};padding:44px 48px"><p class="d" style="font-size:84px;line-height:1.02">${text}</p></div>`) });

// ---------- Oferta de lanzamiento (precios de src/data: validados el 13-11-2026) ----------
const off = (p) => Math.round(p * 0.1);
const eur = (n) => `${n.toLocaleString("es-ES")} €`;

// Lámina de texto: palabra grande arriba, titular y texto abajo
const statement = (theme, topic, n, total, kicker, title, text, handle, ks = 230) =>
  slide(theme, topic, n, total, (t) => `<div class="a" style="font-size:${ks}px;line-height:1;color:${t.accent};margin-top:60px">${kicker}</div><div style="position:absolute;left:0;right:0;bottom:130px"><h2 class="d" style="font-size:124px">${title}</h2><p style="font-size:54px;line-height:1.28;margin-top:40px;color:${t.fg}">${text}</p></div>`, handle);

// Lista compacta
const list = (theme, topic, n, total, title, items, handle) =>
  slide(theme, topic, n, total, (t) => `<h2 class="d" style="font-size:110px;margin-top:70px">${title(t)}</h2><div style="margin-top:50px;border-top:2px solid ${t.fg}">${items.map((it, i) => `<div style="display:flex;gap:36px;align-items:baseline;border-bottom:2px solid ${t.line};padding:26px 0"><span class="l" style="color:${t.num};width:56px">0${i + 1}</span><span style="font-family:'Bricolage Grotesque';font-weight:500;font-size:66px;letter-spacing:-.02em">${it}</span></div>`).join("")}</div>`, handle);

// Precios: catálogo tachado y precio de lanzamiento
const prices = (theme, topic, n, total, title, rows, note, handle) =>
  slide(theme, topic, n, total, (t) => `<h2 class="d" style="font-size:104px;margin-top:70px">${title(t)}</h2><div style="margin-top:50px;border-top:2px solid ${t.fg}">${rows.map(([name, was, unit = ""]) => `<div style="border-bottom:2px solid ${t.line};padding:28px 0"><div style="font-size:42px;color:${t.mute}">${name}</div><div style="display:flex;align-items:baseline;gap:30px;margin-top:6px"><s style="font-size:54px;color:${t.mute}">${eur(was)}${unit}</s><span class="d" style="font-size:112px;color:${t.fg}">${eur(off(was))}</span><span style="font-size:42px">${unit}</span></div></div>`).join("")}</div><p style="font-size:36px;line-height:1.3;margin-top:36px;color:${t.mute}">${note}</p>`, handle);

// Puntos del contador: llenos los que quedan, vacíos los reservados
const dots = (t, left, size = 70, fill = C.ink, ring = C.ink) => `<div style="display:flex;gap:${size * 0.4}px">${[0, 1, 2, 3, 4].map((i) => `<span style="width:${size}px;height:${size}px;border-radius:50%;border:${size * 0.09}px solid ${ring};background:${i < left ? fill : "transparent"}"></span>`).join("")}</div>`;

// Cierre con palabra clave y contador
const closeOffer = (topic, n, total, title, kind, handle) =>
  slide("agua", topic, n, total, (t) => `${arcs(t)}<div style="position:absolute;left:0;right:0;bottom:130px"><div style="display:flex;align-items:center;gap:36px">${dots(t, 5, 54)}<span class="l">Quedan 5 de 5 ${kind}</span></div><h2 class="d" style="font-size:150px;margin-top:60px">${title}</h2></div>`, handle);

// Portada con distintivo «−90 %»
const badge = (bg, fg, accent, line2) => `<div style="position:absolute;right:0;bottom:120px;width:420px;height:420px;border-radius:50%;background:${bg};color:${fg};display:grid;place-items:center;text-align:center"><div><div style="font-size:30px;opacity:.75">Oferta de lanzamiento</div><div class="d" style="font-size:140px;color:${accent};margin-top:6px">−90 %</div><div style="font-size:30px;margin-top:4px">${line2}</div></div></div>`;

// ---------- Carrusel fijado: 5 proyectos al 90 % ----------
const TM = "Oferta de lanzamiento";
series("carrusel-1-oferta-marketing", [
  cover("cream", TM, 1, 7, (t) => `5 proyectos al ${em(t, "90&nbsp;%.")}`, "Oferta de lanzamiento de Cala Studio.", 200, badge(C.ink, C.cream, C.agua, "cinco plazas")),
  statement("ink", TM, 2, 7, "Por qué", "Estamos empezando.", "Queremos llenar el portfolio con trabajos reales. Por eso los cinco primeros pagan el 10 %."),
  list("cream", TM, 3, 7, (t) => `Qué ${em(t, "entra:")}`, ["Estrategia", "Redes sociales", "Publicidad digital", "Web y landing pages", "Branding", "Automatización"]),
  prices("paper", TM, 4, 7, (t) => `Algunos ${em(t, "ejemplos:")}`, [["Landing page, desde", 750], ["Identidad visual, desde", 900], ["Gestión de redes, desde", 350, " /mes"]], "En servicios mensuales, el descuento se aplica a los tres primeros meses."),
  statement("cream", TM, 5, 7, "A cambio", "Dos cosas.", "Poder enseñar el trabajo en nuestra web y redes, y que nos menciones cuando lo publiques."),
  statement("ink", TM, 6, 7, "Condiciones", "Por orden de confirmación.", "Impresión, producción e inversión en anuncios van aparte, a su precio normal.", undefined, 190),
  closeOffer(TM, 7, 7, `Escríbenos <span class="a">PLAZA</span> por mensaje privado.`, "plazas"),
]);

// ---------- Carrusel: Cala Weddings, 5 bodas al 90 % ----------
const TW = "Cala Weddings";
const HW = "@calastudio.agency";
series("carrusel-2-oferta-bodas", [
  slide("cream", TW, 1, 6, (t) => `<div style="margin-top:36px;height:600px;background:url(${img("bodas/linea-fina/sobres-lacre.webp")}) center/cover no-repeat;position:relative">${""}</div><h1 class="d" style="font-size:190px;margin-top:40px">5 bodas al ${em(t, "90&nbsp;%.")}</h1><p style="font-size:46px;margin-top:28px;color:${t.mute}">Cala Weddings, oferta de lanzamiento.</p>`, HW),
  photo(TW, 2, 6, "bodas/concepto-invitacion.webp", "Qué diseñamos", "Identidad de la boda, invitaciones, papelería, web con RSVP y todo lo que se ve el gran día.", "Diseño conceptual", HW),
  prices("paper", TW, 3, 6, (t) => `Algunos ${em(t, "ejemplos:")}`, [["Paquete Integral", 790], ["Paquete Papelería completa", 540], ["Web de boda con RSVP, desde", 350]], "Descuento sobre el diseño. La impresión y la producción van aparte.", HW),
  statement("cream", TW, 4, 6, "A cambio", "Poder enseñarlo.", "Sin nombres, fechas ni datos de invitados. Y una mención cuando lo publiquéis.", HW),
  statement("ink", TW, 5, 6, "Para quién", "Estéis donde estéis.", "Parejas y wedding planners de toda España y de fuera, en español, inglés y otros idiomas.", HW),
  closeOffer(TW, 6, 6, `Escribidnos <span class="a">BODA</span> por mensaje privado.`, "bodas", HW),
]);

// ---------- Reel: fotogramas de texto (1080×1920) ----------
const R = "Oferta de lanzamiento";
series("reel-oferta", [
  says("ink", R, `¿Por qué una agencia cobra <span class="a" style="color:${C.agua}">solo el 10 %?</span>`, 140),
  says("cream", R, `Porque estamos empezando y queremos enseñarte <span class="a" style="color:${C.deep}">trabajos reales, no promesas.</span>`, 112),
  story("paper", R, () => `<div style="position:absolute;left:0;right:0;bottom:0"><p class="d" style="font-size:170px;line-height:1">5 proyectos de marketing.</p><p class="d" style="font-size:170px;line-height:1;margin-top:30px">5 bodas.</p><p class="a" style="font-size:150px;color:${C.deep};margin-top:30px">Al 90 %.</p></div>`),
  says("ink", R, `A cambio: poder enseñarlo <span class="a" style="color:${C.agua}">y una mención.</span>`, 140),
  says("agua", R, `Escribe <span class="a">PLAZA</span> o <span class="a">BODA</span> por privado.`, 150),
]);

// ---------- Historias: lanzamiento ----------
const S = "Oferta de lanzamiento";
series("historia-lanzamiento", [
  says("ink", S, `Tenemos algo para <span class="a" style="color:${C.agua}">los cinco primeros.</span>`, 150),
  story("cream", S, (t) => `<div style="position:absolute;left:0;right:0;bottom:0"><p class="d" style="font-size:330px;line-height:.9;color:${t.fg}">−90 %</p><p style="font-size:64px;line-height:1.25;margin-top:50px">en tu proyecto de marketing <span class="a" style="color:${C.deep};font-size:76px">o en el diseño de tu boda.</span></p></div>`),
  ask("cream", S, `¿Qué te interesa <span class="a" style="color:${C.deep}">más?</span>`, 150),
  ask("paper", S, `Mira qué entra <span class="a" style="color:${C.deep}">y las condiciones.</span>`, 130),
  ask("agua", S, `Escribe <span class="a">PLAZA</span> o <span class="a">BODA</span> y te contamos.`, 130),
]);

// ---------- Historias: contador (una por plaza confirmada) ----------
const counter = (kind, label, word, left) =>
  story(left % 2 ? "cream" : "ink", "Oferta de lanzamiento", (t) => `<div style="position:absolute;left:0;right:0;bottom:0">${dots(t, left, 110, t.accent === C.agua ? C.agua : C.deep, t.fg)}<p class="d" style="font-size:190px;line-height:.98;margin-top:80px">Quedan ${left} de 5</p><p class="a" style="font-size:96px;color:${t.accent};margin-top:20px">plazas ${label}.</p><p style="font-size:46px;line-height:1.3;margin-top:60px;color:${t.mute}">Gracias a quien ya ha reservado. Escribe ${word}.</p></div>`);
[4, 3, 2, 1].forEach((left) => {
  add(`historia-contador-marketing-quedan-${left}`, counter("marketing", "de marketing", "PLAZA", left));
  add(`historia-contador-bodas-quedan-${left}`, counter("bodas", "de bodas", "BODA", left));
});
const full = (label) => story("agua", "Oferta de lanzamiento", (t) => `<div style="position:absolute;left:0;right:0;bottom:0">${dots(t, 0, 110, C.ink, C.ink)}<p class="d" style="font-size:170px;line-height:1;margin-top:80px">Plazas ${label} completas.</p><p class="a" style="font-size:110px;margin-top:30px">Gracias.</p></div>`);
add("historia-completas-marketing", full("de marketing"));
add("historia-completas-bodas", full("de bodas"));

// ---------- Portada de la destacada «Oferta» ----------
add("destacada-oferta", { w: W, h: SH, html: base(W, SH, C.cream, `<div style="position:absolute;inset:0;display:grid;place-items:center"><svg width="380" height="380" viewBox="0 0 360 360"><circle cx="180" cy="180" r="140" fill="${C.agua}"/><circle cx="130" cy="130" r="26" fill="none" stroke="${C.ink}" stroke-width="12"/><circle cx="230" cy="230" r="26" fill="none" stroke="${C.ink}" stroke-width="12"/><line x1="240" y1="110" x2="120" y2="250" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/></svg></div>`) });

// ---------- Render ----------
const tmp = mkdtempSync(join(tmpdir(), "cala-ig-"));
for (const [name, p] of Object.entries(pieces)) {
  const file = join(tmp, `${name}.html`);
  writeFileSync(file, p.html);
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
    `--user-data-dir=${join(tmp, "perfil")}`, `--window-size=${p.w},${p.h}`, "--virtual-time-budget=3000",
    ...(p.transparent ? ["--default-background-color=00000000"] : []),
    `--screenshot=${join(outDir, `${name}.png`)}`, `file://${file}`,
  ], { stdio: "ignore" });
  console.log("✓", name);
}
rmSync(tmp, { recursive: true, force: true });
