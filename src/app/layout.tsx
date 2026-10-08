import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { bricolage, instrumentSans, instrumentSerif } from "@/lib/fonts";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RevealObserver } from "@/components/layout/RevealObserver";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f2",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: "ES",
  sameAs: [site.social.instagram, site.social.linkedin],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${bricolage.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* Activa las animaciones de aparición solo si hay JavaScript */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
