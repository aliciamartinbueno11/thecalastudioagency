"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cta, mainNav } from "@/data/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al navegar
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      <a
        href="#contenido"
        className="label fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-3 text-cream transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-line bg-cream/90 backdrop-blur-md"
            : "border-b border-transparent bg-cream",
        )}
      >
        <div className="container-cala flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label="Cala Studio, ir al inicio" className="relative z-10">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item, i) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="flex items-baseline gap-1.5 rounded-full px-4 py-2 text-[0.95rem] text-ink transition-colors hover:text-agua-ink aria-[current=page]:text-agua-ink"
                  >
                    <span className="label text-[0.625rem] text-mute group-hover/nav:text-agua-ink group-aria-[current=page]/nav:text-agua-ink">
                      0{i + 1}
                    </span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ButtonLink href={cta.primary.href}>{cta.primary.label}</ButtonLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-11 cursor-pointer items-center gap-3 rounded-full border border-ink/20 pl-4 pr-3 text-sm font-medium lg:hidden"
            >
              <span>{open ? "Cerrar" : "Menú"}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-300",
                    open && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px bg-ink transition-all duration-300",
                    open ? "w-5 -translate-y-1.5 -rotate-45" : "w-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  );
}
