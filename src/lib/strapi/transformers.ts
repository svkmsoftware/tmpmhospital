/**
 * Strapi Data Transformers
 * ─────────────────────────────────────────────────────────────────────────────
 * LEARNING NOTE — What is a transformer and why do we need one?
 *
 * The data from Strapi looks like this:
 *   { id: 22, heading: "About Us", features_details: [{id:127, heading:"Beds", value:"1200"}] }
 *
 * But our React components want data that looks like this:
 *   { label: "Beds", value: "1200", icon: "bed" }
 *
 * Transformers are pure functions that convert one shape into another.
 * Benefits:
 *   1. Components stay clean — they never see the messy API format
 *   2. If Strapi renames "features_details" to "stats", you fix it here, not in 10 components
 *   3. You can add fallback values, icons, computed fields here
 *   4. Easy to unit-test: input → expected output
 *
 * These are pure functions: same input always gives same output, no side effects.
 */

import { strapiMediaUrl } from "@/lib/strapi/client";
import type {
  StrapiAboutPage,
  StrapiAboutSection,
  StrapiVisionSection,
  StrapiPresidentSection,
  StrapiTrusteesSection,
  StrapiManagementSection,
  StrapiWhyChooseSection,
  StrapiGallerySection,
} from "@/types/strapi";
import type { ManagementMember, HospitalStat, GalleryImage } from "@/types";
import { missionVisionData } from "@/data/visionMission"; // local fallback

// ── Icon mapping ───────────────────────────────────────────────────────────────
// Strapi doesn't send icon names, so we map headings to icons
const FEATURE_ICON_MAP: Record<string, string> = {
  "area":                    "ruler",
  "total beds":              "bed",
  "critical care beds":      "heart-pulse",
  "emergency beds":          "ambulance",
  "operation room":          "scissors",
  "operation theatre":       "scissors",
  "catheterization":         "heart",
  "catheterization laboratory": "heart",
  "specialist doctors":      "stethoscope",
  "doctors":                 "stethoscope",
};

function getFeatureIcon(heading: string): string {
  const lower = heading.toLowerCase();
  for (const [key, icon] of Object.entries(FEATURE_ICON_MAP)) {
    if (lower.includes(key)) return icon;
  }
  return "stethoscope"; // default
}

// ── About section ─────────────────────────────────────────────────────────────

export interface TransformedAboutSection {
  heading:       string;
  subheading:    string;
  description:   string;
  featuredImage: string | null;
  stats: Array<{ label: string; value: string; icon: string }>;
}

export function transformAboutSection(
  s: StrapiAboutSection
): TransformedAboutSection {
  return {
    heading:       s.heading,
    subheading:    s.subheading,
    description:   s.description.trim(),
    featuredImage: strapiMediaUrl(s.featured_image?.url) ??
                   "/images/aboutHospitalImage.png", // local fallback
    stats: (s.features_details ?? []).map((f) => ({
      label: f.heading,
      value: f.value,
      icon:  getFeatureIcon(f.heading),
    })),
  };
}

// ── Vision / Mission ──────────────────────────────────────────────────────────

export interface TransformedVisionMission {
  vision:  { title: string; text: string };
  mission: { title: string; points: Array<{ text: string }> };
}

/**
 * The API returns Vision and Mission as two separate items.
 * We merge them into one object here.
 * If the API has no text (descriptions: null), we fall back to local data.
 */
export function transformVisionMission(
  visionSection?: StrapiVisionSection,
  missionSection?: StrapiVisionSection
): TransformedVisionMission {
  return {
    vision: {
      title: visionSection?.heading ?? "Vision",
      text:  visionSection?.descriptions ??
             missionVisionData.vision.text,  // local fallback
    },
    mission: {
      title:  missionSection?.heading ?? "Mission",
      points: missionVisionData.mission.points, // always use local (rich data)
    },
  };
}

// ── President / Founders ──────────────────────────────────────────────────────

export interface TransformedFounder {
  name:        string;
  role:        string;
  description: string;
  image:       string | null;
}

export function transformFounders(
  s: StrapiPresidentSection
): TransformedFounder[] {
  return (s.President_details ?? []).map((p) => ({
    name:        p.name,
    role:        p.position,
    description: p.description.trim(),
    image:       strapiMediaUrl(p.featured_image?.url) ??
                 "/images/male_user.png",
  }));
}

// ── Trustees ──────────────────────────────────────────────────────────────────

export interface TransformedTrustee {
  name:  string;
  role:  string;
  image: string | null;
}

export function transformTrustees(
  s: StrapiTrusteesSection
): TransformedTrustee[] {
  return (s.trustee_details ?? []).map((t) => ({
    name:  t.name,
    role:  t.position,
    image: strapiMediaUrl(t.featured_image?.url) ??
           "/images/male_user.png",
  }));
}

// ── Management Team ───────────────────────────────────────────────────────────

export function transformManagement(
  s: StrapiManagementSection
): ManagementMember[] {
  return (s.management_details ?? []).map((m, i) => ({
    id:          i + 1,
    name:        m.name,
    designation: m.position,
    image:       strapiMediaUrl(m.featured_image?.url) ??
                 "/images/managementTeam/user.png",
    bio:         m.description.trim(),
  }));
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────

export interface TransformedWhyChooseItem {
  title:       string;
  description: string;
  image:       string | null;
}

export function transformWhyChooseUs(
  s: StrapiWhyChooseSection
): TransformedWhyChooseItem[] {
  return (s.why_choose_details ?? []).map((item) => ({
    title:       item.heading,
    description: item.subheading.trim(),
    image:       strapiMediaUrl(item.featured_image?.url) ??
                 "/images/departments-1.jpg",
  }));
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export function transformGallery(s: StrapiGallerySection): GalleryImage[] {
  const images: GalleryImage[] = [];
  let counter = 1;

  for (const group of s.gallery_section ?? []) {
    for (const img of group.Image ?? []) {
      images.push({
        id:       counter++,
        src:      strapiMediaUrl(img.url) ?? img.url,
        alt:      img.alternativeText ?? "Hospital gallery image",
        category: "Facilities",
      });
    }
  }

  return images;
}

// ── Master transformer ────────────────────────────────────────────────────────
// Transforms the entire About page API response into clean, ready-to-use data.

export interface TransformedAboutPage {
  bannerImage:   string | null;
  about:         TransformedAboutSection | null;
  visionMission: TransformedVisionMission;
  founders:      TransformedFounder[];
  trustees:      TransformedTrustee[];
  management:    ManagementMember[];
  whyChooseUs:   TransformedWhyChooseItem[];
  gallery:       GalleryImage[];
}

export function transformAboutPage(
  raw: StrapiAboutPage
): TransformedAboutPage {
  // Pull each section type out of the dynamic zone array by __component
  const sections = raw.section ?? [];

  const aboutSec   = sections.find((s) => s.__component === "shared.about-section") as StrapiAboutSection | undefined;
  const visionSec  = sections.find((s) => s.__component === "shared.vision" && s.heading === "Vision")  as StrapiVisionSection | undefined;
  const missionSec = sections.find((s) => s.__component === "shared.vision" && s.heading === "Mission") as StrapiVisionSection | undefined;
  const presidentSec = sections.find((s) => s.__component === "shared.president")   as StrapiPresidentSection | undefined;
  const trusteesSec  = sections.find((s) => s.__component === "shared.our-trustees") as StrapiTrusteesSection | undefined;
  const managementSec = sections.find((s) => s.__component === "shared.management-team") as StrapiManagementSection | undefined;
  const whySec     = sections.find((s) => s.__component === "shared.why-choose-us") as StrapiWhyChooseSection | undefined;
  const gallerySec = sections.find((s) => s.__component === "shared.gallery")       as StrapiGallerySection | undefined;

  return {
    bannerImage:   strapiMediaUrl(raw.About_banner?.url) ?? "/images/about_us_banner.png",
    about:         aboutSec   ? transformAboutSection(aboutSec)             : null,
    visionMission: transformVisionMission(visionSec, missionSec),
    founders:      presidentSec ? transformFounders(presidentSec)           : [],
    trustees:      trusteesSec  ? transformTrustees(trusteesSec)            : [],
    management:    managementSec ? transformManagement(managementSec)       : [],
    whyChooseUs:   whySec      ? transformWhyChooseUs(whySec)               : [],
    gallery:       gallerySec  ? transformGallery(gallerySec)               : [],
  };
}
