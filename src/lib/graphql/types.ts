/**
 * GraphQL Response Types — TMPM Hospital CMS (Unified)
 * ─────────────────────────────────────────────────────────────────────────────
 * Every TypeScript type describing a GraphQL response lives in this one file.
 * There is no separate "about" types file — About's types sit alongside
 * every other page's types, using the SAME shared building blocks
 * (GQLImage, GQLHeadingSection, GQLContact, etc.) instead of each page
 * reinventing its own near-identical version.
 *
 * LEARNING: REST vs GraphQL response shapes
 * ──────────────────────────────────────────
 * REST API response looks like:
 *   { data: { id: 1, attributes: { heading: "...", section: [...] } } }
 *   (Strapi wraps everything in `data` and `attributes`)
 *
 * GraphQL response looks like:
 *   { data: { about: { About_banner: {...}, section: [...] } } }
 *   (Much cleaner — you get exactly what you asked for, no wrappers)
 *
 * LEARNING: What is a Union Type in GraphQL?
 * ──────────────────────────────────────────
 * The `section` field on the About page is a "Dynamic Zone" — it can be one
 * of many different component types. GraphQL handles this with a Union type
 * plus the `__typename` discriminator field.
 *
 * When you query:
 *   section {
 *     __typename                                      ← which type is this object?
 *     ... on ComponentSharedAboutSection { heading }   ← conditional fields
 *     ... on ComponentSharedVision { descriptions }    ← conditional fields
 *   }
 *
 * TypeScript mirrors this with a "discriminated union": when code checks
 * `__typename === "ComponentSharedVision"`, TypeScript automatically narrows
 * the type to GQLVisionSection for you. That's why every section type below
 * declares a literal __typename string.
 */

// ─────────────────────────────────────────────────────────────────────────────
// SHARED BUILDING BLOCKS — used across every page's types
// ─────────────────────────────────────────────────────────────────────────────

/** A Strapi media file returned by GraphQL — used for every image/file field. */
export interface GQLImage {
  url: string;                          // e.g. "/uploads/aboutHospitalImage.png"
  alternativeText?: string | null;
  name?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface GQLVideo {
  url: string;
}

export interface GQLSocialIcon {
  icon: GQLImage | null;
}

export interface GQLHeadingSection {
  heading: string;
  subheading: string;
}

export interface GQLFeatureDetail {
  heading: string;
  value: string;
}

export interface GQLWhyChooseDetail {
  heading: string;
  subheading: string;
  featured_image: GQLImage | null;
}

export interface GQLWhyChooseUs {
  heading: string;
  subheading: string;
  why_choose_details: GQLWhyChooseDetail[];
}

export interface GQLContactDetail {
  heading: string;
  description: string;
}

export interface GQLContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface GQLContactSection {
  heading: string;
  subheading: string;
  contact_detail: GQLContactDetail[];
  Contact_form?: GQLContactForm | null;
}

/** The Contact content-type — every patient-service page (OPD/IPD/Daycare/ContactPage) links to one of these. */
export interface GQLContact {
  documentId: string;
  Contact_section: GQLContactSection | null;
}

export interface GQLCurrentOpeningDetail {
  heading: string;
  details: unknown;   // JSON type from CMS — stringified at the service layer
  apply_now: string | null;
}

export interface GQLCurrentOpenings {
  heading: string;
  subheading: string;
  current_opening_details: GQLCurrentOpeningDetail[];
}

export interface GQLBlogItem {
  heading: string;
  subheading: string;
  featured_image: GQLImage | null;
}

export interface GQLDeptCategoryRef {
  name: string;
  slug: string;
}

export interface GQLDepartmentRef {
  documentId: string;
  department_categories: GQLDeptCategoryRef[];
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE — Dynamic Zone section types
// Each interface below maps to one "... on ComponentShared..." fragment.
// ─────────────────────────────────────────────────────────────────────────────

/** ComponentSharedAboutSection */
export interface GQLAboutInfo {
  __typename: "ComponentSharedAboutSection";
  heading: string;
  subheading: string;
  description: string;
  featured_image: GQLImage | null;
  featured_video: GQLVideo | null;
  features_details: GQLFeatureDetail[];
}

/** ComponentSharedVision — used for BOTH the Vision block and the Mission block */
export interface GQLVisionSection {
  __typename: "ComponentSharedVision";
  heading: string;        // Will be "Vision" or "Mission"
  /**
   * Strapi "Blocks" rich-text field. Despite the GraphQL schema saying
   * String, the CMS can return either a plain string OR a JSON Blocks
   * tree (e.g. [{ type: "paragraph", children: [{ type: "text", text: "..." }] }]).
   * Always pass this through flattenRichText() in services.ts before
   * rendering — never render it directly.
   */
  descriptions: unknown;
}

export interface GQLPresidentDetail {
  position: string;
  name: string;
  description: string;
  featured_image: GQLImage | null;
}

/** ComponentSharedPresident */
export interface GQLPresidentSection {
  __typename: "ComponentSharedPresident";
  heading: string;
  subheading: string;
  President_details: GQLPresidentDetail[];
}

export interface GQLTrusteeDetail {
  name: string;
  position: string;
  featured_image: GQLImage | null;
}

/** ComponentSharedOurTrustees */
export interface GQLTrusteesSection {
  __typename: "ComponentSharedOurTrustees";
  heading: string;
  subheading: string;
  description: string;
  trustee_details: GQLTrusteeDetail[];
}

export interface GQLManagementDetail {
  name: string;
  position: string;
  description: string;
  featured_image: GQLImage | null;
  social_icon: GQLSocialIcon[];
}

/** ComponentSharedManagementTeam */
export interface GQLManagementSection {
  __typename: "ComponentSharedManagementTeam";
  heading: string;
  subheading: string;
  management_details: GQLManagementDetail[];
}

/** ComponentSharedWhyChooseUs (as it appears inside the About page Dynamic Zone — same shape as GQLWhyChooseUs, plus __typename) */
export interface GQLWhyChooseSection extends GQLWhyChooseUs {
  __typename: "ComponentSharedWhyChooseUs";
}

export interface GQLGalleryGroup {
  Image: GQLImage[];
}

/** ComponentSharedGallery */
export interface GQLGallerySection {
  __typename: "ComponentSharedGallery";
  heading: string;
  subheading: string;
  gallery_section: GQLGalleryGroup[];
}

/** ComponentSharedContact (as it appears inside the About page Dynamic Zone) */
export interface GQLAboutContactSection {
  __typename: "ComponentSharedContact";
  heading: string;
  subheading: string;
  contact_detail: GQLContactDetail[];
}

/**
 * The TypeScript Union covering every possible About-page section type.
 * This mirrors the GraphQL Union exactly — when code checks __typename,
 * TypeScript automatically narrows to the matching interface above.
 */
export type GQLAboutSection =
  | GQLAboutInfo
  | GQLVisionSection
  | GQLPresidentSection
  | GQLTrusteesSection
  | GQLManagementSection
  | GQLWhyChooseSection
  | GQLGallerySection
  | GQLAboutContactSection;

/** Top-level About data returned by GraphQL */
export interface GQLAboutData {
  About_banner: GQLImage | null;
  section: GQLAboutSection[];
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
// NOTE: This content type has its own field-naming quirks, copied exactly
// as the vendor's CMS schema defines them (see queries.ts for details).

/** A single stat shown in the "features" mini-grid (distinct from features_details — note capital Heading here). */
export interface GQLHomeFeature {
  value: string;
  Heading: string;
  icon: GQLImage | null;
}

/** Abour_US — the Home page's About teaser block (vendor's own spelling/typo). */
export interface GQLHomeAboutUs {
  heading: string;
  subheading: string;
  description: string;
  featured_image: GQLImage | null;
  featured_video: GQLVideo | null;
  features_details: GQLFeatureDetail[];
  features: GQLHomeFeature[];
}

/** A department preview card as embedded on the Home page (lighter than the full GQLDepartment). */
export interface GQLHomeDepartmentPreview {
  documentId: string;
  banner: GQLImage | null;
  general_medicine: GQLHeadingSection | null;
  consultant_section: GQLHeadingSection | null;
  Blog_Section: GQLHeadingSection | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** A News & Events item (note capital Heading, and `content` instead of subheading/description). */
export interface GQLHomeNewsItem {
  Heading: string;
  content: string;
  featured_image: GQLImage | null;
}

/** The single featured blog teaser shown on the Home page (singular `blog`, not the `blogs[]` collection). */
export interface GQLHomeFeaturedBlog {
  heading: string;
  subheading: string;
  featured_image: GQLImage | null;
}

// export interface GQLHome {
//   Banner: GQLImage | null;
//   Abour_US: GQLHomeAboutUs | null;
//   Department_heading: GQLHeadingSection | null;
//   departments: GQLHomeDepartmentPreview[];
//   News_hwading: GQLHeadingSection | null;
//   News: GQLHomeNewsItem[];
//   Blog_heading: GQLHeadingSection | null;
//   blog: GQLHomeFeaturedBlog | null;
// }


export interface GQLHome {
  Banner: GQLImage | null;
  Abour_US: GQLHomeAboutUs | null;

  WhySVKM: {
    heading: string;
    Subheading: string;   // note: capital S in the CMS schema — vendor inconsistency
    content: string;
    Why_vkm: Array<{ heading: string; value: string }>;
  } | null;

  docters_advice: {
    heading: string;
    subheading: string;
    docters_advice_section: Array<{
      advice_video: { url: string } | null;
      department_category: { documentId: string; name: string; slug: string } | null;
    }>;
  } | null;

  health_insight: {
    heading: string;
    subheading: string;
    blogs: Array<{
      documentId: string;
      heading: string;
      subheading: string;
      featured_image: GQLImage | null;
    }>;
  } | null;

  Testimonial_section: {
    heading: string;
    subheading: string;
    content: string;
    testimonials: Array<{
      documentId: string;
      Author_name: string;
      message: unknown; // Strapi Blocks rich-text — run through flattenRichText()
      Department: string;
    }>;
  } | null;

  faq_section: {
    heading: string;
    subheading: string;
    content: string;
    details: Array<{ heading: string; value: string }>;
    faq_details: Array<{ Question: string; Answer: string }>;
  } | null;

  our_facilities: {
    heading: string;
    subheading: string;
    gallery: Array<{
      heading: string;
      image: GQLImage | null;
    }>;
  } | null;

  Department_heading: GQLHeadingSection | null;
  departments: GQLHomeDepartmentPreview[];
  News_hwading: GQLHeadingSection | null;
  News: GQLHomeNewsItem[];
  Blog_heading: GQLHeadingSection | null;
  blog: GQLHomeFeaturedBlog | null;
}

export interface CleanWhyChooseItem {
  title: string;
  description: string;
}

export interface CleanDoctorsAdviceItem {
  videoUrl: string | null;
  department: { name: string; slug: string } | null;
}

export interface CleanTestimonial {
  id: string;
  name: string;
  message: string;
  department: string;
}

export interface CleanFaqItem {
  question: string;
  answer: string;
}

export interface CleanBlogItem {
  id: string;
  heading: string;
  subheading: string;
  image: string | null;
}

export interface CleanHomeFeature {
  title: string;
  description: string;
  image: string | null;
}

export interface HomePageData {
  bannerImage: string | null;
  about: {
    heading: string;
    subheading: string;
    description: string;
    image: string | null;
    video: string | null;
    stats: Array<{ label: string; value: string }>;
    highlights: CleanHomeFeature[];
  } | null;

  whyChooseUs: {
    heading: string;
    subheading: string;
    content: string;
    items: CleanWhyChooseItem[];
  } | null;

  doctorsAdvice: {
    heading: string;
    subheading: string;
    items: CleanDoctorsAdviceItem[];
  } | null;

  healthInsight: {
    heading: string;
    subheading: string;
    blogs: CleanBlogItem[];
  } | null;

  testimonialsSection: {
    heading: string;
    subheading: string;
    content: string;
    items: CleanTestimonial[];
  } | null;

  faqSection: {
    heading: string;
    subheading: string;
    content: string;
    contactDetails: Array<{ label: string; value: string }>;
    items: CleanFaqItem[];
  } | null;

  facilitiesGallery: {
    heading: string;
    subheading: string;
    images: Array<{ src: string | null; alt: string }>;
  } | null;

  Department_heading: GQLHeadingSection | null;
  departments: GQLHomeDepartmentPreview[];
  News_hwading: GQLHeadingSection | null;
  News: GQLHomeNewsItem[];
  Blog_heading: GQLHeadingSection | null;
  blog: GQLHomeFeaturedBlog | null;
}



export interface GQLConsultant {
  documentId: string;
  name: string;
  designation: string | null;
  view_profile: string | null;
  book_appointment: string | null;
  profile_image: GQLImage | null;
  departments: GQLDepartmentRef[];
}

/** Doctors LISTING page settings (note: "Docter" is a typo in the CMS schema itself) */
export interface GQLDocterPage {
  Banner: GQLImage | null;
  Docters: GQLHeadingSection | null;
  department_category: GQLDeptCategoryRef | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// DEPARTMENTS
// ─────────────────────────────────────────────────────────────────────────────

export interface GQLDepartmentCategory {
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface GQLDepartmentConsultant {
  documentId: string;
  name: string;
  designation: string | null;
  view_profile: string | null;
  book_appointment: string | null;
  profile_image: GQLImage | null;
}

export interface GQLDepartment {
  documentId: string;
  banner: GQLImage | null;
  general_medicine: GQLWhyChooseUs | null;   // always this field name regardless of dept
  consultant_section: GQLHeadingSection | null;
  consultants: GQLDepartmentConsultant[];
  department_categories: GQLDeptCategoryRef[];
}

export interface GQLDepartmentCatSection {
  heading: string;
  subheading: string;
  Department_cat: Array<{
    department_categories: GQLDeptCategoryRef[];
  }>;
}

export interface GQLDepartmentPageSection {
  Banner: GQLImage | null;
  Department_cat_section: GQLDepartmentCatSection[];
}

export interface GQLDepartmentPage {
  Department_section: GQLDepartmentPageSection | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG
// ─────────────────────────────────────────────────────────────────────────────

export interface GQLBlog {
  documentId: string;
  blogs: GQLBlogItem[];
}

export interface GQLBlogPage {
  heading_section: GQLHeadingSection | null;
  blogs: GQLBlog | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// CAREER
// ─────────────────────────────────────────────────────────────────────────────

export interface GQLCareerWhyWorkItem {
  __typename: "ComponentSharedWhyChooseUs";
  heading: string;
  subheading: string;
  why_choose_details: GQLWhyChooseDetail[];
}

export interface GQLCareer {
  Banner: GQLHeadingSection | null;
  why_work_with_us: GQLCareerWhyWorkItem[];
  current_openings: GQLCurrentOpenings[];
  banner_image: GQLImage | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────

export interface GQLContactPage {
  heading: GQLHeadingSection | null;
  contact: GQLContact | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// PATIENT SERVICES — OPD / IPD / DAY CARE
// ─────────────────────────────────────────────────────────────────────────────

export interface GQLOpd {
  opd_banner: GQLImage | null;
  outpatient_department: GQLWhyChooseUs[];
  Opd_contact_form: GQLContact | null;
}

export interface GQLIpd {
  ipd_banner: GQLImage | null;
  Inpatient_department: GQLWhyChooseUs[];
  Contacts: GQLContact | null;
}

export interface GQLDaycare {
  daycare_banner: GQLImage | null;
  day_care: GQLWhyChooseUs | null;
  contact: GQLContact | null;
}
