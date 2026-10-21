/**
 * POST /api/contacto — formulario general de Cala Studio.
 * Valida con la misma lógica que el cliente y envía el mensaje por email (Resend).
 *
 * Variables del Worker (Cloudflare → Settings → Runtime variables and secrets):
 *   RESEND_API_KEY  clave de https://resend.com (secreto)
 *   CONTACT_TO      (opcional) destinatario. Por defecto, hola@thecalastudio.com
 *   CONTACT_FROM    (opcional) remitente verificado. Por defecto, web@thecalastudio.com
 */
import { validateContact, type ContactPayload } from "../../src/lib/contact";
import { json, sendFormEmail, type EmailEnv } from "../../src/lib/email";

type Context = { request: Request; env: EmailEnv };

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
    budget: String(body.budget ?? ""),
    timing: String(body.timing ?? ""),
    message: String(body.message ?? ""),
    privacy: body.privacy === true,
    website: String(body.website ?? ""),
  };

  // Campo trampa relleno: probablemente un bot. No se envía nada.
  if (data.website) return json({ ok: false, error: "No se pudo enviar." }, 400);

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) return json({ ok: false, errors }, 422);

  const result = await sendFormEmail(env, {
    tag: "contacto",
    title: "Nuevo proyecto desde la web",
    subject: `Nuevo proyecto: ${data.name}${data.company ? ` (${data.company})` : ""}${data.budget ? ` · ${data.budget}` : ""}`,
    replyTo: data.email,
    rows: [
      ["Nombre", data.name],
      ["Empresa / proyecto", data.company || "—"],
      ["Email", data.email],
      ["Teléfono", data.phone || "—"],
      ["Servicios", data.services.join(", ")],
      ["Presupuesto", data.budget || "—"],
      ["Plazo", data.timing || "—"],
    ],
    message: data.message,
  });

  return result.ok ? json({ ok: true }) : json({ ok: false, error: result.error }, result.status);
}
