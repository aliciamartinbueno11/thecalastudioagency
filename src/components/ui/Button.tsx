import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "./Arrow";

type Variant = "primary" | "secondary" | "link";
type Tone = "light" | "dark";

const base =
  "group/btn inline-flex items-center gap-3 whitespace-nowrap font-medium transition-colors duration-300 ease-out-soft";

const variants: Record<Variant, Record<Tone, string>> = {
  primary: {
    light:
      "h-12 rounded-full bg-agua pl-6 pr-2 text-[0.95rem] text-ink hover:bg-ink hover:text-cream",
    dark: "h-12 rounded-full bg-agua pl-6 pr-2 text-[0.95rem] text-ink hover:bg-cream",
  },
  secondary: {
    light:
      "h-12 rounded-full border border-ink/25 px-6 text-[0.95rem] text-ink hover:border-ink",
    dark: "h-12 rounded-full border border-cream/30 px-6 text-[0.95rem] text-cream hover:border-cream",
  },
  link: {
    light: "py-1 text-ink",
    dark: "py-1 text-cream",
  },
};

function ArrowBadge({ variant, tone }: { variant: Variant; tone: Tone }) {
  if (variant === "primary") {
    return (
      <span
        className={cn(
          "grid size-8 place-items-center rounded-full transition-colors duration-300",
          tone === "light"
            ? "bg-ink text-agua group-hover/btn:bg-agua group-hover/btn:text-ink"
            : "bg-ink text-agua",
        )}
      >
        <Arrow className="size-3.5 transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-0.5" />
      </span>
    );
  }
  return (
    <Arrow className="size-3.5 transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-1" />
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone = "light",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant][tone], className)} {...props}>
      {variant === "link" ? (
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-soft group-hover/btn:bg-[length:0%_1px] group-hover/btn:bg-right-bottom">
          {children}
        </span>
      ) : (
        <span>{children}</span>
      )}
      <ArrowBadge variant={variant} tone={tone} />
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ children, tone = "light", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        variants.primary[tone],
        "cursor-pointer disabled:cursor-wait disabled:opacity-70",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowBadge variant="primary" tone={tone} />
    </button>
  );
}
