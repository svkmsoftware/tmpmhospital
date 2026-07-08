import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import {
  AboutSection,
  StatsSection,
  DepartmentsSection,
  WhyChooseUsSection,
  MeetOurDoctorsSection,
} from "@/components/sections/HomeAboutStats";
import {
  DoctorsAdviceSection,
  BlogsSection,
  NewsSection,
  TestimonialsSection,
  FAQSection,
  GalleryPreview,
  ContactCTA,
} from "@/components/sections/HomeSections";
import {
  getDepartments,
  getBlogs,
  getTestimonials,
  getHospitalStats,
  getFAQs,
  getGalleryImages,
} from "@/lib/api";
import { getHomePageData, getConsultantsData } from "@/lib/graphql/services";
import { doctors as localDoctors } from "@/data/doctors";

export const metadata: Metadata = {
  title: "SVKM's TMPM Hospital | Multispecialty Hospital Shirpur",
  description:
    "SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital — a 1200-bed multispecialty hospital in Shirpur delivering world-class, affordable healthcare. Book an appointment today.",
  alternates: { canonical: "https://www.tmpmhospital.com" },
};

export default async function HomePage() {
  // GraphQL: Home page content (About teaser, departments preview, News & Events).
  // Wrapped in try/catch so a CMS/network failure never breaks the homepage —
  // every section below already has its own local-data fallback.

  let homeData = null;
  try {
    homeData = await getHomePageData();
  } catch {
    /* use local fallback for every section below */
  }

  let gqlDoctors = null;

  try {
    const data = await getConsultantsData();

    gqlDoctors = data?.map((doctor: any) => ({
      id: doctor.id,
      name: doctor.name,
      designation: doctor.designation,
      profileImage: doctor.profileImage,
      viewProfile: doctor.view_profile,
      bookAppointment: doctor.book_appointment,
    }));
  } catch {
    // use local fallback
  }

  // console.log("qqlDoctors", gqlDoctors);
  const doctorsForHome =
    gqlDoctors && gqlDoctors.length > 0
      ? gqlDoctors
      : localDoctors.map((d) => ({
          id: String(d.id),
          name: d.name,
          designation: d.tags?.[0] ?? "",
          profileImage: d.profilePhoto,
          viewProfile: null,
          bookAppointment: null,
        }));

  const [
    { data: departments },
    { data: blogs },
    { data: testimonials },
    { data: stats },
    { data: faqs },
    { data: gallery },
  ] = await Promise.all([
    getDepartments(),
    getBlogs(4),
    getTestimonials(),
    getHospitalStats(),
    getFAQs(),
    getGalleryImages(),
  ]);

  return (
    <>
      <HeroSection />
      <AboutSection data={homeData?.about} />
      <StatsSection stats={stats} />
      <WhyChooseUsSection />
      <DepartmentsSection departments={departments} />
      <MeetOurDoctorsSection doctors={doctorsForHome} />
      <GalleryPreview images={gallery} />
      <DoctorsAdviceSection />
      <TestimonialsSection testimonials={testimonials} />
      <BlogsSection blogs={blogs} />
      <NewsSection
        heading={homeData?.newsHeading?.heading}
        subheading={homeData?.newsHeading?.subheading}
        news={homeData?.news ?? []}
      />
      <FAQSection faqs={faqs} />
      {/* <ContactCTA /> */}
    </>
  );
}
