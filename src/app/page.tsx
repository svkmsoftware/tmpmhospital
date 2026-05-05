import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import {
  AboutSection,
  StatsSection,
  DepartmentsSection,
  WhyChooseUsSection,
} from "@/components/sections/HomeAboutStats";
import {
  DoctorsAdviceSection,
  BlogsSection,
  TestimonialsSection,
  FAQSection,
  GalleryPreview,
  ContactCTA,
} from "@/components/sections/HomeSections";
import {
  getDepartments, getBlogs, getTestimonials,
  getHospitalStats, getFAQs, getGalleryImages,
} from "@/lib/api";

export const metadata: Metadata = {
  title: "SVKM's TMPM Hospital | Multispecialty Hospital Shirpur",
  description:
    "SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital — a 1200-bed multispecialty hospital in Shirpur delivering world-class, affordable healthcare. Book an appointment today.",
  alternates: { canonical: "https://www.tmpmhospital.com" },
};

export default async function HomePage() {
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
      <AboutSection />
      <StatsSection stats={stats} />
      <WhyChooseUsSection />
      <DepartmentsSection departments={departments} />
      <DoctorsAdviceSection />
      <BlogsSection blogs={blogs} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <GalleryPreview images={gallery} />
      <ContactCTA />
    </>
  );
}
