"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    image: "/images/Official_Website_Hero Banner_Images_1.png",
    image_mobile: "/images/Official_Website_Hero Banner_Images_1.png",
    alt: "",
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

  // Natural aspect ratio (width / height) of each image, keyed by slide id,
  // tracked separately for the desktop and mobile source images. Once known,
  // the container is sized to match exactly, so object-contain never has to
  // letterbox (pad) or crop the image — at any screen width.
  const [desktopRatios, setDesktopRatios] = useState<Record<string, number>>({});
  const [mobileRatios, setMobileRatios] = useState<Record<string, number>>({});

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

  // Ratios for the slide currently on screen (fall back to sane defaults
  // until the real image dimensions are known, to avoid a layout jump on
  // first paint).
  const activeDesktopRatio = desktopRatios[slides[current]?.id] ?? 16 / 7;
  const activeMobileRatio = mobileRatios[slides[current]?.id] ?? 4 / 5;

  return (
    <section className="relative w-full overflow-hidden" aria-label="Hero banner">
      {/* ── Desktop / tablet: container sized to match the image's own aspect
           ratio, so object-contain fills it exactly — no cropping at any width,
           and no whitespace either ── */}
      <div
        className="relative hidden md:block w-full overflow-hidden transition-[aspect-ratio] duration-300"
        style={{ aspectRatio: activeDesktopRatio, maxHeight: 800 }}
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
              className="object-contain object-center"
              onLoad={(e) => {
                const img = e.currentTarget;
                if (!img.naturalWidth || !img.naturalHeight) return;
                const ratio = img.naturalWidth / img.naturalHeight;
                setDesktopRatios((prev) =>
                  prev[s.id] === ratio ? prev : { ...prev, [s.id]: ratio },
                );
              }}
            />
          </div>
        ))}

        <div className="absolute z-20 right-6 bottom-6 flex flex-col items-center gap-3">
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

        <div className="absolute bottom-0 z-20 left-0 right-0 h-0.5 bg-white/10">
          <div
            key={current}
            className="h-full bg-amber-400 origin-left animate-progress-bar"
          ></div>
        </div>
      </div>

      {/* ── Mobile: container height is driven by the image's own aspect ratio, so
           object-contain fills it exactly with zero whitespace and zero cropping ── */}
      <div
        className="relative md:hidden w-full overflow-hidden transition-[aspect-ratio] duration-300"
        style={{ aspectRatio: activeMobileRatio }}
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
              src={s.image_mobile}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-contain object-center"
              onLoad={(e) => {
                const img = e.currentTarget;
                if (!img.naturalWidth || !img.naturalHeight) return;
                const ratio = img.naturalWidth / img.naturalHeight;
                setMobileRatios((prev) =>
                  prev[s.id] === ratio ? prev : { ...prev, [s.id]: ratio },
                );
              }}
            />
          </div>
        ))}

        <div className="absolute z-20 bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
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
      </div>
    </section>
  );
}
