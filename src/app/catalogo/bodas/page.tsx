import type { Metadata } from "next";
import { launch, launchOpen } from "@/data/launch";
import { site } from "@/data/site";
import {
  weddingBrand,
  weddingCatalog,
  weddingPackages,
  weddingPackageSeparate,
  weddingPricingNote,
  weddingProcess,
} from "@/data/weddings";
import { weddingSerif } from "@/lib/fonts-weddings";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/ui/Logo";
import { domain, eur, handle, LaunchTag, OfferSheet, ScreenBar, Sheet, year } from "../_parts";

/**
 * Catálogo de Cala Weddings (A4). De aquí sale /catalogo-cala-weddings.pdf con `npm run catalogo`.
 * El de marketing online está en /catalogo.
 */
export const metadata: Metadata = {
  title: "Catálogo de bodas",
  description: "Catálogo de Cala Weddings: diseño de invitaciones, papelería y webs de boda, con precios orientativos y paquetes.",
  alternates: { canonical: "/catalogo/bodas" },
  robots: { index: false, follow: true },
};

const brand = weddingBrand.name;

export default function CatalogoBodasPage() {
  const pool = launch.weddings;
  const pack = (id: string) => weddingPackages.find((p) => p.id === id)?.price ?? 0;
  const examples = [
    { name: "Paquete Integral", price: pack("integral") },
    { name: "Paquete Papelería completa", price: pack("papeleria") },
    { name: "Paquete Esencial", price: pack("esencial") },
    { name: "Web de boda con RSVP", price: weddingCatalog.find((c) => c.id === "web")?.from ?? 0 },
  ].filter((e) => e.price > 0);

  return (
    <div className={cn("catalogo", weddingSerif.variable)}>
      <ScreenBar kind="weddings" label={`Catálogo de bodas ${year}`} />

      {/* 1 · Portada */}
      <Sheet tone="linen">
        <header className="flex items-center justify-between">
          <span className="flex items-baseline gap-2.5">
            <span className="serif-display text-[18pt]">{brand}</span>
            <span className="label-wide text-[7.5pt] text-umber-soft">{weddingBrand.signature}</span>
          </span>
          <span className="text-[10pt] text-umber-soft">Catálogo {year}</span>
        </header>

        <div className="mt-[32mm]">
          <p className="text-[12pt] text-umber-soft">Diseño gráfico y digital para bodas, desde Nerja</p>
          <h1 className="serif-display mt-4 text-[60pt] leading-[0.95]">
            Vuestra boda también <em className="text-sea">tiene identidad.</em>
          </h1>
          <p className="mt-6 max-w-[120mm] text-[13pt] leading-relaxed text-umber/80">
            Invitaciones, papelería, webs de boda con RSVP y todo lo que se ve el gran día, con un mismo
            trazo. Para parejas de la Axarquía, Málaga, la Costa del Sol y donde estéis.
          </p>
        </div>

        <span aria-hidden="true" className="absolute -bottom-[1px] left-0 aspect-square w-[78mm] rounded-tr-full bg-sand" />

        {launchOpen("weddings") ? (
          <div className="absolute bottom-[30mm] right-[16mm] grid size-[58mm] place-items-center rounded-full bg-umber p-6 text-center text-linen">
            <p>
              <span className="block text-[10pt] text-linen/70">Oferta de lanzamiento</span>
              <span className="serif-display mt-1 block text-[38pt] text-agua">−90 %</span>
              <span className="mt-1 block text-[10pt] leading-snug">para las {pool.spots} primeras bodas</span>
            </p>
          </div>
        ) : null}

        <footer className="relative mt-auto flex justify-end gap-6 text-[9.5pt] text-umber/80">
          <span>{domain}/bodas</span>
          <span>{site.email}</span>
          <span>{handle}</span>
        </footer>
      </Sheet>

      {/* 2 · Oferta de lanzamiento */}
      <OfferSheet
        kind="weddings"
        title={
          <>
            Las {pool.spots} primeras bodas, <em className="text-agua">al 90 %.</em>
          </>
        }
        intro={`Estamos empezando y queremos llenar el portfolio de bodas reales. Por eso, las ${pool.spots} primeras parejas pagan solo el 10 % del diseño. A cambio, os pedimos dos cosas: poder enseñar el resultado, sin nombres ni datos, y que nos mencionéis cuando lo publiquéis.`}
        examples={examples}
      />

      {/* 3 · Qué diseñamos */}
      <Sheet tone="linen" folio="Qué diseñamos" brand={brand}>
        <p className="label-wide text-[8.5pt] text-umber-soft">
          {brand} · {weddingBrand.signature}
        </p>
        <h2 className="serif-display mt-4 text-[42pt]">
          Una pieza <em className="text-sea">o el universo completo.</em>
        </h2>
        <p className="mt-4 max-w-[150mm] text-[11pt] leading-relaxed text-umber/80">
          Todo lo gráfico y digital de vuestra boda. Elegid lo que necesitéis.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
          {weddingCatalog.map((c) => (
            <article key={c.id} className="border-t border-umber/40 pt-3">
              <h3 className="serif-display text-[17pt]">
                <span className="text-sea">{c.letter}.</span> {c.title}
              </h3>
              <p className="mt-1.5 text-[9pt] leading-snug text-umber/80">{c.items.slice(0, 6).join(" · ")}</p>
              <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="text-[10.5pt] font-semibold">Desde {eur(c.from)}</span>
                <span className="text-[8.5pt] text-umber-soft">{c.fromLabel}</span>
                <LaunchTag kind="weddings" price={c.from} />
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[8.5pt] text-umber-soft">{weddingPricingNote}</p>
      </Sheet>

      {/* 4 · Paquetes y proceso */}
      <Sheet tone="sand" folio="Paquetes" brand={brand}>
        <h2 className="serif-display text-[42pt]">
          Todo junto, <em className="text-sea">por bastante menos.</em>
        </h2>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {weddingPackages.map((pkg) => {
            const dark = pkg.featured;
            const separate = weddingPackageSeparate(pkg);
            return (
              <article key={pkg.id} className={cn("flex flex-col rounded-sm p-5", dark ? "bg-umber text-linen" : "bg-linen")}>
                <h3 className="serif-display text-[21pt]">{pkg.name}</h3>
                <p className={cn("mt-1.5 text-[9pt] leading-snug", dark ? "text-linen/75" : "text-umber/75")}>{pkg.tagline}</p>
                <p className="serif-display mt-4 text-[24pt]">{eur(pkg.price)}</p>
                <p className={cn("mt-1 text-[8.5pt]", dark ? "text-linen/60" : "text-umber-soft")}>
                  Por separado: <s>{eur(separate)}</s> · Ahorráis {eur(separate - pkg.price)}
                </p>
                <ul className={cn("mt-3 flex-1 space-y-1 border-t pt-3 text-[8.5pt] leading-snug", dark ? "border-linen/20" : "border-line-warm")}>
                  {pkg.includes.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
                <p className="mt-3">
                  <LaunchTag kind="weddings" price={pkg.price} dark={dark} />
                </p>
              </article>
            );
          })}
        </div>

        <h3 className="serif-display mt-12 text-[26pt]">
          Cuatro pasos, <em className="text-sea">sin complicaciones.</em>
        </h3>
        <ol className="mt-5 grid grid-cols-4 gap-5">
          {weddingProcess.map((p) => (
            <li key={p.number} className="border-t border-umber/40 pt-3">
              <span className="serif-display text-[14pt] text-umber-soft">{p.number}</span>
              <p className="serif-display mt-1 text-[13pt] leading-tight">{p.title}</p>
              <p className="mt-1.5 text-[9pt] leading-snug text-umber/75">{p.text}</p>
            </li>
          ))}
        </ol>
      </Sheet>

      {/* 5 · Contacto */}
      <Sheet tone="linen">
        <h2 className="serif-display mt-[30mm] text-[54pt] leading-[0.95]">
          ¿Ya tenéis fecha? <em className="text-sea">Hablemos.</em>
        </h2>
        <p className="mt-6 max-w-[130mm] text-[13pt] leading-relaxed text-umber/80">
          Contadnos cómo imagináis vuestra boda. Os respondemos en menos de 48 horas laborables con una
          propuesta clara y un precio cerrado.
        </p>
        <dl className="mt-12 grid max-w-[150mm] grid-cols-2 gap-x-8 gap-y-6 border-t border-umber/40 pt-6 text-[11pt]">
          <div>
            <dt className="text-[9.5pt] text-umber-soft">Email</dt>
            <dd className="mt-1 font-medium">{site.email}</dd>
          </div>
          <div>
            <dt className="text-[9.5pt] text-umber-soft">Web y presupuesto</dt>
            <dd className="mt-1 font-medium">{domain}/bodas</dd>
          </div>
          <div>
            <dt className="text-[9.5pt] text-umber-soft">Instagram</dt>
            <dd className="mt-1 font-medium">{handle}</dd>
          </div>
        </dl>
        <span aria-hidden="true" className="absolute -bottom-[1px] right-0 aspect-square w-[70mm] rounded-tl-full bg-sand" />
        <footer className="relative mt-auto flex items-center gap-2.5 text-[10pt]">
          <LogoMark className="size-5" />
          {brand} · {weddingBrand.signature} · Nerja
        </footer>
      </Sheet>
    </div>
  );
}
