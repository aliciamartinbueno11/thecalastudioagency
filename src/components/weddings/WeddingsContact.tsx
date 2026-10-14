import { site } from "@/data/site";
import { WeddingForm } from "./WeddingForm";

export function WeddingsContact() {
  return (
    <section id="contacto-boda" aria-labelledby="contacto-boda-title" className="scroll-mt-20 bg-sand py-24 lg:py-36">
      <div className="container-cala grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="label-wide text-umber-soft">Presupuesto</p>
          <h2 id="contacto-boda-title" data-reveal className="serif-display mt-8 text-[clamp(2.8rem,7vw,5.6rem)] text-umber">
            Contadnos vuestra idea. <em className="text-sea">Nosotros le damos forma.</em>
          </h2>
          <p data-reveal className="mt-8 max-w-sm text-lg leading-relaxed text-umber/80">
            No hace falta que lo tengáis todo claro. Con la fecha y una idea aproximada podemos empezar
            a hablar.
          </p>
          <dl className="mt-12 grid max-w-sm gap-6 border-t border-line-warm pt-6 text-[0.95rem]">
            <div>
              <dt className="label-wide text-umber-soft">Escribidnos</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="text-lg text-umber underline decoration-sea underline-offset-[6px] hover:text-sea">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-wide text-umber-soft">Desde dónde</dt>
              <dd className="mt-1 text-umber/80">
                Desde la Costa del Sol (Málaga) y, en digital, para parejas de cualquier lugar.
              </dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <WeddingForm />
        </div>
      </div>
    </section>
  );
}
