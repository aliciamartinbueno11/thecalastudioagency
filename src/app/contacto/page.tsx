import { pageMetadata } from "@/lib/metadata";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = pageMetadata({
  title: "Contacto y presupuesto",
  description:
    "Pide presupuesto a Cala Studio, agencia de marketing digital en Nerja. Cuéntanos qué necesitas y te respondemos en menos de 48 h laborables.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <div className="[&>section]:bg-cream [&>section]:pt-12 lg:[&>section]:pt-20">
      <ContactSection as="h1" index={null} />
    </div>
  );
}
