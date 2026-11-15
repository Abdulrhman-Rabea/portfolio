import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/animations/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/data/site";
import "lenis/dist/lenis.css"; // rules Lenis needs on <html>
import "./globals.css";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Instrument Serif ships a single weight, plus an italic style
const display = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const pageTitle = `${siteConfig.name} — ${siteConfig.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pageTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: pageTitle,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c", // browser UI on mobile matches your background
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <head>
        {/* Without JavaScript the hero would stay hidden, so show it immediately */}
        <noscript>
          <style>{`[data-hero-line],[data-hero-fade]{opacity:1!important}`}</style>
        </noscript>
      </head>

      {/* id="top" is the target of the logo and "Back to top" links */}
      <body id="top" className="font-sans antialiased">
        {/* First focusable element: lets keyboard users skip repeated navigation */}
        <a
          href="#main"
          className="bg-accent text-background sr-only z-[60] rounded px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}