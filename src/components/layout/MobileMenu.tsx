"use client";

import { useEffect, useRef } from "react";
import { cta, mainNav, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { NavLink } from "./NavLink";

type MobileMenuProps = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel) return;
      // Mantiene el foco dentro del menú (y del botón de cerrar del header)
      const toggle = document.querySelector<HTMLElement>('[aria-controls="menu-movil"]');
      const focusables = [
        ...(toggle ? [toggle] : []),
        ...panel.querySelectorAll<HTMLElement>("a[href], button"),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="menu-movil"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      inert={!open}
      className={cn(
        "fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-cream transition-[opacity,visibility] duration-500 ease-out-soft lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <nav aria-label="Menú móvil" className="container-cala flex-1 pt-6">
        <ul className="border-t border-line">
          {mainNav.map((item, i) => (
            <li
              key={item.href}
              className={cn(
                "border-b border-line transition-[opacity,transform] duration-700 ease-out-soft",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <NavLink
                href={item.href}
                onClick={onClose}
                className="flex items-baseline justify-between py-4"
              >
                <span className="display text-[clamp(2.4rem,12vw,4rem)] transition-colors group-aria-[current=page]/nav:text-agua-deep">
                  {item.label}
                </span>
                <span className="label text-mute">0{i + 1}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="container-cala flex flex-col gap-8 pb-10 pt-10">
        <ButtonLink href={cta.primary.href} onClick={onClose} className="self-start">
          {cta.primary.label}
        </ButtonLink>
        <div className="flex items-end justify-between gap-4 text-sm text-mute">
          <a href={`mailto:${site.email}`} className="text-ink underline-offset-4 hover:underline">
            {site.email}
          </a>
          <span className="label">
            {site.coordinates.lat} · {site.coordinates.lng}
          </span>
        </div>
      </div>
    </div>
  );
}
