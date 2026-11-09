import type { ReactNode } from "react";
import { catalogPdf, launch, launchLeft, launchOpen, launchPrice, type LaunchKind } from "@/data/launch";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/ui/Logo";

/** Piezas comunes de los dos catálogos imprimibles (A4): marketing y bodas. */

export const eur = (n: number) => `${n.toLocaleString("es-ES")} €`;
export const year = 2026;
export const handle = `@${site.social.instagram.replace(/\/$/, "").split("/").pop()}`;
export const domain = site.url.replace(/^https?:\/\//, "");

type Tone = "cream" | "paper" | "ink" | "linen" | "sand" | "umber";

export function Sheet({
  children,
  tone = "cream",
  folio,
  brand = "Cala Studio",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  folio?: string;
  brand?: string;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    cream: "bg-cream text-ink",
    paper: "bg-paper text-ink",
    ink: "bg-ink text-cream",
    linen: "bg-linen text-umber",
    sand: "bg-sand text-umber",
    umber: "bg-umber text-linen",
  };
  return (
    <section className={cn("sheet relative flex flex-col overflow-hidden", tones[tone], className)}>
      {children}
      {folio ? (
        <footer className="mt-auto flex items-end justify-between pt-6 text-[9pt] opacity-70">
          <span className="flex items-center gap-2">
            <LogoMark className="size-3.5" />
            {brand}
          </span>
          <span>{folio}</span>
        </footer>
      ) : null}
    </section>
  );
}

/** Aviso con el botón de descarga; solo en pantalla, no sale en el PDF */
export function ScreenBar({ kind, label }: { kind: LaunchKind; label: string }) {
  return (
    <div className="screen-only container-cala flex flex-wrap items-center justify-between gap-4 py-8">
      <p className="text-lg">{label}, listo para imprimir o descargar.</p>
      <a
        href={catalogPdf[kind]}
        download
        className="inline-flex h-12 items-center rounded-full bg-agua px-6 font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
      >
        Descargar PDF
      </a>
    </div>
  );
}

/** Precio de catálogo y precio de lanzamiento */
export function LaunchTag({
  kind,
  price,
  unit,
  dark,
}: {
  kind: LaunchKind;
  price: number;
  unit?: string;
  dark?: boolean;
}) {
  if (!launchOpen(kind)) return null;
  return (
    <span
      className={cn(
        "inline-block rounded-md px-2.5 py-1 text-[8.5pt] font-medium leading-snug",
        dark ? "bg-agua text-ink" : "bg-agua-soft text-agua-ink",
      )}
    >
      Lanzamiento: {eur(launchPrice(price))}
      {unit ? ` / ${unit}, ${launch.monthlyMonths} primeros meses` : ""}
    </span>
  );
}

/** Página de la oferta de lanzamiento de cada catálogo */
export function OfferSheet({
  kind,
  title,
  intro,
  examples,
}: {
  kind: LaunchKind;
  title: ReactNode;
  intro: string;
  examples: { name: string; price: number }[];
}) {
  if (!launchOpen(kind)) return null;
  const weddings = kind === "weddings";
  const pool = launch[kind];
  const line = weddings ? "border-linen/20" : "border-line-dark";
  return (
    <Sheet tone={weddings ? "umber" : "ink"} folio="Oferta de lanzamiento" brand={weddings ? "Cala Weddings" : "Cala Studio"}>
      <p className={cn("text-[11pt]", weddings ? "text-linen/60" : "text-cream/60")}>Oferta de lanzamiento</p>
      <h2 className={cn("mt-6", weddings ? "serif-display text-[46pt]" : "display text-[46pt]")}>{title}</h2>
      <p className={cn("mt-8 max-w-[140mm] text-[13pt] leading-relaxed", weddings ? "text-linen/85" : "text-cream/85")}>
        {intro}
      </p>

      <div className="mt-10 grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-[11pt] font-medium text-agua">Algunos ejemplos</h3>
          <ul className={cn("mt-3 border-t", line)}>
            {examples.map((e) => (
              <li key={e.name} className={cn("flex items-baseline justify-between gap-4 border-b py-3 text-[10.5pt]", line)}>
                <span>{e.name}</span>
                <span className="tabular whitespace-nowrap">
                  <s className={weddings ? "text-linen/50" : "text-cream/50"}>{eur(e.price)}</s>{" "}
                  <strong className="font-semibold text-agua">{eur(launchPrice(e.price))}</strong>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[11pt] font-medium text-agua">Condiciones</h3>
          <ul className={cn("mt-3 space-y-2.5 text-[10pt] leading-snug", weddings ? "text-linen/85" : "text-cream/85")}>
            {pool.conditions.map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-agua" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-10 text-[12pt]">
        Quedan{" "}
        <strong className="font-semibold text-agua">
          {launchLeft(kind)} de {pool.spots}
        </strong>{" "}
        plazas. Para reservar una, {weddings ? "escribidnos" : "escríbenos"} a {site.email} o a {handle}.
      </p>
    </Sheet>
  );
}
