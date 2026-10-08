import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Petición no válida." }, { status: 400 });
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

  // Bot detectado: respondemos OK sin procesar nada
  if (data.website) return NextResponse.json({ ok: true });

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: conectar aquí el envío real (email transaccional, CRM, Slack…).
  // Ejemplo: await sendEmail({ to: site.email, replyTo: data.email, ... })
  if (process.env.NODE_ENV !== "production") {
    console.info("[contacto] Nuevo mensaje", { ...data, website: undefined });
  }

  return NextResponse.json({ ok: true });
}
