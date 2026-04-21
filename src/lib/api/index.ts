/**
 * Central API Service Layer
 * ─────────────────────────────────────────────────────────────────────────────
 * LEARNING NOTE — This is the most important file in the architecture.
 *
 * Every data request in the app goes through THIS file, never directly.
 * This gives us the "Strapi-first, local-fallback" pattern:
 *
 *   1. Try Strapi (if USE_STRAPI=true in .env.local)
 *   2. If Strapi fails → use local data silently
 *   3. Components never know which source provided the data
 *
 * When the vendor adds a new endpoint (e.g. /api/doctors), you:
 *   a. Add the fetch function in /lib/strapi/client.ts
 *   b. Add the transform function in /lib/strapi/transformers.ts
 *   c. Update the function below to try Strapi first
 *
 * That's it. Zero component changes needed.
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

// ── Strapi imports ────────────────────────────────────────────────────────────
import { fetchAboutPage, USE_STRAPI }    from "@/lib/strapi/client";
import { transformAboutPage }            from "@/lib/strapi/transformers";

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
// ABOUT PAGE — STRAPI INTEGRATED ✓
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the About page management team.
 * This is the first function fully powered by Strapi with local fallback.
 *
 * LEARNING NOTE — The pattern used here:
 *   1. Check if USE_STRAPI=true in env
 *   2. Try to fetch + transform from Strapi
 *   3. If any step throws, catch silently and use local data
 *   4. Return same ApiResponse<T> shape regardless of source
 */
export async function getManagementTeam(): Promise<ApiResponse<ManagementMember[]>> {
  if (USE_STRAPI) {
    try {
      const raw = await fetchAboutPage();
      if (raw) {
        const transformed = transformAboutPage(raw);
        if (transformed.management.length > 0) {
          return { data: transformed.management, success: true };
        }
      }
    } catch (error) {
      console.warn("[API] getManagementTeam Strapi failed, using local data:", error);
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
      const raw = await fetchAboutPage();
      if (raw) {
        const transformed = transformAboutPage(raw);
        const apiStats = transformed.about?.stats ?? [];
        if (apiStats.length > 0) {
          // Map transformer output → HospitalStat shape
          const stats: HospitalStat[] = apiStats.map((s, i) => ({
            id:     i + 1,
            value:  parseInt(s.value.replace(/[^0-9]/g, ""), 10) || 0,
            suffix: s.value.includes("+") ? "+" : "",
            label:  s.label,
            icon:   s.icon,
          }));
          return { data: stats, success: true };
        }
      }
    } catch (error) {
      console.warn("[API] getHospitalStats Strapi failed, using local data:", error);
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
      const raw = await fetchAboutPage();
      if (raw) {
        const transformed = transformAboutPage(raw);
        if (transformed.gallery.length > 0) {
          return { data: transformed.gallery, success: true };
        }
      }
    } catch (error) {
      console.warn("[API] getGalleryImages Strapi failed, using local data:", error);
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
