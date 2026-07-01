// import type { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import { Stethoscope, Phone, User } from "lucide-react";
// import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
// import { ContactCTA } from "@/components/sections/HomeSections";
// import { getConsultantsData, getDocterPageData } from "@/lib/graphql/services";
// import { doctors as localDoctors } from "@/data/doctors";

// export const metadata: Metadata = {
//   title: "Our Doctors",
//   description: "Meet SVKM's TMPM Hospital's expert team of specialist doctors and consultants across all medical and surgical departments.",
//   alternates: { canonical: "https://www.tmpmhospital.com/doctors" },
// };

// export default async function DoctorsPage() {
//   // Wrap in try/catch so ANY error still renders the page with local data
//   let gqlDoctors = null;
//   let pageData = null;
//   try {
//     [gqlDoctors, pageData] = await Promise.all([
//       getConsultantsData(),
//       getDocterPageData(),
//     ]);
//   } catch {
//     // GraphQL unavailable — page will use local fallback data below
//   }

//   const bannerImage = pageData?.bannerImage ?? "/images/doctors_banner.png";
//   const heading     = pageData?.heading     ?? "Our Doctors";
//   const subheading  = pageData?.subheading  ?? "Expert specialists committed to your health";

//   // Use GraphQL doctors if available, else fall back to local
//   const doctors = gqlDoctors && gqlDoctors.length > 0
//     ? gqlDoctors
//     : localDoctors.map((d) => ({
//         id: String(d.id),
//         name: d.name,
//         designation: d.tags[0] ?? "",
//         profileImage: d.profilePhoto,
//         viewProfile: null,
//         bookAppointment: null,
//         departments: (d.tags ?? []).map((t) => ({ name: t, slug: t.toLowerCase().replace(/\s+/g, "-") })),
//       }));

//   return (
//     <>
//       <PageBanner image={bannerImage} title={heading} subtitle={subheading}
//         breadcrumb={[{ label: "Home", href: "/" }, { label: "Doctors" }]} />

//       <section className="section-padding bg-white">
//         <div className="container-custom">
//           <SectionHeader tag="Our Team" title="Meet Our Specialists"
//             subtitle="Experienced doctors committed to delivering compassionate, world-class care." />
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
//             {doctors.map((doc) => (
//               <div key={doc.id} className="card group text-center">
//                 <div className="relative w-full aspect-square overflow-hidden">
//                   <Image src={doc.profileImage ?? "/images/male_user.png"} alt={doc.name}
//                     fill className="object-cover transition-transform duration-500 group-hover:scale-105"
//                     sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" />
//                 </div>
//                 <div className="p-5">
//                   <h3 className="font-bold text-neutral-800 mb-1">{doc.name}</h3>
//                   <p className="text-xs font-semibold mb-3" style={{ color: "var(--color-primary)" }}>
//                     {doc.designation}
//                   </p>
//                   {doc.departments.length > 0 && (
//                     <div className="flex flex-wrap gap-1 justify-center mb-4">
//                       {doc.departments.slice(0, 2).map((dept) => (
//                         <span key={dept.slug} className="badge badge-primary text-xs">{dept.name}</span>
//                       ))}
//                     </div>
//                   )}
//                   <div className="flex gap-2">
//                     {doc.viewProfile ? (
//                       <a href={doc.viewProfile} target="_blank" rel="noopener noreferrer"
//                         className="flex-1 btn-outline text-xs py-2 px-3 flex items-center justify-center gap-1">
//                         <User className="w-3 h-3" /> Profile
//                       </a>
//                     ) : (
//                       <Link href={`/doctors/${doc.id}`}
//                         className="flex-1 btn-outline text-xs py-2 px-3 flex items-center justify-center gap-1">
//                         <User className="w-3 h-3" /> Profile
//                       </Link>
//                     )}
//                     {doc.bookAppointment ? (
//                       <a href={doc.bookAppointment} target="_blank" rel="noopener noreferrer"
//                         className="flex-1 btn-gradient text-xs py-2 px-3 flex items-center justify-center gap-1">
//                         <Phone className="w-3 h-3" /> Book
//                       </a>
//                     ) : (
//                       <Link href="/contact"
//                         className="flex-1 btn-gradient text-xs py-2 px-3 flex items-center justify-center gap-1">
//                         <Phone className="w-3 h-3" /> Book
//                       </Link>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <ContactCTA />
//     </>
//   );
// }


import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Stethoscope, Phone, User } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { doctors as localDoctors } from "@/data/doctors";

export const metadata: Metadata = {
  title: "Our Doctors",
  description: "Meet SVKM's TMPM Hospital's expert team of specialist doctors and consultants across all medical and surgical departments.",
  alternates: { canonical: "https://www.tmpmhospital.com/doctors" },
};

export default async function DoctorsPage() {
  // Doctors page info served from local data for now (fetch info from local
  // per current requirement) — no GraphQL/Strapi call is made here.
  const bannerImage = "/images/doctors_banner.png";
  const heading     = "Our Doctors";
  const subheading  = "Expert specialists committed to your health";

  const doctors = localDoctors.map((d) => ({
    id: String(d.id),
    name: d.name,
    designation: d.tags[0] ?? "",
    profileImage: d.profilePhoto,
    viewProfile: null,
    bookAppointment: null,
    departments: (d.tags ?? []).map((t) => ({ name: t, slug: t.toLowerCase().replace(/\s+/g, "-") })),
  }));

  return (
    <>
      <PageBanner image={bannerImage} title={heading} subtitle={subheading}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Doctors" }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader tag="Our Team" title="Meet Our Specialists"
            subtitle="Experienced doctors committed to delivering compassionate, world-class care." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {doctors.map((doc) => (
              <div key={doc.id} className="card group text-center">
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image src={doc.profileImage ?? "/images/male_user.png"} alt={doc.name}
                    fill className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-800 mb-1">{doc.name}</h3>
                  <p className="text-xs font-semibold mb-3" style={{ color: "var(--color-primary)" }}>
                    {doc.designation}
                  </p>
                  {doc.departments.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {doc.departments.slice(0, 2).map((dept) => (
                        <span key={dept.slug} className="badge badge-primary text-xs">{dept.name}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {doc.viewProfile ? (
                      <a href={doc.viewProfile} target="_blank" rel="noopener noreferrer"
                        className="flex-1 btn-outline text-xs py-2 px-3 flex items-center justify-center gap-1">
                        <User className="w-3 h-3" /> Profile
                      </a>
                    ) : (
                      <Link href={`/doctors/${doc.id}`}
                        className="flex-1 btn-outline text-xs py-2 px-3 flex items-center justify-center gap-1">
                        <User className="w-3 h-3" /> Profile
                      </Link>
                    )}
                    {doc.bookAppointment ? (
                      <a href={doc.bookAppointment} target="_blank" rel="noopener noreferrer"
                        className="flex-1 btn-gradient text-xs py-2 px-3 flex items-center justify-center gap-1">
                        <Phone className="w-3 h-3" /> Book
                      </a>
                    ) : (
                      <Link href="/contact"
                        className="flex-1 btn-gradient text-xs py-2 px-3 flex items-center justify-center gap-1">
                        <Phone className="w-3 h-3" /> Book
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
