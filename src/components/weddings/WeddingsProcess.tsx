import { weddingProcess } from "@/data/weddings";
import { revealDelay } from "@/lib/style";

export function WeddingsProcess() {
  return (
    <section aria-labelledby="como-trabajamos-bodas" className="bg-umber py-24 text-linen lg:py-36">
      <div className="container-cala">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label-wide text-linen/60 lg:col-span-3">Cómo trabajamos</p>
          <h2 id="como-trabajamos-bodas" data-reveal className="serif-display text-[clamp(2.6rem,7vw,6rem)] lg:col-span-9">
            Cuatro pasos, <em className="text-agua">sin complicaciones.</em>
          </h2>
        </div>
        <ol className="mt-16 grid gap-px bg-linen/15 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {weddingProcess.map((step, i) => (
            <li key={step.number} data-reveal style={revealDelay(i * 120)} className="bg-umber py-8 sm:p-8 lg:first:pl-0">
              <span className="serif-display text-[3.5rem] text-linen/30">{step.number}</span>
              <h3 className="serif-display mt-6 text-[1.9rem] leading-tight">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-linen/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
