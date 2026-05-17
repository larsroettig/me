import type { Metadata } from "next";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Lars Roettig — AI Engineer",
    template: "%s | Lars Roettig",
  },
  description:
    "AI Engineer at Adobe. Writing about AI agents, architecture, and building things that last.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://larsroettig.dev",
    siteName: "Lars Roettig",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
