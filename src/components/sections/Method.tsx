import { method } from "@/data/method";
import { revealDelay } from "@/lib/style";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Method() {
  return (
    <section aria-labelledby="metodo-title" className="bg-paper py-24 lg:py-36">
      <div className="container-cala">
        <SectionHeading
          index="03"
          label="Cómo trabajamos"
          id="metodo-title"
          title={
            <>
              Cuatro pasos. <span className="accent text-agua-deep">Siempre en este orden.</span>
            </>
          }
        />

        <ol className="relative mt-16 grid lg:mt-28 lg:grid-cols-4">
          {/* Línea de recorrido (horizontal en escritorio, vertical en móvil) */}
          <span
            aria-hidden="true"
            data-reveal="line"
            className="absolute left-[5px] right-0 top-[5px] hidden h-px bg-ink/30 lg:block"
          />
          <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-2 w-px bg-ink/20 lg:hidden" />

          {method.map((step, i) => (
            <li
              key={step.number}
              data-reveal
              style={revealDelay(i * 150)}
              className="relative pb-14 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 block size-[11px] rounded-full border border-ink bg-paper lg:relative"
              >
                {i === method.length - 1 ? (
                  <span className="absolute inset-[2px] rounded-full bg-agua-deep" />
                ) : null}
              </span>

              <p className="label tabular text-mute lg:mt-10">
                <span className="text-agua-ink">{step.number}</span> / 04
              </p>
              <h3 className="display mt-3 text-[clamp(3rem,10vw,5.25rem)] lg:text-[clamp(3rem,5.4vw,5.75rem)]">
                {step.title}
                <span className="text-agua-deep">.</span>
              </h3>
              <p className="mt-5 max-w-[22rem] text-lg leading-relaxed text-mute">{step.text}</p>
            </li>
          ))}
        </ol>

        <p
          data-reveal
          className="mt-16 flex max-w-xl items-start gap-4 border-t border-line pt-6 text-base text-ink/80 lg:mt-24"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-agua-deep">
            <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Y vuelta a empezar: lo que medimos decide qué hacemos en el siguiente ciclo.
        </p>
      </div>
    </section>
  );
}
