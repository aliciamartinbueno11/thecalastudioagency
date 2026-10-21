import Image from "next/image";
import Link from "next/link";
import { weddingPackages } from "@/data/weddings";
import { Arrow } from "@/components/ui/Arrow";

/** Bloque breve en la home: presenta Cala Weddings como segunda línea de negocio. */
export function WeddingsTeaser() {
  return (
    <section aria-labelledby="teaser-bodas" className="bg-sand py-20 lg:py-28">
      <div className="container-cala grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="label text-umber-soft">Otra línea de Cala Studio</p>
          <h2 id="teaser-bodas" data-reveal className="mt-6 text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-umber">
            <span className="accent">Cala Weddings</span>
          </h2>
          <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-umber/80">
            Diseño integral para bodas: identidad, invitaciones, web con confirmación de asistencia y
            todo lo que se ve el gran día. Con el mismo criterio, para un momento muy distinto.
            Paquetes desde {Math.min(...weddingPackages.map((p) => p.price))} €.
          </p>
          <Link
            href="/bodas"
            className="group/tb mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-umber px-6 text-[0.95rem] font-medium text-linen transition-colors hover:bg-sea"
          >
            Descubrir Cala Weddings
            <Arrow className="size-3.5 transition-transform group-hover/tb:translate-x-1" />
          </Link>
        </div>
        <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
          <div data-reveal className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-t-[999px] bg-stone">
            <Image
              src="/images/bodas/linea-fina/sobre-lazo.webp"
              alt="Sobre verde atado con cinta de gasa, flores secas y una etiqueta de papel vegetal: papelería de la boda «Línea fina»"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
