/**
 * Worker de Cloudflare: sirve la web estática (carpeta out/) y atiende los formularios.
 * Cloudflare entrega primero los archivos estáticos; este código solo se ejecuta
 * cuando una ruta no corresponde a ningún archivo, como POST /api/contacto o /api/bodas.
 */
import { onRequestPost as contacto } from "../functions/api/contacto";
import { onRequestPost as bodas } from "../functions/api/bodas";
import type { EmailEnv } from "../src/lib/email";

type Env = EmailEnv & {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
};

const routes: Record<string, (ctx: { request: Request; env: EmailEnv }) => Promise<Response>> = {
  "/api/contacto": contacto,
  "/api/bodas": bodas,
};

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    const handler = routes[pathname];
    if (handler) {
      if (request.method !== "POST") return new Response("Método no permitido", { status: 405 });
      return handler({ request, env });
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
