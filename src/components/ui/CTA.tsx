import type { ReactNode } from "react";
import { cta } from "@/data/site";
import { ButtonLink } from "./Button";

type CTAProps = {
  title?: ReactNode;
  text?: string;
};

/** Banda de cierre para páginas interiores. */
export function CTA({
  title = (
    <>
      ¿Hablamos de <span className="accent text-agua">tu proyecto?</span>
    </>
  ),
  text = "Cuéntanos en qué punto estás. Te diremos con sinceridad si podemos ayudarte.",
}: CTAProps) {
  return (
    <section aria-label="Contacto" className="bg-ink py-20 text-cream lg:py-28">
      <div className="container-cala grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 data-reveal className="display text-[clamp(2.75rem,7vw,6.5rem)] lg:col-span-8">
          {title}
        </h2>
        <div data-reveal className="lg:col-span-4">
          <p className="max-w-sm text-lg leading-relaxed text-cream/75">{text}</p>
          <ButtonLink href={cta.primary.href} tone="dark" className="mt-8">
            {cta.primary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
