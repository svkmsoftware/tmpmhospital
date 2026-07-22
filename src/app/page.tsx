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
import type { Blog, Testimonial, FAQ } from "@/types";

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
  // console.log("homeData", homeData);

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
    { data: localBlogs },
    { data: localTestimonials },
    { data: stats },
    { data: localFaqs },
    { data: gallery },
  ] = await Promise.all([
    getDepartments(),
    getBlogs(4),
    getTestimonials(),
    getHospitalStats(),
    getFAQs(),
    getGalleryImages(),
  ]);

  // ── GraphQL (home.health_insight) → Blog[] ────────────────────────────────
  // The CMS "blog teaser" shape (id/title/excerpt/image) is missing a few
  // fields the local Blog cards use (category/date/author/link), so we fill
  // those with sensible defaults rather than fabricating vendor data.
  const gqlBlogs: Blog[] | undefined = homeData?.healthInsight?.blogs?.length
    ? homeData.healthInsight.blogs.map((b, i) => ({
        id: i + 1,
        title: b.title,
        category: homeData?.healthInsight?.heading ?? "Health & Wellness",
        image: b.image ?? "/images/health-and-wellness/image1.jpg",
        link: "",
        date: new Date().toISOString(),
        excerpt: b.excerpt,
        author: "Hospital Communications",
      }))
    : undefined;

  // console.log("gqlBlogs", gqlBlogs);
  const blogs = gqlBlogs && gqlBlogs.length > 0 ? gqlBlogs : localBlogs;

  // ── GraphQL (home.Testimonial_section) → Testimonial[] ────────────────────
  // The CMS doesn't provide an avatar image or star rating for testimonials,
  // so those fall back to a default look.
  const gqlTestimonials: Testimonial[] | undefined = homeData
    ?.testimonialsSection?.items?.length
    ? homeData.testimonialsSection.items.map((t, i) => ({
        id: i + 1,
        name: t.name,
        role: t.department,
        image: "/images/male_user.png",
        text: t.message,
        rating: 5,
      }))
    : undefined;
  const testimonials =
    gqlTestimonials && gqlTestimonials.length > 0
      ? gqlTestimonials
      : localTestimonials;

  // ── GraphQL (home.faq_section) → FAQ[] ─────────────────────────────────────
  const gqlFaqs: FAQ[] | undefined = homeData?.faqSection?.items?.length
    ? homeData.faqSection.items.map((f, i) => ({
        id: i + 1,
        question: f.question,
        answer: f.answer,
      }))
    : undefined;
  const faqs = gqlFaqs && gqlFaqs.length > 0 ? gqlFaqs : localFaqs;

  return (
    <>
      <HeroSection banners={homeData?.bannerImage ?? []} />
      <AboutSection data={homeData?.about} />
      <StatsSection stats={stats} />
      <WhyChooseUsSection data={homeData?.whyChooseUs} />
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
