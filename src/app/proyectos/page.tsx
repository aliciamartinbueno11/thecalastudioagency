import { work } from "@/data/work";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { revealDelay } from "@/lib/style";
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
        intro="Solo trabajo real: marca y web de Cala Studio, y papelería de boda de Cala Weddings."
      />
      <div className="container-cala grid gap-x-8 gap-y-20 pb-24 md:grid-cols-2 lg:pb-36">
        {work.map((item, i) => (
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
