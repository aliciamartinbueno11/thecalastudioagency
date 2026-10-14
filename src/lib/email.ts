/**
 * Envío de emails con Resend, compartido por las funciones de formulario
 * (functions/api/*) que ejecuta el Worker de Cloudflare.
 */
export type EmailEnv = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
};

const DEFAULT_TO = "hola@thecalastudio.com";
const DEFAULT_FROM = "Web Cala Studio <web@thecalastudio.com>";

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type SendResult = { ok: true } | { ok: false; status: number; error: string };

/** Envía un email con una tabla de campos y un mensaje libre. */
export async function sendFormEmail(
  env: EmailEnv,
  opts: { tag: string; title: string; subject: string; replyTo: string; rows: [string, string][]; message: string },
): Promise<SendResult> {
  if (!env.RESEND_API_KEY) {
    console.error(`[${opts.tag}] Falta RESEND_API_KEY`);
    return { ok: false, status: 503, error: "Formulario no configurado." };
  }

  const html = `
    <h2>${escape(opts.title)}</h2>
    <table cellpadding="6">${opts.rows
      .map(([k, v]) => `<tr><td><strong>${escape(k)}</strong></td><td>${escape(v)}</td></tr>`)
      .join("")}</table>
    <p><strong>Mensaje</strong></p>
    <p>${escape(opts.message).replace(/\n/g, "<br>")}</p>`;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM || DEFAULT_FROM,
      to: env.CONTACT_TO || DEFAULT_TO,
      reply_to: opts.replyTo,
      subject: opts.subject,
      html,
    }),
    });
  } catch (error) {
    console.error(`[${opts.tag}] No se pudo contactar con Resend`, error);
    return { ok: false, status: 502, error: "No se pudo enviar." };
  }

  if (!res.ok) {
    console.error(`[${opts.tag}] Error de Resend`, res.status, await res.text());
    return { ok: false, status: 502, error: "No se pudo enviar." };
  }
  return { ok: true };
}
