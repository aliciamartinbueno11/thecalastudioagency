"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { serviceOptions } from "@/data/services";
import { site } from "@/data/site";
import { validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

type Status = "idle" | "sending" | "sent" | "error";

const empty: ContactPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  services: [],
  message: "",
  privacy: false,
  website: "",
};

const fieldOrder: (keyof ContactPayload)[] = ["name", "company", "email", "phone", "services", "message", "privacy"];

export function ContactForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const id = (name: string) => `${uid}-${name}`;

  const update = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    const next = { ...data, [key]: value };
    setData(next);
    // Tras el primer intento, validamos en vivo para que el error desaparezca al corregir
    if (touched) setErrors(validateContact(next));
  };

  const toggleService = (service: string) => {
    const has = data.services.includes(service);
    update("services", has ? data.services.filter((s) => s !== service) : [...data.services, service]);
  };

  const focusFirstError = (errs: ContactErrors) => {
    const first = fieldOrder.find((k) => errs[k]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
    el?.focus();
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    const errs = validateContact(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirstError(errs);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: ContactErrors };
      if (res.ok && json.ok) {
        setStatus("sent");
        setData(empty);
        setTouched(false);
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        focusFirstError(json.errors);
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const dark = tone === "dark";

  if (status === "sent") {
    return (
      <div role="status" className={cn("border-t pt-10", dark ? "border-line-dark" : "border-ink")}>
        <p className="label text-agua-ink">Mensaje recibido</p>
        <p className="display-wide mt-4 text-[clamp(2rem,4vw,3rem)]">
          Gracias. Te respondemos en <span className="accent text-agua-deep">menos de 48 h</span> laborables.
        </p>
        <p className="mt-4 max-w-md text-mute">
          Si es urgente, escríbenos a{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 cursor-pointer text-sm font-medium underline underline-offset-4"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const errorText = (key: keyof ContactPayload) =>
    errors[key] ? (
      <p id={id(`${key}-error`)} className="mt-2 text-sm text-error">
        {errors[key]}
      </p>
    ) : null;

  const inputClass = (key: keyof ContactPayload) =>
    cn(
      "peer block w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-lg text-ink outline-none transition-colors placeholder:text-mute/70 focus:border-agua-deep focus:ring-0 focus-visible:outline-none",
      errors[key] ? "border-error" : "border-ink/25 hover:border-ink/60",
    );

  const labelClass = "label block text-mute";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={id("note")} className="relative">
      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={labelClass}>
            Nombre <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("name")}
            data-field="name"
            name="name"
            autoComplete="name"
            required
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? id("name-error") : undefined}
            className={inputClass("name")}
          />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor={id("company")} className={labelClass}>
            Empresa / proyecto
          </label>
          <input
            id={id("company")}
            data-field="company"
            name="company"
            autoComplete="organization"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? id("company-error") : undefined}
            className={inputClass("company")}
          />
          {errorText("company")}
        </div>

        <div>
          <label htmlFor={id("email")} className={labelClass}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("email")}
            data-field="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? id("email-error") : undefined}
            className={inputClass("email")}
          />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor={id("phone")} className={labelClass}>
            Teléfono <span className="normal-case tracking-normal">(opcional)</span>
          </label>
          <input
            id={id("phone")}
            data-field="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? id("phone-error") : undefined}
            className={inputClass("phone")}
          />
          {errorText("phone")}
        </div>

        <fieldset
          className="sm:col-span-2"
          aria-invalid={!!errors.services}
          aria-describedby={errors.services ? id("services-error") : undefined}
        >
          <legend className={labelClass}>
            ¿En qué podemos ayudarte? <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {serviceOptions.map((option, i) => {
              const checked = data.services.includes(option);
              return (
                <label
                  key={option}
                  className={cn(
                    "relative inline-flex cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2 text-[0.95rem] transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-agua-deep",
                    checked
                      ? "border-agua bg-agua text-ink"
                      : "border-ink/20 text-ink hover:border-ink/60",
                  )}
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={option}
                    checked={checked}
                    data-field={i === 0 ? "services" : undefined}
                    onChange={() => toggleService(option)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-1.5 rounded-full transition-colors",
                      checked ? "bg-ink" : "bg-ink/25",
                    )}
                  />
                  {option}
                </label>
              );
            })}
          </div>
          {errorText("services")}
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className={labelClass}>
            Mensaje <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={id("message")}
            data-field="message"
            name="message"
            rows={4}
            required
            placeholder="Qué estás montando, qué quieres mejorar o qué no termina de funcionar."
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? id("message-error") : undefined}
            className={cn(inputClass("message"), "resize-y")}
          />
          {errorText("message")}
        </div>

        {/* Campo trampa para bots: oculto a personas y lectores de pantalla */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>No rellenar</label>
          <input
            id={id("website")}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-ink/80">
            <input
              type="checkbox"
              name="privacy"
              data-field="privacy"
              checked={data.privacy}
              onChange={(e) => update("privacy", e.target.checked)}
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? id("privacy-error") : undefined}
              className="mt-1 size-[1.125rem] shrink-0 cursor-pointer accent-agua-deep"
            />
            <span>
              He leído y acepto la{" "}
              <Link href="/privacidad" className="text-ink underline underline-offset-4 hover:text-agua-ink">
                política de privacidad
              </Link>
              . <span aria-hidden="true">*</span>
            </span>
          </label>
          {errorText("privacy")}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "sending"} tone={tone}>
          {status === "sending" ? "Enviando…" : "Cuéntanos tu proyecto"}
        </Button>
        <p id={id("note")} className="text-sm text-mute">
          * Campos obligatorios. Respondemos en menos de 48 h laborables.
        </p>
      </div>

      <div aria-live="polite" className="mt-6 min-h-6 text-sm">
        {status === "error" ? (
          <p className="text-error">
            No hemos podido enviar el mensaje. Prueba de nuevo o escríbenos a{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        ) : null}
        {touched && Object.keys(errors).length > 0 ? (
          <p className="text-error">Revisa los campos marcados.</p>
        ) : null}
      </div>
    </form>
  );
}
