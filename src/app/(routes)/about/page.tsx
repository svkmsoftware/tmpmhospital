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
import { LucideIcon, CheckCircle2, ArrowRight, Shield, Building2, Users,
         Stethoscope, Heart, GraduationCap, Ambulance, Leaf } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";

// GraphQL service (primary data source)
import { getAboutPageData, type AboutPageData } from "@/lib/graphql/services";

// Local data (fallback when GraphQL is unavailable)
import { missionVisionData } from "@/data/visionMission";
import { managementTeam as localManagement } from "@/data/static";
import { aboutData } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SVKM's TMPM Hospital — our vision, mission, history, leadership team, and why we are the most trusted hospital in Shirpur, Maharashtra.",
  alternates: { canonical: "https://www.tmpmhospital.com/about" },
};

// ── Icon map for Why Choose Us cards ─────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope, building: Building2, users: Users,
  ambulance: Ambulance, "graduation-cap": GraduationCap,
  shield: Shield, heart: Heart, leaf: Leaf,
};

// ── Local fallback ─────────────────────────────────────────────────────────────
function getLocalFallback(): AboutPageData {
  return {
    bannerImage: "/images/about_us_banner.png",
    about: {
      heading:     aboutData.heading,
      subheading:  aboutData.subheading,
      description: aboutData.description,
      image:       "/images/aboutHospitalImage.png",
      stats:       aboutData.stats.slice(0, 6).map((s) => ({ label: s.label, value: s.value })),
    },
    vision: {
      title: missionVisionData.vision.title,
      text:  missionVisionData.vision.text,
    },
    mission: {
      title: missionVisionData.mission.title,
      text:  missionVisionData.mission.points.map((p) => p.text).join("\n"),
    },
    founders: [
      { name: "Shri Amrishbhai Patel",  role: "President, SVKM",       description: "Shri Vile Parle Kelavani Mandal (SVKM), a Public Charitable Trust & Society, born in 1934 has established a brand name in the education scenario over 85 years.", image: "/images/Amrishbhai_patel.png"  },
      { name: "Shri Bhupeshbhai Patel", role: "Joint President, SVKM", description: "Shri Vile Parle Kelavani Mandal (SVKM), a Public Charitable Trust & Society, born in 1934 has established a brand name in the education scenario over 85 years.", image: "/images/Bhupeshbhai_Patel.png" },
    ],
    trustees: [],
    management: localManagement.map((m) => ({
      name:        m.name,
      designation: m.designation,
      bio:         m.bio ?? "",
      image:       m.image,
    })),
    whyChooseUs: aboutData.whyChooseUs.map((w) => ({
      title:       w.title,
      description: w.description,
      image:       null,
    })),
    gallery: [],
  };
}

// ── Page component ─────────────────────────────────────────────────────────────
export default async function AboutPage() {
  // Try GraphQL first, fall back to local data
  const data = (await getAboutPageData()) ?? getLocalFallback();

  const { about, vision, mission, founders, trustees, management, whyChooseUs } = data;

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden aspect-square shadow-xl">
                  <Image
                    src={about.image ?? "/images/aboutHospitalImage.png"}
                    alt="SVKM TMPM Hospital"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div
                  className="absolute -bottom-5 -right-4 hidden sm:flex flex-col items-center
                             justify-center w-32 h-32 rounded-2xl text-white shadow-xl"
                  style={{ background: "var(--gradient-main)" }}
                >
                  <span className="text-4xl font-bold leading-none">25</span>
                  <span className="text-xs text-white/80 mt-1 text-center leading-tight">
                    Years of<br />Excellence
                  </span>
                </div>
              </div>

              <div>
                <p className="section-tag">
                  <span className="w-6 h-px bg-current"></span>
                  {about.heading}
                </p>
                <h2 className="section-title">{about.subheading}</h2>
                <div className="divider-accent mb-6"></div>
                <div className="space-y-3 text-neutral-600 leading-relaxed mb-8">
                  {about.description.split("\n\n").filter(Boolean).map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
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
                        <p className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>
                          {stat.value}
                        </p>
                        <p className="text-xs text-neutral-500 leading-tight">{stat.label}</p>
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
      <section id="infrastructure" className="section-padding bg-gradient-section">
        <div className="container-custom">
          <SectionHeader
            tag="Infrastructure"
            title="World-Class Facilities"
            subtitle="Purpose-built infrastructure designed for clinical precision, safety, and patient comfort."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {aboutData.infrastructure.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl shadow-card">
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" color="var(--color-accent)" />
                <span className="text-sm text-neutral-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────────────── */}
      <section id="vision-mission" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader tag="Our Values" title="Vision & Mission" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="card p-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                style={{ background: "var(--color-primary-pale)" }}
              >🎯</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
                {vision?.title ?? missionVisionData.vision.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {vision?.text ?? missionVisionData.vision.text}
              </p>
            </div>

            {/* Mission */}
            <div className="card p-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                style={{ background: "var(--color-accent-pale)" }}
              >🚀</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
                {mission?.title ?? missionVisionData.mission.title}
              </h3>
              <ul className="space-y-3">
                {missionVisionData.mission.points.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" color="var(--color-accent)" />
                    <span className="text-sm text-neutral-600 leading-relaxed">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      {whyChooseUs.length > 0 && (
        <section id="why-choose-us" className="section-padding bg-gradient-section">
          <div className="container-custom">
            <SectionHeader
              tag="Why Us"
              title="Why Choose SVKM's TMPM Hospital?"
              subtitle="Clinical excellence, education, research, and social responsibility — all under one roof."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
              {whyChooseUs.map((item, i) => {
                const localItem = aboutData.whyChooseUs[i];
                const Icon = localItem ? (iconMap[localItem.icon] ?? Stethoscope) : Stethoscope;
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
                      <Icon className="w-6 h-6" color="var(--color-primary)" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-neutral-800 mb-2 text-sm group-hover:text-cyan-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
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
                style={{ background: "var(--color-primary-pale)", border: "1px solid #bae6fd" }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--color-accent)" }}></div>
                <span className="text-sm font-medium text-neutral-700">{scheme}</span>
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
        <section id="leadership" className="section-padding bg-gradient-section">
          <div className="container-custom">
            <SectionHeader
              tag="Leadership"
              title="Founders & President"
              subtitle="Visionary leaders who built this institution with a dream of serving the people of Maharashtra."
            />
            <div className="flex flex-wrap justify-center gap-8">
              {founders.map((f) => (
                <div
                  key={f.name}
                  className="card p-8 flex flex-col sm:flex-row items-start gap-6 w-full max-w-2xl"
                >
                  {f.image && (
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
                      <Image
                        src={f.image}
                        alt={f.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  )}
                  <div>
                    <p
                      className="text-xs font-bold tracking-wider uppercase mb-1"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {f.role}
                    </p>
                    <h3 className="text-lg font-bold text-neutral-800 mb-2">{f.name}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trustees ─────────────────────────────────────────────────────── */}
      {trustees.length > 0 && (
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
                  <h3 className="font-bold text-neutral-800 text-sm">{t.name}</h3>
                  <p className="text-xs font-medium mt-1" style={{ color: "var(--color-primary)" }}>
                    {t.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Management Team ──────────────────────────────────────────────── */}
      {management.length > 0 && (
        <section id="management" className="section-padding bg-gradient-section">
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
                      src={member.image ?? "/images/male_user.png"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-neutral-800 text-sm">{member.name}</h3>
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

      <ContactCTA />
    </>
  );
}
