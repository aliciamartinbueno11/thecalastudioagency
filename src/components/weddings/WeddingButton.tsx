import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "@/components/ui/Arrow";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
};

/** Botón de Cala Weddings: más sobrio que el de Cala Studio (tinta cálida sobre lino). */
export function WeddingButton({ href, children, variant = "solid", className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group/wb inline-flex h-12 items-center gap-3 whitespace-nowrap rounded-full px-6 text-[0.95rem] font-medium transition-colors duration-300",
        variant === "solid"
          ? "bg-umber text-linen hover:bg-sea"
          : "border border-umber/25 text-umber hover:border-umber",
        className,
      )}
    >
      {children}
      <Arrow className="size-3.5 transition-transform duration-300 group-hover/wb:translate-x-1" />
    </Link>
  );
}
