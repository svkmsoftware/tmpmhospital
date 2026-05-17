"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LucideIcon, Play, ArrowRight, BedDouble, HeartPulse, Scissors,
         Stethoscope, Users, Building2, CheckCircle2, Award, Shield, Microscope,
         Brain, Eye, Baby, Bone, Zap, Heart } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { HospitalStat, DepartmentCategory } from "@/types";

// ─── About ────────────────────────────────────────────────────────────────────
export function AboutSection() {
  const pillars = [
    { Icon: Award,       text: "No Profit, No Loss philosophy"         },
    { Icon: CheckCircle2,text: "NABH Accredited Hospital"              },
    { Icon: Users,       text: "Serving tribal & rural communities"    },
    { Icon: Brain,       text: "Attached Medical & Nursing College"    },
  ];

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/aboutHospitalImage.png"
                alt="SVKM TMPM Hospital"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              {/* Video play */}
              <a
                href="https://www.youtube.com/watch?v=mdxWXNYaTN4"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Watch hospital video"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/30">
                  <Play className="w-7 h-7 ml-1" fill="var(--color-primary)" color="var(--color-primary)" />
                </div>
              </a>
            </div>

            {/* Floating stat card */}
            {/* <div
              className="absolute -bottom-6 -right-4 hidden sm:flex flex-col items-center justify-center w-32 h-32 rounded-2xl text-white shadow-xl"
              style={{ background: "var(--gradient-main)" }}
            >
              <span className="text-4xl font-bold leading-none">25</span>
              <span className="text-xs text-white/80 mt-1 text-center leading-tight">Years of<br />Excellence</span>
            </div> */}

            {/* Accent box */}
            <div
              className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg text-white"
              style={{ background: "var(--color-accent)" }}
            >
              <Stethoscope className="w-5 h-5 text-white" />
              <div>
                <p className="font-bold text-sm">50+ Doctors</p>
                <p className="text-green-100 text-xs">Across Specialties</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="section-tag">
              <span className="w-6 h-px bg-current"></span>
              About Us
            </p>
            <h2 className="section-title">
              Where Compassion<br />
              <em className="gradient-text">Meets Commitment</em>
            </h2>
            <div className="divider-accent mb-6"></div>
            <p className="text-neutral-600 leading-relaxed mb-5">
              SVKM&rsquo;S Tapanbai Mukeshbhai Patel Memorial Hospital (TMPMH), Shirpur, is a state‑of‑the‑art tertiary care hospital established under the esteemed Shri Vile Parle Kelavani Mandal (SVKM&rsquo;S). Guided by a strong social commitment to serve the unserved and reach the unreached, the hospital has been developed to deliver advanced, ethical, and compassionate healthcare to the people of North Maharashtra and the adjoining regions of Madhya Pradesh and Gujarat. Strategically located at the tri‑state junction.
            </p>

            {/* Pillar list */}
            <ul className="space-y-2.5 mb-8">
              {pillars.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-neutral-700 font-medium">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                       style={{ background: "var(--color-accent-pale)" }}>
                    <Icon className="w-3.5 h-3.5" color="var(--color-accent)" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            {/* Stats mini-grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {[
                { Icon: BedDouble,   label: "Total Beds",            value: "1,200" },
                { Icon: HeartPulse,  label: "ICU Beds (incl. NICU)",  value: "150+"  },
                { Icon: Building2,   label: "Emergency Beds",         value: "34"    },
                { Icon: Scissors,    label: "Major OTs",              value: "17"    },
                { Icon: Stethoscope, label: "Minor OTs",              value: "9"     },
                { Icon: Heart,       label: "Cath Lab",               value: "1"     },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                     style={{ background: "var(--color-primary-pale)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                       style={{ background: "var(--color-primary)" }}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{value}</p>
                    <p className="leading-tight text-neutral-500" style={{ fontSize: "0.68rem" }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-gradient">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us cards (Image 4 style) ──────────────────────────────────────
export function WhyChooseUsSection() {
  const items = [
    {
      Icon: Award,
      title: "Clinical Excellence",
      desc:  "Evidence-based care through innovation, advanced technology, and qualified professionals, ensuring exceptional patient outcomes.",
    },
    {
      Icon: Heart,
      title: "Excellent Patient Care",
      desc:  "Compassionate, personalized, holistic approach leading to superior patient care.",
    },
    {
      Icon: Shield,
      title: "Transparent and Ethical",
      desc:  "Upholding honesty and integrity in all interactions, ensuring trust through clear communication and ethical practices.",
    },
    {
      Icon: Microscope,
      title: "Modern Infrastructure",
      desc:  "Equipped with state-of-the-art facilities and cutting-edge technology to support superior patient care and innovative treatments.",
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
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                     style={{ background: "var(--color-primary-pale)", border: "2px solid var(--color-primary)" }}>
                  <Icon className="w-7 h-7" color="var(--color-primary)" strokeWidth={1.5} />
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

// ─── Animated stats counter (Image 2 style — dark bg) ────────────────────────
function useCountUp(target: number, duration = 1800, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
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
  bed: BedDouble, "heart-pulse": HeartPulse, ambulance: HeartPulse,
  scissors: Scissors, stethoscope: Stethoscope, heart: HeartPulse,
};

function StatCard({ stat, enabled }: { stat: HospitalStat; enabled: boolean }) {
  const count = useCountUp(stat.value, 1800, enabled);
  const Icon  = statIconMap[stat.icon] ?? Stethoscope;
  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <p className="text-4xl md:text-5xl font-bold text-white leading-none">
        {count.toLocaleString("en-IN")}{stat.suffix}
      </p>
      <p className="mt-2 text-cyan-100 text-sm">{stat.label}</p>
    </div>
  );
}

export function StatsSection({ stats }: { stats: HospitalStat[] }) {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "#0f172a" }}>
      {/* Gradient line at top */}
      <div className="h-1 w-full" style={{ background: "var(--gradient-main)" }}></div>
      <div className="container-custom py-2">
        <p className="text-center text-sm font-bold tracking-widest uppercase text-cyan-400 pt-8 pb-2">
          Milestones That Speak For Themselves
        </p>
      </div>
      <div className="container-custom">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y-2 sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat) => <StatCard key={stat.id} stat={stat} enabled={started} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Departments (Image 1 style — icon cards with + decoration) ───────────────
const deptIconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope, scissors: Scissors, heart: HeartPulse,
  baby: Baby, bone: Bone, syringe: Stethoscope,
  eye: Eye, user: Users, ear: Stethoscope, brain: Brain,
  zap: Zap,
};

export function DepartmentsSection({ departments }: { departments: DepartmentCategory[] }) {
  const items = departments
    .flatMap((c) => c.items.map((i) => ({ ...i, cat: c.category })))
    .slice(0, 8);

  return (
    <section id="departments" className="section-padding bg-gradient-section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-tag"><span className="w-6 h-px bg-current"></span>Our Services</p>
            <h2 className="section-title">Expertise Across<br /><em className="gradient-text">Specialties</em></h2>
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
                  <Icon className="w-7 h-7" color="var(--color-primary)" strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-2xs font-bold tracking-wider uppercase mb-1"
                     style={{ fontSize: "0.6rem", color: "var(--color-accent)" }}>
                    {dept.cat}
                  </p>
                  <h3 className="text-sm font-bold text-neutral-800 group-hover:text-cyan-700 transition-colors leading-tight">
                    {dept.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
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
