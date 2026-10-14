// Import relativo: este archivo también lo usa la función del Worker (sin alias @/)
import { weddingScopeOptions, weddingServiceOptions } from "../data/weddings";

export type WeddingPayload = {
  names: string;
  email: string;
  phone: string;
  date: string; // AAAA-MM-DD
  venue: string;
  services: string[];
  scope: string;
  message: string;
  privacy: boolean;
  /** Campo trampa anti-spam: debe llegar vacío */
  website?: string;
};

export type WeddingErrors = Partial<Record<keyof WeddingPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{6,20}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Validación compartida por el formulario de bodas y la ruta /api/bodas. */
export function validateWedding(data: WeddingPayload, today = new Date()): WeddingErrors {
  const errors: WeddingErrors = {};
  const names = data.names.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (names.length < 2) errors.names = "Decidnos vuestros nombres o el de la persona de contacto.";
  else if (names.length > 120) errors.names = "Este campo es demasiado largo.";

  if (!email) errors.email = "Necesitamos un email para responderos.";
  else if (!EMAIL_RE.test(email) || email.length > 160) errors.email = "Revisad el email, parece que falta algo.";

  if (data.phone.trim() && !PHONE_RE.test(data.phone.trim())) errors.phone = "Revisad el teléfono o dejadlo en blanco.";

  if (!data.date) errors.date = "Indicad la fecha prevista (aunque sea aproximada).";
  else if (!DATE_RE.test(data.date) || Number.isNaN(Date.parse(data.date))) errors.date = "La fecha no es válida.";
  else {
    const todayStr = today.toISOString().slice(0, 10);
    if (data.date < todayStr) errors.date = "La fecha no puede ser anterior a hoy.";
    else if (Number(data.date.slice(0, 4)) > today.getFullYear() + 5) errors.date = "Revisad el año de la fecha.";
  }

  if (data.venue.trim().length > 160) errors.venue = "Este campo es demasiado largo.";

  if (data.services.length === 0) errors.services = "Marcad al menos una opción.";
  else if (data.services.some((s) => !(weddingServiceOptions as readonly string[]).includes(s)))
    errors.services = "Opción no válida.";

  if (data.scope && !weddingScopeOptions.some((o) => o.value === data.scope)) errors.scope = "Opción no válida.";

  if (message.length < 10) errors.message = "Contadnos un poco más (mínimo 10 caracteres).";
  else if (message.length > 3000) errors.message = "El mensaje es demasiado largo (máximo 3000 caracteres).";

  if (!data.privacy) errors.privacy = "Necesitamos que aceptéis la política de privacidad.";

  return errors;
}

export function scopeLabel(value: string) {
  return weddingScopeOptions.find((o) => o.value === value)?.label ?? "—";
}
