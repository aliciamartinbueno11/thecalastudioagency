// Genera las imágenes placeholder de proyectos en /public/images/proyectos.
// Uso: node scripts/generate-placeholders.mjs
// Sustituye los .webp resultantes por las imágenes reales cuando las tengas.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = new URL("../public/images/proyectos/", import.meta.url);
const W = 1600;
const H = 1200;
const c = { agua: "#42DCC6", deep: "#159C8E", cream: "#F8F7F2", paper: "#ECEAE1", ink: "#171717", gray: "#BDBBB3" };

const grid = (stroke, step = 80) => {
  let s = "";
  for (let x = step; x < W; x += step) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${stroke}" stroke-width="1"/>`;
  for (let y = step; y < H; y += step) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${stroke}" stroke-width="1"/>`;
  return s;
};

const arcs = (cx, cy, from, to, step, stroke) => {
  let s = "";
  for (let r = from; r <= to; r += step) s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="1.5"/>`;
  return s;
};

const compositions = {
  // Proyecto 01 — fondo papel, bloque aguamarina con arco
  "proyecto-01": `
    <rect width="${W}" height="${H}" fill="${c.paper}"/>
    ${grid("rgba(23,23,23,0.06)")}
    <rect x="240" y="240" width="720" height="720" fill="${c.agua}"/>
    <path d="M960 240 A720 720 0 0 0 240 960 L240 240 Z" fill="${c.deep}" opacity="0.18"/>
    <circle cx="1200" cy="360" r="14" fill="${c.ink}"/>
    <line x1="960" y1="960" x2="1360" y2="960" stroke="${c.ink}" stroke-width="2"/>`,
  "proyecto-01-a": `
    <rect width="${W}" height="${H}" fill="${c.ink}"/>
    ${arcs(0, H, 200, 1400, 120, "rgba(66,220,198,0.35)")}
    <circle cx="1120" cy="420" r="18" fill="${c.agua}"/>`,
  "proyecto-01-b": `
    <rect width="${W}" height="${H}" fill="${c.cream}"/>
    <rect x="0" y="720" width="${W}" height="480" fill="${c.agua}"/>
    <rect x="320" y="320" width="400" height="560" fill="${c.ink}"/>
    <rect x="880" y="200" width="400" height="560" fill="${c.paper}" stroke="${c.ink}" stroke-width="2"/>`,
  // Proyecto 02 — fondo negro, marco y círculo
  "proyecto-02": `
    <rect width="${W}" height="${H}" fill="${c.ink}"/>
    ${grid("rgba(248,247,242,0.05)")}
    <rect x="440" y="200" width="560" height="800" fill="${c.cream}"/>
    <path d="M440 640 A360 360 0 0 1 800 1000 L440 1000 Z" fill="${c.agua}"/>
    <rect x="1080" y="360" width="320" height="460" fill="none" stroke="rgba(248,247,242,0.4)" stroke-width="2"/>
    <line x1="520" y1="300" x2="760" y2="300" stroke="${c.ink}" stroke-width="6"/>
    <line x1="520" y1="340" x2="680" y2="340" stroke="${c.ink}" stroke-width="2"/>`,
  "proyecto-02-a": `
    <rect width="${W}" height="${H}" fill="${c.paper}"/>
    <rect x="160" y="160" width="600" height="880" fill="${c.cream}" stroke="${c.ink}" stroke-width="2"/>
    <rect x="840" y="160" width="600" height="420" fill="${c.agua}"/>
    <rect x="840" y="620" width="600" height="420" fill="${c.ink}"/>`,
  "proyecto-02-b": `
    <rect width="${W}" height="${H}" fill="${c.agua}"/>
    ${arcs(W / 2, H / 2, 80, 760, 80, "rgba(23,23,23,0.25)")}
    <circle cx="${W / 2}" cy="${H / 2}" r="20" fill="${c.ink}"/>`,
  // Proyecto 03 — fondo aguamarina, barras de datos
  "proyecto-03": `
    <rect width="${W}" height="${H}" fill="${c.cream}"/>
    ${grid("rgba(23,23,23,0.06)")}
    <rect x="240" y="720" width="160" height="240" fill="${c.gray}"/>
    <rect x="480" y="600" width="160" height="360" fill="${c.gray}"/>
    <rect x="720" y="480" width="160" height="480" fill="${c.ink}"/>
    <rect x="960" y="320" width="160" height="640" fill="${c.agua}"/>
    <rect x="1200" y="400" width="160" height="560" fill="${c.gray}"/>
    <line x1="160" y1="960" x2="1440" y2="960" stroke="${c.ink}" stroke-width="2"/>
    <circle cx="1040" cy="240" r="16" fill="${c.deep}"/>`,
  "proyecto-03-a": `
    <rect width="${W}" height="${H}" fill="${c.ink}"/>
    <path d="M160 900 L560 700 L880 760 L1440 300" fill="none" stroke="${c.agua}" stroke-width="6"/>
    <circle cx="560" cy="700" r="14" fill="${c.cream}"/>
    <circle cx="880" cy="760" r="14" fill="${c.cream}"/>
    <circle cx="1440" cy="300" r="18" fill="${c.agua}"/>`,
  "proyecto-03-b": `
    <rect width="${W}" height="${H}" fill="${c.paper}"/>
    <rect x="200" y="240" width="1200" height="160" fill="${c.cream}" stroke="${c.ink}" stroke-width="2"/>
    <rect x="200" y="520" width="1200" height="160" fill="${c.agua}"/>
    <rect x="200" y="800" width="1200" height="160" fill="${c.cream}" stroke="${c.ink}" stroke-width="2"/>
    <circle cx="280" cy="600" r="16" fill="${c.ink}"/>`,
};

await mkdir(OUT, { recursive: true });
for (const [name, body] of Object.entries(compositions)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(new URL(`${name}.webp`, OUT).pathname);
  console.log("✓", name);
}
