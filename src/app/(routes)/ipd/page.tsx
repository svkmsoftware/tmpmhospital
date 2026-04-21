import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader, PageBanner } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getIpdData } from "@/lib/api";

export const metadata: Metadata = {
  title: "IPD Services",
  description: "In-Patient Department services at SVKM's TMPM Hospital — admission, room types, discharge process, and visitor's policy.",
  alternates: { canonical: "https://www.tmpmhospital.com/ipd" },
};

export default async function IpdPage() {
  const { data: sections } = await getIpdData();

  return (
    <>

      <PageBanner
        image="/images/general_hospital_banner.png"
        title="IPD Services"
        subtitle="Comprehensive in-patient care from admission to discharge."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Patients & Visitors" }, { label: "IPD" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <SectionHeader tag="In-Patient Department" title="IPD Services" subtitle="Everything you need to know about your hospital stay — we're here to make it as comfortable and clear as possible." />

          <div className="space-y-16">
            {sections.map((section, i) => (
              <div key={section.title} className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center`}>
                <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                  <span className="inline-block w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center mb-3" style={{ background: "var(--color-primary)" }}>
                    {i + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-2">{section.title}</h2>
                  <div className="divider-accent mx-0 mb-4" />
                  <div className="space-y-3">
                    {section.description.map((para, j) => (
                      <p key={j} className="text-neutral-600 leading-relaxed">{para}</p>
                    ))}
                  </div>
                  {i === 0 && (
                    <Link href="/contact" className="btn-primary mt-6 inline-flex">Book Admission</Link>
                  )}
                </div>
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
