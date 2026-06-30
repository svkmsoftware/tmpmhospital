/**
 * Central API Service Layer
 * ─────────────────────────────────────────────────────────────────────────────
 * LEARNING NOTE — This is the most important file in the architecture.
 *
 * Every data request in the app goes through THIS file, never directly.
 * This gives us the "GraphQL-first, local-fallback" pattern:
 *
 *   1. Try GraphQL (if USE_STRAPI=true in .env.local)
 *   2. If GraphQL fails → use local data silently
 *   3. Components never know which source provided the data
 *
 * Most pages (About, Doctors, Departments, Blogs, Careers, Contact,
 * OPD, IPD, Day Care) call the GraphQL services directly from
 * src/lib/graphql/services.ts — this file only wraps the handful of
 * homepage-level helpers (management team, hospital stats, gallery)
 * that pull from the SAME About-page query, plus everything that has
 * no CMS endpoint yet and is local-data-only by design (doctors list,
 * department list, blogs list, job openings, insurance, testimonials, FAQs).
 *
 * When the vendor adds a brand-new endpoint, add the query + service
 * function to src/lib/graphql/queries.ts / services.ts first, then
 * wire it into the relevant function below or call it directly from
 * the page — see the developer reference doc, Section 5.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type {
  ApiResponse,
  Doctor,
  DepartmentItem,
  DepartmentCategory,
  Blog,
  JobOpening,
  InsuranceCompany,
  Testimonial,
  FAQ,
  HospitalStat,
  GalleryImage,
  InfoSection,
  OpdSection,
  ManagementMember,
} from "@/types";

// ── Local (mock) data imports ─────────────────────────────────────────────────
import { doctors as doctorsData }       from "@/data/doctors";
import { departments as departmentsData } from "@/data/departments";
import { blogs as blogsData }            from "@/data/blogs";
import {
  jobOpenings as jobsData,
  ipdData     as ipdRaw,
  opdData     as opdRaw,
  dayCareData as dayCareRaw,
}                                        from "@/data/services";
import {
  testimonials      as testimonialsData,
  hospitalStats     as statsData,
  faqs              as faqsData,
  galleryImages     as galleryData,
  insuranceCompanies as insuranceData,
  managementTeam    as managementData,
} from "@/data/static";

// ── GraphQL imports ────────────────────────────────────────────────────────────
// The 3 functions below (getManagementTeam, getHospitalStats, getGalleryImages)
// all pull from the SAME About page query, so they share one fetch via
// getAboutPageData() — the unified GraphQL service used by the rest of the app.
import { getAboutPageData } from "@/lib/graphql/services";

const USE_STRAPI = process.env.USE_STRAPI === "true";

// ─────────────────────────────────────────────────────────────────────────────
// DOCTORS
// ─────────────────────────────────────────────────────────────────────────────

export async function getDoctors(): Promise<ApiResponse<Doctor[]>> {
  // TODO: When vendor adds /api/doctors endpoint, switch to Strapi here:
  // if (USE_STRAPI) {
  //   const raw = await fetchDoctors();
  //   if (raw) return { data: transformDoctors(raw), success: true };
  // }
  return { data: doctorsData, success: true };
}

export async function getDoctorById(id: number): Promise<ApiResponse<Doctor | null>> {
  const doctor = doctorsData.find((d) => d.id === id) ?? null;
  return { data: doctor, success: !!doctor };
}

// ─────────────────────────────────────────────────────────────────────────────
// DEPARTMENTS
// ─────────────────────────────────────────────────────────────────────────────

export async function getDepartments(): Promise<ApiResponse<DepartmentCategory[]>> {
  // TODO: When vendor adds /api/departments endpoint:
  // if (USE_STRAPI) { ... }
  return { data: departmentsData, success: true };
}

export async function getDepartmentBySlug(
  slug: string
): Promise<ApiResponse<DepartmentItem | null>> {
  let found: DepartmentItem | null = null;
  for (const cat of departmentsData) {
    const item = cat.items.find((i) => i.slug === slug);
    if (item) { found = item; break; }
  }
  return { data: found, success: !!found };
}

export async function getAllDepartmentSlugs(): Promise<string[]> {
  return departmentsData.flatMap((cat) => cat.items.map((i) => i.slug));
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOGS
// ─────────────────────────────────────────────────────────────────────────────

export async function getBlogs(limit?: number): Promise<ApiResponse<Blog[]>> {
  // TODO: When vendor adds /api/blogs endpoint:
  // if (USE_STRAPI) { ... }
  const data = limit ? blogsData.slice(0, limit) : blogsData;
  return {
    data,
    success: true,
    pagination: {
      page: 1,
      limit: data.length,
      total: blogsData.length,
      totalPages: 1,
    },
  };
}

export async function getBlogById(id: number): Promise<ApiResponse<Blog | null>> {
  const blog = blogsData.find((b) => b.id === id) ?? null;
  return { data: blog, success: !!blog };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOMEPAGE / ABOUT-DERIVED DATA — GraphQL Integrated ✓
// (management team, hospital stats, and gallery all come from the same
//  About-page GraphQL query — see getAboutPageData() in lib/graphql/services.ts)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the management team for display on the homepage / about page.
 *
 * LEARNING NOTE — The pattern used here:
 *   1. Check if USE_STRAPI=true in env
 *   2. Try to fetch + transform from GraphQL
 *   3. If any step throws, catch silently and use local data
 *   4. Return same ApiResponse<T> shape regardless of source
 */
export async function getManagementTeam(): Promise<ApiResponse<ManagementMember[]>> {
  if (USE_STRAPI) {
    try {
      const data = await getAboutPageData();
      if (data && data.management.length > 0) {
        const management: ManagementMember[] = data.management.map((m, i) => ({
          id:          i + 1,
          name:        m.name,
          designation: m.designation,
          image:       m.image ?? "/images/managementTeam/user.png",
          bio:         m.bio,
        }));
        return { data: management, success: true };
      }
    } catch (error) {
      console.warn("[API] getManagementTeam GraphQL failed, using local data:", error);
    }
  }
  return { data: managementData, success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// JOBS / CAREERS
// ─────────────────────────────────────────────────────────────────────────────

export async function getJobOpenings(): Promise<ApiResponse<JobOpening[]>> {
  // TODO: When vendor adds /api/job-openings endpoint:
  // if (USE_STRAPI) { ... }
  return { data: jobsData, success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// INSURANCE
// ─────────────────────────────────────────────────────────────────────────────

export async function getInsuranceCompanies(): Promise<ApiResponse<InsuranceCompany[]>> {
  return { data: insuranceData, success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<ApiResponse<Testimonial[]>> {
  return { data: testimonialsData, success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOSPITAL STATS
// ─────────────────────────────────────────────────────────────────────────────

export async function getHospitalStats(): Promise<ApiResponse<HospitalStat[]>> {
  if (USE_STRAPI) {
    try {
      const data = await getAboutPageData();
      const apiStats = data?.about?.stats ?? [];
      if (apiStats.length > 0) {
        // Map GraphQL output → HospitalStat shape
        const stats: HospitalStat[] = apiStats.map((s, i) => ({
          id:     i + 1,
          value:  parseInt(s.value.replace(/[^0-9]/g, ""), 10) || 0,
          suffix: s.value.includes("+") ? "+" : "",
          label:  s.label,
          icon:   "stethoscope",
        }));
        return { data: stats, success: true };
      }
    } catch (error) {
      console.warn("[API] getHospitalStats GraphQL failed, using local data:", error);
    }
  }
  return { data: statsData, success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────────────────────

export async function getFAQs(): Promise<ApiResponse<FAQ[]>> {
  return { data: faqsData, success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────────────────────────────────

export async function getGalleryImages(): Promise<ApiResponse<GalleryImage[]>> {
  if (USE_STRAPI) {
    try {
      const data = await getAboutPageData();
      if (data && data.gallery.length > 0) {
        const gallery: GalleryImage[] = data.gallery.map((g, i) => ({
          id:       i + 1,
          src:      g.src,
          alt:      g.alt,
          category: "Facilities",
        }));
        return { data: gallery, success: true };
      }
    } catch (error) {
      console.warn("[API] getGalleryImages GraphQL failed, using local data:", error);
    }
  }
  return { data: galleryData, success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// PATIENT SERVICES (IPD / OPD / Day Care)
// ─────────────────────────────────────────────────────────────────────────────

export async function getIpdData(): Promise<ApiResponse<InfoSection[]>> {
  return { data: ipdRaw, success: true };
}

export async function getOpdData(): Promise<ApiResponse<OpdSection[]>> {
  return { data: opdRaw, success: true };
}

export async function getDayCareData(): Promise<ApiResponse<InfoSection[]>> {
  return { data: dayCareRaw, success: true };
}
