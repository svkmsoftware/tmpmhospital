import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getOpdPageData } from "@/lib/graphql/services";
import { opdData } from "@/data/services";

export const metadata: Metadata = {
  title: "Outpatient Department (OPD)",
  description: "Convenient expert outpatient consultations across all specialties at SVKM's TMPM Hospital, Shirpur.",
  alternates: { canonical: "https://www.tmpmhospital.com/opd" },
};

export default async function OpdPage() {
  let gql = null;
  try { gql = await getOpdPageData(); } catch { /* use local fallback */ }
  const bannerImage  = gql?.bannerImage ?? "/images/general_hospital_banner.png";
  const gqlSections  = gql?.sections    ?? [];
  const contactInfo  = gql?.contactInfo ?? null;

  return (
    <>
      <PageBanner image={bannerImage} title="Outpatient Department (OPD)"
        subtitle="Convenient, expert outpatient consultations across all specialties."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Patients & Visitors" }, { label: "OPD" }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {gqlSections.length > 0 ? (
            <>
              <SectionHeader tag="OPD Services" title="Outpatient Services"
                subtitle="World-class consultation services for all your medical needs." />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children mb-12">
                {gqlSections.map((item, i) => (
                  <div key={i} className="card p-6 group hover:border-cyan-200 border border-transparent transition-all">
                    {item.image && (
                      <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                        <Image src={item.image} alt={item.title} fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width:640px) 100vw, 33vw" />
                      </div>
                    )}
                    <h3 className="font-bold text-neutral-800 mb-2 group-hover:text-cyan-700 transition-colors">{item.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-10">
              {opdData.map((sec, i) => {
                const isOdd = i % 2 === 1;
                const hasSchedule = "schedule" in sec && Array.isArray(sec.schedule);
                type OpdSec = typeof sec & { schedule?: Array<{department:string;doctor:string;days:string;timings:string;room:string}> };
                const s = sec as OpdSec;
                return (
                  <div key={i} className={`grid grid-cols-1 ${!hasSchedule ? "lg:grid-cols-2" : ""} gap-10 items-center`}>
                    {"image" in sec && sec.image && !isOdd && !hasSchedule && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                        <Image src={sec.image as string} alt={s.section ?? ""} fill className="object-cover" sizes="50vw" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 mb-4">{s.section}</h3>
                      {typeof s.description === "string" && (
                        <p className="text-neutral-600 leading-relaxed text-sm">{s.description}</p>
                      )}
                      {hasSchedule && s.schedule && (
                        <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-100">
                          <table className="w-full text-sm border-collapse">
                            <thead>
                              <tr style={{ background: "var(--color-primary)" }}>
                                {["Department","Doctor","Days","Timings","Room"].map((h) => (
                                  <th key={h} className="text-left px-4 py-3 text-white font-semibold text-xs whitespace-nowrap">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {s.schedule.map((row, ri) => (
                                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                                  {[row.department,row.doctor,row.days,row.timings,row.room].map((val, vi) => (
                                    <td key={vi} className="px-4 py-2.5 text-neutral-600 text-xs border-b border-neutral-100 whitespace-nowrap">{val}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                    {"image" in sec && sec.image && isOdd && !hasSchedule && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                        <Image src={sec.image as string} alt={s.section ?? ""} fill className="object-cover" sizes="50vw" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {contactInfo && (
            <div className="mt-16 rounded-2xl p-8" style={{ background: "var(--color-primary-pale)" }}>
              <h3 className="text-xl font-bold text-neutral-800 mb-1">{contactInfo.heading}</h3>
              <p className="text-neutral-500 mb-6">{contactInfo.subheading}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contactInfo.details.map((d, i) => (
                  <div key={i} className="bg-white rounded-xl p-4">
                    <p className="font-semibold text-neutral-800 text-sm mb-1">{d.label}</p>
                    <p className="text-neutral-500 text-sm">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn-gradient">Book an Appointment <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
