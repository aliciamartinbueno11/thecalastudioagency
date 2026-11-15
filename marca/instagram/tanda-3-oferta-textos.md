# Instagram, tanda 3: oferta de lanzamiento (borrador para aprobar)

Todo sale de `src/data/launch.ts`, `src/data/services.ts` y `src/data/weddings.ts`.
Nada de clientes, cifras ni resultados inventados. Precios validados por Cala Studio el 13 de noviembre de 2026.

Formato: 1080×1440 en publicaciones y 1080×1920 en historias, con la identidad del kit actual.

## Cómo se gestiona la oferta

- **Palabra clave:** quien quiera plaza escribe **PLAZA** por mensaje privado (marketing) o **BODA** (bodas). Se responde a mano o con la respuesta automática de Instagram.
- **Contador real:** cada vez que se confirma un proyecto, se sube `taken` en `src/data/launch.ts`, se regenera el catálogo (`npm run catalogo`), se vuelve a publicar la web y se actualiza la historia «Quedan X de 5».
- **Destacada «Oferta»:** guarda las historias del contador para que estén siempre a mano.
- **Fin:** cuando se llenen las plazas, una última historia «Plazas completas, gracias» y se retira la destacada.

---

## Publicación fijada · Carrusel «5 proyectos al 90 %» (marketing, 7 láminas)

1. **PORTADA:** 5 proyectos al 90 %. / Oferta de lanzamiento de Cala Studio.
2. **Por qué:** Estamos empezando y queremos llenar el portfolio con trabajos reales. Por eso los cinco primeros pagan el 10 %.
3. **Qué entra:** Estrategia, redes sociales, publicidad digital, web y landing pages, branding y automatización.
4. **Ejemplos:** Landing page 750 € → 75 €. Identidad visual 900 € → 90 €. Gestión de redes 350 €/mes → 35 €/mes (tres primeros meses).
5. **A cambio:** Podemos enseñar el trabajo en la web y en redes, y nos mencionas cuando lo publiques.
6. **Condiciones:** Por orden de confirmación. Impresión, producción e inversión en anuncios, aparte.
7. **CIERRE:** Escríbenos PLAZA por mensaje privado. Quedan 5 de 5.

**Texto de la publicación:**

```
Cinco negocios van a tener su marketing al 10 % del precio. Así de simple.

Estamos empezando y preferimos enseñar trabajos reales a contar promesas. Por eso, los cinco primeros proyectos tienen un 90 % de descuento sobre el precio de catálogo: estrategia, redes, anuncios, web, branding o automatización.

A cambio te pedimos dos cosas: poder enseñar el resultado y que nos menciones cuando lo publiques.

Si te interesa, escríbenos PLAZA por mensaje privado y te contamos cómo encaja con tu negocio.

#marketingdigital #pymes #emprendedores #calastudio
```

**Texto alternativo:** Portada con «5 proyectos al 90 %» en grande sobre fondo crema y el símbolo de Cala Studio.

---

## Carrusel «Cala Weddings: 5 bodas al 90 %» (6 láminas)

1. **PORTADA:** 5 bodas al 90 %. / Cala Weddings, oferta de lanzamiento.
2. **Qué diseñamos:** Identidad de la boda, invitaciones, papelería, web con RSVP y todo lo que se ve el gran día.
3. **Ejemplos:** Paquete Integral 790 € → 79 €. Papelería completa 540 € → 54 €. Web de boda con RSVP 350 € → 35 €.
4. **A cambio:** Podemos enseñar el diseño, sin nombres, fechas ni datos de invitados, y nos mencionáis cuando lo publiquéis.
5. **Para quién:** Parejas y wedding planners, estéis donde estéis, en español, inglés y otros idiomas.
6. **CIERRE:** Escribidnos BODA por mensaje privado. Quedan 5 de 5.

**Texto de la publicación:**

```
Vuestra boda también tiene identidad. Y las cinco primeras parejas la tienen al 10 % del precio.

Diseñamos invitaciones, papelería, webs de boda con RSVP y todo lo que se ve el gran día, con un mismo trazo. Como estamos empezando Cala Weddings, las cinco primeras bodas tienen un 90 % de descuento en el diseño.

A cambio, os pedimos poder enseñar el resultado, sin nombres ni datos, y una mención cuando lo publiquéis.

¿Ya tenéis fecha? Escribidnos BODA por mensaje privado.

#invitacionesdeboda #webdeboda #papeleriadeboda #calaweddings
```

**Texto alternativo:** Portada con «5 bodas al 90 %» en tipografía de serif sobre fondo lino.

---

## Reel · «Por qué regalamos el 90 %» (20-25 s)

- **Texto en pantalla 1 (0-3 s):** ¿Por qué una agencia cobra solo el 10 %?
- **2 (3-9 s):** Porque estamos empezando y queremos enseñarte trabajos reales, no promesas.
- **3 (9-15 s):** Cinco proyectos de marketing y cinco bodas al 90 %.
- **4 (15-20 s):** A cambio: poder enseñarlo y una mención.
- **5 (20-25 s):** Escribe PLAZA o BODA por privado.

**Texto de la publicación:**

```
Te contamos la letra pequeña: no hay. Cinco proyectos de marketing y cinco bodas al 90 % mientras llenamos el portfolio.

Escribe PLAZA (marketing) o BODA (bodas) por mensaje privado.

#marketingdigital #calastudio #calaweddings
```

---

## Historias · Secuencia de lanzamiento (5 fotogramas, día de publicación)

1. **Rótulo:** Tenemos algo para los cinco primeros.
2. **Rótulo:** 90 % de descuento en tu proyecto de marketing o en el diseño de tu boda.
3. **Encuesta:** ¿Qué te interesa más? · Marketing · Boda
4. **Pegatina de enlace** a thecalastudio.com con el rótulo: Mira qué entra y las condiciones.
5. **Pegatina de pregunta:** Escribe PLAZA o BODA y te contamos.

## Historias · Contador (cada vez que se confirme una plaza)

- **Rótulo:** Quedan 4 de 5 plazas de marketing (o de bodas).
- **Texto pequeño:** Gracias a quien ya ha reservado. Escribe PLAZA o BODA.
- Guardar en la destacada «Oferta».

## Respuestas preparadas por mensaje privado

**A quien escribe PLAZA:**

```
¡Hola! Gracias por escribirnos. Te dejamos el catálogo con las condiciones: https://thecalastudio.com/catalogo-cala-studio.pdf

Cuéntanos en dos líneas qué tipo de negocio tienes y qué te gustaría mejorar (redes, anuncios, web, marca…) y te decimos qué encaja mejor y cuánto costaría con el descuento.
```

**A quien escribe BODA:**

```
¡Hola! Gracias por escribirnos. Aquí tenéis el catálogo de Cala Weddings con las condiciones: https://thecalastudio.com/catalogo-cala-weddings.pdf

Contadnos la fecha, el lugar y qué piezas os interesan (invitaciones, web, papelería…) y os preparamos un presupuesto cerrado con el descuento.
```
