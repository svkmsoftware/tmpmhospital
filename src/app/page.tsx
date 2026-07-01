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
  // const doctorsForHome =
  //   gqlDoctors && gqlDoctors.length > 0
  //     ? gqlDoctors
  //     : localDoctors.map((d) => ({
  //         id: String(d.id),
  //         name: d.name,
  //         designation: d.tags?.[0] ?? "",
  //         profileImage: d.profilePhoto,
  //         viewProfile: null,
  //         bookAppointment: null,
  //       }));

    const doctorsForHome = [
    {
      id: "1",
      name: "Dr. Darshana Pawara",
      designation: "General Medicine",
      profileImage: "/images/doctors/DR_DARSHANA_PAWARA.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "2",
      name: "Dr. Shivram Pawara",
      designation: "Obstetrics & Gynecology",
      profileImage: "/images/doctors/DR_SHIVRAM_PAWARA.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "3",
      name: "Dr. Vaishnavi Zile",
      designation: "Anaesthesia",
      profileImage: "/images/doctors/DR_VAISHNAVI_ZILE.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "4",
      name: "Dr. Dhiraj Rane",
      designation: "Orthopaedics",
      profileImage: "/images/doctors/DR_DHIRAJ_RANE.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "5",
      name: "Dr. Sagar Patil",
      designation: "",
      profileImage: "/images/doctors/DR_SAGAR_PATIL.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "6",
      name: "Dr. Girish Vadgaonkar",
      designation: "Medicine",
      profileImage: "/images/doctors/DR_GIRISH_VADGAONKAR.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "7",
      name: "Dr. Bhagyesh Wankhede",
      designation: "Radiology",
      profileImage: "/images/doctors/DR_BHAGYESH_WANHEDE.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "8",
      name: "Dr. Ashwin Baviskar",
      designation: "",
      profileImage: "/images/doctors/DR_ASHWIN_BAVISKAR.png",
      viewProfile: null,
      bookAppointment: null,
    },
    // {
    //   id: "9",
    //   name: "Dr. Bhagyesh Wankhede",
    //   designation: "",
    //   profileImage: "/images/doctors/DR_BHAGYESH_WANHEDE.png",
    //   viewProfile: null,
    //   bookAppointment: null,
    // },
    {
      id: "10",
      name: "Dr. Darshan Rakhecha",
      designation: "",
      profileImage: "/images/doctors/DR_DARSHAN_RAKHECHA.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "10",
      name: "Dr. Girish Choudhary",
      designation: "",
      profileImage: "/images/doctors/DR_GIRISH_CHOUDHARI.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "11",
      name: "Dr. Manasi Sonar",
      designation: "",
      profileImage: "/images/doctors/DR_MANASI_SONAR.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "12",
      name: "Dr. Naina Patil",
      designation: "",
      profileImage: "/images/doctors/DR_NAINA_PATIL.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "13",
      name: "Dr. Prashant Khairnar",
      designation: "",
      profileImage: "/images/doctors/DR_PRASHANT_KHAIRNAR.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "14",
      name: "Dr. Sagar More",
      designation: "",
      profileImage: "/images/doctors/DR_SAGAR_MORE.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "15",
      name: "Dr. Sandeep Oswal",
      designation: "",
      profileImage: "/images/doctors/DR_SANDEEP_OSWAL.png",
      viewProfile: null,
      bookAppointment: null,
    },
    {
      id: "16",
      name: "Dr. Subham Patil",
      designation: "",
      profileImage: "/images/doctors/DR_SHUBHAM_PATIL.png",
      viewProfile: null,
      bookAppointment: null,
    },
  ];

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
      <DoctorsAdviceSection />
      <MeetOurDoctorsSection doctors={doctorsForHome} />
      <BlogsSection blogs={blogs} />
      <NewsSection
        heading={homeData?.newsHeading?.heading}
        subheading={homeData?.newsHeading?.subheading}
        news={homeData?.news ?? []}
      />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <GalleryPreview images={gallery} />
      <ContactCTA />
    </>
  );
}
