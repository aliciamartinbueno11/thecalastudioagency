import { cn } from "@/lib/cn";

const COLS = 14;
const ROWS = 6;
// Las seis acciones que merecen la pena, repartidas en la retícula
const HITS = new Map([
  [17, 0],
  [24, 1],
  [36, 2],
  [47, 3],
  [62, 4],
  [72, 5],
]);

/**
 * Fig. 02 — 84 cosas que se podrían hacer. Seis que merecen la pena.
 */
export function DotField({ className }: { className?: string }) {
  const gap = 40;
  const pad = 16;
  const w = (COLS - 1) * gap + pad * 2;
  const h = (ROWS - 1) * gap + pad * 2;

  return (
    <figure data-reveal className={cn("dotfield", className)}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label="Una retícula de 84 puntos grises donde solo seis se iluminan en aguamarina."
        className="block h-auto w-full"
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const x = pad + (i % COLS) * gap;
          const y = pad + Math.floor(i / COLS) * gap;
          const hit = HITS.get(i);
          if (hit === undefined) {
            return <circle key={i} cx={x} cy={y} r="3" className="fill-cream/20" />;
          }
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="12"
                className="hit-ring fill-none stroke-agua"
                style={{ transitionDelay: `${400 + hit * 140}ms` }}
              />
              <circle
                cx={x}
                cy={y}
                r="5"
                className="hit fill-cream/20"
                style={{ transitionDelay: `${300 + hit * 140}ms` }}
              />
            </g>
          );
        })}
      </svg>
      <figcaption className="label mt-5 flex flex-wrap justify-between gap-x-6 gap-y-1 text-mute-dark">
        <span>Fig. 02 — Todo lo que se podría hacer: 84</span>
        <span className="text-agua">Lo que merece la pena: 6</span>
      </figcaption>
    </figure>
  );
}
