import Image from "next/image";
import Link from "next/link";
import { weddingBrand, weddingProjects } from "@/data/weddings";
import { Arrow } from "@/components/ui/Arrow";
import { ArchFrame } from "./WeddingsMark";

/** Bodas reales: cada proyecto enlaza a su página en /bodas/[slug]. */
export function WeddingsProjects() {
  if (weddingProjects.length === 0) return null;
  return (
    <section id="bodas-reales" aria-labelledby="bodas-reales-title" className="border-t border-line-warm bg-linen py-24 lg:py-36">
      <div className="container-cala">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label-wide text-umber-soft lg:col-span-3">Bodas reales</p>
          <h2 id="bodas-reales-title" data-reveal className="serif-display text-[clamp(2.6rem,7vw,6rem)] text-umber lg:col-span-9">
            Bodas que ya hemos <em className="text-sea">diseñado.</em>
          </h2>
        </div>

        <ul className="mt-16 grid gap-16 lg:mt-24">
          {weddingProjects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`${weddingBrand.path}/${p.slug}`}
                className="group/wp grid items-end gap-8 lg:grid-cols-12 lg:gap-8"
              >
                <div data-reveal className="lg:col-span-5">
                  <ArchFrame className="aspect-[4/5] bg-stone">
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover object-[50%_40%] transition-transform duration-700 ease-out group-hover/wp:scale-[1.03]"
                    />
                  </ArchFrame>
                </div>
                <div data-reveal className="border-t border-line-warm pt-6 lg:col-span-6 lg:col-start-7 lg:pb-6">
                  <p className="label-wide text-sea">
                    {p.category} · {p.place} · {p.year}
                  </p>
                  <h3 className="serif-display mt-4 text-[clamp(3rem,7vw,5.5rem)] text-umber">
                    {p.title} <em className="text-sea">{p.titleEm}</em>
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-umber/80">{p.excerpt}</p>
                  <span className="mt-8 inline-flex items-center gap-3 border-b border-umber/30 pb-1 text-[0.95rem] font-medium text-umber transition-colors group-hover/wp:border-sea group-hover/wp:text-sea">
                    Ver el proyecto
                    <Arrow className="size-3.5 transition-transform duration-300 group-hover/wp:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
