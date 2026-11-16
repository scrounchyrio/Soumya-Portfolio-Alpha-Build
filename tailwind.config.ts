import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./site.config.ts",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        nothing: {
          bg: "#FAFAFA",
          surface: "#FFFFFF",
          surfaceHover: "#F4F4F4",
          card: "#FFFFFF",
          cardHover: "#F8F8F8",
          border: "#E5E5E5",
          borderSubtle: "rgba(0, 0, 0, 0.06)",
          borderBright: "rgba(0, 0, 0, 0.15)",
          red: "#D71921",
          redGlow: "rgba(215, 25, 33, 0.25)",
          redSoft: "rgba(215, 25, 33, 0.08)",
          textPrimary: "#111111",
          textSecondary: "#666666",
          textMuted: "#86868B",
          textGhost: "rgba(0, 0, 0, 0.3)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
        mono: [
          '"Space Mono"',
          '"SF Mono"',
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
        ndot: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
        extreme: "0.3em",
      },
      backgroundImage: {
        "dot-grid-light": "radial-gradient(rgba(0, 0, 0, 0.07) 1px, transparent 1px)",
        "dot-grid-subtle-light": "radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dots": "20px 20px",
        "dots-dense": "12px 12px",
        "dots-large": "28px 28px",
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "blink-cursor": "blinkCursor 1s step-end infinite",
        "blob-morph": "blobMorph 20s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 6px rgba(215, 25, 33, 0.5))" },
          "50%": { opacity: "0.5", filter: "drop-shadow(0 0 1px rgba(215, 25, 33, 0.1))" },
        },
        blinkCursor: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        blobMorph: {
          "0%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)",
          },
          "33%": {
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
            transform: "translate3d(30px, -20px, 0) scale(1.08) rotate(120deg)",
          },
          "66%": {
            borderRadius: "50% 60% 30% 60% / 30% 40% 70% 60%",
            transform: "translate3d(-20px, 25px, 0) scale(0.95) rotate(240deg)",
          },
          "100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            transform: "translate3d(0, 0, 0) scale(1) rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
