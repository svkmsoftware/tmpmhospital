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
          DEFAULT:  "#0a4f8a",
          dark:     "#073a66",
          light:    "#1972b8",
          pale:     "#e8f1fb",
        },
        accent: {
          DEFAULT: "#d4891a",
          light:   "#f0b352",
          pale:    "#fef3e2",
        },
      },
      fontFamily: {
        body:    ["var(--font-inter)", "DM Sans", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "DM Serif Display", "Georgia", "serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      spacing: {
        "18":  "4.5rem",
        "88":  "22rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card:        "0 2px 12px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04)",
        "card-hover":"0 16px 48px rgba(0,0,0,.13), 0 4px 16px rgba(0,0,0,.07)",
        glow:        "0 0 24px rgba(10,79,138,.25)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.65s ease-out forwards",
        "fade-in":    "fadeIn 0.5s ease-out forwards",
        float:        "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
      },
      screens: {
        xs:  "475px",
        "3xl": "1920px",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
      },
    },
  },
  plugins: [],
};

export default config;
