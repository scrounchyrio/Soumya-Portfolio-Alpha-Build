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
    default: "Soumyajit Mukherjee — Hollywood VFX LookDev Artist & Sustainability Policy Researcher",
    template: `%s | ${siteConfig.meta.name}`,
  },
  description:
    "Portfolio of Soumyajit Mukherjee: Hollywood feature film LookDev credits (Furiosa: A Mad Max Saga, Sonic 2, Bullet Train at DNEG & MPC), paired with empirical sustainability research in Green Hydrogen (Nalanda University MBA, Ubon Ratchathani University) and multilateral ESG reporting (UNGC, WAF).",
  keywords: [
    "Soumyajit Mukherjee",
    "LookDev Artist",
    "VFX Look Development",
    "Hollywood VFX Artist",
    "Furiosa Mad Max LookDev",
    "Sonic the Hedgehog 2 VFX",
    "Bullet Train Film VFX",
    "Double Negative",
    "DNEG",
    "Moving Picture Company",
    "MPC Technicolor",
    "Nalanda University MBA",
    "Sustainable Development and Management",
    "Green Hydrogen Policy",
    "India Thailand Green Hydrogen",
    "Bio-Circular-Green Economy",
    "BCG Economic Model",
    "UN Global Compact Network India",
    "UN SDG 16 Governance",
    "World Agriculture Forum Amsterdam",
    "UNDP Bayer Water Quality",
    "ACES Color Science",
    "Katana LookDev",
    "Mari Surfacing",
    "Substance Painter",
    "Blender 3D",
    "Visual Storytelling",
    "AEO",
    "Answer Engine Optimization",
  ],
  authors: [{ name: siteConfig.meta.name, url: siteConfig.meta.url }],
  creator: siteConfig.meta.name,
  publisher: siteConfig.meta.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteConfig.meta.url,
    title: "Soumyajit Mukherjee — Hollywood VFX LookDev Artist & Sustainability Policy Researcher",
    description:
      "Hollywood feature film LookDev credits (Furiosa, Sonic 2, Bullet Train at DNEG & MPC) & empirical Green Hydrogen policy research (Nalanda MBA, UBU Thailand).",
    siteName: siteConfig.meta.name,
    images: [
      {
        url: `${siteConfig.meta.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Soumyajit Mukherjee Portfolio — LookDev and Sustainability",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soumyajit Mukherjee — Hollywood LookDev & Sustainability Research",
    description:
      "VFX credits across Furiosa, Sonic 2, Bullet Train at DNEG/MPC & Green Hydrogen comparative policy research.",
    creator: "@scrounchyrio",
    images: [`${siteConfig.meta.url}/opengraph-image`],
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
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.meta.url}/#person`,
        name: siteConfig.meta.name,
        alternateName: ["Soumyajit", "scrounchyrio"],
        url: siteConfig.meta.url,
        image: `${siteConfig.meta.url}/favicon.svg`,
        jobTitle: "Senior Look Development Artist & Sustainability Policy Researcher",
        description:
          "Soumyajit Mukherjee bridges Hollywood feature film LookDev (Furiosa, Sonic 2, Bullet Train at DNEG and MPC) with empirical energy policy research (MBA in Sustainable Development from Nalanda University, Green Hydrogen field research in Thailand, and multilateral publications with UNGC and WAF).",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kolkata",
          addressCountry: "IN",
        },
        worksFor: [
          { "@type": "Organization", name: "Double Negative (DNEG)", url: "https://www.dneg.com/" },
          { "@type": "Organization", name: "Technicolor Creative Studios / MPC", url: "https://www.technicolor.com/" },
          { "@type": "Organization", name: "Ubon Ratchathani University", url: "https://www.ubu.ac.th/en/" },
          { "@type": "Organization", name: "World Agriculture Forum", url: "https://worldagricultureforum.com/" },
          { "@type": "Organization", name: "UN Global Compact Network India", url: "https://globalcompact.in/" },
          { "@type": "Organization", name: "HMX Media", url: "https://hmxmedia.com/" },
        ],
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Nalanda University",
            url: "https://nalandauniv.edu.in/",
          },
          {
            "@type": "EducationalOrganization",
            name: "Kolhan University",
            url: "https://www.kolhanuniversity.ac.in/",
          },
          {
            "@type": "EducationalOrganization",
            name: "Arena Animation / Aptech",
            url: "https://www.arena-multimedia.com/",
          },
        ],
        knowsAbout: [
          "Look Development",
          "Physically Based Rendering (PBR)",
          "Katana",
          "Mari",
          "Substance 3D Painter",
          "ACES Color Pipeline",
          "Feature Film Visual Effects",
          "Green Hydrogen Policy",
          "Bio-Circular-Green Economy",
          "Energy Transition",
          "UN SDG 16",
          "ESG Reporting",
          "Water Stewardship",
          "Life Cycle Assessment",
        ],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "MBA in Sustainable Development and Management (Distinction)",
          recognizedBy: {
            "@type": "EducationalOrganization",
            name: "Nalanda University",
          },
        },
        email: siteConfig.meta.email,
        telephone: siteConfig.meta.phone,
        sameAs: siteConfig.socials.map((s) => s.url),
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.meta.url}/#webpage`,
        url: siteConfig.meta.url,
        name: "Soumyajit Mukherjee — Hollywood VFX LookDev Artist & Sustainability Policy Researcher",
        mainEntity: { "@id": `${siteConfig.meta.url}/#person` },
        about: { "@id": `${siteConfig.meta.url}/#person` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.meta.url}/#film-credits`,
        name: "Hollywood Film LookDev Credits",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Furiosa: A Mad Max Saga (2024)",
            description: "Look Development and Surfacing Artist at Double Negative (DNEG)",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sonic the Hedgehog 2 (2022)",
            description: "Texturing and Look Development across ACES pipeline at Technicolor Creative Studios / MPC",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Bullet Train (2022)",
            description: "Hard-surface Look Development Artist at Double Negative (DNEG)",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`.split-word { opacity: 1 !important; }`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
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
