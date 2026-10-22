import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { vars } from "@/lib/style";

/**
 * Fig. 01 — La Cala del Cañuelo (Nerja) dentro del símbolo de Cala Studio:
 * el marco con el cuarto de círculo aguamarina, y encima el rumbo de la carta náutica.
 *
 * Foto: «Cala del Cañuelo, Nerja, 1», Triedros, CC BY-SA 4.0, vía Wikimedia Commons.
 * Modificada (recorte y duotono aguamarina/crema); la versión modificada mantiene la misma licencia.
 */
export function HeroPlate({ className }: { className?: string }) {
  // Coordenadas en la retícula de 100 × 125 (proporción 4:5)
  const a = { x: 17, y: 108 }; // punto de partida, dentro de la cala aguamarina
  const b = { x: 34, y: 66 }; // objetivo, sobre el agua

  return (
    <figure className={cn("relative", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-agua-soft sm:aspect-[5/4] lg:aspect-square">
        <picture>
          <source media="(min-width: 640px)" srcSet="/images/nerja/cala-del-canuelo-1600.webp" />
          <img
            src="/images/nerja/cala-del-canuelo-900.webp"
            alt="La Cala del Cañuelo, en Nerja, vista desde el acantilado: agua turquesa, una playa curva de arena clara y montes con matorral."
            width={1600}
            height={912}
            fetchPriority="high"
            className="plate-drift absolute inset-0 size-full object-cover object-[58%_50%]"
          />
        </picture>

        {/* Capa de carta náutica: marcas de escala, la cala del logo y el rumbo */}
        <svg
          viewBox="0 0 100 125"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 size-full"
        >
          {Array.from({ length: 9 }, (_, i) => (i + 1) * 10).map((x) => (
            <line key={`t${x}`} x1={x} y1="0" x2={x} y2={x % 30 === 0 ? 2.4 : 1.2} stroke="white" strokeOpacity="0.85" strokeWidth="0.25" />
          ))}
          {Array.from({ length: 12 }, (_, i) => (i + 1) * 10).map((y) => (
            <line key={`r${y}`} x1="100" y1={y} x2={y % 30 === 0 ? 97.6 : 98.8} y2={y} stroke="white" strokeOpacity="0.85" strokeWidth="0.25" />
          ))}
        </svg>

        {/* El cuarto de círculo del logo, a escala */}
        <span
          aria-hidden="true"
          className="hero-rise absolute bottom-0 left-0 aspect-square w-[46%] rounded-tr-full bg-agua"
          style={vars({ "--d": 250 })}
        />

        {/* Rumbo: una sola línea punteada del punto de partida al objetivo */}
        <svg viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
          <line
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="white"
            strokeWidth="0.45"
            strokeDasharray="1.4 1.6"
            vectorEffect="non-scaling-stroke"
            className="course"
            style={vars({ "--d": 900 })}
          />
        </svg>
        <span
          aria-hidden="true"
          className="hero-rise absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
          style={{ left: `${a.x}%`, top: `${(a.y / 125) * 100}%`, ...vars({ "--d": 700 }) }}
        />
        <span
          aria-hidden="true"
          className="hero-rise absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1.5px] border-white"
          style={{ left: `${b.x}%`, top: `${(b.y / 125) * 100}%`, ...vars({ "--d": 1500 }) }}
        >
          <span className="size-1.5 rounded-full bg-white" />
        </span>
        <span
          className="hero-rise absolute -translate-y-1/2 rounded-full bg-cream px-3 py-1 text-[0.8125rem] font-medium text-ink"
          style={{ left: `calc(${b.x}% + 1.6rem)`, top: `${(b.y / 125) * 100}%`, ...vars({ "--d": 1600 }) }}
        >
          Tu objetivo
        </span>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[0.85rem] text-mute">
        <span>
          La Cala del Cañuelo, en Nerja. Nuestro punto de partida.{" "}
          <span className="tabular">
            {site.coordinates.lat} {site.coordinates.lng}
          </span>
        </span>
        <span>
          Foto en duotono a partir de{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Cala_del_Ca%C3%B1uelo,_Nerja,_1.jpg"
            className="underline underline-offset-2 hover:text-ink"
          >
            Triedros
          </a>
          ,{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" className="underline underline-offset-2 hover:text-ink">
            CC BY-SA 4.0
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
