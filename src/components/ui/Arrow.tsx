import { cn } from "@/lib/cn";

type ArrowProps = { className?: string; direction?: "right" | "up-right" | "down" };

export function Arrow({ className, direction = "right" }: ArrowProps) {
  const rotate = direction === "up-right" ? "-rotate-45" : direction === "down" ? "rotate-90" : "";
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4 shrink-0", rotate, className)}
    >
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
