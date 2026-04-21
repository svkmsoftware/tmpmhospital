import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, Users, Calendar, MapPin, GraduationCap, Clock } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getJobOpenings } from "@/lib/api";
import { whyWorkWithUs } from "@/data/static";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the team at SVKM's TMPM Hospital. Explore current job openings for doctors, nurses, technicians, and administrative staff in Shirpur, Maharashtra.",
  alternates: { canonical: "https://www.tmpmhospital.com/careers" },
};

export default async function CareersPage() {
  const { data: jobs } = await getJobOpenings();

  return (
    <>

      <PageBanner
        image="/images/careers_page_banner.png"
        title="Careers"
        subtitle="Join a hospital that values excellence, innovation, and people above all."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      {/* Why Work With Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            tag="Work With Us"
            title="Why Join TMPM Hospital?"
            subtitle="Be part of a mission-driven team making real differences in people's lives across rural Maharashtra."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {whyWorkWithUs.map((item) => (
              <div key={item.id} className="card overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-800 group-hover:text-blue-700 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            tag="Now Hiring"
            title="Current Job Openings"
            subtitle="Explore current vacancies and apply to be part of a growing, purpose-driven team."
          />

          {jobs.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg">No current openings. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="card p-6 hover:border-blue-200 border border-transparent transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3 className="font-bold text-neutral-800 text-lg">{job.designation}</h3>
                        {job.numberOfPost > 1 && (
                          <span className="badge badge-success">
                            {job.numberOfPost} Posts
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-4">
                        {job.department && (
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" />
                            {job.department}
                          </span>
                        )}
                        {job.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {job.numberOfPost} Vacancy{job.numberOfPost > 1 ? "ies" : ""}
                        </span>
                      </div>

                      {/* Education */}
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5" />
                          Education
                        </p>
                        <div className="space-y-1">
                          {job.educationQualification.map((q, i, arr) => (
                            <div key={i}>
                              <p className="text-sm text-neutral-600">{q}</p>
                              {i < arr.length - 1 && (
                                <div className="flex items-center gap-2 my-1">
                                  <hr className="flex-1 border-neutral-200" />
                                  <span className="text-xs text-neutral-400 font-medium">OR</span>
                                  <hr className="flex-1 border-neutral-200" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Experience */}
                      <div>
                        <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Experience
                        </p>
                        <div className="space-y-1">
                          {job.yearsOfExperience.map((exp, i, arr) => (
                            <div key={i}>
                              <p className="text-sm text-neutral-600">
                                <span className="font-medium">{exp.year} yr{exp.year > 1 ? "s" : ""}:</span>{" "}
                                {exp.description}
                              </p>
                              {i < arr.length - 1 && (
                                <div className="flex items-center gap-2 my-1">
                                  <hr className="flex-1 border-neutral-200" />
                                  <span className="text-xs text-neutral-400 font-medium">OR</span>
                                  <hr className="flex-1 border-neutral-200" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dates + Apply */}
                    <div className="flex flex-col items-start sm:items-end gap-3 shrink-0 sm:min-w-[180px]">
                      <div className="text-sm text-neutral-500 space-y-1 text-left sm:text-right">
                        <p className="flex items-center gap-1.5 sm:flex-row-reverse">
                          <Calendar className="w-3.5 h-3.5" />
                          Start: {job.applicationStartDate}
                        </p>
                        <p className="flex items-center gap-1.5 sm:flex-row-reverse text-red-500 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          Last: {job.applicationEndDate}
                        </p>
                      </div>
                      <a
                        href="mailto:careers@tmpmhospital.com?subject=Application for Job Vacancy"
                        className="btn-primary text-sm py-2 px-4"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: "#dbeafe" }}>
            <p className="font-semibold text-neutral-800 mb-1">Don't see a suitable opening?</p>
            <p className="text-sm text-neutral-600 mb-4">
              Send us your CV and we'll keep you in mind for future opportunities.
            </p>
            <a href="mailto:careers@tmpmhospital.com" className="btn-primary text-sm">
              Send Your CV
            </a>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
