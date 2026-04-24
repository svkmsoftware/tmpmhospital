import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Stethoscope, Scissors, Heart, Users, Building2 } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getDepartments } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { DepartmentItem } from "@/types";

export const metadata: Metadata = {
  title: "Departments & Services",
  description:
    "Explore all medical departments at SVKM's TMPM Hospital — Specialty, Super Specialty, and Support Services. World-class care in Shirpur, Maharashtra.",
  alternates: { canonical: "https://www.tmpmhospital.com/departments" },
};

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  stethoscope: Stethoscope,
  scissors: Scissors,
  heart: Heart,
  baby: Users,
  bone: Building2,
  syringe: Stethoscope,
  eye: Stethoscope,
  user: Users,
  ear: Stethoscope,
};

function DeptCard({ dept }: { dept: DepartmentItem }) {
  const Icon = iconMap[dept.icon] ?? Stethoscope;
  return (
    <Link
      href={`/departments/${dept.slug}`}
      className="card group p-6 flex flex-col gap-4 h-full"
      aria-label={`${dept.title} department`}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100">
        <Image
          src={dept.banner_image}
          alt={dept.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center">
            <Icon className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-neutral-800 group-hover:text-blue-700 transition-colors">
          {dept.title}
        </h3>
        <p className="text-sm text-neutral-500 line-clamp-2 flex-1">{dept.description}</p>
        <div className="flex items-center gap-1 text-sm font-medium mt-2" style={{ color: "var(--color-primary)" }}>
          Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default async function DepartmentsPage() {
  const { data: departments } = await getDepartments();

  const categoryColors: Record<string, string> = {
    Specialty: "bg-blue-50 text-blue-700 border-blue-200",
    "Super Specialty": "bg-purple-50 text-purple-700 border-purple-200",
    "Diagnostic & Support Services": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Future Likely More Clinical Departments": "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <>

      <PageBanner
        image="/images/departments_banner.png"
        title="Departments & Services"
        subtitle="Comprehensive healthcare across specialties — all under one roof in Shirpur."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Departments" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {departments.map((cat, ci) => (
            <div
              key={cat.category}
              id={cat.category.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}
              className={cn("mb-20 last:mb-0", ci > 0 && "pt-4")}
            >
              <div className="flex items-start gap-4 mb-8 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={cn(
                        "badge border text-xs font-semibold",
                        categoryColors[cat.category] ?? "bg-neutral-100 text-neutral-600 border-neutral-200"
                      )}
                    >
                      {cat.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">{cat.category}</h2>
                  <div className="divider-accent mt-2 mx-0" />
                  {cat.tagline && (
                    <p className="mt-3 text-neutral-500 max-w-2xl">{cat.tagline}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
                {cat.items.map((dept) => (
                  <DeptCard key={dept.slug} dept={dept} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
