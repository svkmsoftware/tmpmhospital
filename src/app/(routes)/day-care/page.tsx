import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import DayCareTabbedContent from "@/components/sections/DayCareTabbedContent";
import { getDaycarePageData } from "@/lib/graphql/services";
import { dayCareData } from "@/data/services";
import ContactInfoBand from "@/components/sections/ContactInfoBand";

export const metadata: Metadata = {
  title: "Day Care Services",
  description: "Same-day procedures with full hospital-grade care at SVKM's TMPM Hospital, including chemotherapy, dialysis, and minor surgeries.",
  alternates: { canonical: "https://www.tmpmhospital.com/day-care" },
};

export default async function DayCarePage() {
  let gql = null;
  try { gql = await getDaycarePageData(); } catch { /* use local fallback */ }
  const bannerImage = gql?.bannerImage ?? "/images/departments_banner_new.png";
  const gqlSections = gql?.sections   ?? [];
  const contactInfo = gql?.contactInfo ?? null;

  // Prefer CMS sections; fall back to local data — same shape, so
  // DayCareTabbedContent doesn't need to know which source it's rendering.
  const tabData = gqlSections.length > 0 ? gqlSections : dayCareData;

  return (
    <>
      <PageBanner image={bannerImage} title="Day Care Services"
        subtitle="Same-day procedures with full hospital-grade care and comfort."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Patients & Visitors" }, { label: "Day Care" }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader tag="Day Care" title="Day Care Procedures"
            subtitle="Efficient same-day care without overnight stay." />

          <div className="mt-10">
            <DayCareTabbedContent data={tabData} />
          </div>

          {contactInfo && (
            <ContactInfoBand
              heading={contactInfo.heading}
              subheading={contactInfo.subheading}
              details={contactInfo.details}
            />
          )}
        </div>
      </section>
      {/* <ContactCTA /> */}
    </>
  );
}
