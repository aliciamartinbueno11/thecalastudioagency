import { Cards, Invitation, Menu, Packaging, PieceTile, Seating, WebPhone, WelcomeSign } from "./ConceptPieces";

export function WeddingsIdentity() {
  return (
    <section aria-labelledby="identidad-title" className="bg-linen py-24 lg:py-36">
      <div className="container-cala">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="label-wide text-umber-soft lg:col-span-3">Una boda, una identidad</p>
          <div className="lg:col-span-9">
            <h2 id="identidad-title" data-reveal className="serif-display text-[clamp(2.6rem,7vw,6rem)] text-umber">
              Todo encaja cuando todo cuenta <em className="text-sea">la misma historia.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-umber/80">
              Una misma idea, mil formas de hacerla vuestra. Creamos una identidad que conecta cada
              detalle, desde el primer mensaje hasta el gran día. Podéis empezar por una invitación o
              confiarnos el universo completo.
            </p>
          </div>
        </div>

        <div
          data-reveal
          role="img"
          aria-label="Diseño conceptual de una identidad de boda aplicada a siete piezas: invitación, web, señalética, menú, seating plan, tarjetas y packaging, todas con el mismo monograma y la misma paleta."
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-24 lg:grid-cols-12 lg:grid-rows-[minmax(30rem,auto)_minmax(19rem,auto)]"
        >
          <PieceTile label="Invitación" className="lg:col-span-4" tone="linen">
            <Invitation />
          </PieceTile>
          <PieceTile label="Web de boda" className="lg:col-span-3" tone="dark">
            <WebPhone />
          </PieceTile>
          <PieceTile label="Señalética" className="col-span-2 lg:col-span-5">
            <WelcomeSign />
          </PieceTile>
          <PieceTile label="Menú" className="lg:col-span-2" tone="linen">
            <Menu />
          </PieceTile>
          <PieceTile label="Seating plan" className="order-last col-span-2 lg:order-none lg:col-span-5">
            <Seating />
          </PieceTile>
          <PieceTile label="Tarjetas" className="lg:col-span-3" tone="linen">
            <Cards />
          </PieceTile>
          <PieceTile label="Packaging" className="col-span-2 lg:col-span-2">
            <Packaging />
          </PieceTile>
        </div>
        <p className="label-wide mt-6 text-umber-soft">Diseño conceptual · Clara & Teo es una pareja ficticia</p>
      </div>
    </section>
  );
}
