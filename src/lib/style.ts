import type { CSSProperties } from "react";

/** Variables CSS tipadas para retrasos de animación. */
export function vars(values: Record<`--${string}`, string | number>) {
  return values as CSSProperties;
}

export const revealDelay = (ms: number) => vars({ "--reveal-delay": ms });
