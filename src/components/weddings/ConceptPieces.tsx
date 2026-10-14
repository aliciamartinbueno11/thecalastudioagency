/**
 * Piezas de una identidad de boda conceptual ("Clara & Teo", pareja ficticia),
 * dibujadas en HTML/CSS para mostrar cómo un mismo lenguaje se aplica a todo.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const serif = "serif-display text-umber";

export function Monogram({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-grid place-items-center", className)} aria-hidden="true">
      <svg viewBox="0 0 100 120" className="absolute inset-0 h-full w-full">
        <path d="M6 118V50a44 44 0 0 1 88 0v68" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="serif-display pt-[18%] text-[1em] leading-none">
        C<em className="px-[0.06em] text-[0.6em] text-sea">&</em>T
      </span>
    </span>
  );
}

const paper = "bg-[#fdfbf7] shadow-[0_1px_0_rgba(36,32,27,0.04),0_18px_36px_-18px_rgba(36,32,27,0.35)]";

export function Invitation() {
  return (
    <div className={cn(paper, "flex aspect-[5/7] w-[min(100%,15rem)] flex-col items-center px-[9%] py-[10%] text-center text-umber")}>
      <Monogram className="h-16 w-14 text-[1.6rem] text-umber" />
      <p className="label-wide mt-5 text-[0.55rem] text-umber-soft">Os invitamos a celebrar nuestra boda</p>
      <p className={cn(serif, "mt-4 text-[1.9rem]")}>
        Clara <em className="text-sea">&</em> Teo
      </p>
      <span className="my-4 h-px w-8 bg-umber/30" />
      <p className="text-[0.7rem] leading-relaxed text-umber/80">
        Sábado, 12 de junio de 2027
        <br />
        Costa del Sol
      </p>
      <p className="label-wide mt-auto text-[0.5rem] text-umber-soft">Confirmad antes del 1 de mayo</p>
    </div>
  );
}

export function WebPhone() {
  return (
    <div className="w-[min(100%,10.5rem)] rounded-[1.8rem] bg-umber p-[6px] shadow-[0_24px_40px_-20px_rgba(36,32,27,0.55)]">
      <div className="flex aspect-[9/19] flex-col overflow-hidden rounded-[1.45rem] bg-[#fdfbf7] px-3 pb-3 pt-4 text-center text-umber">
        <div className="flex items-center justify-between text-[0.45rem] text-umber-soft">
          <span className="serif-display text-[0.7rem] text-umber">C&T</span>
          <span>Programa · RSVP</span>
        </div>
        <div className="mx-auto mt-3 aspect-[3/4] w-[78%] rounded-t-full bg-[linear-gradient(160deg,#efe7da,#d6cbb9)]" />
        <p className={cn(serif, "mt-3 text-[1.15rem]")}>
          Clara <em className="text-sea">&</em> Teo
        </p>
        <p className="mt-1 text-[0.5rem] text-umber-soft">12 · 06 · 2027</p>
        <div className="mt-2 flex justify-center gap-2 text-umber">
          {[["248", "días"], ["10", "h"], ["32", "min"]].map(([n, l]) => (
            <span key={l} className="flex flex-col">
              <span className="serif-display text-[0.9rem]">{n}</span>
              <span className="text-[0.4rem] uppercase tracking-widest text-umber-soft">{l}</span>
            </span>
          ))}
        </div>
        <span className="mt-auto rounded-full bg-sea py-1.5 text-[0.5rem] font-medium text-linen">Confirmar asistencia</span>
      </div>
    </div>
  );
}

export function Menu() {
  return (
    <div className={cn(paper, "flex aspect-[1/2] w-[min(100%,7.5rem)] flex-col items-center px-3 py-5 text-center text-umber")}>
      <Monogram className="h-8 w-7 text-[0.8rem]" />
      <p className={cn(serif, "mt-3 text-[1.05rem]")}>Menú</p>
      <span className="my-2 h-px w-5 bg-umber/30" />
      {["Entrantes", "Del mar", "De la tierra", "Postre"].map((c) => (
        <div key={c} className="mt-2 w-full">
          <p className="label-wide text-[0.38rem] text-sea">{c}</p>
          <span className="mx-auto mt-1 block h-[2px] w-[80%] bg-umber/15" />
          <span className="mx-auto mt-1 block h-[2px] w-[60%] bg-umber/15" />
        </div>
      ))}
    </div>
  );
}

export function Seating() {
  return (
    <div className={cn(paper, "w-[min(100%,20rem)] px-5 py-5 text-umber")}>
      <div className="flex items-baseline justify-between">
        <p className={cn(serif, "text-[1.15rem]")}>
          Encontrad <em className="text-sea">vuestra mesa</em>
        </p>
        <Monogram className="h-7 w-6 text-[0.7rem]" />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {["Mar", "Arena", "Olivo", "Faro", "Brisa", "Cala", "Sal", "Luna"].map((t) => (
          <div key={t} className="border-t border-umber/25 pt-1.5">
            <p className="serif-display text-[0.75rem]">{t}</p>
            {[0, 1, 2].map((k) => (
              <span key={k} className="mt-1 block h-[2px] w-[85%] bg-umber/15" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function WelcomeSign() {
  return (
    <div className="flex aspect-[3/4] w-[min(100%,12.5rem)] flex-col items-center justify-center rounded-t-full border-[6px] border-[#fdfbf7] bg-[#f6f1e8] px-6 text-center text-umber shadow-[0_24px_40px_-22px_rgba(36,32,27,0.5)]">
      <p className="label-wide text-[0.5rem] text-umber-soft">Bienvenidos a la boda de</p>
      <p className={cn(serif, "mt-3 text-[2rem]")}>
        Clara <em className="text-sea">&</em> Teo
      </p>
      <span className="my-3 h-px w-8 bg-umber/30" />
      <p className="text-[0.6rem] text-umber/80">12 · 06 · 2027</p>
    </div>
  );
}

export function Cards() {
  return (
    <div className="relative h-28 w-36">
      <div className={cn(paper, "absolute left-0 top-2 flex h-20 w-28 -rotate-6 items-center justify-center")}>
        <p className={cn(serif, "text-[1.1rem]")}>
          <em>Gracias</em>
        </p>
      </div>
      <div className={cn(paper, "absolute bottom-0 right-0 flex h-14 w-24 rotate-3 flex-col items-center justify-center")}>
        <p className="label-wide text-[0.4rem] text-sea">Mesa</p>
        <p className={cn(serif, "text-[1.05rem]")}>Faro</p>
      </div>
    </div>
  );
}

export function Packaging() {
  return (
    <div className="relative h-28 w-28">
      <div className="absolute inset-x-2 bottom-0 top-6 rounded-[3px] bg-[#e7dccb] shadow-[0_18px_30px_-16px_rgba(36,32,27,0.5)]" />
      <div className="absolute inset-x-0 top-3 h-6 rounded-[3px] bg-[#efe6d8] shadow-[0_2px_0_rgba(36,32,27,0.06)]" />
      <div className="absolute left-1/2 top-[52%] grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#fdfbf7] text-umber">
        <span className="serif-display text-[0.95rem]">
          C<em className="text-[0.7em] text-sea">&</em>T
        </span>
      </div>
    </div>
  );
}

/** Tarjeta con fondo y luz cálida para cada pieza */
export function PieceTile({ label, children, className, tone = "stone" }: { label: string; children: ReactNode; className?: string; tone?: "stone" | "linen" | "dark" }) {
  const bg = {
    stone: "bg-[radial-gradient(120%_90%_at_20%_0%,#efe7da_0%,#d9cebd_100%)]",
    linen: "bg-[radial-gradient(120%_90%_at_80%_0%,#fbf8f2_0%,#e9e0d1_100%)]",
    dark: "bg-[radial-gradient(120%_90%_at_30%_0%,#3a342c_0%,#24201b_100%)]",
  }[tone];
  return (
    <figure className={cn("flex flex-col", className)}>
      <div className={cn("flex flex-1 items-center justify-center overflow-hidden p-6 sm:p-8", bg)}>{children}</div>
      <figcaption className="label-wide mt-3 text-umber-soft">{label}</figcaption>
    </figure>
  );
}
