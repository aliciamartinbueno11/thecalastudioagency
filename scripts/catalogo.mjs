// Genera los dos catálogos en PDF:
//   /catalogo        → public/catalogo-cala-studio.pdf   (marketing online)
//   /catalogo/bodas  → public/catalogo-cala-weddings.pdf (Cala Weddings)
// Uso: npm run catalogo   (compila la web, la sirve en local e imprime con Chrome sin ventana)
// Después hay que volver a publicar la web para que el PDF nuevo quede en línea.
import { execFileSync, spawn } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const root = resolve("out");
const catalogs = [
  { page: "/catalogo", pdf: resolve("public/catalogo-cala-studio.pdf") },
  { page: "/catalogo/bodas", pdf: resolve("public/catalogo-cala-weddings.pdf") },
];
const chrome =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!existsSync(chrome)) {
  console.error(`No encuentro Chrome en ${chrome}. Indica la ruta con CHROME_PATH.`);
  process.exit(1);
}

execFileSync("npm", ["run", "build"], { stdio: "inherit" });

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

// Servidor estático mínimo, con las URLs limpias de la exportación (/catalogo → catalogo.html)
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const candidates = [join(root, path), join(root, `${path}.html`), join(root, path, "index.html")];
  const file = candidates.find((f) => f.startsWith(root) && existsSync(f) && statSync(f).isFile());
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});

// spawn asíncrono: un spawnSync bloquearía este proceso y el servidor no podría responder a Chrome
function print(port, { page, pdf }) {
  return new Promise((done, fail) => {
    const child = spawn(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--virtual-time-budget=8000",
        `--print-to-pdf=${pdf}`,
        `http://127.0.0.1:${port}${page}`,
      ],
      { stdio: "inherit" },
    );
    child.on("exit", (code) => {
      if (code !== 0) return fail(new Error(`Chrome terminó con código ${code} en ${page}`));
      console.log(`PDF generado: ${pdf} (${Math.round(statSync(pdf).size / 1024)} KB)`);
      done();
    });
  });
}

server.listen(0, "127.0.0.1", async () => {
  const { port } = server.address();
  try {
    for (const c of catalogs) await print(port, c);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
