import { revealDelay } from "@/lib/style";
import { DotField } from "@/components/graphics/DotField";

export function Difference() {
  return (
    <section aria-labelledby="diferencia-title" className="relative overflow-hidden bg-ink py-24 text-cream lg:py-40">
      <div className="container-cala">
        <p className="label flex items-center gap-3 text-mute-dark">
          <span className="text-agua">(05)</span> Diferencia
        </p>

        <h2 id="diferencia-title" className="mt-10 lg:mt-16">
          <span
            data-reveal
            className="display block text-[clamp(2.6rem,10.5vw,7.5rem)] text-cream/45 lg:text-[clamp(2.5rem,7.4vw,7.5rem)]"
          >
            No necesitas hacer <span className="strike text-cream/70">más</span> marketing.
          </span>
          <span
            data-reveal
            style={revealDelay(250)}
            className="display mt-4 block text-[clamp(2.6rem,10.5vw,7.5rem)] lg:mt-6 lg:text-[clamp(2.5rem,7.4vw,7.5rem)]"
          >
            Necesitas saber qué marketing{" "}
            <span className="accent text-agua">merece la pena</span> hacer.
          </span>
        </h2>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <DotField className="lg:col-span-7" />
          <div data-reveal style={revealDelay(150)} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <span aria-hidden="true" className="mb-6 block h-px w-16 bg-agua" />
            <p className="text-xl leading-relaxed text-cream/85 sm:text-2xl">
              Cala Studio combina estrategia, creatividad, datos y tecnología sin complicar lo que
              puede ser sencillo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
