import { revealDelay } from "@/lib/style";

const notThis = ["Publicar por publicar", "Invertir por invertir", "Usar herramientas por moda"];

export function Positioning() {
  return (
    <section aria-labelledby="filosofia-title" className="py-24 lg:py-40">
      <div className="container-cala">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <span aria-hidden="true" data-reveal="line" className="block h-px w-full bg-line" />
            <p className="label mt-4 text-mute">
              <span className="text-agua-ink">(01)</span> Filosofía
            </p>
          </div>

          <h2
            id="filosofia-title"
            data-reveal
            className="display text-[clamp(3.5rem,16.5vw,11.5rem)] lg:col-span-9"
          >
            Menos <span className="strike text-mute">humo</span>.
            <br />
            Más <span className="accent text-agua-deep">criterio.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <ul className="border-t border-line lg:col-span-4 lg:col-start-4">
            {notThis.map((item, i) => (
              <li
                key={item}
                data-reveal
                style={revealDelay(i * 140)}
                className="flex items-baseline gap-4 border-b border-line py-4"
              >
                <span className="label text-mute">✕</span>
                <span className="strike text-lg text-ink/70" style={revealDelay(i * 140)}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-4 lg:col-start-9" data-reveal style={revealDelay(200)}>
            <p className="text-lg leading-relaxed text-mute">
              No creemos en hacer cosas para rellenar un calendario ni en gastar presupuesto sin
              saber para qué.
            </p>
            <p className="mt-6 text-2xl leading-snug text-ink sm:text-[1.75rem]">
              Primero entendemos el negocio. Después decidimos{" "}
              <span className="underline decoration-agua decoration-2 underline-offset-[6px]">
                qué merece la pena hacer.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
