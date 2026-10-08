import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { vars } from "@/lib/style";
import { Arrow } from "@/components/ui/Arrow";
import { CTA } from "@/components/ui/CTA";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — ${project.services.join(" + ")}`,
    description: project.excerpt,
    path: `/proyectos/${project.slug}`,
  });
}

export default async function ProyectoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Cliente", value: project.client },
    { label: "Sector", value: project.sector },
    { label: "Año", value: project.year },
    { label: "Servicios", value: project.services.join(", ") },
  ];

  return (
    <>
      <article>
        <header className="container-cala pb-12 pt-10 lg:pt-16">
          <nav aria-label="Migas de pan" className="label hero-rise flex items-center gap-2 border-b border-line pb-4 text-mute">
            <Link href="/proyectos" className="hover:text-agua-ink">
              Proyectos
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">
              {project.number}
            </span>
          </nav>
          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
            <h1 className="display hero-slide text-[clamp(3.5rem,11vw,9rem)] lg:col-span-8" style={vars({ "--d": 100 })}>
              {project.title}
            </h1>
            <p className="hero-slide self-end text-xl leading-snug text-ink/80 lg:col-span-4" style={vars({ "--d": 200 })}>
              {project.excerpt}
            </p>
          </div>
          <dl className="hero-rise mt-12 grid grid-cols-2 border-t border-line md:grid-cols-4" style={vars({ "--d": 300 })}>
            {meta.map((m) => (
              <div key={m.label} className="border-b border-line py-4 pr-4 md:border-b-0">
                <dt className="label text-mute">{m.label}</dt>
                <dd className="mt-1">{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="container-cala">
          <div className="relative aspect-[16/10] overflow-hidden bg-paper lg:aspect-[16/8]">
            <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>

        <div className="container-cala grid gap-14 py-20 lg:grid-cols-12 lg:gap-8 lg:py-32">
          <section aria-labelledby="reto" className="lg:col-span-4">
            <h2 id="reto" className="label text-agua-ink">
              01 — Punto de partida
            </h2>
            <p data-reveal className="display-wide mt-5 text-[clamp(1.6rem,2.6vw,2.25rem)] leading-tight">
              {project.challenge}
            </p>
          </section>
          <section aria-labelledby="enfoque" className="lg:col-span-4 lg:col-start-6">
            <h2 id="enfoque" className="label text-agua-ink">
              02 — Enfoque
            </h2>
            <p data-reveal className="mt-5 text-lg leading-relaxed text-ink/80">
              {project.approach}
            </p>
          </section>
          <section aria-labelledby="trabajo" className="lg:col-span-3 lg:col-start-10">
            <h2 id="trabajo" className="label text-agua-ink">
              03 — Qué hicimos
            </h2>
            <ul className="mt-5 border-t border-line">
              {project.work.map((w) => (
                <li key={w} className="border-b border-line py-3">
                  {w}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="container-cala grid gap-8 md:grid-cols-12">
          {project.gallery.map((img, i) => (
            <div
              key={img.src}
              data-reveal
              className={
                i === 0
                  ? "relative aspect-[4/5] overflow-hidden bg-paper md:col-span-5"
                  : "relative aspect-[5/4] overflow-hidden bg-paper md:col-span-7 md:mt-32"
              }
            >
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>

        <section aria-labelledby="resultado" className="container-cala py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 id="resultado" className="label text-agua-ink">
                04 — Qué cambió
              </h2>
              <p data-reveal className="display-wide mt-5 text-[clamp(1.8rem,3.2vw,2.75rem)] leading-tight">
                {project.outcome}
              </p>
            </div>
            <dl className="grid grid-cols-1 border-t border-ink sm:grid-cols-3 lg:col-span-6 lg:col-start-7 lg:self-end">
              {project.metrics.map((m, i) => (
                <div key={i} className="flex flex-col-reverse gap-2 border-b border-line py-6 sm:border-b-0 sm:pr-6">
                  <dt className="label text-mute">{m.label}</dt>
                  <dd className="display text-6xl text-agua-deep tabular">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </article>

      {next && next.slug !== project.slug ? (
        <nav aria-label="Siguiente proyecto" className="container-cala pb-24">
          <Link href={`/proyectos/${next.slug}`} className="group/next flex items-end justify-between gap-6 border-t border-ink pt-6">
            <span>
              <span className="label block text-mute">Siguiente proyecto</span>
              <span className="display mt-3 block text-[clamp(2.5rem,7vw,6rem)] transition-colors group-hover/next:text-agua-deep">
                {next.title}
              </span>
            </span>
            <span className="mb-3 grid size-14 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors group-hover/next:border-agua group-hover/next:bg-agua">
              <Arrow />
            </span>
          </Link>
        </nav>
      ) : null}

      <CTA />
    </>
  );
}
