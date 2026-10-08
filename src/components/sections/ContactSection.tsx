import { site } from "@/data/site";
import { ContactForm } from "@/components/ui/ContactForm";

type ContactSectionProps = {
  as?: "h1" | "h2";
  index?: string | null;
};

export function ContactSection({ as: Tag = "h2", index = "07" }: ContactSectionProps) {
  // Como titular de página (h1) se muestra de inmediato: no espera a la animación de scroll
  const reveal = Tag === "h2" ? { "data-reveal": true } : {};
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-paper py-24 lg:py-36">
      <div className="container-cala grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="label flex items-center gap-3 text-mute">
            {index ? <span className="text-agua-ink">({index})</span> : null} Contacto
          </p>
          <Tag
            id="contacto-title"
            {...reveal}
            className="display mt-8 text-[clamp(3.25rem,9vw,7.5rem)]"
          >
            ¿Tienes algo <span className="accent text-agua-deep">entre manos?</span>
          </Tag>
          <p {...reveal} className="mt-8 max-w-sm text-xl leading-relaxed text-ink/80">
            Cuéntanos qué estás montando, qué quieres mejorar o qué no termina de funcionar.
          </p>

          <dl className="mt-12 grid max-w-sm gap-6 border-t border-line pt-6 text-[0.95rem] lg:mt-20">
            <div>
              <dt className="label text-mute">Escríbenos</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="text-lg underline decoration-agua decoration-2 underline-offset-[6px] hover:text-agua-ink">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-mute">Qué pasa después</dt>
              <dd className="mt-1 text-ink/80">
                Te respondemos, hablamos 30 minutos sin compromiso y, si tiene sentido, te enviamos
                una propuesta clara.
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-20">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
