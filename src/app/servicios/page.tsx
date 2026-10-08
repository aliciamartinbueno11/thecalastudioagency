import Link from "next/link";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { revealDelay } from "@/lib/style";
import { CTA } from "@/components/ui/CTA";
import { PageHero } from "@/components/sections/PageHero";

export const metadata = pageMetadata({
  title: "Servicios",
  description:
    "Estrategia, redes sociales, publicidad digital, web, branding y automatización. Qué incluye cada servicio y cuándo tiene sentido.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
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
            </div>
          </section>
        ))}
      </div>

      <CTA />
    </>
  );
}
