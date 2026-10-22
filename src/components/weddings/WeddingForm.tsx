"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { weddingScopeOptions, weddingServiceOptions } from "@/data/weddings";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { validateWedding, type WeddingErrors, type WeddingPayload } from "@/lib/wedding-contact";
import { Arrow } from "@/components/ui/Arrow";
import { WEDDING_PACKAGE_EVENT } from "./WeddingPackButton";

type Status = "idle" | "sending" | "sent" | "error";

const empty: WeddingPayload = {
  names: "",
  email: "",
  phone: "",
  date: "",
  venue: "",
  services: [],
  scope: "",
  message: "",
  privacy: false,
  website: "",
};

const order: (keyof WeddingPayload)[] = ["names", "email", "phone", "date", "venue", "services", "scope", "message", "privacy"];

export function WeddingForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<WeddingPayload>(empty);
  const [errors, setErrors] = useState<WeddingErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const id = (n: string) => `${uid}-${n}`;

  // Al pulsar «Pedir este paquete», el paquete queda indicado en el mensaje
  useEffect(() => {
    const onPackage = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      const line = `Nos interesa el paquete «${name}». `;
      setData((d) => ({
        ...d,
        scope: "integral",
        // Sustituye el paquete anterior si se cambia de opinión
        message: line + d.message.replace(/^Nos interesa el paquete «[^»]+»\. /, ""),
      }));
    };
    window.addEventListener(WEDDING_PACKAGE_EVENT, onPackage);
    return () => window.removeEventListener(WEDDING_PACKAGE_EVENT, onPackage);
  }, []);
  const today = new Date().toISOString().slice(0, 10);

  const update = <K extends keyof WeddingPayload>(key: K, value: WeddingPayload[K]) => {
    const next = { ...data, [key]: value };
    setData(next);
    if (touched) setErrors(validateWedding(next));
  };

  const toggleService = (s: string) =>
    update("services", data.services.includes(s) ? data.services.filter((x) => x !== s) : [...data.services, s]);

  const focusFirst = (errs: WeddingErrors) => {
    const first = order.find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    const errs = validateWedding(data);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirst(errs);

    setStatus("sending");
    try {
      const res = await fetch("/api/bodas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: WeddingErrors };
      // Solo mostramos el éxito si el servidor confirma que el email se ha enviado
      if (res.ok && json.ok) {
        setStatus("sent");
        setData(empty);
        setTouched(false);
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        focusFirst(json.errors);
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-umber pt-10">
        <p className="label-wide text-sea">Mensaje recibido</p>
        <p className="serif-display mt-4 text-[clamp(2.2rem,4vw,3.2rem)] text-umber">
          Gracias. Ya tenemos <em className="text-sea">vuestra idea.</em>
        </p>
        <p className="mt-4 max-w-md text-umber/80">
          Os escribiremos para conoceros mejor. Si queréis añadir algo, escribidnos a{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 cursor-pointer text-sm font-medium text-umber underline underline-offset-4">
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const err = (k: keyof WeddingPayload) =>
    errors[k] ? (
      <p id={id(`${k}-error`)} className="mt-2 text-sm text-error">
        {errors[k]}
      </p>
    ) : null;

  const input = (k: keyof WeddingPayload) =>
    cn(
      "block w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-lg text-umber outline-none transition-colors placeholder:text-umber-soft/70 focus:border-sea focus:shadow-[0_1px_0_0_var(--color-sea)]",
      errors[k] ? "border-error" : "border-umber/25 hover:border-umber/60",
    );
  const lbl = "label-wide block text-umber-soft";
  const a11y = (k: keyof WeddingPayload) => ({
    "data-field": k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? id(`${k}-error`) : undefined,
  });

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="relative">
      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id("names")} className={lbl}>
            Vuestros nombres o persona de contacto <span aria-hidden="true">*</span>
          </label>
          <input id={id("names")} name="names" autoComplete="name" value={data.names} onChange={(e) => update("names", e.target.value)} className={input("names")} {...a11y("names")} />
          {err("names")}
        </div>

        <div>
          <label htmlFor={id("email")} className={lbl}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input id={id("email")} name="email" type="email" inputMode="email" spellCheck={false} autoCapitalize="off" autoComplete="email" value={data.email} onChange={(e) => update("email", e.target.value)} className={input("email")} {...a11y("email")} />
          {err("email")}
        </div>

        <div>
          <label htmlFor={id("phone")} className={lbl}>
            Teléfono <span className="normal-case tracking-normal">(opcional)</span>
          </label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} className={input("phone")} {...a11y("phone")} />
          {err("phone")}
        </div>

        <div>
          <label htmlFor={id("date")} className={lbl}>
            Fecha prevista <span aria-hidden="true">*</span>
          </label>
          <input id={id("date")} name="date" type="date" min={today} value={data.date} onChange={(e) => update("date", e.target.value)} className={input("date")} {...a11y("date")} />
          {err("date")}
        </div>

        <div>
          <label htmlFor={id("venue")} className={lbl}>
            Lugar de celebración <span className="normal-case tracking-normal">(opcional)</span>
          </label>
          <input id={id("venue")} name="venue" placeholder="Ciudad o finca" value={data.venue} onChange={(e) => update("venue", e.target.value)} className={input("venue")} {...a11y("venue")} />
          {err("venue")}
        </div>

        <fieldset className="sm:col-span-2" aria-invalid={!!errors.services} aria-describedby={errors.services ? id("services-error") : undefined}>
          <legend className={lbl}>
            ¿Qué necesitáis? <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {weddingServiceOptions.map((opt, i) => {
              const checked = data.services.includes(opt);
              return (
                <label
                  key={opt}
                  className={cn(
                    "inline-flex cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2 text-[0.95rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sea",
                    checked ? "border-umber bg-umber text-linen" : "border-umber/20 text-umber hover:border-umber/60",
                  )}
                >
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleService(opt)} data-field={i === 0 ? "services" : undefined} />
                  <span aria-hidden="true" className={cn("size-1.5 rounded-full", checked ? "bg-agua" : "bg-umber/25")} />
                  {opt}
                </label>
              );
            })}
          </div>
          {err("services")}
        </fieldset>

        <fieldset className="sm:col-span-2">
          <legend className={lbl}>¿Diseño integral o piezas sueltas? <span className="normal-case tracking-normal">(opcional)</span></legend>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {weddingScopeOptions.map((opt, i) => (
              <label key={opt.value} className="inline-flex cursor-pointer items-center gap-2.5 text-umber">
                <input
                  type="radio"
                  name="scope"
                  value={opt.value}
                  checked={data.scope === opt.value}
                  onChange={() => update("scope", opt.value)}
                  data-field={i === 0 ? "scope" : undefined}
                  className="size-4 cursor-pointer accent-sea"
                />
                {opt.label}
              </label>
            ))}
          </div>
          {err("scope")}
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className={lbl}>
            Contadnos vuestra idea <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            placeholder="Cómo imagináis la boda, el estilo, lo que os representa…"
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(input("message"), "resize-y")}
            {...a11y("message")}
          />
          {err("message")}
        </div>

        {/* Campo trampa para bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>No rellenar</label>
          <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => update("website", e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-umber/80">
            <input type="checkbox" checked={data.privacy} onChange={(e) => update("privacy", e.target.checked)} className="mt-1 size-[1.125rem] shrink-0 cursor-pointer accent-sea" {...a11y("privacy")} />
            <span>
              He leído y acepto la{" "}
              <Link href="/privacidad" className="text-umber underline underline-offset-4 hover:text-sea">
                política de privacidad
              </Link>
              . <span aria-hidden="true">*</span>
            </span>
          </label>
          {err("privacy")}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/wb inline-flex h-12 cursor-pointer items-center gap-3 whitespace-nowrap rounded-full bg-umber px-6 text-[0.95rem] font-medium text-linen transition-colors hover:bg-sea disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Enviando…" : "Enviar nuestra idea"}
          <Arrow className="size-3.5 transition-transform group-hover/wb:translate-x-1" />
        </button>
        <p className="text-sm text-umber-soft">* Campos obligatorios.</p>
      </div>

      <div aria-live="polite" className="mt-6 min-h-6 text-sm">
        {status === "error" ? (
          <p className="text-error">
            No hemos podido enviar la solicitud. Probad de nuevo o escribidnos a{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        ) : null}
        {touched && Object.keys(errors).length > 0 ? <p className="text-error">Revisad los campos marcados.</p> : null}
      </div>
    </form>
  );
}
