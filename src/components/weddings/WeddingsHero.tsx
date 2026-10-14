import Image from "next/image";
import { vars } from "@/lib/style";
import { ArchFrame, WeddingsMark } from "./WeddingsMark";
import { WeddingButton } from "./WeddingButton";

export function WeddingsHero() {
  return (
    <section aria-labelledby="bodas-title" className="relative overflow-hidden bg-linen">
      <div className="container-cala grid gap-12 pb-20 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-16">
        <div className="flex flex-col lg:col-span-6 lg:pt-6">
          <p className="hero-rise flex items-center gap-3 border-b border-line-warm pb-4">
            <WeddingsMark />
          </p>

          <h1
            id="bodas-title"
            className="serif-display hero-slide mt-10 text-[clamp(3.1rem,11.5vw,6.6rem)] text-umber lg:mt-16"
            style={vars({ "--d": 100 })}
          >
            Una boda tan vuestra como <em className="text-sea">vuestra historia.</em>
          </h1>

          <p className="hero-slide mt-8 max-w-md text-lg leading-relaxed text-umber/80 sm:text-xl" style={vars({ "--d": 220 })}>
            Diseñamos cada detalle de vuestra boda, desde la primera invitación hasta el último recuerdo.
          </p>

          <div className="hero-slide mt-10 flex flex-wrap gap-3" style={vars({ "--d": 320 })}>
            <WeddingButton href="#contacto-boda">Contadnos vuestra idea</WeddingButton>
            <WeddingButton href="#que-disenamos" variant="ghost">
              Descubrid lo que podemos crear
            </WeddingButton>
          </div>

          <ul className="label-wide hero-rise mt-auto hidden gap-x-6 gap-y-2 pt-16 text-umber-soft lg:flex lg:flex-wrap" style={vars({ "--d": 450 })}>
            <li>Identidad</li>
            <li aria-hidden="true">·</li>
            <li>Invitaciones</li>
            <li aria-hidden="true">·</li>
            <li>Web de boda</li>
            <li aria-hidden="true">·</li>
            <li>El gran día</li>
          </ul>
        </div>

        {/* Composición editorial: arco grande + pieza de detalle */}
        <div className="relative lg:col-span-6">
          <ArchFrame className="hero-rise aspect-[4/5] bg-sand sm:ml-[12%] lg:ml-[14%]">
            <Image
              src="/images/bodas/concepto-invitacion.webp"
              alt="Diseño conceptual de una suite de invitación de boda sobre lino, con luz natural"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="object-cover"
            />
          </ArchFrame>
          <div
            className="hero-rise absolute -bottom-8 left-0 w-[42%] border-[10px] border-linen bg-sand shadow-[0_20px_40px_-20px_rgba(36,32,27,0.35)] sm:-bottom-10 lg:w-[38%]"
            style={vars({ "--d": 300 })}
          >
            <div className="relative aspect-square">
              <Image
                src="/images/bodas/concepto-identidad.webp"
                alt="Diseño conceptual: monograma y paleta de una identidad de boda"
                fill
                sizes="(min-width: 1024px) 18vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="label-wide absolute -bottom-8 right-0 text-umber-soft sm:-bottom-10">Diseño conceptual</p>
        </div>
      </div>
    </section>
  );
}
