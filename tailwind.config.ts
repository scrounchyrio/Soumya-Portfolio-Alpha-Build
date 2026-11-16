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
          black: "#000000",
          dark: "#080808",
          card: "#0E0E0E",
          cardHover: "#141414",
          panel: "#121212",
          border: "rgba(255, 255, 255, 0.12)",
          borderBright: "rgba(255, 255, 255, 0.26)",
          borderSubtle: "rgba(255, 255, 255, 0.06)",
          red: "#D71921",
          redGlow: "rgba(215, 25, 33, 0.45)",
          redSoft: "rgba(215, 25, 33, 0.12)",
          white: "#FFFFFF",
          dim: "rgba(255, 255, 255, 0.72)",
          muted: "rgba(255, 255, 255, 0.45)",
          ghost: "rgba(255, 255, 255, 0.18)",
        },
      },
      fontFamily: {
        ndot: ["var(--font-ndot)", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
        extreme: "0.3em",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
        "dot-grid-subtle": "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        "scanlines": "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
      },
      backgroundSize: {
        "dots": "16px 16px",
        "dots-dense": "10px 10px",
        "dots-large": "24px 24px",
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "blink-cursor": "blinkCursor 1s step-end infinite",
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
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 6px rgba(215, 25, 33, 0.7))" },
          "50%": { opacity: "0.4", filter: "drop-shadow(0 0 1px rgba(215, 25, 33, 0.2))" },
        },
        blinkCursor: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
