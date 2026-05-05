/**
 * About Page — Strapi Integrated
 * ─────────────────────────────────────────────────────────────────────────────
 * LEARNING NOTE — How data flows in this file:
 *
 *  1. Next.js runs this file on the SERVER (it has no "use client" at top)
 *  2. It calls fetchAboutPage() which hits the Strapi REST API
 *  3. If Strapi is down/misconfigured, it returns null → we use local data
 *  4. We transform the raw API data into clean shapes our components need
 *  5. We pass that data as props to components — no API calls in components!
 *
 * This pattern is called "server-side data fetching with graceful degradation".
 * Your page is always fast and always works, even when the API is temporarily down.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";

// ── Strapi integration ─────────────────────────────────────────────────────────
import { fetchAboutPage } from "@/lib/strapi/client";
import {
  transformAboutPage,
  type TransformedAboutPage,
} from "@/lib/strapi/transformers";

// ── Local fallback data ────────────────────────────────────────────────────────
import { missionVisionData } from "@/data/visionMission";
import { managementTeam as localManagement } from "@/data/static";

// ── SEO Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SVKM's TMPM Hospital — our vision, mission, history, leadership team, and why we are the most trusted hospital in Shirpur, Maharashtra.",
  alternates: { canonical: "https://www.tmpmhospital.com/about" },
  openGraph: {
    title:       "About Us | SVKM's TMPM Hospital",
    description: "Our vision, mission, founders, management team, and why we are Shirpur's premier multispecialty hospital.",
    images:      ["/images/about_us_banner.png"],
  },
};

// ── Local fallback dataset (used when Strapi is unavailable) ───────────────────
function getLocalFallback(): TransformedAboutPage {
  return {
    bannerImage: "/images/about_us_banner.png",
    about: {
      heading:       "About Us",
      subheading:    "Where Compassion Meets Commitment: Right Where It's Needed Most.",
      description:   "SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital, Medical College & Research Centre stands as a premier multispecialty medical centre in Shirpur. It is a 1200-bedded healthcare hub, blending compassionate care with advanced infrastructure. With multiple surgical & procedural suites, specialized ICUs for adults, children, and neonates, and a fully equipped obstetric unit, it stands as a beacon of healing and medical excellence; well supported by an attached Medical & Nursing College.",
      featuredImage: "/images/aboutHospitalImage.png",
      stats: [
        { label: "Total Beds",               value: "1,200+", icon: "bed"         },
        { label: "Critical Care Beds",        value: "120+",   icon: "heart-pulse" },
        { label: "Emergency Beds",            value: "34+",    icon: "ambulance"   },
        { label: "Operation Theatres",        value: "17",     icon: "scissors"    },
        { label: "Catheterization Laboratory",value: "1",      icon: "heart"       },
      ],
    },
    visionMission: {
      vision:  { title: "Vision",  text: missionVisionData.vision.text },
      mission: { title: "Mission", points: missionVisionData.mission.points },
    },
    founders: [
      { name: "Shri Amrishbhai Patel",  role: "President, SVKM",       description: "Shri Vile Parle Kelavani Mandal (SVKM), a Public Charitable Trust & Society, born in 1934 with adoption of a school has its existence over 85 years and has established a brand name in education scenario.", image: "/images/Amrishbhai_patel.png"  },
      { name: "Shri Bhupeshbhai Patel", role: "Joint President, SVKM", description: "Shri Vile Parle Kelavani Mandal (SVKM), a Public Charitable Trust & Society, born in 1934 with adoption of a school has its existence over 85 years and has established a brand name in education scenario.", image: "/images/Bhupeshbhai_Patel.png" },
    ],
    trustees: [],
    management: localManagement,
    whyChooseUs: [
      { title: "1200-Bed Multispecialty Hub",      description: "One of the largest multispecialty hospitals in the Shirpur region, equipped with cutting-edge infrastructure.", image: "/images/departments-1.jpg" },
      { title: "No Profit, No Loss Philosophy",     description: "Committed to affordable healthcare for all — especially tribal and rural communities of Maharashtra.",           image: "/images/departments-2.jpg" },
      { title: "Academic Excellence",               description: "Supported by an attached Medical College and Nursing College, ensuring the highest standards of care.",          image: "/images/departments-3.jpg" },
      { title: "Advanced Technology",               description: "State-of-the-art diagnostics, surgical robots, and modern ICUs for superior clinical outcomes.",                 image: "/images/departments-4.jpg" },
      { title: "Community Commitment",              description: "Regular health camps, free check-ups, and outreach programs for underserved populations.",                       image: "/images/departments-5.jpg" },
      { title: "Accredited Quality",                description: "NABH accredited hospital with rigorous quality standards and patient safety protocols.",                          image: "/images/departments-1.jpg" },
    ],
    gallery: [],
  };
}

// ── Page component ─────────────────────────────────────────────────────────────
export default async function AboutPage() {
  /*
   * LEARNING NOTE — try/catch with fallback:
   * We try to fetch from Strapi. If anything goes wrong (network, wrong token,
   * Strapi is down), we catch the error and use local data instead.
   * Your website NEVER shows a broken page to visitors.
   */
  let data: TransformedAboutPage;

  try {
    const raw = await fetchAboutPage();
    data = raw ? transformAboutPage(raw) : getLocalFallback();
  } catch {
    data = getLocalFallback();
  }

  const { about, visionMission, founders, trustees, management, whyChooseUs } = data;

  return (
    <>
      {/* ── Banner ──────────────────────────────────────────────────────────── */}
      <PageBanner
        image={data.bannerImage ?? "/images/about_us_banner.png"}
        title="About Us"
        subtitle="A legacy of compassion, excellence, and service to the community."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      {/* ── About / Overview ────────────────────────────────────────────────── */}
      {about && (
        <section id="about" className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden aspect-square shadow-xl">
                  <Image
                    src={about.featuredImage ?? "/images/aboutHospitalImage.png"}
                    alt="SVKM TMPM Hospital"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                {/* Floating stat pill */}
                <div
                  className="absolute -bottom-5 -right-4 hidden sm:flex flex-col items-center justify-center w-32 h-32 rounded-2xl text-white shadow-xl"
                  style={{ background: "var(--color-primary)" }}
                >
                  <span className="text-4xl font-bold leading-none">25</span>
                  <span className="text-xs text-cyan-200 mt-1 text-center leading-tight">
                    Years of<br />Excellence
                  </span>
                </div>
              </div>

              {/* Text */}
              <div>
                <p className="section-tag">
                  <span className="w-6 h-px bg-current"></span>
                  {about.heading}
                </p>
                <h2 className="section-title">{about.subheading}</h2>
                <div className="divider-accent mb-6"></div>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  {about.description}
                </p>

                {/* Stats grid from API */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {about.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col gap-1 p-3 rounded-xl bg-neutral-50 hover:bg-cyan-50 transition-colors"
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

                <Link href="/contact" className="btn-gradient">
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Vision & Mission ─────────────────────────────────────────────────── */}
      <section id="vision-mission" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader tag="Our Values" title="Vision & Mission" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="card p-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                style={{ background: "var(--color-primary-pale)" }}
              >
                🎯
              </div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                {visionMission.vision.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {visionMission.vision.text}
              </p>
            </div>

            {/* Mission */}
            <div className="card p-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                style={{ background: "var(--color-accent-pale)" }}
              >
                🚀
              </div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                {visionMission.mission.title}
              </h3>
              <ul className="space-y-3">
                {visionMission.mission.points.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "var(--color-accent)" }}
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
      </section>

      {/* ── Founders & Leadership ────────────────────────────────────────────── */}
      {founders.length > 0 && (
        <section id="leadership" className="section-padding bg-white">
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
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
                    <Image
                      src={f.image ?? "/images/male_user.png"}
                      alt={f.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-wider uppercase mb-1"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {f.role}
                    </p>
                    <h3 className="text-lg font-bold text-neutral-800 mb-2">
                      {f.name}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trustees ─────────────────────────────────────────────────────────── */}
      {trustees.length > 0 && (
        <section id="trustees" className="section-padding bg-neutral-50">
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
      )}

      {/* ── Management Team ──────────────────────────────────────────────────── */}
      {management.length > 0 && (
        <section id="management" className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeader
              tag="Team"
              title="Management Team"
              subtitle="Experienced professionals committed to operational excellence and patient satisfaction."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {management.map((member) => (
                <div key={member.id} className="card p-6 flex gap-5">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 ring-2 ring-neutral-100">
                    <Image
                      src={member.image}
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

      {/* ── Why Choose Us ────────────────────────────────────────────────────── */}
      {whyChooseUs.length > 0 && (
        <section id="why-choose-us" className="section-padding bg-neutral-50">
          <div className="container-custom">
            <SectionHeader
              tag="Why Us"
              title="Why Choose TMPM Hospital?"
              subtitle="What makes us the preferred healthcare destination in the region."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {whyChooseUs.map((item, i) => (
                <div
                  key={i}
                  className="card overflow-hidden group"
                >
                  {item.image && (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-neutral-800 mb-2 group-hover:text-cyan-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed line-clamp-4">
                      {item.description}
                    </p>
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
