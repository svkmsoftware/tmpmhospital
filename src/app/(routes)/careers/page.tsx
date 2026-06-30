import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Briefcase, ExternalLink } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getCareerPageData } from "@/lib/graphql/services";
import { whyWorkWithUs as localWhy } from "@/data/static";
import { jobOpenings as localJobs } from "@/data/services";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the SVKM's TMPM Hospital team. Explore current job openings and build a meaningful career in healthcare.",
  alternates: { canonical: "https://www.tmpmhospital.com/careers" },
};

export default async function CareersPage() {
  let gql = null;
  try { gql = await getCareerPageData(); } catch { /* use local fallback */ }

  const bannerImage    = gql?.bannerImage    ?? "/images/careers_banner.png";
  const bannerHeading  = gql?.bannerHeading  ?? "Careers at SVKM's TMPM Hospital";
  const bannerSub      = gql?.bannerSubheading ?? "Join a team driven by compassion, excellence, and purpose.";
  const whyItems       = gql?.whyWorkWithUs  ?? [];
  const jobSections    = gql?.jobSections    ?? [];

  // Fall back to local data if GraphQL returns nothing
  const showLocalJobs = jobSections.length === 0;
  const showLocalWhy  = whyItems.length === 0;

  return (
    <>
      <PageBanner image={bannerImage} title={bannerHeading} subtitle={bannerSub}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]} />

      {/* Why Work With Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader tag="Why Join Us" title="Why Work With TMPM Hospital?"
            subtitle="Be part of a mission-driven team that makes a real difference in people's lives." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {(showLocalWhy ? localWhy : whyItems).map((item, i) => (
              <div key={i} className="card p-6 group hover:border-cyan-200 border border-transparent">
                {'image' in item && item.image && (
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                    <Image src={item.image as string} alt={item.title} fill className="object-cover" sizes="(max-width:640px) 100vw, 33vw" />
                  </div>
                )}
                <h3 className="font-bold text-neutral-800 mb-2 group-hover:text-cyan-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="section-padding bg-gradient-section">
        <div className="container-custom">
          <SectionHeader tag="Opportunities" title="Current Openings"
            subtitle="Explore roles across clinical, technical, administrative, and support functions." />

          {showLocalJobs ? (
            <div className="space-y-5 stagger-children">
              {localJobs.map((job) => (
                <div key={job.id} className="card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4" color="var(--color-primary)" />
                        <h3 className="font-bold text-neutral-800">{job.designation}</h3>
                        <span className="badge badge-primary text-xs">{job.numberOfPost} post{job.numberOfPost > 1 ? "s" : ""}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mt-3 text-sm text-neutral-500">
                        <p><span className="font-semibold text-neutral-700">Department:</span> {job.department}</p>
                        <p><span className="font-semibold text-neutral-700">Location:</span> {job.location}</p>
                        <p><span className="font-semibold text-neutral-700">Apply by:</span> {job.applicationEndDate}</p>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-neutral-600 mb-1">Qualifications:</p>
                        <ul className="space-y-0.5">
                          {job.educationQualification.map((q, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-neutral-500">
                              <CheckCircle2 className="w-3 h-3 shrink-0" color="var(--color-accent)" /> {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Link href="/contact" className="btn-gradient shrink-0 text-sm py-2 px-4">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5 stagger-children">
              {jobSections.map((section, si) => (
                <div key={si} className="card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4" color="var(--color-primary)" />
                        <h3 className="font-bold text-neutral-800">{section.heading}</h3>
                      </div>
                      {section.subheading && (
                        <p className="text-sm text-neutral-500 mb-3">{section.subheading}</p>
                      )}
                      {section.openings.map((opening, oi) => (
                        <div key={oi} className="mt-3 p-3 rounded-xl bg-neutral-50">
                          <p className="font-semibold text-sm text-neutral-700 mb-1">{opening.heading}</p>
                          {opening.details && (
                            <p className="text-xs text-neutral-500">{String(opening.details)}</p>
                          )}
                          {opening.applyNow && (
                            <a href={opening.applyNow} target="_blank" rel="noopener noreferrer"
                               className="inline-flex items-center gap-1 text-xs font-semibold mt-2"
                               style={{ color: "var(--color-primary)" }}>
                              Apply Now <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" className="btn-gradient shrink-0 text-sm py-2 px-4">
                      Enquire <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Generic CTA if no openings */}
          {showLocalJobs && localJobs.length === 0 && (
            <div className="card p-10 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4" color="var(--color-primary)" />
              <h3 className="text-xl font-bold text-neutral-800 mb-2">No Current Openings</h3>
              <p className="text-neutral-500 mb-5">
                Don&apos;t see a suitable opening? Send us your CV and we&apos;ll keep you in mind.
              </p>
              <Link href="/contact" className="btn-gradient">
                Send Your CV <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
