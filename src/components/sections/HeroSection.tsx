"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Phone, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerImage {
  url: string;
  mobileUrl: string;
  name: string;
  alternativeText: string | null;
}

interface HeroSectionProps {
  banners: BannerImage[];
}

// Fallback used only if CMS returns nothing (e.g. request failed)
const fallbackSlides = [
  {
    id: "fallback-1",
    image: "/images/hospital_banner_images91.png",
    image_mobile: "/images/hospital_banner_images10.png",
    alt: "",
  },
];

const quickAccess = [
  {
    icon: Phone,
    label: "Emergency",
    sub: "24 × 7 Available",
    href: "tel:+912563351505",
    bg: "bg-red-600 hover:bg-red-700",
  },
  {
    icon: Clock,
    label: "OPD Hours",
    sub: "8 AM – 8 PM",
    href: "/opd",
    bg: "bg-cyan-700 hover:bg-cyan-800",
  },
  {
    icon: MapPin,
    label: "Our Location",
    sub: "Shirpur, Dhule",
    href: "/contact#map",
    bg: "bg-emerald-700 hover:bg-emerald-800",
  },
];

export default function HeroSection({ banners }: HeroSectionProps) {
  const slides = useMemo(() => {
    if (!banners || banners.length === 0) return fallbackSlides;
    return banners.map((b, i) => ({
      id: `${b.url}-${i}`,
      image: b.url,
      image_mobile: b.mobileUrl, // CMS currently gives one image, reused for both breakpoints
      alt: b.alternativeText || b.name || "",
    }));
  }, [banners]);

  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setTransitioning(false), 800);
    },
    [transitioning],
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo, slides.length],
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo, slides.length],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, slides.length]);

  // Reset to first slide if the banner list shrinks below current index
  useEffect(() => {
    if (current >= slides.length) setCurrent(0);
  }, [slides.length, current]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "100svh",
        minHeight: 600,
        maxHeight: 900,
        marginTop: "calc(-1 * var(--total-header))",
      }}
      aria-label="Hero banner"
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-all duration-[900ms] ease-in-out",
            i === current
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-105 z-0",
          )}
          aria-hidden={i !== current}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="hidden md:block object-contain object-center"
          />
          <Image
            src={s.image_mobile}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="block md:hidden object-contain object-center"
          />
        </div>
      ))}

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

      <div className="absolute z-20 bottom-36 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current
                ? "w-8 bg-white"
                : "w-3 bg-white/35 hover:bg-white/60",
            )}
          />
        ))}
      </div>

      <div className="absolute bottom-[4.5rem] z-20 left-0 right-0 h-0.5 bg-white/10">
        <div
          key={current}
          className="h-full bg-amber-400 origin-left animate-progress-bar"
        ></div>
      </div>

      <div className="absolute z-20 bottom-0 left-0 right-0 hidden md:block">
        <div className="container-custom">
          <div className="grid grid-cols-3 max-w-xl">
            {quickAccess.map(({ icon: Icon, label, sub, href, bg }) => (
              <a
                key={label}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-5 py-4 text-white transition-all",
                  bg,
                )}
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-semibold text-sm leading-tight text-white">
                    {label}
                  </p>
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
