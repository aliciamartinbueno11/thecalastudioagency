"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { weddingCatalog, weddingPricingNote } from "@/data/weddings";
import { cn } from "@/lib/cn";
import { WeddingButton } from "./WeddingButton";

/**
 * Catálogo de servicios en seis bloques (A–F) con pestañas accesibles.
 * Todos los paneles están en el HTML (los inactivos con `hidden`), así que el contenido
 * completo es indexable y funciona sin JavaScript como primera pestaña.
 */
export function WeddingsCatalog() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const last = weddingCatalog.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="que-disenamos" aria-labelledby="que-disenamos-title" className="scroll-mt-20 bg-sand py-24 lg:py-36">
      <div className="container-cala">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label-wide text-umber-soft lg:col-span-3">Qué podemos diseñar</p>
          <div className="lg:col-span-9">
            <h2 id="que-disenamos-title" data-reveal className="serif-display text-[clamp(2.6rem,7vw,6rem)] text-umber">
              Todo lo gráfico y digital <em className="text-sea">de vuestra boda.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-umber/80">
              Elegid una pieza o el universo completo. Seis bloques para que encontréis rápido lo que
              necesitáis.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Pestañas: horizontales en móvil, verticales en escritorio */}
          <div
            role="tablist"
            aria-label="Categorías de servicios para bodas"
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line-warm lg:px-0"
          >
            {weddingCatalog.map((cat, i) => {
              const selected = i === active;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group/tab flex shrink-0 cursor-pointer items-baseline gap-3 rounded-full border px-4 py-2.5 text-left transition-colors duration-300",
                    "lg:rounded-none lg:border-0 lg:border-b lg:border-line-warm lg:px-0 lg:py-5",
                    selected ? "border-umber bg-umber text-linen lg:bg-transparent lg:text-umber" : "border-umber/20 text-umber hover:border-umber/50",
                  )}
                >
                  <span className={cn("serif-display text-lg lg:text-2xl", selected ? "lg:text-sea" : "text-umber-soft", selected && "text-linen")}>
                    {cat.letter}
                  </span>
                  <span className="whitespace-nowrap text-[0.95rem] lg:hidden">{cat.short}</span>
                  <span className="hidden flex-1 text-lg lg:block">{cat.title}</span>
                  <span className="label hidden text-umber-soft lg:block">{String(cat.items.length).padStart(2, "0")}</span>
                  <span
                    aria-hidden="true"
                    className={cn("hidden h-px w-6 self-center bg-sea transition-transform duration-500 lg:block", selected ? "scale-x-100" : "scale-x-0")}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {weddingCatalog.map((cat, i) => (
              <div
                key={cat.id}
                role="tabpanel"
                id={`panel-${cat.id}`}
                aria-labelledby={`tab-${cat.id}`}
                hidden={i !== active}
                tabIndex={0}
                className="rounded-sm bg-linen p-6 outline-none sm:p-10"
              >
                <p className="label-wide text-sea">
                  {cat.letter} · {cat.items.length} piezas
                </p>
                <h3 className="serif-display mt-4 text-[clamp(2rem,4vw,3rem)] text-umber">{cat.title}</h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-umber/80">{cat.intro}</p>
                <ul className="mt-8 grid gap-x-8 border-t border-line-warm sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-3 border-b border-line-warm py-3 text-[1.02rem] text-umber">
                      <span aria-hidden="true" className="relative top-[-2px] size-1.5 shrink-0 rounded-full bg-sea" />
                      {item}
                    </li>
                  ))}
                </ul>
                {cat.note ? <p className="mt-6 border-l-2 border-sea pl-4 text-[0.95rem] leading-relaxed text-umber-soft">{cat.note}</p> : null}
                <p className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line-warm pt-6">
                  <span className="serif-display text-[1.9rem] text-umber">Desde {cat.from} €</span>
                  <span className="text-[0.95rem] text-umber-soft">{cat.fromLabel}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-5 border-t border-line-warm pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-umber/80">¿No sabéis por dónde empezar? Contadnos la idea y os proponemos qué piezas tienen sentido.</p>
          <WeddingButton href="#contacto-boda">Pedir presupuesto</WeddingButton>
        </div>
        <p className="mt-6 max-w-2xl text-[0.95rem] text-umber-soft">{weddingPricingNote}</p>
      </div>
    </section>
  );
}
