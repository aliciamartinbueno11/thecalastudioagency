import Link from "next/link";
import type { Service } from "@/data/services";
import { revealDelay } from "@/lib/style";
import { Arrow } from "./Arrow";

/**
 * Fila del índice de servicios. Al pasar el ratón: la línea superior se tiñe
 * de aguamarina, el nombre se desplaza y aparecen las etiquetas.
 */
export function ServiceItem({ service, index }: { service: Service; index: number }) {
  return (
    <li data-reveal style={revealDelay(index * 70)} className="relative">
      <Link
        href={`/servicios#${service.slug}`}
        className="group/item relative grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-3 border-t border-line py-7 sm:grid-cols-[3.5rem_1fr_auto] md:grid-cols-12 md:items-center md:gap-x-8 md:py-9"
      >
        {/* Línea aguamarina que crece al hover */}
        <span
          aria-hidden="true"
          className="absolute -top-px left-0 h-[2px] w-full origin-left scale-x-0 bg-agua transition-transform duration-700 ease-out-soft group-hover/item:scale-x-100 group-focus-visible/item:scale-x-100"
        />
        {/* Fondo sutil al hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-top scale-y-0 bg-paper transition-transform duration-500 ease-out-soft group-hover/item:scale-y-100"
        />

        <span className="label pt-2 text-mute transition-colors group-hover/item:text-agua-ink md:col-span-1 md:pt-0">
          {service.number}
        </span>

        <h3 className="display-wide text-[clamp(1.9rem,4.6vw,3.6rem)] transition-transform duration-500 ease-out-soft group-hover/item:translate-x-2 md:col-span-5">
          {service.name}
        </h3>

        <span className="col-span-full col-start-2 max-w-md text-base leading-relaxed text-mute md:col-span-4 md:col-start-auto">
          {service.short}
          <span className="mt-3 flex flex-wrap gap-1.5 md:h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover/item:h-7 md:group-hover/item:opacity-100">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/15 px-2.5 py-0.5 text-xs text-ink/70"
              >
                {tag}
              </span>
            ))}
          </span>
        </span>

        <span className="col-start-3 row-start-1 grid size-11 place-items-center justify-self-end rounded-full border border-ink/15 transition-all duration-500 ease-out-soft group-hover/item:border-agua group-hover/item:bg-agua md:col-span-2 md:col-start-auto md:row-start-auto md:size-14">
          <Arrow
            direction="up-right"
            className="transition-transform duration-500 ease-out-soft group-hover/item:rotate-0"
          />
        </span>
      </Link>
    </li>
  );
}
