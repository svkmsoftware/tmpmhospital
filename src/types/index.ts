// ─── Doctor ───────────────────────────────────────────────────────────────────
export interface OpdTiming {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface DoctorBioData {
  opdTiming: OpdTiming;
  aboutDoctor: string[];
  educationQualification: string[];
  experience: string[];
  honoursAndAwards: string[];
  publication: string[];
}

export interface Doctor {
  id: number;
  name: string;
  tags: string[];
  profilePhoto: string;
  bio_data: DoctorBioData;
  department: string[];
}

// ─── Department ───────────────────────────────────────────────────────────────
export interface DepartmentConsultant {
  name: string;
  tags: string[];
  profilePhoto: string;
}

export interface DepartmentTab {
  name: string;
  image: string;
  intro: string;
  details: string | string[];
}

export interface DepartmentItem {
  slug: string;
  title: string;
  banner_image: string;
  /** Optional wide (1920x480) image for the department detail page's hero banner.
   *  Falls back to banner_image when absent, so this is safe to omit. */
  heroImage?: string;
  description: string;
  icon: string;
  tabs: DepartmentTab[];
  consultants: DepartmentConsultant[];
}

export interface DepartmentCategory {
  category: string;
  tagline: string;
  items: DepartmentItem[];
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export interface BlogContentBlock {
  type: "paragraph" | "heading" | "list" | "orderedList";
  text?: string; // supports **bold** inline markup
  items?: string[]; // for "list" / "orderedList" — each item supports **bold** inline markup
  /** For type "heading" only — 2 = major section (default), 3 = sub-section. */
  level?: 2 | 3;
}

export interface Blog {
  id: number;
  title: string;
  category: string;
  /** Thumbnail — used on the listing page (cards, featured strip). */
  image: string;
  /** Optional — wide hero image for the individual blog page's banner.
   *  Falls back to `image` when absent, so this is safe to omit. */
  heroImage?: string;
  link: string;
  date: string;
  excerpt: string;
  author: string;
  /** Optional — id of a `Doctor` (see doctors.ts) to credit as the author.
   *  When present, the doctor's real name, designation, and photo are resolved
   *  automatically for the byline and hero banner — no need to bake author
   *  info into the `author` string or a custom hero image. */
  authorId?: number;
  /** Optional — when present, "Read More" links to /blogs/<slug> instead of being inert. */
  slug?: string;
  /** Optional — full article body. Only local blogs with this can have a detail page right now. */
  content?: BlogContentBlock[];
  /** Optional SEO metadata for the detail page. */
  seoTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
}

// ─── Job Opening ──────────────────────────────────────────────────────────────
export interface ExperienceRequirement {
  year: number;
  description: string;
}

export interface JobOpening {
  id: number;
  designation: string;
  numberOfPost: number;
  educationQualification: string[];
  yearsOfExperience: ExperienceRequirement[];
  applicationStartDate: string;
  applicationEndDate: string;
  department?: string;
  location?: string;
}

// ─── Insurance Company ────────────────────────────────────────────────────────
export interface InsuranceCompany {
  id: number;
  name: string;
  imageUrl: string;
  docLink: string;
}

// ─── IPD / Day Care ───────────────────────────────────────────────────────────
export interface InfoSection {
  title: string;
  description: string[];
  image: string;
}

// ─── OPD ──────────────────────────────────────────────────────────────────────
export interface OpdScheduleEntry {
  department: string;
  doctor: string;
  days: string;
  timings: string;
  room: string;
}

export interface OpdSection {
  section: string;
  description?: string;
  image?: string;
  schedule?: OpdScheduleEntry[];
}

// ─── Vision Mission ───────────────────────────────────────────────────────────
export interface MissionPoint {
  icon: string;
  text: string;
}

export interface VisionMissionData {
  vision: { icon: string; title: string; text: string };
  mission: { icon: string; title: string; points: MissionPoint[] };
}

// ─── Management Team ──────────────────────────────────────────────────────────
export interface ManagementMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  bio?: string;
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
  /** Optional — paste any YouTube link (watch, youtu.be, or embed form).
   *  When present, the video plays inline in place of the static photo. */
  videoUrl?: string;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

// ─── Stat ─────────────────────────────────────────────────────────────────────
export interface HospitalStat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

// ─── Why Work With Us ─────────────────────────────────────────────────────────
export interface WhyWorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

// ─── API Response wrapper ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
