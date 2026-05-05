"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "/images/hospital_banner_image1.png",
    eyebrow: "Shirpur's Premier Healthcare Destination",
    heading: "Compassionate Care,\nAdvanced Medicine",
    body: "A 1200-bed multispecialty hospital serving tribal and rural Maharashtra with world-class, affordable healthcare.",
    cta:   { label: "Explore Departments", href: "/departments" },
    ghost: { label: "Book Appointment",   href: "/contact"     },
  },
  {
    id: 2,
    image: "/images/about_us_banner.png",
    eyebrow: "SVKM's TMPM Hospital",
    heading: "Your Health,\nOur Mission",
    body: "17 operation theatres, specialized ICUs, and 50+ expert specialists committed to excellence at every step.",
    cta:   { label: "Meet Our Doctors", href: "/doctors" },
    ghost: { label: "About Us",         href: "/about"  },
  },
  {
    id: 3,
    image: "/images/departments_banner.png",
    eyebrow: "Complete Spectrum of Care",
    heading: "Specialty & Super\nSpecialty Services",
    body: "From General Medicine to complex procedures — comprehensive, integrated care under one roof in Shirpur.",
    cta:   { label: "View Departments", href: "/departments"          },
    ghost: { label: "Emergency Line",   href: "/contact#emergency"    },
  },
];

const quickAccess = [
  { icon: Phone,  label: "Emergency",    sub: "24 × 7 Available", href: "tel:+911234567890", bg: "bg-red-600 hover:bg-red-700"       },
  { icon: Clock,  label: "OPD Hours",    sub: "8 AM – 8 PM",      href: "/opd",              bg: "bg-cyan-700 hover:bg-cyan-800"  },
  { icon: MapPin, label: "Our Location", sub: "Shirpur, Dhule",   href: "/contact#map",      bg: "bg-emerald-700 hover:bg-emerald-800"},
];

export default function HeroSection() {
  const [current, setCurrent]         = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setTransitioning(false), 800);
    },
    [transitioning]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "100svh",
        minHeight: 560,
        maxHeight: 900,
        marginTop: "calc(-1 * var(--total-header))",
      }}
      aria-label="Hero banner"
    >
      {/* ── Background slides ─────────────────────────────────────────────── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-all duration-[900ms] ease-in-out",
            i === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
          )}
          aria-hidden={i !== current}
        >
          <Image
            src={s.image}
            alt=""
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Directional gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "var(--gradient-hero)",
            }}></div>
        </div>
      ))}

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-20 h-full flex flex-col justify-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              key={`ey-${current}`}
              className="flex items-center gap-3 mb-5 animate-fade-in"
            >
              <span className="w-8 h-px bg-amber-400 opacity-80"></span>
              <span className="text-amber-300 text-xs font-semibold tracking-[0.18em] uppercase">
                {slide.eyebrow}
              </span>
            </div>

            {/* Heading — display serif */}
            <h1
              key={`h-${current}`}
              className="text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] animate-fade-in-up font-normal"
              style={{
                fontFamily: "var(--font-display)",
                whiteSpace: "pre-line",
                animationDelay: "60ms",
              }}
            >
              {slide.heading}
            </h1>

            {/* Body */}
            <p
              key={`b-${current}`}
              className="mt-6 text-lg text-cyan-100/90 max-w-xl leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "120ms" }}
            >
              {slide.body}
            </p>

            {/* CTAs */}
            <div
              key={`cta-${current}`}
              className="mt-9 flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: "180ms" }}
            >
              <Link href={slide.cta.href} className="btn-accent font-bold text-base px-7 py-3.5">
                {slide.cta.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={slide.ghost.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/40 text-white font-semibold text-base hover:bg-white/15 hover:border-white transition-all duration-200"
              >
                {slide.ghost.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows ─────────────────────────────────────────────── */}
      <div className="absolute z-20 right-6 bottom-36 hidden md:flex flex-col items-center gap-3">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/30 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-white/50 text-xs font-medium tabular-nums">
          {current + 1}/{slides.length}
        </span>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-white/30 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Dot indicators (mobile) ────────────────────────────────────────── */}
      <div className="absolute z-20 bottom-36 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-8 bg-white" : "w-3 bg-white/35 hover:bg-white/60"
            )}
          />
        ))}
      </div>

      {/* ── Progress bar ──────────────────────────────────────────────────── */}
      <div className="absolute bottom-[4.5rem] z-20 left-0 right-0 h-0.5 bg-white/10">
        <div
          key={current}
          className="h-full bg-amber-400 origin-left animate-progress-bar"></div>
      </div>

      {/* ── Quick access strip ────────────────────────────────────────────── */}
      <div className="absolute z-20 bottom-0 left-0 right-0">
        <div className="container-custom">
          <div className="grid grid-cols-3 max-w-xl">
            {quickAccess.map(({ icon: Icon, label, sub, href, bg }) => (
              <a
                key={label}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-5 py-4 text-white transition-all",
                  bg
                )}
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-semibold text-sm leading-tight">{label}</p>
                  <p className="text-white/65 text-xs">{sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
