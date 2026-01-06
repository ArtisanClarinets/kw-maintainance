
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/../content/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["hospitality maintenance", "hotel operations", "resort maintenance", "facility management", "PMS integration", "preventative maintenance", "hospitality ecosystem"],
  authors: [{ name: "KW Enterprise Operations" }],
  creator: "KW Enterprise",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Hospitality Maintenance Operations",
    "provider": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/logo.png`,
      "contactPoint": {
          "@type": "ContactPoint",
          "telephone": siteConfig.phone,
          "contactType": "Strategic Engagement",
          "email": siteConfig.email
      }
    },
    "description": siteConfig.description,
    "areaServed": {
      "@type": "State",
      "name": "Florida"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Hospitality Infrastructure Maintenance",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Strategic Work Orchestration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Asset Stewardship & TCO"
          }
        }
      ]
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
