interface InactivePage {
  slug: string;
  type: "department" | "service" | "doctor" | "generic";
  estimatedLaunch?: string;
  message?: string;
}

const inactivePages: InactivePage[] = [
  // ── Example: Add department slugs here when they're not yet operational ──

  { slug: "cardiology", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "general-surgery", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "ent", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "dermatology", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "psychiatry", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "pulmonology", type: "department", estimatedLaunch: "Sep 2026" },

  // { slug: "dental", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "ophthalmology", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "laser-surgery", type: "department", estimatedLaunch: "Sep 2026" },


  { slug: "oncology", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "cardiac-sciences", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "neurosciences", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "nephrology", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "gastroenterology", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "plastic-surgery", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "vascular-surgery", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "pediatric-surgery", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "arthroscopy", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "joint-replacement", type: "department", estimatedLaunch: "Sep 2026" },


  { slug: "dialysis", type: "department", estimatedLaunch: "Sep 2026" },
  { slug: "blood-bank", type: "department", estimatedLaunch: "Sep 2026" },

  // { slug: "dermatology", type: "department", estimatedLaunch: "Sep 2026" },
  // { slug: "neurosciences", type: "department", estimatedLaunch: "Oct 2026" },
  // { slug: "vascular-surgery", type: "department", message: "This service will be available shortly." },
];

export function isPageActive(slug: string, type: InactivePage["type"] = "department"): boolean {
  return !inactivePages.some((p) => p.slug === slug && p.type === type);
}

export function getPageStatus(slug: string, type: InactivePage["type"] = "department"): InactivePage | undefined {
  return inactivePages.find((p) => p.slug === slug && p.type === type);
}

export type { InactivePage };
