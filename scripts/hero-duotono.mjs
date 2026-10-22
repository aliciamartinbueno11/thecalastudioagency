// Genera la foto del hero en duotono aguamarina oscuro / crema.
// Uso: node scripts/hero-duotono.mjs [ruta-de-la-foto]
// Por defecto usa marca/fotos-nerja/cala-del-canuelo.jpg y escribe en public/images/nerja/.
import sharp from "sharp";

const src = process.argv[2] ?? "marca/fotos-nerja/cala-del-canuelo.jpg";
const out = "public/images/nerja/cala-del-canuelo";
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const dark = hex("#0b6b61"); // aguamarina para texto (agua-ink)
const light = hex("#f8f7f2"); // crema

const { width, height } = await sharp(src).metadata();
// Quitamos la franja superior de cielo para que el agua entre en la primera pantalla
const top = Math.round(height * 0.24);

for (const w of [1200, 900]) {
  const { data, info } = await sharp(src)
    .extract({ left: 0, top, width, height: height - top })
    .resize({ width: w })
    .grayscale()
    .normalise()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgb = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < data.length; i++) {
    let t = data[i] / 255;
    t = t * t * (3 - 2 * t); // curva suave para que el duotono no quede plano
    for (let c = 0; c < 3; c++) rgb[i * 3 + c] = Math.round(dark[c] + (light[c] - dark[c]) * t);
  }
  await sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .webp({ quality: 74 })
    .toFile(`${out}-${w}.webp`);
  console.log(`${out}-${w}.webp`);
}
