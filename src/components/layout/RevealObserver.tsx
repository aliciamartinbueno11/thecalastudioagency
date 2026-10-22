"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Elementos que se revelan con clip-path (ver globals.css: «Horizonte» y «Marea») */
const CLIPPED = ':is(h1, h2, h3)[data-reveal], :is(h1, h2) > [data-reveal], [data-reveal="image"]';

/**
 * Un único IntersectionObserver para toda la web.
 * Añade `.is-visible` a los elementos con [data-reveal] cuando entran en pantalla.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // Titulares e imágenes empiezan recortados (clip-path) y el observador no los vería nunca:
    // para ellos vigilamos el contenedor, que no está recortado.
    const targets = new Map<Element, HTMLElement[]>();
    for (const el of elements) {
      const target = (el.matches(CLIPPED) && el.parentElement) || el;
      targets.set(target, [...(targets.get(target) ?? []), el]);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Un 12 % del elemento, o un buen tramo de pantalla si el contenedor es muy alto
          const enough =
            entry.intersectionRatio >= 0.12 || entry.intersectionRect.height >= window.innerHeight * 0.2;
          if (entry.isIntersecting && enough) {
            targets.get(entry.target)?.forEach((el) => el.classList.add("is-visible"));
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.05, 0.12, 0.25, 0.5] },
    );
    targets.forEach((_, target) => observer.observe(target));

    // Si se salta de golpe (ancla, «volver arriba», scroll muy rápido), lo que queda por encima
    // de la pantalla no llega a cruzarla nunca: lo mostramos directamente.
    let frame = 0;
    const revealPassed = () => {
      frame = 0;
      targets.forEach((els, target) => {
        // Se mira cada elemento, no el contenedor: un contenedor alto puede seguir asomando
        els.forEach((el) => {
          if (el.getBoundingClientRect().bottom < 0) el.classList.add("is-visible");
        });
        if (els.every((el) => el.classList.contains("is-visible"))) {
          observer.unobserve(target);
          targets.delete(target);
        }
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(revealPassed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
