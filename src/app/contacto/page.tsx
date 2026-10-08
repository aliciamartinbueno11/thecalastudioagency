import { pageMetadata } from "@/lib/metadata";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = pageMetadata({
  title: "Contacto",
  description:
    "Cuéntanos qué estás montando, qué quieres mejorar o qué no termina de funcionar. Te respondemos en menos de 48 h laborables.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <div className="[&>section]:bg-cream [&>section]:pt-12 lg:[&>section]:pt-20">
      <ContactSection as="h1" index={null} />
    </div>
  );
}
