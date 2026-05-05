import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getDoctors } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet the expert team of doctors at SVKM's TMPM Hospital — specialists across General Medicine, Surgery, Gynaecology, Paediatrics, Anaesthesiology, and more.",
  alternates: { canonical: "https://www.tmpmhospital.com/doctors" },
};

export default async function DoctorsPage() {
  const { data: doctors } = await getDoctors();

  return (
    <>

      <PageBanner
        image="/images/doctors_banner.png"
        title="Our Doctors"
        subtitle="Expert specialists committed to your health and well-being."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Doctors" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            tag="Our Team"
            title="Meet Our Specialists"
            subtitle="Our team of experienced and compassionate doctors are dedicated to providing you with the best possible care."
          />

          {/* Search hint */}
          <div className="max-w-lg mx-auto mb-10">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-400 text-sm">
              <Search className="w-4 h-4 shrink-0" />
              <span>Search by name or specialty coming soon…</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {doctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}`}
                className="card group p-6 flex flex-col items-center text-center"
              >
                <div
                  className="relative w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-neutral-100 group-hover:ring-cyan-200 transition-all"
                >
                  <Image
                    src={doctor.profilePhoto}
                    alt={doctor.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="112px"
                  />
                </div>
                <h3 className="font-bold text-neutral-800 group-hover:text-cyan-700 transition-colors">
                  {doctor.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                  {doctor.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="badge badge-primary text-2xs">
                      {tag}
                    </span>
                  ))}
                </div>
                {doctor.department.length > 0 && (
                  <p className="mt-2 text-xs text-neutral-400">
                    {doctor.department.join(", ")}
                  </p>
                )}
                <div
                  className="mt-4 flex items-center gap-1 text-sm font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  View Profile <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {doctors.length === 0 && (
            <div className="text-center py-20 text-neutral-400">
              <p className="text-lg">Doctor profiles coming soon.</p>
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
