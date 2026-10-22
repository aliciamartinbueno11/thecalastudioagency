import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/data/work";
import { cn } from "@/lib/cn";

type WorkCardProps = {
  item: WorkItem;
  aspect?: "landscape" | "portrait";
  sizes?: string;
  className?: string;
};

/** Tarjeta de un trabajo: imagen, título y una línea con qué es y de cuándo. */
export function WorkCard({ item, aspect = "landscape", sizes = "(min-width: 768px) 50vw, 100vw", className }: WorkCardProps) {
  const wedding = item.line === "Cala Weddings";
  return (
    <article className={cn("group/card", className)}>
      <Link href={item.href} className="block">
        <div
          data-reveal="image"
          className={cn(
            "relative overflow-hidden",
            aspect === "portrait" ? "aspect-[4/5]" : "aspect-[5/4]",
            wedding ? "bg-sand" : "bg-paper",
          )}
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover/card:scale-[1.03]"
          />
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-6">
          <h3
            className={cn(
              "text-[clamp(1.75rem,2.8vw,2.4rem)] leading-tight transition-colors",
              // Fuera de /bodas, la serif de bodas no está cargada: usamos la itálica de la marca
              wedding ? "accent group-hover/card:text-sea" : "display-wide group-hover/card:text-agua-deep",
            )}
          >
            {item.title}
          </h3>
          <span className="tabular shrink-0 text-[0.95rem] text-mute">{item.year}</span>
        </div>
        <p className="mt-2 text-[0.95rem] text-mute">
          {item.line}. {item.category}
        </p>
        <p className="mt-3 max-w-md leading-relaxed text-ink/80">{item.excerpt}</p>
      </Link>
    </article>
  );
}
