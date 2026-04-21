import type { Metadata } from "next";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getGalleryImages } from "@/lib/api";
import GalleryClient from "@/components/sections/GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Explore our photo gallery showcasing SVKM's TMPM Hospital facilities, departments, events, and community outreach programmes.",
  alternates: { canonical: "https://www.tmpmhospital.com/gallery" },
};

export default async function GalleryPage() {
  const { data: images } = await getGalleryImages();

  return (
    <>

      <PageBanner
        image="/images/general_hospital_banner.png"
        title="Photo Gallery"
        subtitle="A glimpse into our world-class facilities, events, and the people we serve."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            tag="Gallery"
            title="Our Facilities & Events"
            subtitle="From state-of-the-art operating theatres to community health camps — see our commitment in action."
          />
          <GalleryClient images={images} />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
