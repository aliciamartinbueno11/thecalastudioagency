import type { Metadata } from "next";
import { launch, launchOpen } from "@/data/launch";
import { method } from "@/data/method";
import { formatPackagePrice, formatPrice, packages, packageSavings, pricingNote, services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/ui/Logo";
import { domain, handle, LaunchTag, OfferSheet, ScreenBar, Sheet, year } from "./_parts";

/**
 * Catálogo de marketing online (A4). De aquí sale /catalogo-cala-studio.pdf con `npm run catalogo`.
 * El de bodas está en /catalogo/bodas.
 */
export const metadata: Metadata = {
  title: "Catálogo de marketing online",
  description: "Catálogo de servicios de marketing online de Cala Studio, con precios orientativos y paquetes.",
  alternates: { canonical: "/catalogo" },
  robots: { index: false, follow: true },
};

export default function CatalogoPage() {
  const pool = launch.studio;
  const examples = [
    { name: "Paquete Arranque (estrategia, identidad y landing)", price: packages.find((p) => p.slug === "arranque")?.price.once ?? 0 },
    { name: "Identidad visual de marca", price: services.find((s) => s.slug === "branding-creatividad")?.price.from ?? 0 },
    { name: "Landing page o web", price: services.find((s) => s.slug === "web-landing-pages")?.price.from ?? 0 },
    { name: "Gestión de redes (cada mes, 3 primeros meses)", price: services.find((s) => s.slug === "redes-sociales")?.price.from ?? 0 },
  ].filter((e) => e.price > 0);

  return (
    <div className="catalogo">
      <ScreenBar kind="studio" label={`Catálogo de marketing online ${year}`} />

      {/* 1 · Portada */}
      <Sheet tone="cream">
        <header className="flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <LogoMark className="size-7" />
            <span className="font-display text-[13pt] font-bold uppercase" style={{ fontVariationSettings: '"wdth" 80' }}>
              Cala <span className="font-medium">Studio</span>
            </span>
          </span>
          <span className="text-[10pt] text-mute">Marketing online · {year}</span>
        </header>

        <div className="mt-[32mm]">
          <p className="text-[12pt] text-mute">Agencia de marketing y diseño en Nerja</p>
          <h1 className="display mt-4 text-[58pt]">
            Marketing con <span className="accent text-agua-deep">cabeza.</span>
          </h1>
          <p className="mt-6 max-w-[120mm] text-[13pt] leading-relaxed text-ink/80">
            Estrategia, redes, publicidad, web y branding para negocios de la Axarquía, Málaga y la Costa del Sol.
          </p>
        </div>

        <span aria-hidden="true" className="absolute -bottom-[1px] left-0 aspect-square w-[78mm] rounded-tr-full bg-agua" />

        {launchOpen("studio") ? (
          <div className="absolute bottom-[30mm] right-[16mm] grid size-[58mm] place-items-center rounded-full bg-ink p-6 text-center text-cream">
            <p>
              <span className="block text-[10pt] text-cream/70">Oferta de lanzamiento</span>
              <span className="display mt-1 block text-[34pt] text-agua">−90 %</span>
              <span className="mt-1 block text-[10pt] leading-snug">para los {pool.spots} primeros proyectos</span>
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
      <OfferSheet
        kind="studio"
        title={
          <>
            Los {pool.spots} primeros proyectos, <span className="accent text-agua">al 90 %.</span>
          </>
        }
        intro={`Estamos empezando y queremos llenar el portfolio de trabajo real. Por eso, los ${pool.spots} primeros proyectos de marketing cuestan solo el 10 % de su precio. A cambio, te pedimos dos cosas: poder enseñar el resultado y que nos menciones cuando lo publiques.`}
        examples={examples}
      />

      {/* 3 · Servicios */}
      <Sheet tone="cream" folio="Servicios">
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
                <LaunchTag kind="studio" price={s.price.from} unit={s.price.unit} />
              </p>
              {s.price.note ? <p className="mt-1 text-[8.5pt] text-mute">{s.price.note}</p> : null}
            </article>
          ))}
        </div>
        <p className="mt-6 text-[8.5pt] text-mute">{pricingNote}</p>
      </Sheet>

      {/* 4 · Paquetes y método */}
      <Sheet tone="paper" folio="Paquetes">
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
                  <LaunchTag kind="studio" price={base} unit={pkg.price.monthly ? "mes" : undefined} dark={dark} />
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

      {/* 5 · Contacto */}
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
            <dt className="text-[9.5pt] text-mute">Servicios</dt>
            <dd className="mt-1 font-medium">{domain}/servicios</dd>
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
