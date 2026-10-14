import Image from "next/image";
import { weddingWorks } from "@/data/weddings";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/style";

/**
 * Galería de inspiración. Hoy solo contiene diseños conceptuales (marcados como tal).
 * Cuando haya bodas reales, se añaden en src/data/weddings.ts con kind: "proyecto".
 */
export function WeddingsInspiration() {
  const hasRealProjects = weddingWorks.some((w) => w.kind === "proyecto");
  return (
    <section aria-labelledby="inspiracion-title" className="bg-sand py-24 lg:py-36">
      <div className="container-cala">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label-wide text-umber-soft lg:col-span-3">{hasRealProjects ? "Proyectos" : "Inspiración"}</p>
          <div className="lg:col-span-9">
            <h2 id="inspiracion-title" data-reveal className="serif-display text-[clamp(2.6rem,7vw,6rem)] text-umber">
              Así entendemos <em className="text-sea">el diseño de bodas.</em>
            </h2>
            {!hasRealProjects ? (
              <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-umber/80">
                Cala Weddings acaba de nacer. Mientras llegan las primeras bodas, os enseñamos diseños
                conceptuales creados por nosotros para que veáis nuestra forma de trabajar.
              </p>
            ) : null}
          </div>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {weddingWorks.map((work, i) => (
            <li
              key={work.id}
              data-reveal
              style={revealDelay((i % 3) * 120)}
              className={cn(i % 3 === 1 && "lg:mt-24", i % 3 === 2 && "lg:mt-10")}
            >
              <figure>
                <div className={cn("relative aspect-[4/5] overflow-hidden bg-stone", i === 0 && "rounded-t-[999px]")}>
                  <Image src={work.image.src} alt={work.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                  <span className="label-wide absolute left-4 top-4 rounded-full bg-linen/90 px-3 py-1.5 text-[0.62rem] text-umber">
                    {work.kind === "concepto" ? "Diseño conceptual" : "Proyecto real"}
                  </span>
                </div>
                <figcaption className="mt-5 border-t border-line-warm pt-4">
                  <p className="label-wide text-sea">{work.category}</p>
                  <h3 className="serif-display mt-2 text-[1.9rem] text-umber">{work.title}</h3>
                  <p className="mt-2 text-umber/75">{work.description}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
