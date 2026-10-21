// Import relativo: este archivo también lo usa la Pages Function (sin alias @/)
import { serviceOptions } from "../data/services";

/** Opciones de presupuesto y plazo (ambas opcionales) */
export const budgetOptions = [
  "Menos de 500 €",
  "500 – 1500 €",
  "1500 – 3000 €",
  "Más de 3000 €",
  "Aún no lo sé",
] as const;

export const timingOptions = ["Lo antes posible", "En 1 a 3 meses", "Más adelante", "Solo estoy mirando"] as const;

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  timing: string;
  message: string;
  privacy: boolean;
  /** Campo trampa anti-spam: debe llegar vacío */
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{6,20}$/;

/** Validación compartida por el formulario y la ruta /api/contacto. */
export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();
  const message = data.message.trim();

  if (name.length < 2) errors.name = "Dinos cómo te llamas.";
  else if (name.length > 80) errors.name = "El nombre es demasiado largo.";

  if (data.company.trim().length > 120) errors.company = "Este campo es demasiado largo.";

  if (!email) errors.email = "Necesitamos un email para responderte.";
  else if (!EMAIL_RE.test(email) || email.length > 160) errors.email = "Revisa el email, parece que falta algo.";

  if (phone && !PHONE_RE.test(phone)) errors.phone = "Revisa el teléfono o déjalo en blanco.";

  if (data.services.length === 0) errors.services = "Marca al menos una opción.";
  else if (data.services.some((s) => !(serviceOptions as readonly string[]).includes(s)))
    errors.services = "Opción no válida.";

  if (data.budget && !(budgetOptions as readonly string[]).includes(data.budget))
    errors.budget = "Opción no válida.";
  if (data.timing && !(timingOptions as readonly string[]).includes(data.timing))
    errors.timing = "Opción no válida.";

  if (message.length < 10) errors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  else if (message.length > 3000) errors.message = "El mensaje es demasiado largo (máximo 3000 caracteres).";

  if (!data.privacy) errors.privacy = "Necesitamos que aceptes la política de privacidad.";

  return errors;
}
