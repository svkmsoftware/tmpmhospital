"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3X3, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

interface Props {
  images: GalleryImage[];
}

const ALL = "All";

export default function GalleryClient({ images }: Props) {
  const categories = [ALL, ...Array.from(new Set(images.map((i) => i.category ?? "General")))];
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [layout, setLayout] = useState<"masonry" | "grid">("masonry");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const filtered = activeCategory === ALL
    ? images
    : images.filter((i) => (i.category ?? "General") === activeCategory);

  // Open lightbox
  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    document.body.style.overflow = "";
  }, []);

  // Navigate
  const prev = useCallback(() => {
    if (lightboxIdx === null) return;
    setImgLoading(true);
    setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length);
  }, [lightboxIdx, filtered.length]);

  const next = useCallback(() => {
    if (lightboxIdx === null) return;
    setImgLoading(true);
    setLightboxIdx((lightboxIdx + 1) % filtered.length);
  }, [lightboxIdx, filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, closeLightbox, prev, next]);

  // Reset when category changes
  useEffect(() => {
    closeLightbox();
  }, [activeCategory, closeLightbox]);

  const currentImage = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <>
      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                activeCategory === cat
                  ? "text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
              style={activeCategory === cat ? { background: "var(--color-primary)" } : undefined}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Layout toggle */}
        <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1">
          <button
            onClick={() => setLayout("masonry")}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              layout === "masonry" ? "bg-white shadow text-blue-700" : "text-neutral-500 hover:text-neutral-700"
            )}
            aria-label="Masonry layout"
            title="Masonry layout"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayout("grid")}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              layout === "grid" ? "bg-white shadow text-blue-700" : "text-neutral-500 hover:text-neutral-700"
            )}
            aria-label="Grid layout"
            title="Grid layout"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Gallery grid ──────────────────────────────────────────────────── */}
      {layout === "masonry" ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <GalleryCard key={img.id} img={img} index={i} onClick={() => openLightbox(i)} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden">
              <GalleryCard img={img} index={i} onClick={() => openLightbox(i)} square />
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20 text-neutral-400">
          <p>No images in this category.</p>
        </div>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightboxIdx !== null && currentImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={closeLightbox}
          role="dialog"
          aria-modal
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium">
            {lightboxIdx + 1} / {filtered.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-16 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={1200}
              height={900}
              className={cn(
                "w-full h-auto max-h-[80vh] object-contain transition-opacity duration-300",
                imgLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setImgLoading(false)}
              sizes="(max-width: 1280px) 100vw, 80vw"
              priority
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
              <p className="text-white font-semibold">{currentImage.alt}</p>
              {currentImage.category && (
                <p className="text-white/60 text-sm mt-0.5">{currentImage.category}</p>
              )}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-lg overflow-x-auto px-4 py-2">
            {filtered.map((img, i) => (
              <button
                key={img.id}
                onClick={(e) => { e.stopPropagation(); setImgLoading(true); setLightboxIdx(i); }}
                className={cn(
                  "relative w-12 h-12 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ring-2",
                  i === lightboxIdx ? "ring-white scale-110" : "ring-transparent opacity-50 hover:opacity-80"
                )}
                aria-label={`Go to image ${i + 1}`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="48px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ── Gallery card ─────────────────────────────────────────────────────────────
function GalleryCard({
  img, index, onClick, square,
}: {
  img: GalleryImage;
  index: number;
  onClick: () => void;
  square?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative block w-full overflow-hidden rounded-2xl group cursor-zoom-in shadow-sm hover:shadow-xl transition-all duration-300",
        square ? "aspect-square" : "break-inside-avoid"
      )}
      aria-label={`View ${img.alt}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={500}
        height={square ? 500 : 400}
        className={cn(
          "w-full object-cover transition-transform duration-500 group-hover:scale-110",
          square ? "h-full" : "h-auto"
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-sm font-semibold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {img.alt}
        </p>
        {img.category && (
          <p className="text-white/70 text-xs mt-0.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {img.category}
          </p>
        )}
      </div>
      {/* Zoom icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200">
        <ZoomIn className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
      </div>
    </button>
  );
}
