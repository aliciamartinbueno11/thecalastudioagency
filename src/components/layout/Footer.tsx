import Link from "next/link";
import { legalNav, mainNav, site } from "@/data/site";
import { LogoMark } from "@/components/ui/Logo";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="container-cala pb-8 pt-16 lg:pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="display text-[clamp(2.25rem,4.5vw,3.75rem)]">
              Marketing con <span className="accent text-agua">cabeza.</span>
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-lg text-cream/80 underline decoration-cream/30 underline-offset-[6px] transition-colors hover:text-agua hover:decoration-agua"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-2 md:col-start-7">
            <p className="label mb-4 text-mute-dark">Navegación</p>
            <ul className="space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/85 transition-colors hover:text-agua">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="label mb-4 text-mute-dark">Legal</p>
            <ul className="space-y-2">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/85 transition-colors hover:text-agua">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label mb-4 text-mute-dark">Síguenos</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/85 transition-colors hover:text-agua"
                >
                  Instagram<span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/85 transition-colors hover:text-agua"
                >
                  LinkedIn<span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Firma de gran formato */}
        <div className="mt-20 flex items-end gap-[2vw] border-t border-line-dark pt-8 lg:mt-28">
          <LogoMark className="mb-[0.6vw] size-[min(11.5vw,12.5rem)] md:size-[min(12.5vw,12.5rem)] shrink-0 text-cream" />
          <p
            aria-hidden="true"
            className="display -mb-[0.1em] whitespace-nowrap text-[min(16.5vw,18rem)] md:text-[min(18vw,18rem)] font-bold uppercase leading-[0.8]"
          >
            Cala Studio
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-sm text-mute-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear initial={new Date().getFullYear()} /> Cala Studio
          </p>
          <p className="label">
            {site.coordinates.lat} · {site.coordinates.lng} — {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
