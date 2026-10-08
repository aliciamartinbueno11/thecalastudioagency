import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";

const questions = [
  { q: "¿Qué se está haciendo?", a: "Calendario y tareas compartidas, siempre al día." },
  { q: "¿Por qué se está haciendo?", a: "Cada acción tiene un objetivo escrito antes de empezar." },
  { q: "¿Dónde se invierte mi dinero?", a: "Presupuesto desglosado. Sin letra pequeña." },
  { q: "¿Qué resultados estoy obteniendo?", a: "Informes claros. También cuando algo no funciona." },
];

export function About() {
  return (
    <section aria-labelledby="nosotros-title" className="py-24 lg:py-40">
      <div className="container-cala">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <span aria-hidden="true" data-reveal="line" className="block h-px w-full bg-line" />
            <p className="label mt-4 text-mute">
              <span className="text-agua-ink">(06)</span> Sobre Cala
            </p>
          </div>
          <h2
            id="nosotros-title"
            data-reveal
            className="display-wide text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.04] lg:col-span-9"
          >
            Cala Studio nace de una forma bastante sencilla de entender el marketing:{" "}
            <span className="text-mute">escuchar primero,</span>{" "}
            <span className="text-mute">pensar después</span> y{" "}
            <span className="accent text-agua-deep">ejecutar con criterio.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div data-reveal className="lg:col-span-4 lg:col-start-4">
            <p className="text-lg leading-relaxed text-ink/80">
              Trabajamos muy cerca de cada cliente, sin capas ni intermediarios. Hablas con quien
              hace el trabajo.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              La transparencia no es un valor que colgamos en la web: es cómo funcionamos. Nunca
              tendrás que preguntarte:
            </p>
          </div>

          {/* Cuatro preguntas que el cliente nunca tendrá que hacerse */}
          <ol className="border-t border-ink lg:col-span-5 lg:col-start-8 lg:row-span-2">
            {questions.map((item, i) => (
              <li
                key={item.q}
                data-reveal
                style={revealDelay(i * 120)}
                className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-line py-5"
              >
                <span className="label pt-1.5 text-agua-ink tabular">0{i + 1}</span>
                <div>
                  <p className="display-wide text-[1.4rem] leading-tight sm:text-2xl">{item.q}</p>
                  <p className="mt-1.5 text-mute">{item.a}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="lg:col-span-4 lg:col-start-4 lg:row-start-2">
            <ButtonLink href="/nosotros" variant="link">
              Conoce cómo trabajamos
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
