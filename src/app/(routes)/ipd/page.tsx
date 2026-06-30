import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getIpdPageData } from "@/lib/graphql/services";
import { ipdData } from "@/data/services";

export const metadata: Metadata = {
  title: "Inpatient Department (IPD)",
  description: "Comprehensive inpatient care with 1200 beds, advanced ICU, and compassionate nursing at SVKM's TMPM Hospital.",
  alternates: { canonical: "https://www.tmpmhospital.com/ipd" },
};

export default async function IpdPage() {
  let gql = null;
  try { gql = await getIpdPageData(); } catch { /* use local fallback */ }
  const bannerImage = gql?.bannerImage ?? "/images/general_hospital_banner.png";
  const gqlSections = gql?.sections   ?? [];
  const contactInfo = gql?.contactInfo ?? null;

  return (
    <>
      <PageBanner image={bannerImage} title="Inpatient Department (IPD)"
        subtitle="Comprehensive inpatient care with advanced facilities and compassionate nursing."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Patients & Visitors" }, { label: "IPD" }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {gqlSections.length > 0 ? (
            <>
              <SectionHeader tag="IPD Services" title="Inpatient Services"
                subtitle="Round-the-clock care for admitted patients across all specialties." />
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
              {ipdData.map((sec, i) => {
                const isOdd = i % 2 === 1;
                return (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {sec.image && !isOdd && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                        <Image src={sec.image} alt={sec.title} fill className="object-cover" sizes="50vw" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800 mb-4">{sec.title}</h3>
                      {Array.isArray(sec.description) ? (
                        <div className="space-y-3">
                          {sec.description.map((para, j) => (
                            <p key={j} className="text-neutral-600 leading-relaxed text-sm">{para}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-neutral-600 leading-relaxed text-sm">{sec.description}</p>
                      )}
                    </div>
                    {sec.image && isOdd && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                        <Image src={sec.image} alt={sec.title} fill className="object-cover" sizes="50vw" />
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
