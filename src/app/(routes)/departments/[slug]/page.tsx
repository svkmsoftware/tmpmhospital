import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, User, Clock, Phone } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getDepartmentBySlug, getAllDepartmentSlugs } from "@/lib/api";
import DeptTabs from "./DeptTabs";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllDepartmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: dept } = await getDepartmentBySlug(params.slug);
  if (!dept) return { title: "Department Not Found" };
  return {
    title: dept.title,
    description: dept.description,
    alternates: { canonical: `https://www.tmpmhospital.com/departments/${dept.slug}` },
    openGraph: {
      title: `${dept.title} | SVKM's TMPM Hospital`,
      description: dept.description,
      images: [dept.banner_image],
    },
  };
}

export default async function DepartmentDetailPage({ params }: Props) {
  const { data: dept } = await getDepartmentBySlug(params.slug);
  if (!dept) notFound();

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  return (
    <>

      <PageBanner
        image={dept.banner_image}
        title={dept.title}
        subtitle={dept.description}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Departments", href: "/departments" },
          { label: dept.title },
        ]}
        height="lg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <SectionHeader
                tag="Department Overview"
                title={dept.title}
                centered={false}
              />
              <DeptTabs tabs={dept.tabs} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Appointment CTA */}
              <div className="rounded-2xl p-6 text-white" style={{ background: "var(--color-primary)" }}>
                <h3 className="font-bold text-lg mb-2">Book an Appointment</h3>
                <p className="text-cyan-100 text-sm mb-4">
                  Consult our {dept.title} specialists today.
                </p>
                <Link href="/contact" className="block w-full text-center btn-accent text-neutral-900 font-bold">
                  Book Now
                </Link>
                <a
                  href="tel:+911234567890"
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-cyan-100 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Emergency: +91 12345 67890
                </a>
              </div>

              {/* Consultants */}
              {dept.consultants.length > 0 && (
                <div className="card p-6">
                  <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" color="var(--color-primary)" />
                    Our Consultants
                  </h3>
                  <div className="space-y-4">
                    {dept.consultants.map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-cyan-100">
                          <Image
                            src={doc.profilePhoto}
                            alt={doc.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-neutral-800">{doc.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {doc.tags.map((tag) => (
                              <span key={tag} className="badge badge-primary text-2xs">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/doctors" className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                    View All Doctors <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* OPD Schedule */}
              <div className="card p-6">
                <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" color="var(--color-primary)" />
                  OPD Timings
                </h3>
                <div className="space-y-2">
                  {days.map((day) => (
                    <div key={day} className="flex justify-between text-sm py-1 border-b border-neutral-100 last:border-0">
                      <span className="capitalize font-medium text-neutral-700">{day}</span>
                      <span className="text-neutral-500">10:00 AM – 4:00 PM</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm py-1">
                    <span className="capitalize font-medium text-neutral-700">Sunday</span>
                    <span className="text-red-500">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="card p-6">
                <h3 className="font-bold text-neutral-800 mb-4">Related Links</h3>
                <ul className="space-y-2">
                  {[
                    { label: "All Departments", href: "/departments" },
                    { label: "Find a Doctor", href: "/doctors" },
                    { label: "OPD Services", href: "/opd" },
                    { label: "IPD Services", href: "/ipd" },
                    { label: "Insurance & TPA", href: "/tpa-insurance" },
                  ].map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="flex items-center gap-2 text-sm text-neutral-600 hover:text-cyan-700 transition-colors group"
                      >
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" color="var(--color-accent)" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
