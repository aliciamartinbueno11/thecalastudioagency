import { cn } from "@/lib/cn";

/** Símbolo: un marco con un cuarto de círculo. Una cala vista desde arriba. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6", className)}>
      <rect x="0.75" y="0.75" width="22.5" height="22.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0.75 9.5A13.75 13.75 0 0 1 14.5 23.25H0.75Z" fill="var(--color-agua)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className="font-display text-[1.05rem] font-bold uppercase leading-none tracking-[0.02em]"
        style={{ fontVariationSettings: '"wdth" 80, "opsz" 24' }}
      >
        Cala <span className="font-medium">Studio</span>
      </span>
    </span>
  );
}
