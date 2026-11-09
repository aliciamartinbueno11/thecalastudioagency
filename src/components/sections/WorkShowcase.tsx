import type { ReactNode } from "react";
import { studioWork, weddingWork } from "@/data/work";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkCard } from "@/components/ui/WorkCard";

/** Cabecera de cada grupo de trabajo: qué es y adónde ver más */
function GroupHead({ id, title, href, cta }: { id: string; title: ReactNode; href: string; cta: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-5">
      <h3 id={id} className="display-wide text-[clamp(1.5rem,2.4vw,2rem)]">
        {title}
      </h3>
      <ButtonLink href={href} variant="link">
        {cta}
      </ButtonLink>
    </div>
  );
}

/** Trabajo real en la portada, separado: marketing online por un lado y bodas por otro. */
export function WorkShowcase() {
  return (
    <section aria-labelledby="proyectos-title" className="py-24 lg:py-36">
      <div className="container-cala">
        <SectionHeading
          index="04"
          label="Proyectos"
          id="proyectos-title"
          title={
            <>
              Trabajo que se puede <span className="accent text-agua-deep">enseñar.</span>
            </>
          }
          intro="Marketing online para negocios y diseño para bodas. Solo trabajo real."
        />

        {/* Marketing online */}
        <div aria-labelledby="trabajo-marketing" role="group" className="mt-16 lg:mt-24">
          <GroupHead id="trabajo-marketing" title="Marketing online" href="/proyectos" cta="Ver proyectos de marketing" />
          <div className="mt-10 grid gap-16 md:grid-cols-12 md:gap-x-8">
            {studioWork.slice(0, 1).map((item) => (
              <div key={item.href} data-reveal className="md:col-span-7">
                <WorkCard item={item} sizes="(min-width: 768px) 58vw, 100vw" />
              </div>
            ))}
            <p className="max-w-sm leading-relaxed text-ink/80 md:col-span-4 md:col-start-9 md:self-end">
              Estrategia, identidad, web y redes para negocios de la Axarquía y Málaga.
            </p>
          </div>
        </div>

        {/* Bodas */}
        <div aria-labelledby="trabajo-bodas" role="group" className="mt-24 lg:mt-32">
          <GroupHead
            id="trabajo-bodas"
            title={
              <>
                Bodas <span className="accent text-mute">· Cala Weddings</span>
              </>
            }
            href="/bodas#bodas-reales"
            cta="Ver diseño de bodas"
          />
          <div className="mt-10 grid gap-16 md:grid-cols-2 md:gap-x-8">
            {weddingWork.slice(0, 2).map((item, i) => (
              <div key={item.href} data-reveal style={revealDelay(i * 150)} className={i === 1 ? "md:mt-24" : undefined}>
                <WorkCard item={item} aspect={i === 0 ? "portrait" : "landscape"} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
