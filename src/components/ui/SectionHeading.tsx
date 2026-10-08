import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/style";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

/**
 * Cabecera de sección: índice + etiqueta sobre una línea fina,
 * titular grande y entradilla opcional.
 */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  tone = "light",
  as: Tag = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <header className={cn("grid gap-y-8 lg:grid-cols-12 lg:gap-x-8", className)}>
      <div className="relative lg:col-span-12">
        <span
          aria-hidden="true"
          data-reveal="line"
          className={cn("block h-px w-full", dark ? "bg-line-dark" : "bg-line")}
        />
        <p
          className={cn(
            "label mt-4 flex items-center gap-3",
            dark ? "text-mute-dark" : "text-mute",
          )}
        >
          <span className={dark ? "text-agua" : "text-agua-ink"}>({index})</span>
          <span>{label}</span>
        </p>
      </div>
      <Tag
        id={id}
        data-reveal
        className={cn(
          "display text-[clamp(2.6rem,7vw,6.25rem)] lg:col-span-8",
          dark ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {intro ? (
        <div
          data-reveal
          style={revealDelay(120)}
          className={cn(
            "max-w-md text-lg leading-relaxed lg:col-span-4 lg:self-end lg:justify-self-end",
            dark ? "text-mute-dark" : "text-mute",
          )}
        >
          {intro}
        </div>
      ) : null}
    </header>
  );
}
