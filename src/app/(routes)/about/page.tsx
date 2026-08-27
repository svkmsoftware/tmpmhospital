/**
 * About Us Page
 * ─────────────────────────────────────────────────────────────────────────────
 * LEARNING: Data flow in this file
 *
 * 1. getAboutPageData() calls GraphQL → gets live CMS data
 * 2. If GraphQL fails → getLocalFallback() provides local static data
 * 3. Both return the same AboutPageData shape → components render identically
 *
 * The page never shows an error. Visitors always see a complete page.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LucideIcon,
  CheckCircle2,
  ArrowRight,
  Shield,
  Building2,
  Users,
  Stethoscope,
  Heart,
  GraduationCap,
  Ambulance,
  Leaf,
  Rocket,
  Target,
} from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";

// GraphQL service (primary data source)
import { getAboutPageData, type AboutPageData } from "@/lib/graphql/services";

// Local data (fallback when GraphQL is unavailable)
import { missionVisionData } from "@/data/visionMission";
import { managementTeam as localManagement } from "@/data/static";
import { aboutData } from "@/data/about";
import { cn } from "@/lib/utils";
import ExpandableDescription from "@/components/ui/ExpandableDescription";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SVKM's TMPM Hospital — our vision, mission, history, leadership team, and why we are the most trusted hospital in Shirpur, Maharashtra.",
  alternates: { canonical: "https://www.tmpmhospital.com/about" },
};

// ── Icon map for Why Choose Us cards ─────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  building: Building2,
  users: Users,
  ambulance: Ambulance,
  "graduation-cap": GraduationCap,
  shield: Shield,
  heart: Heart,
  leaf: Leaf,
};

// ── Local fallback ─────────────────────────────────────────────────────────────
function getLocalFallback(): AboutPageData {
  return {
    bannerImage: "/images/about_us_banner.png",
    about: {
      heading: aboutData.heading,
      subheading: aboutData.subheading,
      description: aboutData.description,
      image: "/images/aboutHospitalImage.png",
      stats: aboutData.stats
        .slice(0, 6)
        .map((s) => ({ label: s.label, value: s.value })),
    },
    vision: {
      title: missionVisionData.vision.title,
      text: missionVisionData.vision.text,
    },
    mission: {
      title: missionVisionData.mission.title,
      text: missionVisionData.mission.points.map((p) => p.text).join("\n"),
    },
    founders: [
      {
        name: "Shri Amrishbhai Patel",
        role: "President, SVKM",
        description:
          "Shri Vile Parle Kelavani Mandal (SVKM), a Public Charitable Trust & Society, born in 1934 has established a brand name in the education scenario over 85 years.",
        image: "/images/Amrishbhai_patel.png",
      },
      {
        name: "Shri Bhupeshbhai Patel",
        role: "Joint President, SVKM",
        description:
          "Shri Vile Parle Kelavani Mandal (SVKM), a Public Charitable Trust & Society, born in 1934 has established a brand name in the education scenario over 85 years.",
        image: "/images/Bhupeshbhai_Patel.png",
      },
    ],
    trustees: [],
    management: localManagement.map((m) => ({
      name: m.name,
      designation: m.designation,
      bio: m.bio ?? "",
      image: m.image,
    })),
    whyChooseUs: aboutData.whyChooseUs.map((w) => ({
      title: w.title,
      description: w.description,
      image: null,
    })),
    gallery: [],
  };
}

// ── Page component ─────────────────────────────────────────────────────────────
export default async function AboutPage() {
  // Try GraphQL first, fall back to local data
  const data = (await getAboutPageData()) ?? getLocalFallback();

  const {
    about,
    vision,
    mission,
    founders,
    trustees,
    management,
    whyChooseUs,
  } = data;

  return (
    <>
      <PageBanner
        image={data.bannerImage ?? "/images/about_us_banner.png"}
        title="About Us"
        subtitle="A legacy of compassion, excellence, and service to the community."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* ── Overview ────────────────────────────────────────────────────── */}
      {about && (
        <section id="about" className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden aspect-[6/5] shadow-xl">
                  <Image
                    src={about.image ?? "/images/aboutHospitalImage.png"}
                    alt="SVKM TMPM Hospital"
                    fill
                    className="object-cover object-bottom"
                    sizes="(max-width:1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                {/* <div
                  className="absolute -bottom-5 -right-4 hidden sm:flex flex-col items-center
                             justify-center w-32 h-32 rounded-2xl text-white shadow-xl"
                  style={{ background: "var(--gradient-main)" }}
                >
                  <span className="text-4xl font-bold leading-none">25</span>
                  <span className="text-xs text-white/80 mt-1 text-center leading-tight">
                    Years of<br />Excellence
                  </span>
                </div> */}
              </div>

              <div>
                <p className="section-tag">
                  <span className="w-6 h-px bg-current"></span>
                  {about.heading}
                </p>
                <h2 className="section-title">{about.subheading}</h2>
                <div className="divider-accent mb-6"></div>
                <div className="space-y-3 text-neutral-600 leading-relaxed mb-8">
                  <ExpandableDescription
                    paragraphs={about.description.split("\n\n").filter(Boolean)}
                  />
                </div>

                {/* Stats from GraphQL or local */}
                {about.stats.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {about.stats.slice(0, 6).map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col gap-1 p-3 rounded-xl"
                        style={{ background: "var(--color-primary-pale)" }}
                      >
                        <p
                          className="text-xl font-bold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-xs text-neutral-500 leading-tight">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <Link href="/contact" className="btn-gradient">
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Infrastructure ───────────────────────────────────────────────── */}
      <section
        id="infrastructure"
        className="section-padding bg-gradient-section"
      >
        <div className="container-custom">
          <SectionHeader
            tag="Infrastructure"
            title="World-Class Facilities"
            subtitle="Purpose-built infrastructure designed for clinical precision, safety, and patient comfort."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {aboutData.infrastructure.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-white rounded-2xl shadow-card"
              >
                <CheckCircle2
                  className="w-5 h-5 mt-0.5 shrink-0"
                  color="var(--color-accent)"
                />
                <span className="text-sm text-neutral-700 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────────────── */}
      <section id="vision-mission" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader tag="Our Values" title="Vision & Mission" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Vision */}
            <div className="group relative bg-white rounded-3xl p-8 sm:p-9 border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(4,86,168,0.15)] hover:shadow-[0_20px_50px_-15px_rgba(4,86,168,0.25)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* watermark icon */}
              <Target
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.04] pointer-events-none"
                style={{ color: "var(--color-primary)" }}
                strokeWidth={1}
                aria-hidden
              />

              <div className="relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: "var(--color-primary-pale)",
                    border: "1.5px solid var(--color-primary)",
                  }}
                >
                  <Target
                    className="w-6 h-6"
                    color="var(--color-primary)"
                    strokeWidth={1.75}
                  />
                </div>

                <span
                  className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  Our Vision
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-4 leading-snug">
                  {vision?.title ?? missionVisionData.vision.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-[15px]">
                  {vision?.text ?? missionVisionData.vision.text}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="group relative bg-white rounded-3xl p-8 sm:p-9 border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(8,162,164,0.15)] hover:shadow-[0_20px_50px_-15px_rgba(8,162,164,0.25)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* watermark icon */}
              <Rocket
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.04] pointer-events-none"
                style={{ color: "var(--color-accent)" }}
                strokeWidth={1}
                aria-hidden
              />

              <div className="relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: "var(--color-accent-pale)",
                    border: "1.5px solid var(--color-accent)",
                  }}
                >
                  <Rocket
                    className="w-6 h-6"
                    color="var(--color-accent)"
                    strokeWidth={1.75}
                  />
                </div>

                <span
                  className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  Our Mission
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-5 leading-snug">
                  {mission?.title ?? missionVisionData.mission.title}
                </h3>
                <ul className="space-y-3.5">
                  {missionVisionData.mission.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle2
                        className="w-[18px] h-[18px] mt-0.5 shrink-0"
                        color="var(--color-accent)"
                        strokeWidth={2}
                      />
                      <span className="text-sm text-neutral-600 leading-relaxed">
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      {whyChooseUs.length > 0 && (
        <section
          id="why-choose-us"
          className="section-padding bg-gradient-section"
        >
          <div className="container-custom">
            <SectionHeader
              tag="Why Us"
              title="Why Choose SVKM's TMPM Hospital?"
              subtitle="Clinical excellence, education, research, and social responsibility — all under one roof."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
              {whyChooseUs.map((item, i) => {
                const localItem = aboutData.whyChooseUs[i];
                const Icon = localItem
                  ? (iconMap[localItem.icon] ?? Stethoscope)
                  : Stethoscope;
                return (
                  <div
                    key={i}
                    className="group p-6 rounded-2xl bg-white border border-transparent
                               hover:border-cyan-200 hover:shadow-card-hover hover:-translate-y-1
                               transition-all duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        background: "var(--color-primary-pale)",
                        border: "1.5px solid var(--color-primary)",
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        color="var(--color-primary)"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-bold text-neutral-800 mb-2 text-sm group-hover:text-cyan-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Government Schemes ───────────────────────────────────────────── */}
      <section id="schemes" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            tag="Empanelled Schemes"
            title="Government Health Schemes"
            subtitle="We are proud to be empanelled with a wide range of central and state government health schemes."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
            {aboutData.governmentSchemes.map((scheme, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{
                  background: "var(--color-primary-pale)",
                  border: "1px solid #D8EEE8",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: "var(--color-accent)" }}
                ></div>
                <span className="text-sm font-medium text-neutral-700">
                  {scheme}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/tpa-insurance" className="btn-gradient">
              View Insurance & TPA Partners <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Founders ─────────────────────────────────────────────────────── */}
      {founders.length > 0 && (
        <section id="leadership" className="relative overflow-hidden">
          <div
            className="relative py-20 sm:py-28"
            style={{
              background:
                "linear-gradient(160deg, #051F38 0%, #0456A8 55%, #063E7D 100%)",
            }}
          >
            {/* top & bottom hairline borders — certificate-style framing */}
            <div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F2A93B]/50 to-transparent"
              aria-hidden
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F2A93B]/50 to-transparent"
              aria-hidden
            />

            {/* decorative watermark blobs */}
            <div
              className="absolute top-1/4 -left-24 w-96 h-96 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
              style={{ background: "#ffffff" }}
              aria-hidden
            />
            <div
              className="absolute bottom-0 -right-20 w-80 h-80 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
              style={{ background: "#08A2A4" }}
              aria-hidden
            />

            <div className="container-custom relative">
              {/* ── Heading with ornamental flourish ─────────────────────── */}
              <div className="text-center mb-20 sm:mb-24">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span
                    className="h-px w-10 sm:w-16"
                    style={{ background: "#F2A93B" }}
                  />
                  <span
                    className="text-[11px] font-semibold tracking-[0.28em] uppercase"
                    style={{ color: "#F2A93B" }}
                  >
                    Est. 1934
                  </span>
                  <span
                    className="h-px w-10 sm:w-16"
                    style={{ background: "#F2A93B" }}
                  />
                </div>
                <h2
                  className="text-4xl sm:text-5xl text-white mb-4"
                  style={{ fontFamily: "var(--font-display, serif)" }}
                >
                  Founders &amp; President
                </h2>
                <p className="text-cyan-100/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  Visionary leaders who built this institution with a dream of
                  serving the people of Maharashtra.
                </p>
              </div>

              {/* ── Editorial founder spreads ─────────────────────────────── */}
              <div className="space-y-20 sm:space-y-28 max-w-5xl mx-auto">
                {founders.map((f, i) => {
                  const reversed = i % 2 === 1;
                  return (
                    <div
                      key={f.name}
                      className={cn(
                        "grid grid-cols-1 md:grid-cols-[minmax(0,280px)_1px_1fr] gap-8 md:gap-12 items-center",
                        reversed && "md:[direction:rtl]",
                      )}
                    >
                      {/* Portrait */}
                      <div
                        className={cn(
                          "mx-auto md:mx-0",
                          reversed && "md:[direction:ltr]",
                        )}
                      >
                        <div className="relative w-56 h-72 sm:w-64 sm:h-80">
                          <div
                            className="absolute -top-3 -left-3 w-full h-full rounded-sm"
                            style={{ border: "1px solid #F2A93B99" }}
                            aria-hidden
                          />
                          <div className="relative w-full h-full overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                            {f.image && (
                              <Image
                                src={f.image}
                                alt={f.name}
                                fill
                                className="object-cover"
                                sizes="256px"
                              />
                            )}
                          </div>
                          {/* <span
                            className="absolute -bottom-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                            style={{ background: "#F2A93B", color: "#051F38" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span> */}
                        </div>
                      </div>

                      {/* vertical divider — desktop only */}
                      <div
                        className="hidden md:block self-stretch w-px bg-white/15"
                        aria-hidden
                      />

                      {/* Text */}
                      <div
                        className={cn(
                          "md:[direction:ltr]",
                          reversed
                            ? "text-center md:text-right"
                            : "text-center md:text-left",
                        )}
                      >
                        <span
                          className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
                          style={{ color: "#F2A93B" }}
                        >
                          {f.role}
                        </span>
                        <h3
                          className="text-2xl sm:text-3xl text-white mb-5 leading-snug"
                          style={{ fontFamily: "var(--font-display, serif)" }}
                        >
                          {f.name}
                        </h3>
                        <p className="text-cyan-50/75 leading-relaxed text-[15px] sm:text-base max-w-xl md:max-w-none mx-auto">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Trustees ─────────────────────────────────────────────────────── */}
      {/* {trustees.length > 0 && (
        <section id="trustees" className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeader
              tag="Governance"
              title="Our Trustees"
              subtitle="Dedicated individuals who guide the institution with integrity and purpose."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 stagger-children">
              {trustees.map((t) => (
                <div key={t.name} className="card p-5 text-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 ring-4 ring-neutral-100">
                    <Image
                      src={t.image ?? "/images/male_user.png"}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <h3 className="font-bold text-neutral-800 text-sm">
                    {t.name}
                  </h3>
                  <p
                    className="text-xs font-medium mt-1"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {t.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* ── Management Team ──────────────────────────────────────────────── */}
      {management.length > 0 && (
        <section
          id="management"
          className="section-padding bg-gradient-section"
        >
          <div className="container-custom">
            <SectionHeader
              tag="Team"
              title="Management Team"
              subtitle="Experienced professionals committed to operational excellence and patient satisfaction."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {management.map((member, i) => (
                <div key={i} className="card p-6 flex gap-5">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 ring-2 ring-neutral-100">
                    <Image
                      src={member.image ?? "/images/icons/management_team_member.png"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-neutral-800 text-sm">
                      {member.name}
                    </h3>
                    <p
                      className="text-xs font-semibold mt-0.5 mb-2"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {member.designation}
                    </p>
                    {member.bio && (
                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* <ContactCTA /> */}
    </>
  );
}
