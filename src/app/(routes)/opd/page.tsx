import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader, PageBanner } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getOpdData } from "@/lib/api";

export const metadata: Metadata = {
  title: "OPD Services",
  description: "Outpatient Department services at SVKM's TMPM Hospital — appointments, payment options, and OPD consultation schedule for all departments.",
  alternates: { canonical: "https://www.tmpmhospital.com/opd" },
};

export default async function OpdPage() {
  const { data: sections } = await getOpdData();

  return (
    <>

      <PageBanner
        image="/images/general_hospital_banner.png"
        title="OPD Services"
        subtitle="Seamless outpatient care — from booking to consultation."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Patients & Visitors" }, { label: "OPD" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <SectionHeader tag="Outpatient Department" title="OPD Services" subtitle="We ensure your visit is smooth, efficient, and centred on your care." />

          <div className="space-y-16">
            {sections.map((section, i) => {
              if (section.schedule) {
                return (
                  <div key={section.section} id="schedule">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">{section.section}</h2>
                    <div className="divider-accent mx-0 mb-6"></div>
                    <div className="card overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead style={{ background: "var(--color-primary)" }}>
                            <tr>
                              {["Department", "Doctor", "Days", "Timings", "Room No."].map((h) => (
                                <th key={h} className="px-4 py-3 text-left text-white font-semibold">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {section.schedule!.map((row, j) => (
                              <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                                <td className="px-4 py-3 font-medium text-neutral-800">{row.department}</td>
                                <td className="px-4 py-3 text-neutral-600">{row.doctor}</td>
                                <td className="px-4 py-3 text-neutral-600">{row.days}</td>
                                <td className="px-4 py-3 text-neutral-600">{row.timings}</td>
                                <td className="px-4 py-3"><span className="badge badge-primary">{row.room}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={section.section} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">{section.section}</h2>
                    <div className="divider-accent mx-0 mb-4"></div>
                    <p className="text-neutral-600 leading-relaxed">{section.description}</p>
                    <Link href="/contact" className="btn-primary mt-6 inline-flex">Book Appointment</Link>
                  </div>
                  {section.image && (
                    <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                      <Image src={section.image} alt={section.section} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
