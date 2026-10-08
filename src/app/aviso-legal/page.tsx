import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de Cala Studio.",
  path: "/aviso-legal",
});

// Los textos marcados con <mark> son datos a completar antes de publicar.
export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal" updated="octubre 2026">
      <h2>Datos identificativos</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio
        Electrónico (LSSI-CE), te informamos de los datos del titular de este sitio web:
      </p>
      <ul>
        <li>Titular: <mark>[Razón social]</mark></li>
        <li>NIF/CIF: <mark>[NIF]</mark></li>
        <li>Domicilio: <mark>[Dirección completa]</mark></li>
        <li>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>Datos registrales: <mark>[Registro Mercantil, si aplica]</mark></li>
      </ul>

      <h2>Objeto</h2>
      <p>
        Este sitio web tiene como finalidad informar sobre los servicios de marketing digital de{" "}
        {site.name} y facilitar el contacto con personas y empresas interesadas.
      </p>

      <h2>Condiciones de uso</h2>
      <p>
        El acceso a esta web es gratuito y supone la aceptación de estas condiciones. Te comprometes
        a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas o
        contrarias a la buena fe.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, diseños, logotipos, imágenes y código de esta web son propiedad de {site.name} o
        de terceros que han autorizado su uso. No está permitida su reproducción, distribución o
        transformación sin autorización expresa.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        Trabajamos para que la información sea correcta y esté actualizada, pero no podemos garantizar
        la ausencia de errores. {site.name} no se responsabiliza del uso que se haga de la información
        ni de los contenidos de sitios externos enlazados.
      </p>

      <h2>Legislación aplicable</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Para cualquier controversia, las
        partes se someten a los juzgados y tribunales de <mark>[ciudad]</mark>, salvo que la normativa
        disponga otra cosa.
      </p>
    </LegalPage>
  );
}
