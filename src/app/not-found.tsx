import { cta } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-cala flex min-h-[70vh] flex-col justify-center py-24">
      <p className="label border-b border-line pb-4 text-mute">Error 404</p>
      <h1 className="display mt-10 text-[clamp(3.5rem,11vw,9rem)]">
        Aquí no hay <span className="accent text-agua-deep">nada.</span>
      </h1>
      <p className="mt-6 max-w-md text-xl text-ink/80">
        La página que buscas no existe o ha cambiado de sitio.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href={cta.primary.href} variant="secondary">
          {cta.primary.label}
        </ButtonLink>
      </div>
    </section>
  );
}
