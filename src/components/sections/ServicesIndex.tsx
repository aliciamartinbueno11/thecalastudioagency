import { services } from "@/data/services";
import { cta } from "@/data/site";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceItem } from "@/components/ui/ServiceItem";

export function ServicesIndex() {
  return (
    <section aria-labelledby="servicios-title" className="py-24 lg:py-36">
      <div className="container-cala">
        <SectionHeading
          index="02"
          label="Servicios"
          id="servicios-title"
          title={
            <>
              Lo que hacemos, <span className="accent text-agua-deep">sin rodeos.</span>
            </>
          }
          intro="Puedes contratar algo concreto o dejarnos todo el marketing. En los dos casos, con un plan detrás."
        />

        <ul className="isolate mt-16 border-b border-line lg:mt-24">
          {services.map((service, i) => (
            <ServiceItem key={service.slug} service={service} index={i} />
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-lg text-ink/80">
            Precios claros desde el principio, y{" "}
            <Link href="/servicios#paquetes" className="underline decoration-agua decoration-2 underline-offset-[6px] hover:text-agua-ink">
              paquetes con descuento
            </Link>
            .
          </p>
          <ButtonLink href={cta.secondary.href} variant="link">
            Ver servicios y precios
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
