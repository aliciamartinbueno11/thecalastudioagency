/**
 * Worker de Cloudflare: sirve la web estática (carpeta out/) y atiende el formulario.
 * Cloudflare entrega primero los archivos estáticos; este código solo se ejecuta
 * cuando una ruta no corresponde a ningún archivo, como POST /api/contacto.
 */
import { onRequestPost } from "../functions/api/contacto";

type Env = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
};

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contacto") {
      if (request.method !== "POST") return new Response("Método no permitido", { status: 405 });
      return onRequestPost({ request, env });
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
