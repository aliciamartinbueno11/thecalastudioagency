import { cn } from "@/lib/cn";
import { revealDelay, vars } from "@/lib/style";

// Distancias aproximadas desde Nerja por carretera, de este a oeste
const stops = [
  { name: "Nerja", km: 0 },
  { name: "Frigiliana", km: 7 },
  { name: "Torrox", km: 9 },
  { name: "Torre del Mar", km: 27 },
  { name: "Vélez-Málaga", km: 30 },
  { name: "Rincón de la Victoria", km: 42 },
  { name: "Málaga", km: 55 },
];
const MAX = 55;

/** Zona de trabajo: de Nerja a Málaga, dibujada como un rumbo hacia el oeste. */
export function Area() {
  return (
    <section aria-labelledby="zona-title" className="py-24 lg:py-36">
      <div className="container-cala">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <span aria-hidden="true" data-reveal="line" className="block h-px w-full bg-line" />
            <p className="label mt-4 text-mute">
              <span className="text-agua-ink">(04)</span> Dónde estamos
            </p>
          </div>
          <div className="lg:col-span-9">
            <h2 id="zona-title" data-reveal className="display text-[clamp(3rem,10vw,8rem)]">
              Cerca, <span className="accent text-agua-deep">de verdad.</span>
            </h2>
            <p data-reveal style={revealDelay(120)} className="mt-8 max-w-xl text-xl leading-relaxed text-ink/80">
              Estamos en Nerja, junto al Balcón de Europa. Trabajamos con negocios de toda la Axarquía
              y de Málaga, y si estás cerca podemos vernos en persona. Si no, todo funciona igual de
              bien a distancia.
            </p>
          </div>
        </div>

        <figure className="mt-16 lg:mt-28">
          {/* Móvil: lista vertical. Escritorio: un rumbo de este (Nerja) a oeste (Málaga), a escala. */}
          <ol className="relative border-l border-ink/25 pl-6 lg:h-40 lg:border-l-0 lg:pl-0">
            <span
              aria-hidden="true"
              data-reveal="line"
              style={{ transformOrigin: "right center" }}
              className="absolute inset-x-0 top-1/2 hidden h-px bg-ink/30 lg:block"
            />
            {stops.map((stop, i) => {
              const home = stop.km === 0;
              const above = i % 2 === 0;
              const last = i === stops.length - 1;
              return (
                <li
                  key={stop.name}
                  data-reveal
                  style={{ ...revealDelay(200 + i * 90), ...vars({ "--x": `${100 - (stop.km / MAX) * 100}%` }) }}
                  className={cn(
                    "relative flex items-baseline justify-between gap-4 border-b border-line py-3",
                    "lg:absolute lg:top-1/2 lg:left-[var(--x)] lg:block lg:border-0 lg:py-0",
                  )}
                >
                  {/* Punto sobre la línea */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full lg:left-0 lg:top-0",
                      home ? "size-4 bg-agua ring-4 ring-agua/30" : "size-2 bg-ink",
                    )}
                  />
                  <span
                    className={cn(
                      "flex w-full items-baseline justify-between gap-3 lg:absolute lg:w-auto lg:flex-col lg:gap-0.5 lg:whitespace-nowrap",
                      // Los extremos se alinean hacia dentro para no salirse del contenedor
                      home
                        ? "lg:right-0 lg:items-end lg:text-right"
                        : last
                          ? "lg:left-0 lg:items-start"
                          : "lg:-translate-x-1/2 lg:items-center lg:text-center",
                      above ? "lg:bottom-5" : "lg:top-5",
                    )}
                  >
                    <span className={cn("text-lg", home ? "font-semibold" : "font-medium")}>{stop.name}</span>
                    <span className="tabular text-[0.95rem] text-mute">
                      {home ? "Aquí estamos" : `${stop.km} km`}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
          <figcaption className="mt-8 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[0.85rem] text-mute lg:mt-6">
            <span>Fig. 02 — Rumbo oeste, de Nerja a Málaga.</span>
            <span>Distancias aproximadas desde Nerja por carretera.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
