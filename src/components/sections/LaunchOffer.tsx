import { catalogPdf, launch, launchLeft, launchOpen } from "@/data/launch";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { WeddingPackButton } from "@/components/weddings/WeddingPackButton";

/**
 * Oferta de lanzamiento al 90 %, con plazas separadas para marketing y para bodas.
 * `studio` en /servicios (lleva a /contacto) y `weddings` en /bodas (rellena el formulario de la página).
 * Cada una desaparece sola cuando no le quedan plazas (src/data/launch.ts).
 */
export function LaunchOffer({ tone = "studio" }: { tone?: "studio" | "weddings" }) {
  if (!launchOpen(tone)) return null;
  const weddings = tone === "weddings";
  const pool = launch[tone];
  const left = launchLeft(tone);

  return (
    <section
      id="oferta-lanzamiento"
      aria-labelledby="oferta-title"
      className={cn("scroll-mt-24 py-20 lg:py-28", weddings ? "bg-umber text-linen" : "bg-ink text-cream")}
    >
      <div className="container-cala grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className={cn("text-[0.95rem]", weddings ? "text-linen/65" : "text-cream/65")}>Oferta de lanzamiento</p>
          <h2
            id="oferta-title"
            data-reveal
            className={cn(
              "mt-5",
              weddings ? "serif-display text-[clamp(2.6rem,6vw,5rem)]" : "display text-[clamp(2.75rem,6.5vw,5.5rem)]",
            )}
          >
            {weddings ? `Las ${pool.spots} primeras bodas,` : `Los ${pool.spots} primeros proyectos,`}{" "}
            {weddings ? <em className="text-agua">al 90 %.</em> : <span className="accent text-agua">al 90 %.</span>}
          </h2>
          <p className={cn("mt-6 max-w-xl text-lg leading-relaxed", weddings ? "text-linen/85" : "text-cream/85")}>
            {weddings
              ? `Estamos empezando y queremos llenar el portfolio de bodas reales. Las ${pool.spots} primeras parejas pagan solo el 10 % del diseño. A cambio, podemos enseñar el resultado (sin nombres ni datos) y nos mencionáis cuando lo publiquéis.`
              : `Estamos empezando y queremos llenar el portfolio de trabajo real. Los ${pool.spots} primeros proyectos de marketing cuestan solo el 10 % de su precio. A cambio, podemos enseñar el resultado y nos mencionas en tus redes cuando lo publiques.`}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {weddings ? (
              <WeddingPackButton
                name="Oferta de lanzamiento"
                line="Nos interesa una de las plazas de la oferta de lanzamiento. "
                label="Quiero una plaza"
                solid
              />
            ) : (
              <ButtonLink href="/contacto?oferta=lanzamiento" tone="dark">
                Quiero una plaza
              </ButtonLink>
            )}
            <a
              href={catalogPdf[tone]}
              download
              className={cn(
                "inline-flex h-12 items-center rounded-full border px-6 text-[0.95rem] font-medium transition-colors",
                weddings ? "border-linen/30 hover:border-linen" : "border-cream/30 hover:border-cream",
              )}
            >
              {weddings ? "Descargar catálogo de bodas (PDF)" : "Descargar catálogo (PDF)"}
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="flex items-baseline gap-3">
            <span className={cn("tabular text-[clamp(4rem,9vw,6.5rem)] leading-none text-agua", weddings ? "serif-display" : "display")}>
              {left}
            </span>
            <span className={cn("text-lg", weddings ? "text-linen/80" : "text-cream/80")}>
              de {pool.spots} plazas
              <br />
              disponibles
            </span>
          </p>
          <ul className={cn("mt-8 space-y-2.5 border-t pt-6 text-[0.95rem] leading-snug", weddings ? "border-linen/20 text-linen/80" : "border-line-dark text-cream/80")}>
            {pool.conditions.slice(1, -1).map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-agua" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
