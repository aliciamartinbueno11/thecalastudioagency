import { weddingPackages, weddingPackageSeparate, weddingPricingNote } from "@/data/weddings";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/style";
import { WeddingPackButton } from "./WeddingPackButton";

/** Paquetes de boda con descuento frente a contratar cada bloque por separado. */
export function WeddingsPackages() {
  return (
    <section id="paquetes-boda" aria-labelledby="paquetes-boda-title" className="scroll-mt-20 bg-linen py-24 lg:py-36">
      <div className="container-cala">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label-wide text-umber-soft lg:col-span-3">Paquetes</p>
          <div className="lg:col-span-9">
            <h2 id="paquetes-boda-title" data-reveal className="serif-display text-[clamp(2.6rem,7vw,6rem)] text-umber">
              Todo junto, <em className="text-sea">por bastante menos.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-umber/80">
              Si vais a necesitar varias piezas, os sale mejor en paquete. Y todo comparte la misma
              identidad desde el principio.
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
          {weddingPackages.map((pkg, i) => {
            const separate = weddingPackageSeparate(pkg);
            const dark = pkg.featured;
            return (
              <li
                key={pkg.id}
                data-reveal
                style={revealDelay(i * 120)}
                className={cn("flex flex-col rounded-sm p-7 sm:p-9", dark ? "bg-umber text-linen" : "bg-sand text-umber")}
              >
                <h3 className="serif-display text-[2.4rem]">{pkg.name}</h3>
                <p className={cn("mt-3 text-[1.05rem] leading-snug", dark ? "text-linen/75" : "text-umber/75")}>
                  {pkg.tagline}
                </p>
                <p className="mt-8">
                  <span className="serif-display block text-[2.6rem] leading-none">{pkg.price} €</span>
                  <span className={cn("mt-3 block text-[0.95rem]", dark ? "text-linen/65" : "text-umber-soft")}>
                    Por separado: <s>{separate} €</s>
                  </span>
                  <span
                    className={cn(
                      "mt-3 inline-block rounded-full px-3 py-1 text-[0.95rem] font-medium",
                      dark ? "bg-agua text-umber" : "bg-linen text-sea",
                    )}
                  >
                    Ahorráis {separate - pkg.price} €
                  </span>
                </p>
                <ul className={cn("mt-8 flex-1 border-t", dark ? "border-linen/15" : "border-line-warm")}>
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "flex items-baseline gap-3 border-b py-3 text-[1.02rem]",
                        dark ? "border-linen/15" : "border-line-warm",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn("relative top-[-2px] size-1.5 shrink-0 rounded-full", dark ? "bg-agua" : "bg-sea")}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <WeddingPackButton name={pkg.name} solid={dark} />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 max-w-2xl text-[0.95rem] text-umber-soft">{weddingPricingNote}</p>
      </div>
    </section>
  );
}
