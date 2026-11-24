import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../../site.config";
import { Navbar } from "../components/sections/Navbar";
import { Footer } from "../components/sections/Footer";
import { SmoothScroll } from "../components/ui/SmoothScroll";
import { ScrollTheme } from "../components/ui/ScrollTheme";
import { CustomCursor } from "../components/ui/CustomCursor";
import { FluidWaterCanvas } from "../components/ui/FluidWaterCanvas";
import { TerminalIntro } from "../components/brand/TerminalIntro";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.url),
  title: {
    default: siteConfig.meta.title,
    template: `%s | ${siteConfig.meta.name}`,
  },
  description: siteConfig.meta.description,
  keywords: [
    "Soumyajit Mukherjee",
    "LookDev",
    "VFX Artist",
    "Creative Director",
    "Green Hydrogen",
    "Sustainability Research",
    "Nothing Design",
    "3D Animation",
    "Double Negative",
    "Technicolor",
    "UN Global Compact",
  ],
  authors: [{ name: siteConfig.meta.name, url: siteConfig.meta.url }],
  creator: siteConfig.meta.name,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.meta.url,
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    siteName: siteConfig.meta.name,
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    creator: "@scrounchyrio",
    images: [],
  },
  alternates: {
    canonical: siteConfig.meta.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.meta.name,
    url: siteConfig.meta.url,
    image: `${siteConfig.meta.url}/favicon.svg`,
    jobTitle: "Creative & Communications Professional / LookDev Specialist",
    description: siteConfig.meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Look Development",
      "Feature Film VFX",
      "Green Hydrogen Policy",
      "Sustainability Research",
      "Visual Storytelling",
      "UN SDG 16",
    ],
    email: siteConfig.meta.email,
    telephone: siteConfig.meta.phone,
    sameAs: siteConfig.socials.map((s) => s.url),
  };

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`.split-word { opacity: 1 !important; }`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen bg-canvas font-sans text-fg antialiased selection:bg-accent selection:text-white">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <TerminalIntro />
        <CustomCursor />
        <FluidWaterCanvas />
        <ScrollTheme />
        <SmoothScroll>
          <div className="relative z-10 flex min-h-screen flex-col justify-between">
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
