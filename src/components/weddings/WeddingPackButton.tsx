"use client";

import { cn } from "@/lib/cn";
import { Arrow } from "@/components/ui/Arrow";

/** Evento con el que un paquete rellena el formulario de boda de la misma página. */
export const WEDDING_PACKAGE_EVENT = "cala:paquete-boda";

/** Lleva al formulario y deja indicado el paquete elegido. */
export function WeddingPackButton({ name, solid }: { name: string; solid?: boolean }) {
  return (
    <a
      href="#contacto-boda"
      onClick={() => window.dispatchEvent(new CustomEvent(WEDDING_PACKAGE_EVENT, { detail: name }))}
      className={cn(
        "group/wb inline-flex h-12 items-center gap-3 self-start whitespace-nowrap rounded-full px-6 text-[0.95rem] font-medium transition-colors duration-300",
        solid ? "bg-linen text-umber hover:bg-agua" : "border border-umber/25 text-umber hover:border-umber",
      )}
    >
      Pedir este paquete
      <Arrow className="size-3.5 transition-transform duration-300 group-hover/wb:translate-x-1" />
    </a>
  );
}
