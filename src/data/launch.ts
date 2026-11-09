/**
 * Oferta de lanzamiento: 90 % de descuento a cambio de poder enseñar el trabajo
 * y de una mención en redes. Las plazas van por separado: bodas y marketing.
 *
 * Al confirmar un proyecto, sube `taken` en 1 en su grupo y vuelve a publicar
 * la web (y a generar los PDF con `npm run catalogo`). Cuando `taken` llega a
 * `spots`, la oferta de ese grupo desaparece sola.
 */
export const launch = {
  discount: 0.9,
  /** En servicios mensuales, cuántos meses dura el descuento */
  monthlyMonths: 3,
  studio: {
    spots: 5,
    taken: 0,
    conditions: [
      "Cinco proyectos de marketing, por orden de confirmación.",
      "90 % de descuento sobre el precio de catálogo del diseño y la gestión.",
      "En servicios mensuales, el descuento se aplica a los tres primeros meses.",
      "La impresión, la producción y la inversión en anuncios van aparte, a su precio normal.",
      "A cambio, podemos enseñar el trabajo en nuestra web y redes y nos mencionas en las tuyas (@calastudio.agency) cuando lo publiques.",
    ],
  },
  weddings: {
    spots: 5,
    taken: 0,
    conditions: [
      "Cinco bodas, por orden de confirmación.",
      "90 % de descuento sobre el precio de catálogo del diseño.",
      "La impresión y la producción van aparte, a su precio normal.",
      "A cambio, podemos enseñar el diseño en nuestra web y redes (sin nombres, fechas ni datos de invitados) y nos mencionáis (@calastudio.agency) cuando lo publiquéis.",
    ],
  },
} as const;

export type LaunchKind = "studio" | "weddings";

export const launchLeft = (kind: LaunchKind) => Math.max(0, launch[kind].spots - launch[kind].taken);
export const launchOpen = (kind: LaunchKind) => launchLeft(kind) > 0;

/** Precio con el descuento de lanzamiento, redondeado al euro */
export const launchPrice = (price: number) => Math.round(price * (1 - launch.discount));

/** PDF descargable de cada catálogo */
export const catalogPdf = {
  studio: "/catalogo-cala-studio.pdf",
  weddings: "/catalogo-cala-weddings.pdf",
} as const;
