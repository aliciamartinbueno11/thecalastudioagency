import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Política de privacidad",
  description: "Cómo trata Cala Studio tus datos personales.",
  path: "/privacidad",
});

// Los textos marcados con <mark> son datos a completar antes de publicar.
export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" updated="octubre 2026">
      <h2>Quién es responsable de tus datos</h2>
      <ul>
        <li>Responsable: <mark>[Razón social]</mark></li>
        <li>NIF/CIF: <mark>[NIF]</mark></li>
        <li>Domicilio: <mark>[Dirección completa]</mark></li>
        <li>
          Contacto: <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
      </ul>

      <h2>Qué datos tratamos y para qué</h2>
      <p>
        Cuando nos escribes a través del formulario tratamos los datos que nos facilitas (nombre,
        empresa, email, teléfono si lo indicas y el contenido del mensaje) con una única finalidad:
        responder a tu consulta y, si lo pides, enviarte una propuesta.
      </p>

      <h2>Base legal</h2>
      <p>
        La base legal es tu consentimiento, que nos das al marcar la casilla del formulario (art.
        6.1.a del RGPD), y la aplicación de medidas precontractuales a petición tuya (art. 6.1.b).
      </p>

      <h2>Cuánto tiempo los conservamos</h2>
      <p>
        Conservamos los datos mientras dure la conversación y, después, durante el tiempo necesario
        para atender posibles responsabilidades legales. Si no llegamos a trabajar juntos, los
        eliminamos en un plazo máximo de <mark>[12 meses]</mark>.
      </p>

      <h2>Con quién los compartimos</h2>
      <p>
        No cedemos tus datos a terceros salvo obligación legal. Podemos utilizar proveedores que nos
        prestan servicios (alojamiento web, email) con quienes hemos firmado los contratos de
        encargo de tratamiento correspondientes.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes acceder, rectificar o suprimir tus datos, oponerte a su tratamiento, limitarlo o
        solicitar su portabilidad escribiendo a <a href={`mailto:${site.email}`}>{site.email}</a>.
        También puedes presentar una reclamación ante la Agencia Española de Protección de Datos
        (aepd.es).
      </p>
    </LegalPage>
  );
}
