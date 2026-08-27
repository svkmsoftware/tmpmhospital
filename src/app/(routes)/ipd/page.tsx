import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import IpdTabbedContent from "@/components/sections/IpdTabbedContent";
import { getIpdPageData } from "@/lib/graphql/services";
import { ipdData } from "@/data/services";
import ContactInfoBand from "@/components/sections/ContactInfoBand";

export const metadata: Metadata = {
  title: "Inpatient Department (IPD)",
  description: "Comprehensive inpatient care with 1200 beds, advanced ICU, and compassionate nursing at SVKM's TMPM Hospital.",
  alternates: { canonical: "https://www.tmpmhospital.com/ipd" },
};

export default async function IpdPage() {
  let gql = null;
  try { gql = await getIpdPageData(); } catch { /* use local fallback */ }
  const bannerImage = gql?.bannerImage ?? "/images/departments_banner_temp.png";
  const gqlSections = gql?.sections   ?? [];
  const contactInfo = gql?.contactInfo ?? null;

  // Prefer CMS sections; fall back to local data — same source, same shape,
  // so IpdTabbedContent doesn't need to know which one it's rendering.
  const tabData = gqlSections.length > 0 ? gqlSections : ipdData;

  return (
    <>
      <PageBanner image={bannerImage} title="Inpatient Department (IPD)"
        subtitle="Comprehensive inpatient care with advanced facilities and compassionate nursing."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Patients & Visitors" }, { label: "IPD" }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader tag="IPD Services" title="Inpatient Services"
            subtitle="Round-the-clock care for admitted patients across all specialties." />

          <div className="mt-10">
            <IpdTabbedContent data={tabData} />
          </div>

          {contactInfo && (
            <ContactInfoBand
              heading={contactInfo.heading}
              subheading={contactInfo.subheading}
              details={contactInfo.details}
            />
          )}
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn-gradient">Book an Appointment <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
      {/* <ContactCTA /> */}
    </>
  );
}
