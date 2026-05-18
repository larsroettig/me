import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const BASE_URL = "https://larsroettig.me";

export const metadata: Metadata = {
  title: {
    default: "Lars Roettig — Senior Technical Architect",
    template: "%s | Lars Roettig",
  },
  description:
    "Senior Technical Architect at Adobe. Writing about AI agents, architecture, and building things that last.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Lars Roettig",
    images: [
      {
        url: `${BASE_URL}/lars-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Lars Roettig — Senior Technical Architect at Adobe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@larsroettig",
    images: [`${BASE_URL}/lars-hero.jpg`],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lars Roettig",
  jobTitle: "Senior Technical Architect",
  worksFor: { "@type": "Organization", name: "Adobe" },
  url: BASE_URL,
  image: `${BASE_URL}/lars-hero.jpg`,
  sameAs: [
    "https://github.com/larsroettig",
    "https://linkedin.com/in/larsroettig",
  ],
  knowsAbout: [
    "AI Agents",
    "RAG",
    "LLM Integration",
    "Technical Architecture",
    "Next.js",
    "TypeScript",
    "Adobe Commerce",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lars Roettig",
  url: BASE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
