"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  LucideIcon,
  Play,
  ArrowRight,
  BedDouble,
  HeartPulse,
  Scissors,
  Stethoscope,
  Users,
  Building2,
  CheckCircle2,
  Award,
  Shield,
  Microscope,
  Brain,
  Eye,
  Baby,
  Bone,
  Zap,
  Heart,
  Phone,
  User,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { HospitalStat, DepartmentCategory } from "@/types";

// ─── About ────────────────────────────────────────────────────────────────────
interface AboutSectionProps {
  /** Optional CMS-driven content from the Home page GraphQL query (home.Abour_US).
   *  When absent, the section renders its original hardcoded local content unchanged. */
  data?: {
    heading: string;
    subheading: string;
    description: string;
    image: string | null;
    video: string | null;
    stats: Array<{ label: string; value: string }>;
  } | null;
}

// Only used if the CMS doesn't return a featured_video (e.g. local dev, or empty field)
const ABOUT_VIDEO_FALLBACK_YT_ID = "mdxWXNYaTN4"; // from https://youtu.be/mdxWXNYaTN4

export function AboutSection({ data }: AboutSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // The CMS field (Abour_US.featured_video.url) is a direct MP4 file, not a
  // YouTube link — play it straight from `data.video` when present.
  const cmsVideoUrl = data?.video ?? null;

  const pillars = [
    { Icon: Award, text: "No Profit, No Loss philosophy" },
    { Icon: CheckCircle2, text: "NABH Accredited Hospital" },
    { Icon: Users, text: "Serving tribal & rural communities" },
    { Icon: Brain, text: "Attached Medical & Nursing College" },
  ];

  // CMS gives 6 stats (features_details) just like the local hardcoded grid below.
  // Reuse the same icon-per-stat assignment by position so the layout stays identical.
  const statIcons = [
    BedDouble,
    HeartPulse,
    Building2,
    Scissors,
    Stethoscope,
    Heart,
  ];
  const localStats = [
    { Icon: BedDouble, label: "Total Beds", value: "1,200" },
    { Icon: HeartPulse, label: "ICU Beds (incl. NICU)", value: "150+" },
    { Icon: Building2, label: "Emergency Beds", value: "34" },
    { Icon: Scissors, label: "Major OTs", value: "17" },
    { Icon: Stethoscope, label: "Minor OTs", value: "9" },
    { Icon: Heart, label: "Cath Lab", value: "1" },
  ];
  const statsToRender = data?.stats?.length
    ? data.stats.slice(0, 6).map((s, i) => ({
        Icon: statIcons[i] ?? Stethoscope,
        label: s.label,
        value: s.value,
      }))
    : localStats;

  // Close on Escape while the modal is open
  useEffect(() => {
    if (!isVideoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isVideoOpen]);

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src={data?.image ?? "/images/aboutHospitalImage.png"}
                alt="SVKM TMPM Hospital"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              {/* Video play — opens lightbox instead of a new tab */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Watch hospital video"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/30">
                  <Play
                    className="w-7 h-7 ml-1"
                    fill="var(--color-primary)"
                    color="var(--color-primary)"
                  />
                </div>
              </button>
            </div>

            {/* Accent box */}
            <div
              className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg text-white"
              style={{ background: "var(--color-accent)" }}
            >
              <Stethoscope className="w-5 h-5 text-white" />
              <div>
                <p className="font-bold text-sm text-white">Multi-Specialty Hospital</p>
                <p className="text-green-100 text-xs">Comprehensive Healthcare Services</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="section-tag">
              <span className="w-6 h-px bg-current"></span>
              {data?.heading ?? "About Us"}
            </p>
            <h2 className="section-title">
              Where Compassion
              <br />
              <em className="gradient-text">Meets Commitment</em>
            </h2>
            <div className="divider-accent mb-6"></div>
            <p className="text-neutral-600 leading-relaxed mb-5">
              {data?.description ??
                `SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital (TMPMH), Shirpur, is a
                state-of-the-art tertiary care hospital guided by a strong social commitment to
                serve the unserved and reach the unreached. Strategically located at the tri-state
                junction of Maharashtra, Madhya Pradesh, and Gujarat, TMPMH combines modern medical
                technology, expert clinical care, and the principle of "Equal Care, Equal Dignity".`}
            </p>

            {/* Pillar list */}
            <ul className="space-y-2.5 mb-8">
              {pillars.map(({ Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-sm text-neutral-700 font-medium"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--color-accent-pale)" }}
                  >
                    <Icon className="w-3.5 h-3.5" color="var(--color-accent)" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-gradient">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Video lightbox ─────────────────────────────────────────────── */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Hospital video"
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 sm:top-3 sm:right-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video bg-black">
              {cmsVideoUrl ? (
                // Play the video URL that comes back from GraphQL (Abour_US.featured_video.url)
                <video
                  key={cmsVideoUrl}
                  src={cmsVideoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                // Fallback only if the CMS returned no video at all
                <iframe
                  src={`https://www.youtube.com/embed/${ABOUT_VIDEO_FALLBACK_YT_ID}?autoplay=1&rel=0`}
                  title="SVKM TMPM Hospital video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Why Choose Us cards (Image 4 style) ──────────────────────────────────────
export function WhyChooseUsSection() {
  const items = [
    {
      Icon: Award,
      title: "Clinical Excellence",
      desc: "Evidence-based care through innovation, advanced technology, and qualified professionals, ensuring exceptional patient outcomes.",
    },
    {
      Icon: Heart,
      title: "Excellent Patient Care",
      desc: "Compassionate, personalized, holistic approach leading to superior patient care.",
    },
    {
      Icon: Shield,
      title: "Transparent and Ethical",
      desc: "Upholding honesty and integrity in all interactions, ensuring trust through clear communication and ethical practices.",
    },
    {
      Icon: Microscope,
      title: "Modern Infrastructure",
      desc: "Equipped with state-of-the-art facilities and cutting-edge technology to support superior patient care and innovative treatments.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          tag="Why Choose Us"
          title="Why SVKM's TMPM Hospital?"
          subtitle="What makes us the preferred healthcare destination in the region."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger-children">
          {items.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group p-8 rounded-2xl border border-neutral-100 bg-neutral-50
                         hover:border-cyan-200 hover:shadow-card-hover hover:-translate-y-1
                         transition-all duration-300 cursor-default"
            >
              {/* Icon — style matches image 4: outline-only icon */}
              <div className="mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "var(--color-primary-pale)",
                    border: "2px solid var(--color-primary)",
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    color="var(--color-primary)"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-neutral-800 mb-2 group-hover:text-cyan-700 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const hospitalStats: HospitalStat[] = [
  {
    id: 1,
    value: 1200,
    suffix: "",
    label: "Total Beds",
    icon: "bed",
  },
  {
    id: 2,
    value: 150,
    suffix: "+",
    label: "ICU Beds",
    icon: "heart-pulse",
  },
  {
    id: 3,
    value: 34,
    suffix: "",
    label: "Emergency Beds",
    icon: "heart",
  },
  {
    id: 4,
    value: 17,
    suffix: "",
    label: "Major OTs",
    icon: "scissors",
  },
  {
    id: 5,
    value: 9,
    suffix: "",
    label: "Minor OTs",
    icon: "scissors",
  },
  {
    id: 6,
    value: 1,
    suffix: "",
    label: "Cath Lab",
    icon: "stethoscope",
  },
];

// ─── Animated stats counter (Image style — light bg, bordered cards) ─────────
function useCountUp(target: number, duration = 1800, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const step = () => {
      frame++;
      const p = ease(Math.min(frame / totalFrames, 1));
      setCount(Math.floor(p * target));
      if (frame < totalFrames) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, enabled]);
  return count;
}

const statIconMap: Record<string, LucideIcon> = {
  bed: BedDouble,
  "heart-pulse": HeartPulse,
  ambulance: HeartPulse,
  scissors: Scissors,
  stethoscope: Stethoscope,
  heart: HeartPulse,
};

function StatCard({ stat, enabled }: { stat: HospitalStat; enabled: boolean }) {
  const count = useCountUp(stat.value, 1800, enabled);
  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden text-center px-4 py-8
                 border border-primary-pale shadow-card transition-all duration-300
                 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {/* Gradient top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ background: "var(--gradient-main)" }}
      />
      <p
        className="text-4xl md:text-5xl font-extrabold leading-none"
        style={{ color: "var(--color-primary)" }}
      >
        {count.toLocaleString("en-IN")}
        {stat.suffix}
      </p>
      <p
        className="mt-3 text-sm font-semibold"
        style={{ color: "var(--color-text)" }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export function StatsSection({ stats }: { stats: HospitalStat[] }) {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hiddenpy-20 section-padding bg-gradient-section"
    >
      <div className="container-custom">
        <div className="mb-12 text-center">
          <p className="section-tag justify-center">
            <span className="w-6 h-px bg-current opacity-80"></span>
            Hospital Capacity
            <span className="w-6 h-px bg-current opacity-80"></span>
          </p>

          <h2 className="section-title">
            A Newly Inaugurated{" "}
            <span className="gradient-text">Multispecialty Hospital</span>
          </h2>

          <div className="divider-accent mt-3 mx-auto"></div>

          {/* <p className="section-subtitle mt-4 mx-auto">
            Delivering advanced healthcare with state-of-the-art facilities,
            experienced specialists, and compassionate patient care under one
            roof.
          </p> */}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} enabled={started} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Departments (Image 1 style — icon cards with + decoration) ───────────────
const deptIconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  scissors: Scissors,
  heart: HeartPulse,
  baby: Baby,
  bone: Bone,
  syringe: Stethoscope,
  eye: Eye,
  user: Users,
  ear: Stethoscope,
  brain: Brain,
  zap: Zap,
};

export function DepartmentsSection({
  departments,
}: {
  departments: DepartmentCategory[];
}) {
  const items = departments
    .flatMap((c) => c.items.map((i) => ({ ...i, cat: c.category })))
    .slice(0, 8);

  return (
    <section id="departments" className="section-padding bg-gradient-section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-tag">
              <span className="w-6 h-px bg-current"></span>Our Services
            </p>
            <h2 className="section-title">
              Expertise Across
              <br />
              <em className="gradient-text">Specialties</em>
            </h2>
            <div className="divider-accent mt-3"></div>
          </div>
          <Link href="/departments" className="btn-outline shrink-0">
            All Departments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid — matches image 1: clean cards with outline icon, title, desc */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {items.map((dept) => {
            const Icon = deptIconMap[dept.icon] ?? Stethoscope;
            return (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="group bg-white rounded-2xl p-6 flex flex-col gap-4 border border-transparent
                           hover:border-cyan-300 hover:shadow-card-hover hover:-translate-y-1
                           transition-all duration-300"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Outline icon — like image 1 */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    border: "1.5px solid var(--color-primary)",
                    background: "var(--color-primary-pale)",
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    color="var(--color-primary)"
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <p
                    className="text-2xs font-bold tracking-wider uppercase mb-1"
                    style={{ fontSize: "0.6rem", color: "var(--color-accent)" }}
                  >
                    {dept.cat}
                  </p>
                  <h3 className="text-sm font-bold text-neutral-800 group-hover:text-cyan-700 transition-colors leading-tight">
                    {dept.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div
                  className="mt-auto flex items-center gap-1 text-xs font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  Learn More
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Meet Our Doctors (homepage slider) ────────────────────────────────────────
export interface DoctorSummary {
  id: string;
  name: string;
  designation: string;
  profileImage: string | null;
  viewProfile: string | null;
  bookAppointment: string | null;
}

interface MeetOurDoctorsSectionProps {
  doctors: DoctorSummary[];
}

export function MeetOurDoctorsSection({ doctors }: MeetOurDoctorsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors.length]);

  if (!doctors || doctors.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 260;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -(cardWidth + 24) : cardWidth + 24,
      behavior: "smooth",
    });
  };

  return (
    <section id="doctors" className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-tag">
              <span className="w-6 h-px bg-current"></span>Our Team
            </p>
            <h2 className="section-title">
              Meet Our <em className="gradient-text">Doctors</em>
            </h2>
            <div className="divider-accent mt-3"></div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Nav arrows — disabled state at scroll boundaries */}
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:-translate-x-0.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)",
                }}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:translate-x-0.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0"
                style={{ background: "var(--gradient-main)" }}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link href="/doctors" className="btn-outline shrink-0">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Slider with edge fade to hint there's more content */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 z-10 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to right, white, transparent)",
              opacity: canScrollLeft ? 1 : 0,
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 z-10 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to left, white, transparent)",
              opacity: canScrollRight ? 1 : 0,
            }}
          />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
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
                <div
                  key={doc.id}
                  className="group shrink-0 snap-start rounded-3xl overflow-hidden bg-white
                             border border-neutral-100 shadow-card hover:shadow-card-hover
                             hover:-translate-y-1 transition-all duration-300"
                  style={{ width: 260 }}
                >
                  {/* Photo with name/designation overlaid on a gradient scrim */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <Image
                      src={doc.profileImage ?? "/images/male_user.png"}
                      alt={doc.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="260px"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-bold text-white text-sm leading-tight">
                        {doc.name}
                      </h3>
                      <p className="text-white/80 text-xs font-medium mt-0.5">
                        {doc.designation}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 flex gap-2">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
