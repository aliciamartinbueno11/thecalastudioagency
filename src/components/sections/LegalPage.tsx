import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

/** Plantilla para textos legales: columna de lectura cómoda y jerarquía clara. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <article className="container-cala pb-24 pt-10 lg:pb-36 lg:pt-16">
      <p className="label flex items-center justify-between border-b border-line pb-4 text-mute">
        <span>Legal</span>
        <span>Actualizado: {updated}</span>
      </p>
      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
        <h1 className="display text-[clamp(3rem,8vw,6.5rem)] lg:col-span-4">{title}</h1>
        <div className="legal max-w-2xl lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </article>
  );
}
