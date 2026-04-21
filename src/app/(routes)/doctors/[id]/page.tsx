import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Award, Clock, ChevronRight, Phone, Calendar } from "lucide-react";
import { PageBanner } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getDoctorById, getDoctors } from "@/lib/api";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const { data: doctors } = await getDoctors();
  return doctors.map((d) => ({ id: String(d.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: doctor } = await getDoctorById(Number(params.id));
  if (!doctor) return { title: "Doctor Not Found" };
  return {
    title: doctor.name,
    description: `${doctor.name} — ${doctor.tags.join(", ")} at SVKM's TMPM Hospital, Shirpur.`,
    alternates: { canonical: `https://www.tmpmhospital.com/doctors/${doctor.id}` },
  };
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

export default async function DoctorProfilePage({ params }: Props) {
  const { data: doctor } = await getDoctorById(Number(params.id));
  if (!doctor) notFound();

  const { bio_data } = doctor;

  return (
    <>

      <PageBanner
        image="/images/doctors_banner.png"
        title={doctor.name}
        subtitle={doctor.tags.join(" · ")}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Doctors", href: "/doctors" },
          { label: doctor.name },
        ]}
        height="sm"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile card */}
              <div className="card p-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden shrink-0 ring-4 ring-blue-50">
                  <Image
                    src={doctor.profilePhoto}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    sizes="144px"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-800">{doctor.name}</h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.tags.map((tag) => (
                      <span key={tag} className="badge badge-primary">{tag}</span>
                    ))}
                  </div>
                  {doctor.department.length > 0 && (
                    <p className="mt-3 text-sm text-neutral-500">
                      <span className="font-medium text-neutral-700">Department: </span>
                      {doctor.department.join(", ")}
                    </p>
                  )}
                  <div className="flex gap-3 mt-4">
                    <Link href="/contact" className="btn-primary text-sm py-2 px-4">
                      <Calendar className="w-4 h-4" /> Book Appointment
                    </Link>
                    <a href="tel:+911234567890" className="btn-outline text-sm py-2 px-4">
                      <Phone className="w-4 h-4" /> Call
                    </a>
                  </div>
                </div>
              </div>

              {/* About */}
              {bio_data.aboutDoctor.length > 0 && (
                <div className="card p-6">
                  <h2 className="font-bold text-lg text-neutral-800 mb-4">About</h2>
                  <div className="space-y-4">
                    {bio_data.aboutDoctor.map((para, i) => (
                      <p key={i} className="text-neutral-600 leading-relaxed text-sm">{para}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {bio_data.educationQualification.length > 0 && (
                <div className="card p-6">
                  <h2 className="font-bold text-lg text-neutral-800 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                    Education & Qualifications
                  </h2>
                  <ul className="space-y-2">
                    {bio_data.educationQualification.map((q, i) => (
                      <li key={i} className="flex gap-3 text-sm text-neutral-600">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--color-primary)" }} />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Awards */}
              {bio_data.honoursAndAwards.length > 0 && (
                <div className="card p-6">
                  <h2 className="font-bold text-lg text-neutral-800 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
                    Honours & Awards
                  </h2>
                  <ul className="space-y-2">
                    {bio_data.honoursAndAwards.map((award, i) => (
                      <li key={i} className="flex gap-3 text-sm text-neutral-600">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--color-accent)" }} />
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* OPD Schedule */}
              <div className="card p-6">
                <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
                  OPD Schedule
                </h3>
                <div className="space-y-1.5">
                  {DAYS.map((day) => {
                    const timing = bio_data.opdTiming[day];
                    return (
                      <div key={day} className="flex justify-between text-sm py-1.5 border-b border-neutral-100 last:border-0">
                        <span className="capitalize font-medium text-neutral-700">{day}</span>
                        <span className="text-neutral-500 text-xs">{timing ?? "—"}</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between text-sm py-1.5">
                    <span className="font-medium text-neutral-700">Sunday</span>
                    <span className="text-red-500 text-xs">Closed</span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="mt-4 w-full btn-primary text-sm justify-center"
                >
                  Book Appointment
                </Link>
              </div>

              {/* Back link */}
              <Link
                href="/doctors"
                className="flex items-center gap-2 text-sm font-medium p-4 rounded-xl border border-neutral-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
                style={{ color: "var(--color-primary)" }}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to All Doctors
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
