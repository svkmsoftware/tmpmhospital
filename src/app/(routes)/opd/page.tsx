import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import OpdTabbedContent, {
  type TabItem,
} from "@/components/sections/OpdTabbedContent";
import { getOpdPageData } from "@/lib/graphql/services";
import { opdData } from "@/data/services";
import ContactInfoBand from "@/components/sections/ContactInfoBand";

export const metadata: Metadata = {
  title: "Outpatient Department (OPD)",
  description:
    "Convenient expert outpatient consultations across all specialties at SVKM's TMPM Hospital, Shirpur.",
  alternates: { canonical: "https://www.tmpmhospital.com/opd" },
};

export default async function OpdPage() {
  let gql = null;
  try {
    gql = await getOpdPageData();
  } catch {
    /* use local fallback */
  }
  const bannerImage = gql?.bannerImage ?? "/images/departments_banner_new_2.png";
  const gqlSections = gql?.sections ?? [];
  const contactInfo = gql?.contactInfo ?? null;

  // Normalize both the CMS shape (title/description/image) and the local
  // fallback shape (section/description/image OR section/schedule) into one
  // TabItem[] so OpdTabbedContent doesn't need to know which source it's rendering.
  const tabData: TabItem[] =
    gqlSections.length > 0
      ? gqlSections.map((item) => ({
          title: item.title,
          description: item.description,
          image: item.image,
        }))
      : opdData.map((sec) => {
          const s = sec as typeof sec & {
            section?: string;
            image?: string;
            schedule?: TabItem["schedule"];
          };
          return {
            title: s.section ?? "",
            description:
              typeof s.description === "string" ? s.description : undefined,
            image: s.image ?? null,
            schedule: Array.isArray(s.schedule) ? s.schedule : undefined,
          };
        });

  return (
    <>
      <PageBanner
        image={bannerImage}
        title="Outpatient Department (OPD)"
        subtitle="Convenient, expert outpatient consultations across all specialties."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Patients & Visitors" },
          { label: "OPD" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            tag="OPD Services"
            title="Outpatient Services"
            subtitle="World-class consultation services for all your medical needs."
          />

          <div className="mt-10">
            <OpdTabbedContent data={tabData} />
          </div>

          {contactInfo && (
            <ContactInfoBand
              heading={contactInfo.heading}
              subheading={contactInfo.subheading}
              details={contactInfo.details}
            />
          )}
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn-gradient">
              Book an Appointment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* <ContactCTA /> */}
    </>
  );
}
