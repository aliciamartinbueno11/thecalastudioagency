import { services } from "@/data/services";
import { site } from "@/data/site";

/** Datos estructurados del negocio (schema.org), compartidos por todas las páginas. */
export const businessId = `${site.url}/#negocio`;

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": businessId,
  name: site.name,
  description: site.description,
  slogan: site.tagline,
  url: site.url,
  email: site.email,
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/apple-icon.png`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", ...site.geo },
  areaServed: site.areas.map((name) => ({ "@type": "Place", name })),
  knowsAbout: services.map((s) => s.name),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de marketing digital",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      url: `${site.url}/servicios#${s.slug}`,
      itemOffered: { "@type": "Service", name: s.name, description: s.short },
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: s.price.from,
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
      },
    })),
  },
  sameAs: [site.social.instagram, site.social.linkedin],
};

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Etiqueta <script> de datos estructurados. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
