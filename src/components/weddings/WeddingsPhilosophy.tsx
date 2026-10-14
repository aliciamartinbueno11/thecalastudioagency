import { revealDelay } from "@/lib/style";

export function WeddingsPhilosophy() {
  return (
    <section aria-labelledby="filosofia-bodas" className="bg-linen py-24 lg:py-36">
      <div className="container-cala grid gap-12 lg:grid-cols-12 lg:gap-8">
        <p className="label-wide text-umber-soft lg:col-span-3">Nuestra filosofía</p>
        <div className="lg:col-span-9">
          <h2 id="filosofia-bodas" data-reveal className="serif-display text-[clamp(2.6rem,7vw,6rem)] text-umber">
            Hay bodas bonitas. <br className="hidden sm:block" />
            Y bodas que <em className="text-sea">hablan de vosotros.</em>
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:mt-20">
            <p data-reveal className="text-lg leading-relaxed text-umber/80">
              No creemos en repetir diseños ni en seguir tendencias porque sí. Queremos conocer vuestra
              historia, entender lo que os representa y convertirlo en una identidad presente en cada
              detalle.
            </p>
            <p data-reveal style={revealDelay(120)} className="text-lg leading-relaxed text-umber/80">
              Desde la invitación que reciben vuestros invitados hasta el último cartel de la celebración.
            </p>
          </div>
          <p data-reveal className="serif-display mt-14 border-t border-line-warm pt-8 text-[clamp(1.8rem,3.4vw,2.8rem)] text-umber">
            Todo conectado. <em className="text-sea">Todo pensado para vosotros.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
