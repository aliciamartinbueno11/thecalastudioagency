/**
 * Oferta de lanzamiento: los 10 primeros proyectos con un 90 % de descuento
 * a cambio de poder enseñar el trabajo y de una mención en redes.
 *
 * Al confirmar un proyecto, sube `taken` en 1 y vuelve a publicar la web
 * (y a generar el PDF con `npm run catalogo`). Con `taken` igual a `spots`
 * la oferta desaparece sola de la web.
 */
export const launch = {
  spots: 10,
  taken: 0,
  discount: 0.9,
  /** En servicios mensuales, cuántos meses dura el descuento */
  monthlyMonths: 3,
  conditions: [
    "Diez proyectos en total, entre bodas y marketing, por orden de confirmación.",
    "90 % de descuento sobre el precio de catálogo del diseño y la gestión.",
    "En servicios mensuales, el descuento se aplica a los tres primeros meses.",
    "La impresión, la producción y la inversión en anuncios van aparte, a su precio normal.",
    "A cambio, podemos enseñar el trabajo en nuestra web y redes (en bodas, sin nombres, fechas ni datos de invitados) y nos mencionáis en vuestras redes (@calastudio.agency) cuando lo publiquéis.",
  ],
} as const;

export const launchLeft = Math.max(0, launch.spots - launch.taken);
export const launchOpen = launchLeft > 0;

/** Precio con el descuento de lanzamiento, redondeado al euro */
export const launchPrice = (price: number) => Math.round(price * (1 - launch.discount));

/** Ruta del PDF descargable */
export const catalogPdf = "/catalogo-cala-studio.pdf";
