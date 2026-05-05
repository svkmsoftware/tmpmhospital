import type { Metadata, Viewport } from "next";
// ── Fonts loaded from npm package (no network needed at build time) ───────────
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-serif-display/400.css";
import "@fontsource/dm-serif-display/400-italic.css";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Chatbot from "@/components/ui/Chatbot";

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
    <html lang="en">
      <head>
        {/* Google Translate UI suppression */}
        <style dangerouslySetInnerHTML={{ __html: `
          .goog-te-banner-frame, .goog-te-banner-frame.skiptranslate,
          iframe.goog-te-banner-frame, .goog-te-balloon-frame,
          .goog-te-menu-frame, #goog-gt-tt, .goog-tooltip,
          .goog-tooltip:hover, .goog-te-spinner-pos, .goog-te-gadget,
          .goog-te-gadget-simple, .goog-te-gadget-icon, .goog-logo-link,
          .goog-te-combo, .goog-te-balloon-frame { display: none !important; }
          #gt-root { display: none !important; }
          body.translated-ltr, body.translated-rtl { top: 0 !important; }
          .skiptranslate.goog-te-gadget { display: none !important; }
          body { top: 0px !important; }
        `}} />
        {/* GT init before script */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,hi,mr',
              autoDisplay: false,
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'gt-root');
          };
        `}} />
        <script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        ></script>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <div id="gt-root" aria-hidden="true"></div>
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
        <Chatbot />
      </body>
    </html>
  );
}
