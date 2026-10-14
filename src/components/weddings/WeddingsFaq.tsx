import { weddingFaq } from "@/data/weddings";

export function WeddingsFaq() {
  return (
    <section aria-labelledby="faq-bodas" className="bg-linen py-24 lg:py-32">
      <div className="container-cala grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="label-wide text-umber-soft">Preguntas frecuentes</p>
          <h2 id="faq-bodas" className="serif-display mt-6 text-[clamp(2.4rem,5vw,4rem)] text-umber">
            Lo que suele <em className="text-sea">preguntarse.</em>
          </h2>
        </div>
        <div className="border-t border-line-warm lg:col-span-7 lg:col-start-6">
          {weddingFaq.map((item) => (
            <details key={item.q} className="group/faq border-b border-line-warm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-umber [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-lg font-medium">{item.q}</h3>
                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-umber/20 text-umber transition-transform duration-300 group-open/faq:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-xl pb-6 leading-relaxed text-umber/80">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
