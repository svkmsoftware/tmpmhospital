import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/SectionHeader";
import { DoctorDirectory } from "@/components/doctors/DoctorDirectory";
import { getDoctorPageData } from "@/lib/graphql/services";
import { doctors as localDoctors } from "@/data/doctors";
import { groupDoctorsByDepartment } from "@/lib/doctors";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet SVKM's TMPM Hospital's expert team of specialist doctors and consultants across all medical and surgical departments.",
  alternates: { canonical: "https://www.tmpmhospital.com/doctors" },
};

// One-line toggle for the hero banner — off for now to test the page without
// it. Flip back to `true` to restore it.
const SHOW_HERO_BANNER = false;

export default async function DoctorsPage() {
  // Wrap in try/catch so ANY error still renders the page with local data.
  // Only the banner image/heading/subheading come from Strapi — the doctor
  // cards themselves always render from local data so every profile photo
  // is one we control the resolution of, instead of whatever's been
  // uploaded to the CMS.
  let pageData = null;
  try {
    pageData = await getDoctorPageData();
  } catch {
    // GraphQL unavailable — banner/heading fall back to defaults below
  }

  const bannerImage = pageData?.bannerImage ?? "/images/doctors_banner.png";
  const heading = pageData?.heading ?? "Our Doctors";
  const subheading = pageData?.subheading ?? "Expert specialists committed to your health";

  const departmentGroups = groupDoctorsByDepartment(localDoctors);

  return (
    <>
      {SHOW_HERO_BANNER && (
        <PageBanner
          image={bannerImage}
          title={heading}
          subtitle={subheading}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Doctors" }]}
        />
      )}

      <section
        className={cn(
          "bg-white pb-20 md:pb-28",
          SHOW_HERO_BANNER ? "section-padding" : "pt-10 md:pt-14",
        )}
      >
        <div className="container-custom">
          {/* Compact header — a full-size SectionHeader plus the filter
              panel below was pushing every doctor card below the fold. */}
          <div className="text-center mb-8">
            <p className="section-tag justify-center">
              <span className="w-6 h-px bg-current opacity-80"></span>
              Our Team
              <span className="w-6 h-px bg-current opacity-80"></span>
            </p>
            <h1 className="font-display text-2xl md:text-3xl text-neutral-800">
              Meet Our Specialists
            </h1>
          </div>

          <DoctorDirectory groups={departmentGroups} />
        </div>
      </section>
      {/* <ContactCTA /> */}
    </>
  );
}
