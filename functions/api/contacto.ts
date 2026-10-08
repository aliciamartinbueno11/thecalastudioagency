/**
 * Cloudflare Pages Function — POST /api/contacto
 *
 * Valida el formulario con la misma lógica que el cliente y, si están
 * configuradas las variables de entorno, envía el mensaje por email con Resend.
 *
 * Variables (Cloudflare → tu proyecto de Pages → Settings → Variables and Secrets):
 *   RESEND_API_KEY  clave de https://resend.com (secreto)
 *   CONTACT_TO      (opcional) email que recibe los mensajes. Por defecto, hola@thecalastudio.com
 *   CONTACT_FROM    (opcional) remitente verificado en Resend. Por defecto, web@thecalastudio.com
 */
import { validateContact, type ContactPayload } from "../../src/lib/contact";

const DEFAULT_TO = "hola@thecalastudio.com";
const DEFAULT_FROM = "Web Cala Studio <web@thecalastudio.com>";

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
};

type Context = { request: Request; env: Env };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function onRequestPost({ request, env }: Context) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Petición no válida." }, 400);
  }

  const data: ContactPayload = {
    name: String(body.name ?? ""),
    company: String(body.company ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    services: Array.isArray(body.services) ? body.services.map(String) : [],
    message: String(body.message ?? ""),
    privacy: body.privacy === true,
    website: String(body.website ?? ""),
  };

  // Bot detectado (campo trampa relleno): respondemos OK sin hacer nada
  if (data.website) return json({ ok: true });

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) return json({ ok: false, errors }, 422);

  if (!env.RESEND_API_KEY) {
    console.error("[contacto] Falta RESEND_API_KEY");
    return json({ ok: false, error: "Formulario no configurado." }, 503);
  }

  const rows: [string, string][] = [
    ["Nombre", data.name],
    ["Empresa / proyecto", data.company || "—"],
    ["Email", data.email],
    ["Teléfono", data.phone || "—"],
    ["Servicios", data.services.join(", ")],
  ];

  const html = `
    <h2>Nuevo proyecto desde la web</h2>
    <table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v)}</td></tr>`)
      .join("")}</table>
    <p><strong>Mensaje</strong></p>
    <p>${escape(data.message).replace(/\n/g, "<br>")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM || DEFAULT_FROM,
      to: env.CONTACT_TO || DEFAULT_TO,
      reply_to: data.email,
      subject: `Nuevo proyecto: ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contacto] Error de Resend", res.status, await res.text());
    return json({ ok: false, error: "No se pudo enviar." }, 502);
  }

  return json({ ok: true });
}
