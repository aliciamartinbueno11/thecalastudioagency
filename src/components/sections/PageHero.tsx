import type { ReactNode } from "react";
import { vars } from "@/lib/style";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
};

/** Cabecera común de páginas interiores. */
export function PageHero({ label, title, intro, aside }: PageHeroProps) {
  return (
    <section className="pb-16 pt-10 lg:pb-24 lg:pt-16">
      <div className="container-cala">
        <p className="label hero-rise flex items-center justify-between border-b border-line pb-4 text-mute">
          <span>{label}</span>
          <span aria-hidden="true" className="size-2 rounded-full bg-agua" />
        </p>
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <h1
            className="display hero-slide text-[clamp(3.25rem,10vw,8.5rem)] lg:col-span-9"
            style={vars({ "--d": 100 })}
          >
            {title}
          </h1>
          {intro ? (
            <div
              className="hero-slide max-w-md self-end text-lg leading-relaxed text-ink/80 sm:text-xl lg:col-span-3"
              style={vars({ "--d": 250 })}
            >
              {intro}
            </div>
          ) : null}
        </div>
        {aside}
      </div>
    </section>
  );
}
