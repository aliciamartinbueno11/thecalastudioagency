import type { Metadata } from "next";
import { site } from "@/data/site";
import { businessId } from "@/lib/schema";
import { weddingBrand, weddingCatalog, weddingFaq } from "@/data/weddings";
import { weddingSerif } from "@/lib/fonts-weddings";
import { WeddingsHero } from "@/components/weddings/WeddingsHero";
import { WeddingsPhilosophy } from "@/components/weddings/WeddingsPhilosophy";
import { WeddingsCatalog } from "@/components/weddings/WeddingsCatalog";
import { WeddingsPackages } from "@/components/weddings/WeddingsPackages";
import { WeddingsProjects } from "@/components/weddings/WeddingsProjects";
import { WeddingsIdentity } from "@/components/weddings/WeddingsIdentity";
import { WeddingsInspiration } from "@/components/weddings/WeddingsInspiration";
import { WeddingsProcess } from "@/components/weddings/WeddingsProcess";
import { WeddingsFaq } from "@/components/weddings/WeddingsFaq";
import { WeddingsContact } from "@/components/weddings/WeddingsContact";

export const metadata: Metadata = {
  title: { absolute: "Cala Weddings · Invitaciones, papelería y webs de boda en Nerja y Málaga" },
  description: weddingBrand.metaDescription,
  keywords: [
    "diseño de invitaciones de boda personalizadas",
    "diseño gráfico para bodas",
    "webs para bodas",
    "páginas web para bodas",
    "papelería personalizada para bodas",
    "identidad visual para bodas",
    "diseño integral de bodas",
    "diseño de bodas en Málaga",
    "invitaciones de boda Nerja",
    "papelería de boda Axarquía",
  ],
  alternates: { canonical: weddingBrand.path },
  openGraph: {
    title: "Cala Weddings · by Cala Studio",
    description: weddingBrand.description,
    url: weddingBrand.path,
  },
  twitter: { title: "Cala Weddings · by Cala Studio", description: weddingBrand.description },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cala Weddings — diseño integral para bodas",
    serviceType: "Diseño gráfico y digital para bodas",
    description: weddingBrand.description,
    url: `${site.url}${weddingBrand.path}`,
    provider: { "@id": businessId },
    areaServed: [
      { "@type": "City", name: "Nerja" },
      { "@type": "AdministrativeArea", name: "Axarquía" },
      { "@type": "AdministrativeArea", name: "Málaga" },
      { "@type": "AdministrativeArea", name: "Costa del Sol" },
      { "@type": "Country", name: "España" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de diseño para bodas",
      itemListElement: weddingCatalog.map((c) => ({
        "@type": "OfferCatalog",
        name: c.title,
        itemListElement: c.items.map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: i } })),
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: weddingFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: "Bodas", item: `${site.url}${weddingBrand.path}` },
    ],
  },
];

export default function BodasPage() {
  return (
    <div className={`${weddingSerif.variable} bg-linen`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WeddingsHero />
      <WeddingsPhilosophy />
      <WeddingsProjects />
      <WeddingsCatalog />
      <WeddingsPackages />
      <WeddingsIdentity />
      <WeddingsInspiration />
      <WeddingsProcess />
      <WeddingsFaq />
      <WeddingsContact />
    </div>
  );
}
