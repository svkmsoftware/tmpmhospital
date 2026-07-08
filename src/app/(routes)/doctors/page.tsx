import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, User, ChevronLeft, ChevronRight } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getDoctorPageData } from "@/lib/graphql/services";
import { doctors as localDoctors } from "@/data/doctors";

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet SVKM's TMPM Hospital's expert team of specialist doctors and consultants across all medical and surgical departments.",
  alternates: { canonical: "https://www.tmpmhospital.com/doctors" },
};

const PAGE_SIZE = 10;

interface DoctorCard {
  id: string;
  name: string;
  designation: string;
  profileImage: string | null;
  viewProfile: string | null;
  bookAppointment: string | null;
  departments: { name: string; slug: string }[];
}

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Math.max(1, parseInt(searchParams?.page ?? "1", 10) || 1);

  // Wrap in try/catch so ANY error still renders the page with local data
  let pageData = null;
  try {
    pageData = await getDoctorPageData(currentPage, PAGE_SIZE);
  } catch {
    // GraphQL unavailable — page will use local fallback data below
  }

  const bannerImage = pageData?.bannerImage ?? "/images/doctors_banner.png";
  const heading = pageData?.heading ?? "Our Doctors";
  const subheading = pageData?.subheading ?? "Expert specialists committed to your health";

  let doctors: DoctorCard[];
  let hasNextPage: boolean;

  if (pageData && pageData.doctors.length > 0) {
    doctors = pageData.doctors;
    hasNextPage = pageData.hasNextPage;
  } else {
    // Local fallback: paginate the local array manually since it has no
    // built-in pagination support.
    const allLocal: DoctorCard[] = localDoctors.map((d) => ({
      id: String(d.id),
      name: d.name,
      designation: d.tags[0] ?? "",
      profileImage: d.profilePhoto,
      viewProfile: null,
      bookAppointment: null,
      departments: (d.tags ?? []).map((t) => ({
        name: t,
        slug: t.toLowerCase().replace(/\s+/g, "-"),
      })),
    }));

    const start = (currentPage - 1) * PAGE_SIZE;
    doctors = allLocal.slice(start, start + PAGE_SIZE);
    hasNextPage = start + PAGE_SIZE < allLocal.length;
  }

  const hasPrevPage = currentPage > 1;

  return (
    <>
      <PageBanner
        image={bannerImage}
        title={heading}
        subtitle={subheading}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Doctors" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            tag="Our Team"
            title="Meet Our Specialists"
            subtitle="Experienced doctors committed to delivering compassionate, world-class care."
          />

          {doctors.length === 0 ? (
            <p className="text-center text-neutral-500 py-12">
              No doctors found on this page.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
              {doctors.map((doc) => {
                // Carry image + designation (+ name) through the URL so the
                // detail page can render even if its own lookup (local-only
                // getDoctorById) doesn't recognize this doctor's id — e.g.
                // when this list is sourced from GraphQL/Strapi ids that
                // don't exist in the local doctors dataset.
                const profileQuery = new URLSearchParams({
                  image: doc.profileImage ?? "/images/male_user.png",
                  designation: doc.designation ?? "",
                  name: doc.name ?? "",
                }).toString();

                return (
                  <div key={doc.id} className="card group text-center">
                    <div className="relative w-full aspect-square overflow-hidden">
                      <Image
                        src={doc.profileImage ?? "/images/male_user.png"}
                        alt={doc.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-neutral-800 mb-1">{doc.name}</h3>
                      <p
                        className="text-xs font-semibold mb-3"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {doc.designation}
                      </p>
                      {doc.departments.length > 0 && (
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                          {doc.departments.slice(0, 2).map((dept) => (
                            <span key={dept.slug} className="badge badge-primary text-xs">
                              {dept.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        {doc.viewProfile ? (
                          <a
                            href={doc.viewProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-outline text-xs py-2 px-3 flex items-center justify-center gap-1"
                          >
                            <User className="w-3 h-3" /> Profile
                          </a>
                        ) : (
                          <Link
                            href={`/doctors/${doc.id}?${profileQuery}`}
                            className="flex-1 btn-outline text-xs py-2 px-3 flex items-center justify-center gap-1"
                          >
                            <User className="w-3 h-3" /> Profile
                          </Link>
                        )}
                        {doc.bookAppointment ? (
                          <a
                            href={doc.bookAppointment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-gradient text-xs py-2 px-3 flex items-center justify-center gap-1"
                          >
                            <Phone className="w-3 h-3" /> Book
                          </a>
                        ) : (
                          <Link
                            href="/contact"
                            className="flex-1 btn-gradient text-xs py-2 px-3 flex items-center justify-center gap-1"
                          >
                            <Phone className="w-3 h-3" /> Book
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination controls */}
          {(hasPrevPage || hasNextPage) && (
            <div className="flex items-center justify-center gap-3 mt-10">
              {hasPrevPage ? (
                <Link
                  href={`/doctors?page=${currentPage - 1}`}
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Link>
              ) : (
                <span className="btn-outline text-sm py-2 px-4 flex items-center gap-1 opacity-40 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </span>
              )}

              <span className="text-sm font-semibold text-neutral-600 px-2">
                Page {currentPage}
              </span>

              {hasNextPage ? (
                <Link
                  href={`/doctors?page=${currentPage + 1}`}
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="btn-outline text-sm py-2 px-4 flex items-center gap-1 opacity-40 cursor-not-allowed">
                  Next <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </div>
          )}
        </div>
      </section>
      {/* <ContactCTA /> */}
    </>
  );
}
