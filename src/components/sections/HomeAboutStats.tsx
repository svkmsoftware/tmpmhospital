"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Play, ArrowRight, BedDouble, HeartPulse, Scissors, Stethoscope, Users, Building2, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { HospitalStat, DepartmentCategory } from "@/types";

// ── About ─────────────────────────────────────────────────────────────────────
export function AboutSection() {
  const highlights = [
    { Icon: BedDouble,   label: "Total Beds",          value: "1,200+" },
    { Icon: HeartPulse,  label: "Critical Care Beds",  value: "120+"   },
    { Icon: Building2,   label: "Emergency Beds",      value: "34+"    },
    { Icon: Scissors,    label: "Operation Theatres",  value: "17"     },
    { Icon: Stethoscope, label: "Specialist Doctors",  value: "50+"    },
    { Icon: Users,       label: "Cath Lab",            value: "1"      },
  ];

  const pillars = [
    "No Profit, No Loss philosophy",
    "NABH Accredited Hospital",
    "Serving tribal & rural communities",
    "Attached Medical & Nursing College",
  ];

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Image side ─────────────────────────────────────────────── */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/aboutHospitalImage.png"
                alt="SVKM TMPM Hospital"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Video play */}
              <a
                href="https://youtu.be/TgYY6cRazHM"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Watch hospital introduction video"
              >
                <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/30">
                  <Play className="w-7 h-7 ml-1" fill="var(--color-primary)" color="var(--color-primary)" />
                </div>
              </a>
            </div>

            {/* Floating stat card */}
            <div
              className="absolute -bottom-6 -right-4 hidden sm:flex flex-col items-center justify-center w-32 h-32 rounded-2xl text-white shadow-xl"
              style={{ background: "var(--color-primary)" }}
            >
              <span className="text-4xl font-bold leading-none">25</span>
              <span className="text-xs text-blue-200 mt-1 text-center leading-tight">Years of<br />Excellence</span>
            </div>

            {/* Small accent box */}
            <div
              className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg"
              style={{ background: "var(--color-accent)" }}
            >
              <Stethoscope className="w-5 h-5 text-white" />
              <div>
                <p className="text-white font-bold text-sm">50+ Doctors</p>
                <p className="text-amber-100 text-xs">Across Specialties</p>
              </div>
            </div>
          </div>

          {/* ── Text side ──────────────────────────────────────────────── */}
          <div>
            <p className="section-tag">
              <span className="w-6 h-px bg-current" />
              About Us
            </p>
            <h2 className="section-title">
              Where Compassion<br />
              <span className="italic" style={{ color: "var(--color-primary)" }}>Meets Commitment</span>
            </h2>
            <div className="divider-accent mb-6" />

            <p className="text-neutral-600 leading-relaxed mb-5">
              SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital is a 1200-bedded premier multispecialty medical centre in Shirpur — blending compassionate care with advanced infrastructure. With multiple surgical suites, specialized ICUs, and a fully equipped obstetric unit, it stands as a beacon of healing and medical excellence.
            </p>

            {/* Pillars */}
            <ul className="space-y-2.5 mb-8">
              {pillars.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-neutral-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--color-accent)" }} />
                  {p}
                </li>
              ))}
            </ul>

            {/* Stats mini-grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {highlights.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-blue-50 transition-colors group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--color-primary-pale)" }}>
                    <Icon className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{value}</p>
                    <p className="text-2xs text-neutral-400 leading-tight" style={{ fontSize: "0.68rem" }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats counter ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in-out
    const step = () => {
      frame++;
      const progress = ease(Math.min(frame / totalFrames, 1));
      setCount(Math.floor(progress * target));
      if (frame < totalFrames) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, enabled]);
  return count;
}

const statIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bed: BedDouble, "heart-pulse": HeartPulse, ambulance: HeartPulse,
  scissors: Scissors, stethoscope: Stethoscope, heart: HeartPulse,
};

function StatCard({ stat, enabled }: { stat: HospitalStat; enabled: boolean }) {
  const count = useCountUp(stat.value, 1800, enabled);
  const Icon = statIconMap[stat.icon] ?? Stethoscope;
  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <p className="text-4xl md:text-5xl font-bold text-white leading-none">
        {count.toLocaleString("en-IN")}{stat.suffix}
      </p>
      <p className="mt-2 text-blue-200 text-sm tracking-wide">{stat.label}</p>
    </div>
  );
}

export function StatsSection({ stats }: { stats: HospitalStat[] }) {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "var(--color-primary)" }}>
      {/* Decorative rings */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />

      <div className="container-custom">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-white/10">
          {stats.map((stat) => <StatCard key={stat.id} stat={stat} enabled={started} />)}
        </div>
      </div>
    </section>
  );
}

// ── Departments ───────────────────────────────────────────────────────────────
const deptIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  stethoscope: Stethoscope, scissors: Scissors, heart: HeartPulse,
  baby: Users, bone: Building2, syringe: Stethoscope,
  eye: Stethoscope, user: Users, ear: Stethoscope,
};

export function DepartmentsSection({ departments }: { departments: DepartmentCategory[] }) {
  const items = departments.flatMap((c) => c.items.map((i) => ({ ...i, cat: c.category }))).slice(0, 8);

  return (
    <section id="departments" className="section-padding" style={{ background: "var(--color-bg-alt)" }}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-tag"><span className="w-6 h-px bg-current" />Our Services</p>
            <h2 className="section-title">Departments &amp;<br /><em>Specialties</em></h2>
            <div className="divider-accent mt-3" />
          </div>
          <Link href="/departments" className="btn-outline shrink-0">
            All Departments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {items.map((dept) => {
            const Icon = deptIconMap[dept.icon] ?? Stethoscope;
            return (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="card group p-6 flex flex-col gap-4 border border-transparent hover:border-blue-100"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "var(--color-primary-pale)" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-2xs font-semibold tracking-wider uppercase mb-1 truncate" style={{ fontSize: "0.65rem", color: "var(--color-accent)" }}>
                      {dept.cat}
                    </p>
                    <h3 className="text-sm font-bold text-neutral-800 group-hover:text-blue-700 transition-colors leading-tight">
                      {dept.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{dept.description}</p>
                <div className="mt-auto flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
                  Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
