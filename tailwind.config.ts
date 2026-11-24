import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "rgb(var(--canvas-rgb) / <alpha-value>)",
          raised: "rgb(var(--canvas-raised-rgb) / <alpha-value>)",
          card: "rgb(var(--canvas-card-rgb) / <alpha-value>)",
          line: "rgb(var(--fg-rgb) / 0.1)",
        },
        fg: {
          DEFAULT: "rgb(var(--fg-rgb) / <alpha-value>)",
          dim: "rgb(var(--fg-rgb) / 0.65)",
          mute: "rgb(var(--fg-rgb) / 0.42)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          soft: "rgb(var(--accent-rgb) / 0.15)",
        },
        // Clean Green Energy & Hydrogen Shades
        "green-emerald": "rgb(var(--green-emerald-rgb) / <alpha-value>)",
        "green-mint": "rgb(var(--green-mint-rgb) / <alpha-value>)",
        "green-spring": "rgb(var(--green-spring-rgb) / <alpha-value>)",
        "green-forest": "rgb(var(--green-forest-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
