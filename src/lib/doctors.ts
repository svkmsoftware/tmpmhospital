import { departments as allDepartments } from "@/data/departments";
import type { Doctor } from "@/types";

// The first personal name after "Dr." — e.g. "Dr. Girish Vitthalrao
// Vadgaonkar" sorts by "Girish", not by the full string. Used to order
// consultants alphabetically, both within a department and across "All".
export function firstNameOf(fullName: string): string {
  return fullName.replace(/^Dr\.?\s*/i, "").split(/\s+/)[0] ?? fullName;
}

export interface DepartmentGroup {
  slug: string;
  title: string;
  doctors: Doctor[];
}

const OTHER_SLUG = "__other__";

// Groups doctors under the (real) department each belongs to, alphabetically
// by department title, with each group's doctors alphabetical by first name.
// A doctor with no department set (or one that doesn't match a real
// department slug) falls into "Other Specialists" at the end, rather than
// silently disappearing.
export function groupDoctorsByDepartment(doctors: Doctor[]): DepartmentGroup[] {
  const titleBySlug = new Map(
    allDepartments.flatMap((cat) => cat.items.map((item) => [item.slug, item.title] as const)),
  );

  const groups = new Map<string, DepartmentGroup>();

  for (const doctor of doctors) {
    const slug = doctor.department.find((s) => titleBySlug.has(s)) ?? OTHER_SLUG;
    const title = slug === OTHER_SLUG ? "Other Specialists" : titleBySlug.get(slug)!;

    if (!groups.has(slug)) groups.set(slug, { slug, title, doctors: [] });
    groups.get(slug)!.doctors.push(doctor);
  }

  for (const group of groups.values()) {
    group.doctors.sort((a, b) => firstNameOf(a.name).localeCompare(firstNameOf(b.name)));
  }

  return [...groups.values()].sort((a, b) => {
    if (a.slug === OTHER_SLUG) return 1;
    if (b.slug === OTHER_SLUG) return -1;
    return a.title.localeCompare(b.title);
  });
}
