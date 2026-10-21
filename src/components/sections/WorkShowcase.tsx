import { work } from "@/data/work";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkCard } from "@/components/ui/WorkCard";

/** Trabajo real en la portada: marca propia y bodas. */
export function WorkShowcase() {
  const [first, ...rest] = work;
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
          intro="Nuestra propia marca y las bodas que hemos diseñado. Solo trabajo real."
        />

        {/* Composición asimétrica: el caso de marca grande, las bodas a su lado */}
        <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-x-8 lg:mt-24">
          {first ? (
            <div data-reveal className="md:col-span-7">
              <WorkCard item={first} sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
          ) : null}
          <div className="flex flex-col gap-16 md:col-span-5 md:pt-40">
            {rest.slice(0, 2).map((item, i) => (
              <div key={item.href} data-reveal style={revealDelay(150 + i * 120)}>
                <WorkCard item={item} aspect={i === 0 ? "portrait" : "landscape"} sizes="(min-width: 768px) 42vw, 100vw" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-end">
          <ButtonLink href="/proyectos" variant="link">
            Ver todos los proyectos
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
