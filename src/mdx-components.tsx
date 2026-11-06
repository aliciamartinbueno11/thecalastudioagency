import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { blogPrices } from "@/data/blog";

/** Convierte un titular en un id para enlazar a la sección (#como-se-calcula) */
function slugify(children: ReactNode) {
  return String(Array.isArray(children) ? children.join("") : children)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Respuesta corta al principio del artículo: es el párrafo que citan Google y los asistentes de IA. */
function Respuesta({ children }: { children: ReactNode }) {
  return (
    <aside aria-label="Respuesta rápida" className="my-10 border-l-2 border-agua bg-paper px-6 py-6 sm:px-8">
      <p className="label text-agua-ink">Respuesta rápida</p>
      <div className="mt-3 text-xl leading-relaxed text-ink [&>p]:m-0">{children}</div>
    </aside>
  );
}

/** Nota destacada dentro del texto */
function Nota({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 rounded-sm border border-line px-6 py-5 text-lg leading-relaxed text-ink/85 [&>p]:m-0">
      {children}
    </aside>
  );
}

/** Precio actual de un servicio o de una categoría de bodas, leído del catálogo */
function Precio({ servicio, boda }: { servicio?: string; boda?: string }) {
  return <strong>{servicio ? blogPrices.service(servicio) : blogPrices.wedding(boda!)}</strong>;
}

function Anchor({ href = "", children, ...props }: ComponentProps<"a">) {
  const className =
    "text-agua-ink underline decoration-agua decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink";
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 id={slugify(children)} className="display-wide mb-6 mt-16 text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.05]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(children)} className="mb-3 mt-10 text-2xl font-semibold leading-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="my-5 text-lg leading-relaxed text-ink/85">{children}</p>,
  ul: ({ children }) => (
    <ul className="my-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-ink/85 marker:text-agua-deep">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-ink/85 marker:text-agua-ink">{children}</ol>
  ),
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  a: Anchor,
  blockquote: ({ children }) => (
    <blockquote className="display-wide my-10 border-l-2 border-ink pl-6 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-14 border-line" />,
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="label border-b border-ink py-3 pr-4 align-bottom text-mute">{children}</th>,
  td: ({ children }) => <td className="border-b border-line py-3 pr-4 align-top leading-snug">{children}</td>,
  Respuesta,
  Nota,
  Precio,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
