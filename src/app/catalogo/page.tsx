import type { Metadata } from "next";
import type { ReactNode } from "react";
import { catalogPdf, launch, launchLeft, launchOpen, launchPrice } from "@/data/launch";
import { method } from "@/data/method";
import { formatPackagePrice, formatPrice, packages, packageSavings, pricingNote, services } from "@/data/services";
import { site } from "@/data/site";
import { weddingCatalog, weddingPackages, weddingPackageSeparate, weddingPricingNote, weddingProcess } from "@/data/weddings";
import { weddingSerif } from "@/lib/fonts-weddings";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/ui/Logo";

/**
 * Catálogo imprimible (A4). De aquí sale el PDF con `npm run catalogo`.
 * Todo se lee de src/data: precios, paquetes y oferta de lanzamiento.
 */
export const metadata: Metadata = {
  title: "Catálogo de servicios",
  description: "Catálogo de servicios de Cala Studio y Cala Weddings, con precios orientativos y paquetes.",
  alternates: { canonical: "/catalogo" },
  robots: { index: false, follow: true },
};

const eur = (n: number) => `${n.toLocaleString("es-ES")} €`;
const year = 2026;
const handle = `@${site.social.instagram.replace(/\/$/, "").split("/").pop()}`;
const domain = site.url.replace(/^https?:\/\//, "");

function Sheet({
  children,
  tone = "cream",
  folio,
  className,
}: {
  children: ReactNode;
  tone?: "cream" | "paper" | "ink" | "linen" | "sand";
  folio?: string;
  className?: string;
}) {
  const tones = {
    cream: "bg-cream text-ink",
    paper: "bg-paper text-ink",
    ink: "bg-ink text-cream",
    linen: "bg-linen text-umber",
    sand: "bg-sand text-umber",
  };
  return (
    <section className={cn("sheet relative flex flex-col overflow-hidden", tones[tone], className)}>
      {children}
      {folio ? (
        <footer className="mt-auto flex items-end justify-between pt-6 text-[9pt] opacity-70">
          <span className="flex items-center gap-2">
            <LogoMark className="size-3.5" />
            Cala Studio
          </span>
          <span>{folio}</span>
        </footer>
      ) : null}
    </section>
  );
}

/** Precio de catálogo tachado y precio de lanzamiento */
function LaunchTag({ price, unit, dark }: { price: number; unit?: string; dark?: boolean }) {
  if (!launchOpen) return null;
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

export default function CatalogoPage() {
  const examples = [
    { name: "Paquete de boda Integral", price: weddingPackages.find((p) => p.id === "integral")?.price ?? 0 },
    { name: "Paquete de boda Esencial", price: weddingPackages.find((p) => p.id === "esencial")?.price ?? 0 },
    { name: "Paquete Arranque (estrategia, identidad y landing)", price: packages.find((p) => p.slug === "arranque")?.price.once ?? 0 },
    { name: "Identidad visual de marca", price: services.find((s) => s.slug === "branding-creatividad")?.price.from ?? 0 },
  ];

  return (
    <div className={cn("catalogo", weddingSerif.variable)}>
      {/* Aviso solo en pantalla */}
      <div className="screen-only container-cala flex flex-wrap items-center justify-between gap-4 py-8">
        <p className="text-lg">Catálogo de servicios {year}, listo para imprimir o descargar.</p>
        <a
          href={catalogPdf}
          download
          className="inline-flex h-12 items-center rounded-full bg-agua px-6 font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          Descargar PDF
        </a>
      </div>

      {/* 1 · Portada */}
      <Sheet tone="cream">
        <header className="flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <LogoMark className="size-7" />
            <span className="font-display text-[13pt] font-bold uppercase" style={{ fontVariationSettings: '"wdth" 80' }}>
              Cala <span className="font-medium">Studio</span>
            </span>
          </span>
          <span className="text-[10pt] text-mute">Catálogo {year}</span>
        </header>

        <div className="mt-[32mm]">
          <p className="text-[12pt] text-mute">Agencia de marketing y diseño en Nerja</p>
          <h1 className="display mt-4 text-[58pt]">
            Marketing con <span className="accent text-agua-deep">cabeza.</span>
          </h1>
          <p className="mt-6 max-w-[120mm] text-[13pt] leading-relaxed text-ink/80">
            Estrategia, redes, publicidad, web y branding para negocios de la Axarquía y Málaga. Y,
            con Cala Weddings, el diseño gráfico y digital de vuestra boda.
          </p>
        </div>

        {/* La cala del logo, a gran escala */}
        <span aria-hidden="true" className="absolute -bottom-[1px] left-0 aspect-square w-[78mm] rounded-tr-full bg-agua" />

        {launchOpen ? (
          <div className="absolute bottom-[30mm] right-[16mm] grid size-[58mm] place-items-center rounded-full bg-ink p-6 text-center text-cream">
            <p>
              <span className="block text-[10pt] text-cream/70">Oferta de lanzamiento</span>
              <span className="display mt-1 block text-[34pt] text-agua">−90 %</span>
              <span className="mt-1 block text-[10pt] leading-snug">
                para los {launch.spots} primeros proyectos
              </span>
            </p>
          </div>
        ) : null}

        <footer className="relative mt-auto flex justify-end gap-6 text-[9.5pt] text-ink/80">
          <span>{domain}</span>
          <span>{site.email}</span>
          <span>{handle}</span>
        </footer>
      </Sheet>

      {/* 2 · Oferta de lanzamiento */}
      {launchOpen ? (
        <Sheet tone="ink" folio="Oferta de lanzamiento">
          <p className="text-[11pt] text-cream/60">Oferta de lanzamiento</p>
          <h2 className="display mt-6 text-[46pt]">
            Los {launch.spots} primeros proyectos, <span className="accent text-agua">al 90 %.</span>
          </h2>
          <p className="mt-8 max-w-[140mm] text-[13pt] leading-relaxed text-cream/85">
            Estamos empezando y queremos llenar el portfolio de trabajo real. Por eso, los diez primeros
            proyectos, de bodas o de marketing, cuestan solo el 10 % de su precio. A cambio, os pedimos
            dos cosas: poder enseñar el resultado y que nos mencionéis cuando lo publiquéis.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[11pt] font-medium text-agua">Algunos ejemplos</h3>
              <ul className="mt-3 border-t border-line-dark">
                {examples.map((e) => (
                  <li key={e.name} className="flex items-baseline justify-between gap-4 border-b border-line-dark py-3 text-[10.5pt]">
                    <span>{e.name}</span>
                    <span className="tabular whitespace-nowrap">
                      <s className="text-cream/50">{eur(e.price)}</s>{" "}
                      <strong className="font-semibold text-agua">{eur(launchPrice(e.price))}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11pt] font-medium text-agua">Condiciones</h3>
              <ul className="mt-3 space-y-2.5 text-[10pt] leading-snug text-cream/85">
                {launch.conditions.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-agua" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-[12pt]">
            Quedan <strong className="font-semibold text-agua">{launchLeft} de {launch.spots}</strong> plazas.
            Para reservar una, escribidnos a {site.email} o a {handle}.
          </p>
        </Sheet>
      ) : null}

      {/* 3 · Servicios */}
      <Sheet tone="cream" folio="Cala Studio · Servicios">
        <p className="text-[11pt] text-mute">Cala Studio</p>
        <h2 className="display mt-3 text-[40pt]">
          Lo que hacemos, <span className="accent text-agua-deep">sin rodeos.</span>
        </h2>
        <p className="mt-4 max-w-[150mm] text-[11pt] leading-relaxed text-ink/80">
          Puedes contratar algo concreto o dejarnos todo el marketing. En los dos casos, con un plan detrás.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
          {services.map((s) => (
            <article key={s.slug} className="border-t border-ink pt-3">
              <h3 className="display-wide text-[17pt]">{s.name}</h3>
              <p className="mt-1.5 text-[9.5pt] leading-snug text-ink/80">{s.short}</p>
              <ul className="mt-2 space-y-0.5 text-[9pt] text-ink/75">
                {s.includes.slice(0, 4).map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="tabular text-[11pt] font-semibold">{formatPrice(s.price)}</span>
                <LaunchTag price={s.price.from} unit={s.price.unit} />
              </p>
              {s.price.note ? <p className="mt-1 text-[8.5pt] text-mute">{s.price.note}</p> : null}
            </article>
          ))}
        </div>
        <p className="mt-6 text-[8.5pt] text-mute">{pricingNote}</p>
      </Sheet>

      {/* 4 · Paquetes y método */}
      <Sheet tone="paper" folio="Cala Studio · Paquetes">
        <h2 className="display text-[40pt]">
          Paquetes. <span className="accent text-agua-deep">Más por menos.</span>
        </h2>
        <p className="mt-4 max-w-[150mm] text-[11pt] leading-relaxed text-ink/80">
          Los servicios que mejor funcionan juntos, en un solo precio.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {packages.map((pkg) => {
            const { separate, saving } = packageSavings(pkg);
            const dark = pkg.featured;
            const base = pkg.price.once ?? pkg.price.monthly ?? 0;
            return (
              <article key={pkg.slug} className={cn("flex flex-col rounded-2xl p-5", dark ? "bg-ink text-cream" : "bg-cream")}>
                <h3 className="display text-[20pt]">{pkg.name}</h3>
                <p className={cn("mt-1.5 text-[9pt] leading-snug", dark ? "text-cream/75" : "text-ink/75")}>{pkg.tagline}</p>
                <p className="display-wide mt-4 text-[17pt] tabular">{formatPackagePrice(pkg.price)}</p>
                <p className={cn("mt-1 text-[8.5pt]", dark ? "text-cream/60" : "text-mute")}>
                  Por separado: <s>{separate}</s>
                </p>
                <p className={cn("mt-1 text-[8.5pt] font-medium", dark ? "text-agua" : "text-agua-ink")}>Ahorras {saving}</p>
                <ul className={cn("mt-3 flex-1 space-y-1 border-t pt-3 text-[8.5pt] leading-snug", dark ? "border-line-dark" : "border-line")}>
                  {pkg.includes.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
                <p className="mt-3">
                  <LaunchTag price={base} unit={pkg.price.monthly ? "mes" : undefined} dark={dark} />
                </p>
              </article>
            );
          })}
        </div>

        <h3 className="display mt-12 text-[24pt]">
          Cómo trabajamos. <span className="accent text-agua-deep">Siempre en este orden.</span>
        </h3>
        <ol className="mt-5 grid grid-cols-4 gap-5">
          {method.map((m) => (
            <li key={m.number} className="border-t border-ink pt-3">
              <span className="text-[9pt] text-agua-ink">{m.number}</span>
              <p className="display mt-1 text-[16pt]">{m.title}.</p>
              <p className="mt-1.5 text-[9pt] leading-snug text-ink/75">{m.text}</p>
            </li>
          ))}
        </ol>
      </Sheet>

      {/* 5 · Cala Weddings: qué diseñamos */}
      <Sheet tone="linen" folio="Cala Weddings · Qué diseñamos">
        <p className="label-wide text-[8.5pt] text-umber-soft">Cala Weddings · by Cala Studio</p>
        <h2 className="serif-display mt-4 text-[42pt]">
          Vuestra boda también <em className="text-sea">tiene identidad.</em>
        </h2>
        <p className="mt-4 max-w-[150mm] text-[11pt] leading-relaxed text-umber/80">
          Todo lo gráfico y digital de vuestra boda: elegid una pieza o el universo completo.
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
                <LaunchTag price={c.from} />
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[8.5pt] text-umber-soft">{weddingPricingNote}</p>
      </Sheet>

      {/* 6 · Paquetes de boda y proceso */}
      <Sheet tone="sand" folio="Cala Weddings · Paquetes">
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
                  <LaunchTag price={pkg.price} dark={dark} />
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

      {/* 7 · Contacto */}
      <Sheet tone="cream">
        <h2 className="display mt-[30mm] text-[52pt]">
          ¿Tienes algo <span className="accent text-agua-deep">entre manos?</span>
        </h2>
        <p className="mt-6 max-w-[130mm] text-[13pt] leading-relaxed text-ink/80">
          Cuéntanos qué necesitas. Te respondemos en menos de 48 horas laborables y, si tiene sentido, te
          enviamos una propuesta clara con un precio cerrado.
        </p>
        <dl className="mt-12 grid max-w-[150mm] grid-cols-2 gap-x-8 gap-y-6 border-t border-ink pt-6 text-[11pt]">
          <div>
            <dt className="text-[9.5pt] text-mute">Email</dt>
            <dd className="mt-1 font-medium">{site.email}</dd>
          </div>
          <div>
            <dt className="text-[9.5pt] text-mute">Web y presupuesto</dt>
            <dd className="mt-1 font-medium">{domain}/contacto</dd>
          </div>
          <div>
            <dt className="text-[9.5pt] text-mute">Instagram</dt>
            <dd className="mt-1 font-medium">{handle}</dd>
          </div>
          <div>
            <dt className="text-[9.5pt] text-mute">Bodas</dt>
            <dd className="mt-1 font-medium">{domain}/bodas</dd>
          </div>
        </dl>
        <span aria-hidden="true" className="absolute -bottom-[1px] right-0 aspect-square w-[70mm] rounded-tl-full bg-agua" />
        <footer className="relative mt-auto flex items-center gap-2.5 text-[10pt]">
          <LogoMark className="size-5" />
          Cala Studio · {site.location}
        </footer>
      </Sheet>
    </div>
  );
}
