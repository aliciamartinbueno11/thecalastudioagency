import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { vars } from "@/lib/style";

const CX = 0;
const CY = 480;
const RADII = [260, 310, 370, 440, 520, 610];
const DEPTHS = ["4", "7", "12", "20", "35", "50"];

function arcPath(r: number) {
  // Cuarto de arco desde el borde inferior hasta el borde izquierdo
  return `M ${CX + r} ${CY} A ${r} ${r} 0 0 0 ${CX} ${CY - r}`;
}

/**
 * Fig. 01 — Una carta náutica abstracta: la cala (aguamarina),
 * curvas de profundidad, un punto de partida y un rumbo hacia el objetivo.
 */
export function ChartMark({ className }: { className?: string }) {
  const a = { x: 254, y: 302 }; // punto de partida
  const b = { x: 512, y: 112 }; // objetivo

  return (
    <figure className={cn("relative", className)}>
      <div className="label mb-3 flex justify-between text-mute">
        <span>Fig. 01</span>
        <span>{site.coordinates.lat}</span>
      </div>
      <svg
        viewBox="0 0 600 480"
        role="img"
        aria-label="Ilustración: una carta náutica abstracta con un punto de partida y un rumbo trazado hacia un objetivo."
        className="block h-auto w-full overflow-visible"
      >
        <defs>
          <clipPath id="chart-clip">
            <rect x="0" y="0" width="600" height="480" />
          </clipPath>
        </defs>

        {/* Marco y marcas de escala */}
        <rect x="0.5" y="0.5" width="599" height="479" fill="none" stroke="var(--color-line)" />
        {Array.from({ length: 14 }, (_, i) => (i + 1) * 40).map((x) => (
          <line key={`t${x}`} x1={x} y1="0" x2={x} y2={x % 120 === 0 ? 10 : 5} stroke="var(--color-ink)" strokeOpacity="0.35" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (i + 1) * 40).map((y) => (
          <line key={`r${y}`} x1="600" y1={y} x2={y % 120 === 0 ? 590 : 595} y2={y} stroke="var(--color-ink)" strokeOpacity="0.35" />
        ))}

        <g clipPath="url(#chart-clip)">
          {/* La cala */}
          <path
            d={`M ${CX} ${CY} L ${CX + 210} ${CY} A 210 210 0 0 0 ${CX} ${CY - 210} Z`}
            fill="var(--color-agua)"
            className="hero-rise"
            style={vars({ "--d": 200 })}
          />

          {/* Curvas de profundidad */}
          {RADII.map((r, i) => (
            <path
              key={r}
              d={arcPath(r)}
              fill="none"
              stroke="var(--color-ink)"
              strokeOpacity={i % 2 ? 0.22 : 0.4}
              strokeDasharray={i === 3 ? "2 6" : undefined}
              className={i === 3 ? undefined : "draw"}
              style={vars({ "--len": Math.ceil((Math.PI * r) / 2), "--d": 300 + i * 120 })}
            />
          ))}
        </g>

        {/* Sondas */}
        {RADII.slice(0, 5).map((r, i) => {
          const angle = (62 - i * 4) * (Math.PI / 180);
          return (
            <text
              key={`d${r}`}
              x={CX + r * Math.cos(angle) + 6}
              y={CY - r * Math.sin(angle) - 6}
              className="fill-mute text-[13px] tabular"
            >
              {DEPTHS[i]}
            </text>
          );
        })}

        {/* Cruces de retícula */}
        {[
          [360, 80],
          [480, 320],
          [160, 120],
        ].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 6} ${y}h12M${x} ${y - 6}v12`} stroke="var(--color-ink)" strokeOpacity="0.45" />
        ))}

        {/* Rumbo */}
        <line
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="var(--color-agua-deep)"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          className="hero-rise"
          style={vars({ "--d": 1300 })}
        />
        <g className="hero-rise" style={vars({ "--d": 1100 })}>
          <circle cx={a.x} cy={a.y} r="7" fill="var(--color-ink)" />
          <text x={a.x + 14} y={a.y + 22} className="fill-ink text-[13px] font-medium">
            Hoy
          </text>
        </g>
        <g className="hero-rise" style={vars({ "--d": 1500 })}>
          <circle cx={b.x} cy={b.y} r="16" fill="none" stroke="var(--color-agua-deep)" strokeWidth="1.5" className="blink" />
          <circle cx={b.x} cy={b.y} r="4" fill="var(--color-agua-deep)" />
          <path d={`M${b.x - 28} ${b.y}h12M${b.x + 16} ${b.y}h12M${b.x} ${b.y - 28}v12M${b.x} ${b.y + 16}v12`} stroke="var(--color-agua-deep)" strokeWidth="1.5" />
          <text x={b.x - 12} y={b.y + 52} textAnchor="end" className="fill-ink text-[13px] font-medium">
            Objetivo
          </text>
        </g>
        <g className="hero-rise" style={vars({ "--d": 1600 })}>
          <text
            x="0"
            y="0"
            transform={`translate(${(a.x + b.x) / 2 - 40} ${(a.y + b.y) / 2 - 10}) rotate(-36.4)`}
            className="fill-agua-ink text-[12px] uppercase tracking-[0.12em] tabular"
          >
            Rumbo 054°
          </text>
        </g>
      </svg>
      <figcaption className="label mt-3 flex justify-between text-mute">
        <span>Del punto de partida al objetivo</span>
        <span>{site.coordinates.lng}</span>
      </figcaption>
    </figure>
  );
}
