import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Firma de la línea de bodas: CALA WEDDINGS · by Cala Studio */
export function WeddingsMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-baseline gap-3", tone === "dark" ? "text-umber" : "text-linen", className)}>
      <span className="serif-display text-[1.35rem] uppercase tracking-[0.22em]">Cala Weddings</span>
      <span className={cn("text-[0.8rem] italic", tone === "dark" ? "text-umber-soft" : "text-linen/70")} style={{ fontFamily: "var(--font-wedding-serif, var(--font-instrument-serif)), serif" }}>
        by Cala Studio
      </span>
    </span>
  );
}

/** Arco: el elemento gráfico de Cala Weddings (luz y arquitectura mediterránea, sin decoración). */
export function ArchFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative overflow-hidden rounded-t-[999px]", className)}>{children}</div>;
}
