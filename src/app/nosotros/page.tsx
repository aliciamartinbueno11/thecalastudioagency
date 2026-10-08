import { method } from "@/data/method";
import { pageMetadata } from "@/lib/metadata";
import { revealDelay } from "@/lib/style";
import { CTA } from "@/components/ui/CTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";

export const metadata = pageMetadata({
  title: "Nosotros",
  description:
    "Cala Studio nace de una forma sencilla de entender el marketing: escuchar primero, pensar después y ejecutar con criterio.",
  path: "/nosotros",
});

const principles = [
  {
    title: "Claridad",
    text: "Hablamos en un idioma que se entiende. Si algo no se puede explicar fácil, probablemente no está bien pensado.",
  },
  {
    title: "Transparencia",
    text: "Sabrás qué hacemos, por qué, cuánto cuesta y qué resultado da. También cuando algo no funciona.",
  },
  {
    title: "Criterio",
    text: "Decir que no forma parte del trabajo. No todo canal, herramienta o tendencia merece tu presupuesto.",
  },
  {
    title: "Cercanía",
    text: "Trabajamos con pocos clientes a la vez y muy de cerca. Hablas siempre con quien hace el trabajo.",
  },
];

const commitments = [
  ["Un plan escrito", "Antes de empezar sabrás qué vamos a hacer, en qué orden y para qué."],
  ["Un único interlocutor", "Una persona que conoce tu proyecto de principio a fin."],
  ["Informes que se entienden", "Pocos datos, los que importan, con una lectura y una recomendación."],
  ["Sin permanencias infladas", "Trabajamos con plazos razonables. Seguimos juntos si tiene sentido."],
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        label="Nosotros"
        title={
          <>
            Escuchar primero. Pensar después. <span className="accent text-agua-deep">Ejecutar con criterio.</span>
          </>
        }
      />

      <section aria-labelledby="historia" className="pb-24 lg:pb-36">
        <div className="container-cala grid gap-12 lg:grid-cols-12 lg:gap-8">
          <h2 id="historia" className="label text-mute lg:col-span-3">
            <span className="text-agua-ink">(01)</span> Por qué existe Cala
          </h2>
          <div className="space-y-6 text-xl leading-relaxed text-ink/85 lg:col-span-6 lg:col-start-5">
            <p data-reveal>
              Cala Studio nace de una forma bastante sencilla de entender el marketing. Muchas empresas
              hacen cosas —publican, invierten, rediseñan— sin tener claro para qué. Y muchas agencias
              se lo ponen fácil, porque más acciones significan más facturas.
            </p>
            <p data-reveal>
              Nosotros preferimos empezar al revés: entender el negocio, decidir qué merece la pena y
              hacerlo bien. Con tecnología cuando ayuda y con creatividad cuando aporta.
            </p>
            <p data-reveal className="display-wide text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-ink">
              Una cala es un sitio pequeño, resguardado y{" "}
              <span className="accent text-agua-deep">fácil de reconocer.</span> Así queremos que sea
              trabajar con nosotros.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principios-title" className="bg-paper py-24 lg:py-36">
        <div className="container-cala">
          <SectionHeading
            index="02"
            label="Principios"
            id="principios-title"
            title={
              <>
                Cuatro ideas que <span className="accent text-agua-deep">no negociamos.</span>
              </>
            }
          />
          <ol className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={revealDelay(i * 100)} className="bg-paper py-8 sm:p-8 lg:first:pl-0">
                <span className="label text-agua-ink tabular">0{i + 1}</span>
                <h3 className="display mt-6 text-[2.75rem]">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-mute">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="compromisos-title" className="py-24 lg:py-36">
        <div className="container-cala">
          <SectionHeading
            index="03"
            label="Cómo trabajamos"
            id="compromisos-title"
            title={
              <>
                Lo que puedes <span className="accent text-agua-deep">esperar.</span>
              </>
            }
            intro={`Nuestro método tiene cuatro pasos: ${method.map((m) => m.title.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " y $1")}. Y estos compromisos.`}
          />
          <dl className="mt-16 border-t border-ink lg:mt-24">
            {commitments.map(([title, text], i) => (
              <div
                key={title}
                data-reveal
                style={revealDelay(i * 80)}
                className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:gap-8"
              >
                <dt className="display-wide text-[clamp(1.6rem,3vw,2.5rem)] md:col-span-6">
                  <span className="label mr-4 align-middle text-agua-ink tabular">0{i + 1}</span>
                  {title}
                </dt>
                <dd className="text-lg leading-relaxed text-mute md:col-span-5 md:col-start-8 md:self-center">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTA />
    </>
  );
}
