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
        // Brand blue (Primary Blue #0456A8)
        primary: {
          DEFAULT: "#0456A8",
          dark:    "#004B83",
          darker:  "#003F70",
          light:   "#09A0AB",
          pale:    "#EAF4FF",
        },
        // Brand teal (Main Teal / Button Teal #08A2A4)
        accent: {
          DEFAULT: "#08A2A4",
          dark:    "#087F88",
          light:   "#09A0AB",
          pale:    "#E9F8F4",
        },
        // Override default Tailwind palettes so existing utility classes
        // (bg-cyan-700, text-blue-500, bg-green-600, bg-emerald-800, etc.)
        // automatically render in brand colors.
        cyan: {
          50: "#EAF4FF", 100: "#d7e4f1", 200: "#afc9e3", 300: "#87aed5",
          400: "#548cc4", 500: "#2a6fb5", 600: "#0456A8", 700: "#03498f",
          800: "#033c76", 900: "#022f5c",
        },
        blue: {
          50: "#EAF4FF", 100: "#d7e4f1", 200: "#afc9e3", 300: "#87aed5",
          400: "#548cc4", 500: "#2a6fb5", 600: "#0456A8", 700: "#03498f",
          800: "#033c76", 900: "#022f5c",
        },
        sky: {
          50: "#EAF4FF", 100: "#d7e4f1", 200: "#afc9e3", 300: "#87aed5",
          400: "#548cc4", 500: "#2a6fb5", 600: "#0456A8", 700: "#03498f",
          800: "#033c76", 900: "#022f5c",
        },
        teal: {
          50: "#E9F8F4", 100: "#d7f0f0", 200: "#b0e1e2", 300: "#88d2d3",
          400: "#57c0c1", 500: "#2db0b2", 600: "#08A2A4", 700: "#078a8b",
          800: "#067173", 900: "#04595a",
        },
        green: {
          50: "#E9F8F4", 100: "#d7f0f0", 200: "#b0e1e2", 300: "#88d2d3",
          400: "#57c0c1", 500: "#2db0b2", 600: "#08A2A4", 700: "#078a8b",
          800: "#067173", 900: "#04595a",
        },
        emerald: {
          50: "#E9F8F4", 100: "#d7f0f0", 200: "#b0e1e2", 300: "#88d2d3",
          400: "#57c0c1", 500: "#2db0b2", 600: "#08A2A4", 700: "#078a8b",
          800: "#067173", 900: "#04595a",
        },
      },
      backgroundImage: {
        "gradient-main":    "linear-gradient(135deg, #0456A8 0%, #09A0AB 100%)",
        "gradient-section": "linear-gradient(135deg, #EAF4FF 0%, #E9F8F4 100%)",
        "gradient-hero":    "linear-gradient(105deg, rgba(4,86,168,.88) 0%, rgba(9,160,171,.60) 50%, rgba(0,20,45,.15) 100%)",
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
        card:        "0 2px 12px rgba(4,86,168,.08), 0 1px 3px rgba(0,0,0,.04)",
        "card-hover":"0 16px 48px rgba(4,86,168,.18), 0 4px 16px rgba(0,0,0,.07)",
        "glow-cyan": "0 0 24px rgba(4,86,168,.35)",
        "glow-green":"0 0 24px rgba(8,162,164,.35)",
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
