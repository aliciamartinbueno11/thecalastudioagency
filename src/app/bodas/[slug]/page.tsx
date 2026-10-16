import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import {
  getWeddingProject,
  weddingBrand,
  weddingProjects,
  type WeddingBlock,
  type WeddingFigure,
} from "@/data/weddings";
import { weddingSerif } from "@/lib/fonts-weddings";
import { cn } from "@/lib/cn";
import { vars } from "@/lib/style";
import { ArchFrame, WeddingsMark } from "@/components/weddings/WeddingsMark";
import { WeddingButton } from "@/components/weddings/WeddingButton";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return weddingProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getWeddingProject(slug);
  if (!project) return {};
  const name = `${project.title} ${project.titleEm}`;
  const path = `${weddingBrand.path}/${project.slug}`;
  return {
    title: { absolute: `${name} · ${project.category} · Cala Weddings` },
    description: project.excerpt,
    alternates: { canonical: path },
    openGraph: {
      title: `${name} · Cala Weddings`,
      description: project.excerpt,
      url: path,
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }],
    },
  };
}

/** Una pieza: foto a sangre o diseño apoyado sobre fondo arena. */
function Piece({ figure, sizes, className }: { figure: WeddingFigure; sizes: string; className?: string }) {
  const { image, plate } = figure;
  return (
    <div className={cn(plate && "bg-sand p-[clamp(1rem,4vw,3rem)]", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={cn("h-auto w-full", plate && "shadow-[0_18px_36px_-20px_rgba(36,32,27,0.45)]")}
      />
    </div>
  );
}

function Caption({ fig, children }: { fig: string; children: string }) {
  return (
    <figcaption className="mt-3 flex gap-3 text-[0.82rem] leading-snug text-umber-soft">
      <span className="label-wide shrink-0 pt-px text-[0.62rem] text-umber">Fig. {fig}</span>
      <span>{children}</span>
    </figcaption>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function Block({ block, start }: { block: WeddingBlock; start: number }) {
  if (block.kind === "pair") {
    return (
      <figure data-reveal>
        <div className="grid items-start gap-4 sm:grid-cols-2 sm:gap-6">
          {block.figures.map((f) => (
            <Piece key={f.image.src} figure={f} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
          ))}
        </div>
        <Caption fig={`${pad(start)}–${pad(start + 1)}`}>{block.caption}</Caption>
      </figure>
    );
  }
  if (block.kind === "duo") {
    return (
      <div className="grid items-end gap-10 sm:grid-cols-[5fr_3fr] sm:gap-6">
        <figure data-reveal>
          <Piece figure={block.figures[0]} sizes="(min-width: 1024px) 38vw, (min-width: 640px) 58vw, 100vw" />
          <Caption fig={pad(start)}>{block.captions[0]}</Caption>
        </figure>
        <figure data-reveal style={vars({ "--reveal-delay": 120 })}>
          <Piece figure={block.figures[1]} sizes="(min-width: 1024px) 23vw, (min-width: 640px) 35vw, 100vw" />
          <Caption fig={pad(start + 1)}>{block.captions[1]}</Caption>
        </figure>
      </div>
    );
  }
  return (
    <figure data-reveal className={cn(block.size === "wide" && "lg:w-[88%]")}>
      <Piece figure={block.figure} sizes="(min-width: 1024px) 62vw, 100vw" />
      <Caption fig={pad(start)}>{block.caption}</Caption>
    </figure>
  );
}

const blockSize = (b: WeddingBlock) => (b.kind === "single" ? 1 : 2);

export default async function WeddingProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getWeddingProject(slug);
  if (!project) notFound();

  const path = `${weddingBrand.path}/${project.slug}`;
  const pieceCount = project.chapters.reduce((n, c) => n + c.blocks.reduce((m, b) => m + blockSize(b), 0), 0);

  // Numeración continua de figuras: la portada es la Fig. 01
  let fig = 2;
  const chapters = project.chapters.map((c) => ({
    ...c,
    blocks: c.blocks.map((b) => {
      const start = fig;
      fig += blockSize(b);
      return { block: b, start };
    }),
  }));

  const meta = [
    { label: "Año", value: project.year },
    { label: "Lugar", value: project.place },
    { label: "Piezas", value: `${pieceCount} diseños, digitales e impresos` },
    { label: "Paleta", value: project.palette },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: "Bodas", item: `${site.url}${weddingBrand.path}` },
      { "@type": "ListItem", position: 3, name: `${project.title} ${project.titleEm}`, item: `${site.url}${path}` },
    ],
  };

  return (
    <div className={`${weddingSerif.variable} bg-linen text-umber`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="container-cala pb-16 pt-10 lg:pb-24 lg:pt-16">
          <nav aria-label="Migas de pan" className="hero-rise flex flex-wrap items-center justify-between gap-4 border-b border-line-warm pb-4">
            <WeddingsMark />
            <p className="label-wide flex items-center gap-2 text-umber-soft">
              <Link href={weddingBrand.path} className="hover:text-sea">
                Bodas
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-umber">
                Proyecto real
              </span>
            </p>
          </nav>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-5">
              <p className="label-wide hero-rise text-sea" style={vars({ "--d": 80 })}>
                {project.category} · {project.place}
              </p>
              <h1 className="serif-display hero-slide mt-6 text-[clamp(4rem,13vw,9rem)]" style={vars({ "--d": 120 })}>
                {project.title} <em className="text-sea">{project.titleEm}</em>
              </h1>
              <p className="hero-slide mt-8 max-w-md text-lg leading-relaxed text-umber/80" style={vars({ "--d": 220 })}>
                {project.intro}
              </p>
              <dl className="hero-rise mt-10 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-line-warm pt-5 text-[0.95rem]" style={vars({ "--d": 320 })}>
                {meta.map((m) => (
                  <div key={m.label} className="contents">
                    <dt className="label-wide pt-1 text-[0.62rem] text-umber-soft">{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure className="hero-rise lg:col-span-6 lg:col-start-7" style={vars({ "--d": 200 })}>
              <ArchFrame className="aspect-[4/5] bg-stone">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[50%_40%]"
                />
              </ArchFrame>
              <Caption fig="01">{project.coverCaption}</Caption>
            </figure>
          </div>
        </header>

        {chapters.map((chapter, ci) => (
          <section
            key={chapter.numeral}
            aria-labelledby={`capitulo-${ci + 1}`}
            className={cn("py-16 lg:py-28", ci % 2 === 1 ? "bg-sand/45" : "bg-linen")}
          >
            <div className="container-cala grid gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="label-wide text-sea">{chapter.numeral}</p>
                  <h2 id={`capitulo-${ci + 1}`} data-reveal className="serif-display mt-3 text-[clamp(2.4rem,5vw,4rem)]">
                    {chapter.title} <em className="text-sea">{chapter.titleEm}</em>
                  </h2>
                  <p data-reveal className="mt-5 max-w-sm leading-relaxed text-umber/75">
                    {chapter.text}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-14 lg:col-span-8 lg:gap-20">
                {chapter.blocks.map(({ block, start }) => (
                  <Block key={start} block={block} start={start} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section aria-labelledby="servicios-proyecto" className="border-t border-line-warm bg-linen py-20 lg:py-32">
          <div className="container-cala grid gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h2 id="servicios-proyecto" className="label-wide text-umber-soft">
                Lo que diseñamos
              </h2>
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {project.services.map((s) => (
                  <li key={s.name} className="border-b border-line-warm py-3">
                    {s.name}
                    {s.detail ? <span className="block text-sm text-umber-soft">{s.detail}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="serif-display text-[clamp(2rem,3.6vw,3rem)] italic leading-[1.1]">{project.closing}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <WeddingButton href={`${weddingBrand.path}#contacto-boda`}>Contadnos vuestra idea</WeddingButton>
                <WeddingButton href={weddingBrand.path} variant="ghost">
                  Volver a Cala Weddings
                </WeddingButton>
              </div>
            </div>
          </div>
          <p className="container-cala mt-16 text-sm text-umber-soft">{project.privacyNote}</p>
        </section>
      </article>
    </div>
  );
}
