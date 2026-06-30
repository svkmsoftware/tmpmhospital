/**
 * GraphQL Services — TMPM Hospital CMS (Unified)
 * ─────────────────────────────────────────────────────────────────────────────
 * Every page's "fetch + transform + fallback-safe" function lives in this
 * one file. About is just the first function below — not a separate module.
 *
 * THE PATTERN (identical for every function in this file):
 *   1. Call fetchGraphQL() with the matching query from queries.ts
 *   2. Transform the raw CMS response into a clean, page-ready shape
 *   3. Wrap everything in try/catch — return null on ANY failure
 *   4. The calling page then does: const data = await getXData() ?? localFallback
 *
 * This is THE template to copy when the vendor adds a new CMS endpoint —
 * see Section 5 of the developer reference doc for the 4-step walkthrough.
 */

import { fetchGraphQL, CACHE_TAGS } from "@/lib/graphql/client";
import {
  ABOUT_PAGE_QUERY,
  GET_HOME_PAGE_QUERY,
  GET_CONSULTANTS_QUERY,
  GET_DOCTER_PAGE_QUERY,
  GET_DEPARTMENT_CATEGORIES_QUERY,
  GET_DEPARTMENT_PAGE_QUERY,
  GET_DEPARTMENT_BY_SLUG_QUERY,
  GET_BLOG_PAGE_QUERY,
  GET_BLOGS_QUERY,
  GET_CAREER_PAGE_QUERY,
  GET_CONTACT_PAGE_QUERY,
  GET_OPD_PAGE_QUERY,
  GET_IPD_PAGE_QUERY,
  GET_DAYCARE_PAGE_QUERY,
} from "@/lib/graphql/queries";
import type {
  GQLAboutData, GQLAboutSection, GQLAboutInfo, GQLVisionSection,
  GQLPresidentSection, GQLTrusteesSection, GQLManagementSection,
  GQLWhyChooseSection, GQLGallerySection,
  GQLHome,
  GQLConsultant, GQLDocterPage,
  GQLDepartmentCategory, GQLDepartmentPage, GQLDepartment,
  GQLBlogPage, GQLBlog,
  GQLCareer, GQLContactPage,
  GQLOpd, GQLIpd, GQLDaycare,
} from "@/lib/graphql/types";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPER — one media URL builder used by every function below
// ─────────────────────────────────────────────────────────────────────────────

const STRAPI_URL =
  process.env.STRAPI_API_URL ?? "https://shirpurhospital.kwebmakerdigitalagency.com";

/** Build an absolute URL for a Strapi media file (GraphQL returns relative paths). */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;   // already absolute
  return `${STRAPI_URL}${path}`;              // make absolute
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────

export interface AboutPageData {
  bannerImage: string | null;
  about: {
    heading: string;
    subheading: string;
    description: string;
    image: string | null;
    stats: Array<{ label: string; value: string }>;
  } | null;
  vision:  { title: string; text: string } | null;
  mission: { title: string; text: string } | null;
  founders: Array<{ name: string; role: string; description: string; image: string | null }>;
  trustees: Array<{ name: string; role: string; image: string | null }>;
  management: Array<{ name: string; designation: string; bio: string; image: string | null }>;
  whyChooseUs: Array<{ title: string; description: string; image: string | null }>;
  gallery: Array<{ src: string; alt: string }>;
}

// Section finders — pluck one item (or all items) of a given __typename
// out of the About page's Dynamic Zone array.
/**
 * Flatten a Strapi "Blocks" rich-text field into plain text.
 *
 * LEARNING: Why this is needed
 * ──────────────────────────────
 * Strapi's rich-text (Blocks) editor field type does NOT return a plain
 * string over GraphQL — it returns a JSON tree of nodes, e.g.:
 *   [{ type: "paragraph", children: [{ type: "text", text: "Hello" }] }]
 *
 * If you render that object directly as a React child, you get:
 *   "Error: Objects are not valid as a React child (found: object with
 *    keys {type, children})"
 *
 * This function safely handles ALL possible shapes the CMS might send:
 *   - a plain string                → returned as-is
 *   - null / undefined              → empty string
 *   - a Blocks JSON array/tree      → walked recursively, text extracted
 *   - anything else                 → empty string (never crashes the page)
 */
function flattenRichText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    return value.map(flattenRichText).join("\n").trim();
  }

  if (typeof value === "object") {
    const node = value as { text?: unknown; children?: unknown };
    if (typeof node.text === "string") return node.text;
    if (node.children != null) return flattenRichText(node.children);
  }

  return "";
}

function byType<T extends GQLAboutSection>(sections: GQLAboutSection[], typename: string): T | undefined {
  return sections.find((s) => s.__typename === typename) as T | undefined;
}
function allByType<T extends GQLAboutSection>(sections: GQLAboutSection[], typename: string): T[] {
  return sections.filter((s) => s.__typename === typename) as T[];
}

function transformAboutData(raw: GQLAboutData): AboutPageData {
  const secs = raw.section ?? [];

  const aboutSec     = byType<GQLAboutInfo>(secs, "ComponentSharedAboutSection");
  const visionSecs   = allByType<GQLVisionSection>(secs, "ComponentSharedVision");
  const visionSec    = visionSecs.find((s) => s.heading?.toLowerCase().includes("vision"));
  const missionSec   = visionSecs.find((s) => s.heading?.toLowerCase().includes("mission"));
  const presidentSec = byType<GQLPresidentSection>(secs, "ComponentSharedPresident");
  const trusteesSec  = byType<GQLTrusteesSection>(secs, "ComponentSharedOurTrustees");
  const mgmtSec      = byType<GQLManagementSection>(secs, "ComponentSharedManagementTeam");
  const whySec       = byType<GQLWhyChooseSection>(secs, "ComponentSharedWhyChooseUs");
  const gallerySec   = byType<GQLGallerySection>(secs, "ComponentSharedGallery");

  const gallery: AboutPageData["gallery"] = [];
  for (const group of gallerySec?.gallery_section ?? []) {
    for (const img of group.Image ?? []) {
      const url = mediaUrl(img.url);
      if (url) gallery.push({ src: url, alt: img.alternativeText ?? "Gallery image" });
    }
  }

  return {
    bannerImage: mediaUrl(raw.About_banner?.url) ?? "/images/about_us_banner.png",

    about: aboutSec ? {
      heading:     aboutSec.heading,
      subheading:  aboutSec.subheading,
      description: aboutSec.description,
      image:       mediaUrl(aboutSec.featured_image?.url) ?? "/images/aboutHospitalImage.png",
      stats:       (aboutSec.features_details ?? []).map((f) => ({ label: f.heading, value: f.value })),
    } : null,

    vision:  visionSec  ? { title: visionSec.heading,  text: flattenRichText(visionSec.descriptions)  } : null,
    mission: missionSec ? { title: missionSec.heading, text: flattenRichText(missionSec.descriptions) } : null,

    founders: (presidentSec?.President_details ?? []).map((p) => ({
      name: p.name, role: p.position, description: p.description,
      image: mediaUrl(p.featured_image?.url),
    })),

    trustees: (trusteesSec?.trustee_details ?? []).map((t) => ({
      name: t.name, role: t.position, image: mediaUrl(t.featured_image?.url),
    })),

    management: (mgmtSec?.management_details ?? []).map((m) => ({
      name: m.name, designation: m.position, bio: m.description,
      image: mediaUrl(m.featured_image?.url),
    })),

    whyChooseUs: (whySec?.why_choose_details ?? []).map((w) => ({
      title: w.heading, description: w.subheading, image: mediaUrl(w.featured_image?.url),
    })),

    gallery,
  };
}

/** Fetch + transform the About page. Returns null on any failure (page uses local fallback). */
export async function getAboutPageData(): Promise<AboutPageData | null> {
  try {
    const result = await fetchGraphQL<{ about: GQLAboutData }>(
      ABOUT_PAGE_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.about] }
    );
    if (!result.about) {
      console.warn("[GraphQL] getAboutPageData: empty response");
      return null;
    }
    return transformAboutData(result.about);
  } catch (e) {
    console.error("[GraphQL] getAboutPageData failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1b. HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
// NOTE: The vendor's CMS field names here have quirks (Abour_US, News_hwading,
// capital "Heading" on some sub-objects) — see queries.ts and types.ts for
// the full explanation. We normalise all of that away in this transform, so
// every component downstream only ever sees clean, consistently-named data.

export interface CleanHomeFeature {
  label: string;
  value: string;
  icon: string | null;
}

export interface CleanHomeDeptPreview {
  id: string;
  bannerImage: string | null;
  heading: string;
  subheading: string;
}

export interface CleanNewsItem {
  heading: string;
  content: string;
  image: string | null;
}

export interface CleanFeaturedBlog {
  heading: string;
  subheading: string;
  image: string | null;
}

export interface HomePageData {
  bannerImage: string | null;
  about: {
    heading: string;
    subheading: string;
    description: string;
    image: string | null;
    stats: Array<{ label: string; value: string }>;        // features_details
    highlights: CleanHomeFeature[];                          // features (the 85 doctors / 18 departments style row)
  } | null;
  departmentsHeading: { heading: string; subheading: string } | null;
  departments: CleanHomeDeptPreview[];
  newsHeading: { heading: string; subheading: string } | null;
  news: CleanNewsItem[];
  blogHeading: { heading: string; subheading: string } | null;
  featuredBlog: CleanFeaturedBlog | null;
}

function transformHomeData(raw: GQLHome): HomePageData {
  const a = raw.Abour_US;

  return {
    bannerImage: mediaUrl(raw.Banner?.url),

    about: a ? {
      heading:     a.heading,
      subheading:  a.subheading,
      description: flattenRichText(a.description),
      image:       mediaUrl(a.featured_image?.url),
      stats:       (a.features_details ?? []).map((f) => ({ label: f.heading, value: f.value })),
      highlights:  (a.features ?? []).map((f) => ({
                     label: f.Heading,             // note: capital H in the CMS schema
                     value: f.value,
                     icon:  mediaUrl(f.icon?.url),
                   })),
    } : null,

    departmentsHeading: raw.Department_heading ? {
      heading:    raw.Department_heading.heading,
      subheading: raw.Department_heading.subheading,
    } : null,

    departments: (raw.departments ?? []).map((d) => ({
      id:          d.documentId,
      bannerImage: mediaUrl(d.banner?.url),
      heading:     d.general_medicine?.heading    ?? "",
      subheading:  d.general_medicine?.subheading ?? "",
    })),

    newsHeading: raw.News_hwading ? {            // note: vendor typo, kept as-is
      heading:    raw.News_hwading.heading,
      subheading: raw.News_hwading.subheading,
    } : null,

    news: (raw.News ?? []).map((n) => ({
      heading: n.Heading,                          // note: capital H in the CMS schema
      content: n.content,
      image:   mediaUrl(n.featured_image?.url),
    })),

    blogHeading: raw.Blog_heading ? {
      heading:    raw.Blog_heading.heading,
      subheading: raw.Blog_heading.subheading,
    } : null,

    featuredBlog: raw.blog ? {
      heading:    raw.blog.heading,
      subheading: raw.blog.subheading,
      image:      mediaUrl(raw.blog.featured_image?.url),
    } : null,
  };
}

/** Fetch + transform the Home page. Returns null on any failure (page uses local fallback). */
export async function getHomePageData(): Promise<HomePageData | null> {
  try {
    const result = await fetchGraphQL<{ home: GQLHome }>(
      GET_HOME_PAGE_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.home] }
    );
    if (!result.home) {
      console.warn("[GraphQL] getHomePageData: empty response");
      return null;
    }
    return transformHomeData(result.home);
  } catch (e) {
    console.error("[GraphQL] getHomePageData failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSULTANTS (Doctors)
// ─────────────────────────────────────────────────────────────────────────────

export interface CleanDoctor {
  id: string;
  name: string;
  designation: string;
  profileImage: string | null;
  viewProfile: string | null;
  bookAppointment: string | null;
  departments: Array<{ name: string; slug: string }>;
}

export async function getConsultantsData(): Promise<CleanDoctor[] | null> {
  try {
    const result = await fetchGraphQL<{ consultants: GQLConsultant[] }>(
      GET_CONSULTANTS_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.doctors] }
    );
    return (result.consultants ?? []).map((c) => ({
      id:              c.documentId,
      name:            c.name,
      designation:     c.designation ?? "",
      profileImage:    mediaUrl(c.profile_image?.url),
      viewProfile:     c.view_profile,
      bookAppointment: c.book_appointment,
      departments:     (c.departments ?? []).flatMap((d) =>
                         (d.department_categories ?? []).map((cat) => ({ name: cat.name, slug: cat.slug }))
                       ),
    }));
  } catch (e) {
    console.error("[GraphQL] getConsultantsData failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. DOCTER PAGE (doctors listing page banner/heading)
// ─────────────────────────────────────────────────────────────────────────────

export interface CleanDocterPage {
  bannerImage: string | null;
  heading: string;
  subheading: string;
}

export async function getDocterPageData(): Promise<CleanDocterPage | null> {
  try {
    const result = await fetchGraphQL<{ docter: GQLDocterPage }>(
      GET_DOCTER_PAGE_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.doctors] }
    );
    const d = result.docter;
    if (!d) return null;
    return {
      bannerImage: mediaUrl(d.Banner?.url),
      heading:     d.Docters?.heading ?? "Our Doctors",
      subheading:  d.Docters?.subheading ?? "",
    };
  } catch (e) {
    console.error("[GraphQL] getDocterPageData failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. DEPARTMENT CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

export interface CleanDeptCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export async function getDepartmentCategoriesData(): Promise<CleanDeptCategory[] | null> {
  try {
    const result = await fetchGraphQL<{ departmentCategories: GQLDepartmentCategory[] }>(
      GET_DEPARTMENT_CATEGORIES_QUERY, {}, { revalidate: 600, tags: [CACHE_TAGS.departments] }
    );
    return (result.departmentCategories ?? []).map((c) => ({
      id: c.documentId, name: c.name, slug: c.slug, description: c.description ?? "",
    }));
  } catch (e) {
    console.error("[GraphQL] getDepartmentCategoriesData failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. DEPARTMENT PAGE (listing page banner + category nav)
// ─────────────────────────────────────────────────────────────────────────────

export interface CleanDepartmentPage {
  bannerImage: string | null;
  categories: Array<{ name: string; slug: string }>;
}

export async function getDepartmentPageData(): Promise<CleanDepartmentPage | null> {
  try {
    const result = await fetchGraphQL<{ departmentPage: GQLDepartmentPage }>(
      GET_DEPARTMENT_PAGE_QUERY, {}, { revalidate: 600, tags: [CACHE_TAGS.departments] }
    );
    const sec = result.departmentPage?.Department_section;
    if (!sec) return null;
    const cats: Array<{ name: string; slug: string }> = [];
    for (const catSec of sec.Department_cat_section ?? []) {
      for (const catGroup of catSec.Department_cat ?? []) {
        for (const cat of catGroup.department_categories ?? []) {
          cats.push({ name: cat.name, slug: cat.slug });
        }
      }
    }
    return { bannerImage: mediaUrl(sec.Banner?.url), categories: cats };
  } catch (e) {
    console.error("[GraphQL] getDepartmentPageData failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. DEPARTMENT BY SLUG (detail page)
// ─────────────────────────────────────────────────────────────────────────────

export interface CleanDepartment {
  id: string;
  bannerImage: string | null;
  heading: string;
  subheading: string;
  features: Array<{ title: string; description: string; image: string | null }>;
  consultantSectionHeading: string;
  consultants: CleanDoctor[];
  categories: Array<{ name: string; slug: string }>;
}

export async function getDepartmentBySlug(slug: string): Promise<CleanDepartment | null> {
  try {
    const result = await fetchGraphQL<{ departments: GQLDepartment[] }>(
      GET_DEPARTMENT_BY_SLUG_QUERY, { slug }, { revalidate: 300, tags: [CACHE_TAGS.departments] }
    );
    const dept = result.departments?.[0];
    if (!dept) return null;

    const gm = dept.general_medicine;
    return {
      id:          dept.documentId,
      bannerImage: mediaUrl(dept.banner?.url),
      heading:     gm?.heading ?? "",
      subheading:  gm?.subheading ?? "",
      features:    (gm?.why_choose_details ?? []).map((f) => ({
                     title: f.heading, description: f.subheading, image: mediaUrl(f.featured_image?.url),
                   })),
      consultantSectionHeading: dept.consultant_section?.heading ?? "Our Consultants",
      consultants: (dept.consultants ?? []).map((c) => ({
                     id: c.documentId, name: c.name, designation: c.designation ?? "",
                     profileImage: mediaUrl(c.profile_image?.url),
                     viewProfile: c.view_profile, bookAppointment: c.book_appointment,
                     departments: [],
                   })),
      categories:  (dept.department_categories ?? []).map((c) => ({ name: c.name, slug: c.slug })),
    };
  } catch (e) {
    console.error(`[GraphQL] getDepartmentBySlug(${slug}) failed:`, e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. BLOG PAGE + BLOGS COLLECTION
// ─────────────────────────────────────────────────────────────────────────────

export interface CleanBlogItem {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
}

export interface CleanBlogPage {
  heading: string;
  subheading: string;
  blogs: CleanBlogItem[];
}

function mapBlogItems(blog: GQLBlog | null | undefined): CleanBlogItem[] {
  return (blog?.blogs ?? []).map((b, i) => ({
    id:      blog?.documentId ? `${blog.documentId}-${i}` : String(i),
    title:   b.heading,
    excerpt: b.subheading,
    image:   mediaUrl(b.featured_image?.url),
  }));
}

export async function getBlogPageData(): Promise<CleanBlogPage | null> {
  try {
    const result = await fetchGraphQL<{ blogPage: GQLBlogPage }>(
      GET_BLOG_PAGE_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.blogs] }
    );
    const bp = result.blogPage;
    if (!bp) return null;
    return {
      heading:    bp.heading_section?.heading    ?? "Health & Wellness Insights",
      subheading: bp.heading_section?.subheading ?? "",
      blogs:      mapBlogItems(bp.blogs),
    };
  } catch (e) {
    console.error("[GraphQL] getBlogPageData failed:", e);
    return null;
  }
}

export async function getAllBlogsData(): Promise<CleanBlogItem[] | null> {
  try {
    const result = await fetchGraphQL<{ blogs: GQLBlog[] }>(
      GET_BLOGS_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.blogs] }
    );
    return (result.blogs ?? []).flatMap((b) => mapBlogItems(b));
  } catch (e) {
    console.error("[GraphQL] getAllBlogsData failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. CAREER PAGE
// ─────────────────────────────────────────────────────────────────────────────

export interface CleanWhyItem {
  title: string;
  description: string;
  image: string | null;
}

export interface CleanJobOpening {
  heading: string;
  details: string | null;
  applyNow: string | null;
}

export interface CleanJobSection {
  heading: string;
  subheading: string;
  openings: CleanJobOpening[];
}

export interface CleanCareerPage {
  bannerImage: string | null;
  bannerHeading: string;
  bannerSubheading: string;
  whyWorkWithUs: CleanWhyItem[];
  jobSections: CleanJobSection[];
}

export async function getCareerPageData(): Promise<CleanCareerPage | null> {
  try {
    const result = await fetchGraphQL<{ career: GQLCareer }>(
      GET_CAREER_PAGE_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.careers] }
    );
    const c = result.career;
    if (!c) return null;

    const whyWork: CleanWhyItem[] = [];
    for (const item of c.why_work_with_us ?? []) {
      if (item.__typename === "ComponentSharedWhyChooseUs") {
        for (const d of item.why_choose_details ?? []) {
          whyWork.push({ title: d.heading, description: d.subheading, image: mediaUrl(d.featured_image?.url) });
        }
      }
    }

    return {
      bannerImage:      mediaUrl(c.banner_image?.url),
      bannerHeading:    c.Banner?.heading    ?? "Careers at TMPM Hospital",
      bannerSubheading: c.Banner?.subheading ?? "",
      whyWorkWithUs:    whyWork,
      jobSections: (c.current_openings ?? []).map((sec) => ({
        heading: sec.heading, subheading: sec.subheading,
        openings: (sec.current_opening_details ?? []).map((d) => ({
          heading:  d.heading,
          details:  d.details != null ? String(d.details) : null,
          applyNow: d.apply_now,
        })),
      })),
    };
  } catch (e) {
    console.error("[GraphQL] getCareerPageData failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────

export interface CleanContactInfo {
  heading: string;
  subheading: string;
  details: Array<{ label: string; value: string }>;
}

export async function getContactPageData(): Promise<CleanContactInfo | null> {
  try {
    const result = await fetchGraphQL<{ contactPage: GQLContactPage }>(
      GET_CONTACT_PAGE_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.contact] }
    );
    const sec = result.contactPage?.contact?.Contact_section;
    if (!sec) return null;
    return {
      heading:    sec.heading,
      subheading: sec.subheading,
      details:    (sec.contact_detail ?? []).map((d) => ({ label: d.heading, value: d.description })),
    };
  } catch (e) {
    console.error("[GraphQL] getContactPageData failed:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 10-12. PATIENT SERVICES — OPD / IPD / DAY CARE
// ─────────────────────────────────────────────────────────────────────────────

export interface CleanPatientPage {
  bannerImage: string | null;
  sections: CleanWhyItem[];
  contactInfo: CleanContactInfo | null;
}

function mapContactSection(cs: { heading: string; subheading: string; contact_detail: Array<{ heading: string; description: string }> } | null | undefined): CleanContactInfo | null {
  if (!cs) return null;
  return {
    heading: cs.heading,
    subheading: cs.subheading,
    details: (cs.contact_detail ?? []).map((d) => ({ label: d.heading, value: d.description })),
  };
}

export async function getOpdPageData(): Promise<CleanPatientPage | null> {
  try {
    const result = await fetchGraphQL<{ opd: GQLOpd }>(
      GET_OPD_PAGE_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.opd] }
    );
    const opd = result.opd;
    if (!opd) return null;

    const sections: CleanWhyItem[] = (opd.outpatient_department ?? []).flatMap((dept) =>
      (dept.why_choose_details ?? []).map((d) => ({
        title: d.heading, description: d.subheading, image: mediaUrl(d.featured_image?.url),
      }))
    );

    return {
      bannerImage: mediaUrl(opd.opd_banner?.url),
      sections,
      contactInfo: mapContactSection(opd.Opd_contact_form?.Contact_section),
    };
  } catch (e) {
    console.error("[GraphQL] getOpdPageData failed:", e);
    return null;
  }
}

export async function getIpdPageData(): Promise<CleanPatientPage | null> {
  try {
    const result = await fetchGraphQL<{ ipd: GQLIpd }>(
      GET_IPD_PAGE_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.ipd] }
    );
    const ipd = result.ipd;
    if (!ipd) return null;

    const sections: CleanWhyItem[] = (ipd.Inpatient_department ?? []).flatMap((dept) =>
      (dept.why_choose_details ?? []).map((d) => ({
        title: d.heading, description: d.subheading, image: mediaUrl(d.featured_image?.url),
      }))
    );

    return {
      bannerImage: mediaUrl(ipd.ipd_banner?.url),
      sections,
      contactInfo: mapContactSection(ipd.Contacts?.Contact_section),
    };
  } catch (e) {
    console.error("[GraphQL] getIpdPageData failed:", e);
    return null;
  }
}

export async function getDaycarePageData(): Promise<CleanPatientPage | null> {
  try {
    const result = await fetchGraphQL<{ daycare: GQLDaycare }>(
      GET_DAYCARE_PAGE_QUERY, {}, { revalidate: 300, tags: [CACHE_TAGS.daycare] }
    );
    const dc = result.daycare;
    if (!dc) return null;

    const sections: CleanWhyItem[] = (dc.day_care?.why_choose_details ?? []).map((d) => ({
      title: d.heading, description: d.subheading, image: mediaUrl(d.featured_image?.url),
    }));

    return {
      bannerImage: mediaUrl(dc.daycare_banner?.url),
      sections,
      contactInfo: mapContactSection(dc.contact?.Contact_section),
    };
  } catch (e) {
    console.error("[GraphQL] getDaycarePageData failed:", e);
    return null;
  }
}
