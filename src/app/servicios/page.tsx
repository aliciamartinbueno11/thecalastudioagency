import Link from "next/link";
import { formatPrice, pricingNote, services } from "@/data/services";
import { servicesFaq } from "@/data/faq";
import { cta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/schema";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { CTA } from "@/components/ui/CTA";
import { PageHero } from "@/components/sections/PageHero";

export const metadata = pageMetadata({
  title: "Servicios y precios de marketing digital en Nerja y Málaga",
  description:
    "Estrategia, redes sociales, publicidad en Meta y Google, diseño web, branding y automatización para negocios de Nerja, la Axarquía y Málaga. Qué incluye cada servicio y precios orientativos.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <JsonLd data={[faqSchema(servicesFaq), breadcrumbSchema([{ name: "Servicios", path: "/servicios" }])]} />
      <PageHero
        label="Servicios"
        title={
          <>
            Seis servicios. <span className="accent text-agua-deep">Un solo plan.</span>
          </>
        }
        intro="Puedes contratar algo concreto o dejarnos todo el marketing. Siempre empezamos por entender qué necesita el negocio."
        aside={
          <nav aria-label="Índice de servicios" className="mt-14 lg:mt-20">
            <ul className="flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`#${s.slug}`}
                    className="inline-flex items-baseline gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm transition-colors hover:border-agua hover:bg-agua"
                  >
                    <span className="label text-[0.625rem] text-mute">{s.number}</span>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <div className="container-cala pb-24 lg:pb-36">
        {services.map((s) => (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className="grid scroll-mt-24 gap-8 border-t border-line py-14 lg:grid-cols-12 lg:gap-8 lg:py-20"
          >
            <div className="lg:col-span-5">
              <p className="label text-agua-ink">{s.number} / 06</p>
              <h2
                id={`${s.slug}-title`}
                data-reveal
                className="display mt-4 text-[clamp(2.75rem,6.5vw,5.5rem)]"
              >
                {s.name}
              </h2>
              <p data-reveal className="mt-6 max-w-sm text-xl leading-snug text-ink">
                {s.short}
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p data-reveal className="text-lg leading-relaxed text-ink/80">
                {s.intro}
              </p>
              <h3 className="label mt-10 text-mute">Qué incluye</h3>
              <ul className="mt-3 border-t border-line">
                {s.includes.map((item, i) => (
                  <li
                    key={item}
                    data-reveal
                    style={revealDelay(i * 60)}
                    className="flex items-baseline gap-4 border-b border-line py-3 text-[1.05rem]"
                  >
                    <span aria-hidden="true" className="relative top-[-2px] size-1.5 shrink-0 rounded-full bg-agua-deep" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-l-2 border-agua pl-5">
                <h3 className="label text-mute">Tiene sentido si…</h3>
                <p className="mt-2 text-lg leading-relaxed">{s.fit}</p>
              </div>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 rounded-2xl bg-paper p-6">
                <p>
                  <span className="display-wide block text-[1.75rem] leading-none tabular">
                    {formatPrice(s.price)}
                  </span>
                  {s.price.note ? <span className="mt-2 block text-[0.95rem] text-mute">{s.price.note}</span> : null}
                </p>
                <ButtonLink href={`${cta.quote.href}?servicio=${encodeURIComponent(s.option)}`} variant="link">
                  Pedir presupuesto
                </ButtonLink>
              </div>
            </div>
          </section>
        ))}
        <p className="border-t border-line pt-6 text-[0.95rem] text-mute">{pricingNote}</p>
      </div>

      <section aria-labelledby="faq-title" className="bg-paper py-24 lg:py-32">
        <div className="container-cala grid gap-10 lg:grid-cols-12 lg:gap-8">
          <h2 id="faq-title" className="display text-[clamp(2.5rem,5vw,4.25rem)] lg:col-span-4">
            Preguntas <span className="accent text-agua-deep">frecuentes.</span>
          </h2>
          <div className="border-t border-ink/20 lg:col-span-7 lg:col-start-6">
            {servicesFaq.map((item) => (
              <details key={item.q} className="group/faq border-b border-ink/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-sans text-lg font-medium">{item.q}</h3>
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform duration-300 group-open/faq:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-xl pb-6 text-lg leading-relaxed text-ink/80">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
