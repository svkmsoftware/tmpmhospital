/**
 * Strapi API Response Types
 * ─────────────────────────────────────────────────────────────────────────────
 * These types match the exact JSON structure returned by your Strapi backend.
 *
 * LEARNING NOTE — Why separate Strapi types from app types?
 *   Your app types (in /types/index.ts) describe your UI data model.
 *   Strapi types describe what the API returns — they are different shapes.
 *   Having a "transformer" layer between them means:
 *     - If Strapi renames a field, you fix it in ONE place
 *     - Your components never know or care what the API looks like
 *     - You can swap Strapi for any other CMS without touching your UI
 */

// ── Common ────────────────────────────────────────────────────────────────────

/** A Strapi image object with multiple format sizes */
export interface StrapiImage {
  id: number;
  url: string;                 // e.g. "/uploads/aboutHospitalImage.png"
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

/** Standard Strapi REST API wrapper */
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ── About Page Section Components ─────────────────────────────────────────────
// Strapi uses "Dynamic Zones" — an array where each item has a __component field
// telling you which type of section it is. Think of it like a union type.

export interface StrapiFeatureDetail {
  id: number;
  heading: string;
  value: string;
}

/** shared.about-section */
export interface StrapiAboutSection {
  __component: "shared.about-section";
  id: number;
  heading: string;
  subheading: string;
  description: string;
  featured_image: StrapiImage | null;
  featured_video: string | null;
  features_details: StrapiFeatureDetail[];
}

/** shared.vision (used for both Vision and Mission — heading tells you which) */
export interface StrapiVisionSection {
  __component: "shared.vision";
  id: number;
  heading: string;  // "Vision" or "Mission"
  descriptions: string | null;
}

export interface StrapiPresidentDetail {
  id: number;
  position: string;
  name: string;
  description: string;
  featured_image: StrapiImage | null;
}

/** shared.president */
export interface StrapiPresidentSection {
  __component: "shared.president";
  id: number;
  heading: string;
  subheading: string;
  President_details: StrapiPresidentDetail[];
}

export interface StrapiTrusteeDetail {
  id: number;
  name: string;
  position: string;
  featured_image: StrapiImage | null;
}

/** shared.our-trustees */
export interface StrapiTrusteesSection {
  __component: "shared.our-trustees";
  id: number;
  heading: string;
  subheading: string;
  description: string;
  trustee_details: StrapiTrusteeDetail[];
}

export interface StrapiManagementDetail {
  id: number;
  name: string;
  position: string;
  description: string;
  featured_image: StrapiImage | null;
  social_icon: unknown[];
}

/** shared.management-team */
export interface StrapiManagementSection {
  __component: "shared.management-team";
  id: number;
  heading: string;
  subheading: string;
  management_details: StrapiManagementDetail[];
}

export interface StrapiWhyChooseDetail {
  id: number;
  heading: string;
  subheading: string;
  featured_image: StrapiImage | null;
}

/** shared.why-choose-us */
export interface StrapiWhyChooseSection {
  __component: "shared.why-choose-us";
  id: number;
  heading: string;
  subheading: string;
  why_choose_details: StrapiWhyChooseDetail[];
}

export interface StrapiGalleryGroup {
  id: number;
  Image: StrapiImage[];
}

/** shared.gallery */
export interface StrapiGallerySection {
  __component: "shared.gallery";
  id: number;
  heading: string;
  subheading: string;
  gallery_section: StrapiGalleryGroup[];
}

export interface StrapiContactDetail {
  id: number;
  heading: string;
  description: string;
}

/** shared.contact */
export interface StrapiContactSection {
  __component: "shared.contact";
  id: number;
  heading: string;
  subheading: string;
  contact_detail: StrapiContactDetail[];
}

/** Union of all possible section types in the About page dynamic zone */
export type StrapiAboutPageSection =
  | StrapiAboutSection
  | StrapiVisionSection
  | StrapiPresidentSection
  | StrapiTrusteesSection
  | StrapiManagementSection
  | StrapiWhyChooseSection
  | StrapiGallerySection
  | StrapiContactSection;

/** Top-level About page data */
export interface StrapiAboutPage {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  About_banner: StrapiImage | null;
  section: StrapiAboutPageSection[];
}
