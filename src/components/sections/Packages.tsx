import { formatPackagePrice, packages, packageSavings } from "@/data/services";
import { cta } from "@/data/site";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";

/** Paquetes de servicios con descuento frente a contratarlos por separado. */
export function Packages() {
  return (
    <section id="paquetes" aria-labelledby="paquetes-title" className="scroll-mt-24 pb-24 lg:pb-36">
      <div className="container-cala">
        <div className="grid gap-8 border-t border-line pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-20">
          <h2 id="paquetes-title" data-reveal className="display text-[clamp(2.75rem,6.5vw,5.5rem)] lg:col-span-7">
            Paquetes. <span className="accent text-agua-deep">Más por menos.</span>
          </h2>
          <p data-reveal className="max-w-md self-end text-lg leading-relaxed text-ink/80 lg:col-span-4 lg:col-start-9">
            Los servicios que mejor funcionan juntos, en un solo precio. Pagas bastante menos que
            contratándolos por separado.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const { separate, saving } = packageSavings(pkg);
            const dark = pkg.featured;
            return (
              <li
                key={pkg.slug}
                data-reveal
                style={revealDelay(i * 120)}
                className={cn(
                  "flex flex-col rounded-3xl p-7 sm:p-9",
                  dark ? "bg-ink text-cream" : "bg-paper text-ink",
                )}
              >
                <h3 className="display text-[2.5rem]">{pkg.name}</h3>
                <p className={cn("mt-3 text-[1.05rem] leading-snug", dark ? "text-cream/75" : "text-ink/75")}>
                  {pkg.tagline}
                </p>

                <p className="mt-8">
                  <span className="display-wide block text-[2.25rem] leading-none tabular">
                    {formatPackagePrice(pkg.price)}
                  </span>
                  <span className={cn("mt-3 block text-[0.95rem]", dark ? "text-cream/65" : "text-mute")}>
                    Por separado: <s>{separate}</s>
                  </span>
                  <span
                    className={cn(
                      "mt-3 inline-block rounded-full px-3 py-1 text-[0.95rem] font-medium",
                      dark ? "bg-agua text-ink" : "bg-agua-soft text-agua-ink",
                    )}
                  >
                    Ahorras {saving}
                  </span>
                </p>

                <ul className={cn("mt-8 flex-1 border-t", dark ? "border-line-dark" : "border-line")}>
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "flex items-baseline gap-3 border-b py-3 text-[1.02rem]",
                        dark ? "border-line-dark" : "border-line",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn("relative top-[-2px] size-1.5 shrink-0 rounded-full", dark ? "bg-agua" : "bg-agua-deep")}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={`${cta.quote.href}?paquete=${pkg.slug}`}
                  tone={dark ? "dark" : "light"}
                  variant={dark ? "primary" : "secondary"}
                  className="mt-8 self-start"
                >
                  Pedir este paquete
                </ButtonLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
