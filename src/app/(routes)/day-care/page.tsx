import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader, PageBanner } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getDayCareData } from "@/lib/api";

export const metadata: Metadata = {
  title: "Day Care Services",
  description: "Day Care services at SVKM's TMPM Hospital — same-day procedures, minor surgeries, chemotherapy, and more with expert medical supervision in Shirpur.",
  alternates: { canonical: "https://www.tmpmhospital.com/day-care" },
};

export default async function DayCarePage() {
  const { data: sections } = await getDayCareData();

  return (
    <>

      <PageBanner
        image="/images/general_hospital_banner.png"
        title="Day Care Services"
        subtitle="Expert hospital care, same-day discharge — the best of both worlds."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Patients & Visitors" }, { label: "Day Care" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <SectionHeader
            tag="Day Care Unit"
            title="Day Care Services"
            subtitle="For patients who need hospital-grade care without an overnight stay — safe, efficient, and comfortable."
          />

          <div className="space-y-16">
            {sections.map((section, i) => (
              <div key={section.title} className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center`}>
                <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-2">{section.title}</h2>
                  <div className="divider-accent mx-0 mb-4"></div>
                  <div className="space-y-3">
                    {section.description.map((para, j) => (
                      <p key={j} className="text-neutral-600 leading-relaxed">{para}</p>
                    ))}
                  </div>
                  {i === 0 && (
                    <Link href="/contact" className="btn-primary mt-6 inline-flex">Enquire Now</Link>
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
