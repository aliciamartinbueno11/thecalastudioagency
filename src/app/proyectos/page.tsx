import type { ReactNode } from "react";
import type { WorkItem } from "@/data/work";
import { studioWork, weddingWork } from "@/data/work";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { CTA } from "@/components/ui/CTA";
import { WorkCard } from "@/components/ui/WorkCard";
import { PageHero } from "@/components/sections/PageHero";

export const metadata = pageMetadata({
  title: "Proyectos de branding, web y diseño de bodas",
  description:
    "Trabajo real de Cala Studio, agencia de marketing en Nerja: identidad, web y redes, y papelería de boda para parejas de la Costa de Málaga.",
  path: "/proyectos",
});

export default function ProyectosPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Proyectos", path: "/proyectos" }])} />
      <PageHero
        label="Proyectos"
        title={
          <>
            Trabajo que se puede <span className="accent text-agua-deep">enseñar.</span>
          </>
        }
        intro="Solo trabajo real, separado: marketing online para negocios y diseño para bodas."
      />
      <WorkGroup id="marketing" title="Marketing online" items={studioWork} />
      <WorkGroup
        id="bodas"
        title={
          <>
            Bodas <span className="accent text-mute">· Cala Weddings</span>
          </>
        }
        items={weddingWork}
        more={{ href: "/bodas", label: "Ver todo el diseño de bodas" }}
      />
      <CTA
        title={
          <>
            ¿El próximo, <span className="accent text-agua">el tuyo?</span>
          </>
        }
        text="Cuéntanos qué necesitas y te respondemos con una propuesta clara y un precio cerrado."
      />
    </>
  );
}

/** Un grupo de proyectos (marketing o bodas) con su propia cabecera */
function WorkGroup({
  id,
  title,
  items,
  more,
}: {
  id: string;
  title: ReactNode;
  items: WorkItem[];
  more?: { href: string; label: string };
}) {
  if (items.length === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-cala scroll-mt-24 pb-24 lg:pb-36">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-5">
        <h2 id={`${id}-title`} className="display-wide text-[clamp(1.75rem,3vw,2.5rem)]">
          {title}
        </h2>
        {more ? (
          <ButtonLink href={more.href} variant="link">
            {more.label}
          </ButtonLink>
        ) : null}
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-20 md:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={item.href}
            data-reveal
            style={revealDelay((i % 2) * 150)}
            className={i % 2 === 1 ? "md:mt-32" : undefined}
          >
            <WorkCard item={item} aspect={i % 3 === 1 ? "portrait" : "landscape"} />
          </div>
        ))}
      </div>
    </section>
  );
}
