import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Briefcase, ExternalLink, Sparkles } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getCareerPageData } from "@/lib/graphql/services";
import { whyWorkWithUs as localWhy } from "@/data/static";
import { jobOpenings as localJobs } from "@/data/services";
import JobCard from "./JobCard";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the SVKM's TMPM Hospital team. Explore current job openings and build a meaningful career in healthcare.",
  alternates: { canonical: "https://www.tmpmhospital.com/careers" },
};

/**
 * CMS rich-text fields (e.g. Strapi Blocks) don't come back as plain strings.
 * This walks strings / arrays / { text } / { children } shapes and flattens
 * them into readable text instead of letting React fall back to
 * `String(obj)` → "[object Object]".
 */
function toPlainText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    return value.map(toPlainText).filter(Boolean).join(" ");
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj.text === "string") return obj.text;
    if (Array.isArray(obj.children)) return toPlainText(obj.children);
  }
  return "";
}

/** Turns a rich-text / string / array "details" field into a clean bullet list. */
function extractQualifications(details: unknown): string[] {
  if (!details) return [];
  if (Array.isArray(details)) {
    return details.map(toPlainText).map((s) => s.trim()).filter(Boolean);
  }
  const text = toPlainText(details);
  return text
    .split(/\n+|•/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function CareersPage() {
  let gql = null;
  try { gql = await getCareerPageData(); } catch { /* use local fallback */ }

  const bannerImage    = gql?.bannerImage    ?? "/images/departments_banner_new_2.png";
  const bannerHeading  = gql?.bannerHeading  ?? "Careers at SVKM's TMPM Hospital";
  const bannerSub      = gql?.bannerSubheading ?? "Join a team driven by compassion, excellence, and purpose.";
  const whyItems       = gql?.whyWorkWithUs  ?? [];
  const jobSections    = gql?.jobSections    ?? [];

  // Fall back to local data if GraphQL returns nothing
  const showLocalJobs = jobSections.length === 0;
  const showLocalWhy  = whyItems.length === 0;
  const noOpeningsAtAll = showLocalJobs && localJobs.length === 0;

  return (
    <>
      <PageBanner image={bannerImage} title={bannerHeading} subtitle={bannerSub}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]} />

      {/* Why Work With Us */}
      <section className="relative overflow-hidden bg-white py-10">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-[0.05]"
          style={{ background: "var(--color-primary)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-[0.05]"
          style={{ background: "var(--color-accent)" }}
        />

        <div className="container-custom relative">
          {/* <SectionHeader tag="Why Join Us" title="Why Work With TMPM Hospital?"
            subtitle="Be part of a mission-driven team that makes a real difference in people's lives." /> */}

          <div className="mt-16 space-y-16 lg:space-y-24">
            {(showLocalWhy ? localWhy : whyItems).map((item, i) => {
              const reversed = i % 2 === 1;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-10 lg:gap-16 ${
                    reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
                >
                  {/* Visual */}
                  <div className="relative w-full max-w-md shrink-0 lg:w-5/12">
                    <div
                      className="absolute -inset-3 rounded-[2rem] blur-2xl"
                      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))", opacity: 0.15 }}
                    />
                    {'image' in item && item.image ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                        <Image
                          src={item.image as string}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width:1024px) 100vw, 40vw"
                        />
                      </div>
                    ) : (
                      <div
                        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl shadow-xl"
                        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))" }}
                      >
                        <Sparkles className="h-14 w-14 text-white/90" />
                      </div>
                    )}
                    <div
                      className="absolute -bottom-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-bold shadow-lg"
                      style={{ color: "var(--color-primary)", [reversed ? "right" : "left"]: "1.5rem" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="w-full lg:w-7/12">
                    <h3 className="text-2xl font-bold text-neutral-800 lg:text-3xl">{item.title}</h3>
                    <div className="mt-4 h-1 w-14 rounded-full" style={{ background: "var(--color-accent)" }} />
                    <p
                      className="mt-5 text-base leading-relaxed text-neutral-500"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="relative section-padding bg-gradient-section">
        <div className="container-custom">
          <div className="mb-2 flex justify-center">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))" }}
            >
              <Briefcase className="h-6 w-6 text-white" />
            </span>
          </div>
          <SectionHeader tag="Opportunities" title="Current Openings"
            subtitle="Explore roles across clinical, technical, administrative, and support functions." />

          {showLocalJobs ? (
            noOpeningsAtAll ? (
              <div className="card p-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                  <Briefcase className="w-8 h-8" color="var(--color-primary)" />
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">No Current Openings</h3>
                <p className="text-neutral-500 mb-5 max-w-md mx-auto">
                  Don&apos;t see a suitable opening? Send us your CV and we&apos;ll keep you in mind for future roles.
                </p>
                <Link href="/contact" className="btn-gradient">
                  Send Your CV <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 stagger-children">
                {localJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    title={String(job.designation)}
                    department={job.department ? String(job.department) : undefined}
                    location={job.location ? String(job.location) : undefined}
                    applyBy={job.applicationEndDate ? String(job.applicationEndDate) : undefined}
                    posts={job.numberOfPost}
                    qualifications={job.educationQualification}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="space-y-8 stagger-children">
              {jobSections.map((section, si) => (
                <div key={si} className="card overflow-hidden p-0">
                  <div className="flex flex-col gap-4 border-b border-neutral-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: "var(--color-primary)" }}
                      >
                        <Briefcase className="h-5 w-5 text-white" />
                      </span>
                      <div>
                        <h3 className="font-bold text-neutral-800">{section.heading}</h3>
                        {section.subheading && (
                          <p className="mt-0.5 text-sm text-neutral-500">{section.subheading}</p>
                        )}
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="btn-gradient shrink-0 self-start text-sm py-2 px-4 sm:self-auto"
                    >
                      Enquire <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                    {section.openings.map((opening, oi) => {
                      const qualifications = extractQualifications(opening.details);
                      return (
                        <div
                          key={oi}
                          className="rounded-xl bg-neutral-50 p-4 transition-colors hover:bg-neutral-100"
                        >
                          <p className="font-semibold text-sm text-neutral-700">{opening.heading}</p>

                          {qualifications.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {qualifications.map((q, qi) => (
                                <li key={qi} className="flex items-start gap-1.5 text-xs text-neutral-500">
                                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0" color="var(--color-accent)" />
                                  {q}
                                </li>
                              ))}
                            </ul>
                          )}

                          {opening.applyNow && (
                            <a
                              href={opening.applyNow}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold"
                              style={{ color: "var(--color-primary)" }}
                            >
                              Apply Now <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
