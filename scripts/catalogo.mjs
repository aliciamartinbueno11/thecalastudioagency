// Genera public/catalogo-cala-studio.pdf a partir de la página /catalogo.
// Uso: npm run catalogo   (compila la web, la sirve en local e imprime con Chrome sin ventana)
// Después hay que volver a publicar la web para que el PDF nuevo quede en línea.
import { execFileSync, spawn } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const root = resolve("out");
const pdf = resolve("public/catalogo-cala-studio.pdf");
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

server.listen(0, "127.0.0.1", () => {
  const { port } = server.address();
  // spawn asíncrono: un spawnSync bloquearía este proceso y el servidor no podría responder a Chrome
  const child = spawn(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=8000",
      `--print-to-pdf=${pdf}`,
      `http://127.0.0.1:${port}/catalogo`,
    ],
    { stdio: "inherit" },
  );
  child.on("exit", (code) => {
    server.close();
    if (code !== 0) process.exit(code ?? 1);
    console.log(`PDF generado: ${pdf} (${Math.round(statSync(pdf).size / 1024)} KB)`);
  });
});
