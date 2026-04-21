import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

// ── Fonts ─────────────────────────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

// ── Metadata ──────────────────────────────────────────────────────────────────
const SITE_NAME = "SVKM's TMPM Hospital";
const SITE_URL  = "https://www.tmpmhospital.com";
const SITE_DESC =
  "SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital & Research Center — a 1200-bed multispecialty hospital in Shirpur delivering world-class, affordable healthcare to tribal and rural communities of Maharashtra.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  `${SITE_NAME} | Multispecialty Hospital, Shirpur`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    "TMPM Hospital", "SVKM Hospital", "Tapanbhai Mukeshbhai Patel Hospital",
    "Shirpur hospital", "multispecialty hospital Maharashtra",
    "best hospital Shirpur", "hospital Dhule", "tribal healthcare Maharashtra",
    "affordable healthcare", "NABH hospital",
  ],
  authors:   [{ name: SITE_NAME, url: SITE_URL }],
  creator:   SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME} | Multispecialty Hospital, Shirpur`,
    description: SITE_DESC,
    images: [{
      url:    "/images/hospital_website_logo.png",
      width:  1200,
      height: 630,
      alt:    SITE_NAME,
    }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       `${SITE_NAME} | Multispecialty Hospital, Shirpur`,
    description: SITE_DESC,
    images:      ["/images/hospital_website_logo.png"],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index: true, follow: true,
      "max-video-preview":  -1,
      "max-image-preview":  "large",
      "max-snippet":        -1,
    },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon:     [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  // /manifest.webmanifest auto-generated from src/app/manifest.ts
};

export const viewport: Viewport = {
  themeColor:   "#0a4f8a",
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── JSON-LD ────────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type":    "Hospital",
  name:        "SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital & Research Center",
  alternateName: "TMPM Hospital",
  url:   SITE_URL,
  logo:  `${SITE_URL}/images/hospital_website_logo.png`,
  image: `${SITE_URL}/images/hospital_banner_image1.png`,
  description: SITE_DESC,
  address: {
    "@type":         "PostalAddress",
    streetAddress:   "Kharde, Budruk",
    addressLocality: "Shirpur",
    addressRegion:   "Maharashtra",
    postalCode:      "425405",
    addressCountry:  "IN",
  },
  telephone: "+91-XXXXXXXXXX",
  email:     "contact@tmpmhospital.com",
  openingHoursSpecification: [{
    "@type":   "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens:     "00:00",
    closes:    "23:59",
  }],
  medicalSpecialty: [
    "GeneralMedicalPractice","Surgical","Obstetric",
    "Pediatric","Anesthesia","Orthopedic",
  ],
  numberOfBeds: 1200,
  sameAs: [
    "https://www.facebook.com/tmpmhospital",
    "https://www.instagram.com/tmpmhospital",
    "https://www.linkedin.com/company/tmpmhospital",
  ],
};

// ── Root Layout ────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        {/*
          ────────────────────────────────────────────────────────────────────
          GOOGLE TRANSLATE — Cookie + reload approach
          ────────────────────────────────────────────────────────────────────
          Our GoogleTranslate.tsx component sets the `googtrans` cookie and
          reloads. On reload this script reads the cookie and translates.

          We MUST define googleTranslateElementInit BEFORE the script loads,
          so we inline it here in <head>. This init function suppresses all
          GT UI (toolbar / banner / spinner / logo) immediately on init.
          ────────────────────────────────────────────────────────────────────
        */}

        {/* 1. Init function defined BEFORE the GT script tag */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
              pageLanguage:      'en',
              includedLanguages: 'en,hi,mr',
              autoDisplay:       false,
              layout:            google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'gt-root');
          };
        ` }} />

        {/* 2. GT widget script (reads the cookie set by our component) */}
        <script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />

        {/* 3. Hide ALL Google Translate UI chrome completely */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Hide the entire GT toolbar / banner bar that pushes content down */
          .goog-te-banner-frame,
          .goog-te-banner-frame.skiptranslate,
          iframe.goog-te-banner-frame,
          .goog-te-balloon-frame,
          .goog-te-menu-frame       { display: none !important; }

          /* Hide GT's injected gadget, spinner, tooltip, logo */
          #goog-gt-tt,
          .goog-tooltip,
          .goog-tooltip:hover,
          .goog-te-spinner-pos,
          .goog-te-gadget,
          .goog-te-gadget-simple,
          .goog-te-gadget-icon,
          .goog-logo-link,
          .goog-te-combo,
          .goog-te-balloon-frame    { display: none !important; }

          /* The container we mount the GT widget into — keep it truly invisible */
          #gt-root                  { display: none !important; }

          /*
            GT sets body.style.top to a negative value to make room for its
            banner. Since we hide the banner, we must undo that offset.
            This selector is safe: it only fires AFTER GT has translated.
          */
          body.translated-ltr,
          body.translated-rtl       { top: 0 !important; }

          /*
            GT wraps text nodes it needs to remember in <font class="notranslate">
            and similar. We must NOT hide .skiptranslate broadly because GT uses
            it for internal bookkeeping — only hide the gadget wrapper.
          */
          .skiptranslate.goog-te-gadget { display: none !important; }
        `}} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className="antialiased overflow-x-hidden"
        style={{
          fontFamily: "var(--font-body)",
          color:      "var(--color-text)",
          background: "var(--color-bg)",
        }}
      >
        {/*
          Hidden GT mount point — GT widget renders its <select> here.
          Kept in body so GT's DOM manipulation works, but invisible via CSS.
        */}
        <div id="gt-root" aria-hidden="true" />

        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] btn-primary"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content" className="pt-[var(--total-header)]">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
