import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "../../site.config";
import { Navbar } from "../components/sections/Navbar";
import { Footer } from "../components/sections/Footer";
import { CustomCursor } from "../components/ui/CustomCursor";
import { SmoothScroll } from "../components/ui/SmoothScroll";
import { NoiseOverlay } from "../components/ui/NoiseOverlay";
import { SplashScreen } from "../components/brand/SplashScreen";
import { AnimatedBackground } from "../components/ui/AnimatedBackground";

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    creator: "@scrounchyrio",
    images: ["/og-image.png"],
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FAFAFA] text-[#111111] selection:bg-[#D71921] selection:text-white font-sans antialiased relative min-h-screen">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SplashScreen />
        <AnimatedBackground />
        <CustomCursor />
        <NoiseOverlay />
        <SmoothScroll>
          <div className="relative min-h-screen flex flex-col justify-between z-10">
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
