import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0891b2",
          dark:    "#0e7490",
          darker:  "#155e75",
          light:   "#22d3ee",
          pale:    "#ecfeff",
        },
        accent: {
          DEFAULT: "#16a34a",
          dark:    "#15803d",
          light:   "#22c55e",
          pale:    "#f0fdf4",
        },
      },
      backgroundImage: {
        "gradient-main":    "linear-gradient(135deg, #0891b2 0%, #0e9f6e 50%, #16a34a 100%)",
        "gradient-section": "linear-gradient(135deg, #ecfeff 0%, #f0fdf4 100%)",
        "gradient-hero":    "linear-gradient(105deg, rgba(8,145,178,.88) 0%, rgba(14,159,110,.60) 50%, rgba(0,0,0,.15) 100%)",
      },
      fontFamily: {
        body:    ["DM Sans", "system-ui", "sans-serif"],
        display: ["DM Serif Display", "Georgia", "serif"],
        sans:    ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      boxShadow: {
        card:        "0 2px 12px rgba(8,145,178,.08), 0 1px 3px rgba(0,0,0,.04)",
        "card-hover":"0 16px 48px rgba(8,145,178,.18), 0 4px 16px rgba(0,0,0,.07)",
        "glow-cyan": "0 0 24px rgba(8,145,178,.35)",
        "glow-green":"0 0 24px rgba(22,163,74,.35)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.65s ease-out forwards",
        "fade-in":    "fadeIn 0.5s ease-out forwards",
        "float":      "float 4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s infinite",
        "slide-up":   "slideUp 0.3s ease-out forwards",
      },
      screens: { xs: "475px", "3xl": "1920px" },
    },
  },
  plugins: [],
};

export default config;
