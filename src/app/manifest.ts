import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SVKM's TMPM Hospital",
    short_name: "TMPM Hospital",
    description:
      "SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital & Research Center, Shirpur — Multispecialty Hospital",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a4f8a",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/images/hospital_website_logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/hospital_website_logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["health", "medical"],
    lang: "en-IN",
    dir: "ltr",
  };
}
