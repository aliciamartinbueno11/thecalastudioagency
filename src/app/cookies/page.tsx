import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Política de cookies",
  description: "Qué cookies utiliza la web de Cala Studio.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" updated="octubre 2026">
      <h2>Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos que una web guarda en tu navegador para recordar
        información sobre tu visita.
      </p>

      <h2>Qué cookies usa esta web</h2>
      <p>
        Ahora mismo esta web no utiliza cookies de análisis, publicidad ni de terceros. Solo podría
        utilizar cookies técnicas imprescindibles para su funcionamiento, que no requieren
        consentimiento.
      </p>
      <p>
        Si en el futuro añadimos herramientas de analítica o publicidad, actualizaremos esta página
        y te pediremos permiso antes de activarlas.
      </p>

      <h2>Cómo desactivarlas</h2>
      <p>
        Puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta
        que bloquear las cookies técnicas puede afectar al funcionamiento de la web.
      </p>
    </LegalPage>
  );
}
