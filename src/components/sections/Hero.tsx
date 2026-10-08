import Link from "next/link";
import { cta, site } from "@/data/site";
import { services } from "@/data/services";
import { vars } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { ChartMark } from "@/components/graphics/ChartMark";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-cala pb-12 pt-8 lg:pb-16 lg:pt-12">
        {/* Línea de metadatos */}
        <div className="label hero-rise flex items-center justify-between gap-4 border-b border-line pb-4 text-mute">
          <span>Agencia de marketing digital</span>
          <span className="hidden sm:inline">Estrategia — Contenido — Publicidad — Web — Tecnología</span>
          <span className="tabular">
            {site.coordinates.lat} <span className="hidden xs:inline">· {site.coordinates.lng}</span>
          </span>
        </div>

        <h1
          id="hero-title"
          className="display mt-10 text-[clamp(3.4rem,16.5vw,6rem)] sm:text-[clamp(4rem,11vw,7rem)] lg:mt-14 lg:text-[clamp(5rem,7.6vw,9.5rem)]"
        >
          <span className="hero-slide block" style={vars({ "--d": 80 })}>
            Marketing <br className="lg:hidden" />
            con <span className="accent text-agua-deep">cabeza.</span>
          </span>
          <span className="hero-slide block lg:pl-[8.3%]" style={vars({ "--d": 200 })}>
            Creatividad <br className="lg:hidden" />
            con <span className="accent text-agua-deep">intención.</span>
          </span>
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-between gap-10 lg:col-span-5">
            <div className="hero-slide" style={vars({ "--d": 360 })}>
              <p className="max-w-md text-lg leading-relaxed text-ink/80 sm:text-xl">
                Estrategia, contenido, publicidad, web y tecnología para marcas que quieren hacer
                las cosas bien.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href={cta.primary.href}>{cta.primary.label}</ButtonLink>
                <ButtonLink href={cta.secondary.href} variant="secondary">
                  {cta.secondary.label}
                </ButtonLink>
              </div>
            </div>

            {/* Índice de servicios */}
            <nav aria-label="Servicios" className="hero-rise hidden lg:block" style={vars({ "--d": 520 })}>
              <ul className="grid grid-cols-2 border-t border-line">
                {services.map((s) => (
                  <li key={s.slug} className="border-b border-line odd:border-r odd:pr-4 even:pl-4">
                    <Link
                      href={`/servicios#${s.slug}`}
                      className="group/svc flex items-baseline gap-3 py-2.5 text-sm transition-colors hover:text-agua-ink"
                    >
                      <span className="label text-[0.625rem] text-mute group-hover/svc:text-agua-ink">{s.number}</span>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <ChartMark className="hero-rise lg:col-span-6 lg:col-start-7" />
        </div>
      </div>
    </section>
  );
}
