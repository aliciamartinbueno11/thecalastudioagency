/**
 * POST /api/bodas — solicitudes de presupuesto de Cala Weddings.
 * Mismo sistema de envío que /api/contacto (Resend), con asunto propio.
 */
import { scopeLabel, validateWedding, type WeddingPayload } from "../../src/lib/wedding-contact";
import { json, sendFormEmail, type EmailEnv } from "../../src/lib/email";

type Context = { request: Request; env: EmailEnv };

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

export async function onRequestPost({ request, env }: Context) {
  let body: Partial<WeddingPayload>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Petición no válida." }, 400);
  }

  const data: WeddingPayload = {
    names: String(body.names ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    date: String(body.date ?? ""),
    venue: String(body.venue ?? ""),
    services: Array.isArray(body.services) ? body.services.map(String) : [],
    scope: String(body.scope ?? ""),
    message: String(body.message ?? ""),
    privacy: body.privacy === true,
    website: String(body.website ?? ""),
  };

  // Campo trampa relleno: probablemente un bot. No se envía nada.
  if (data.website) return json({ ok: false, error: "No se pudo enviar." }, 400);

  const errors = validateWedding(data);
  if (Object.keys(errors).length > 0) return json({ ok: false, errors }, 422);

  const result = await sendFormEmail(env, {
    tag: "bodas",
    title: "Nueva solicitud · Cala Weddings",
    subject: `Boda: ${data.names} · ${formatDate(data.date)}`,
    replyTo: data.email,
    rows: [
      ["Pareja / contacto", data.names],
      ["Email", data.email],
      ["Teléfono", data.phone || "—"],
      ["Fecha prevista", formatDate(data.date)],
      ["Lugar", data.venue || "—"],
      ["Servicios", data.services.join(", ")],
      ["Tipo de encargo", scopeLabel(data.scope)],
    ],
    message: data.message,
  });

  return result.ok ? json({ ok: true }) : json({ ok: false, error: result.error }, result.status);
}
