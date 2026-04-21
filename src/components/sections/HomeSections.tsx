"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, Star, Calendar, Tag, Quote, Phone, Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn, formatDate } from "@/lib/utils";
import type { Blog, Testimonial, FAQ, GalleryImage } from "@/types";

// ── Blogs ─────────────────────────────────────────────────────────────────────
export function BlogsSection({ blogs }: { blogs: Blog[] }) {
  const [featured, ...rest] = blogs;

  return (
    <section id="blogs" className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-tag"><span className="w-6 h-px bg-current" />Latest Updates</p>
            <h2 className="section-title">News &amp; <em>Stories</em></h2>
            <div className="divider-accent mt-3" />
          </div>
          <Link href="/blogs" className="btn-outline shrink-0">All Posts <ArrowRight className="w-4 h-4" /></Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured */}
          {featured && (
            <article className="card group flex flex-col lg:row-span-2">
              <div className="relative aspect-video overflow-hidden">
                <Image src={featured.image} alt={featured.title} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-accent flex items-center gap-1"><Tag className="w-3 h-3" />{featured.category}</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {featured.date ? formatDate(featured.date) : "Recent"}
                </div>
                <h3 className="font-bold text-neutral-800 text-xl group-hover:text-blue-700 transition-colors leading-snug mb-3">
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p className="text-sm text-neutral-500 leading-relaxed flex-1">{featured.excerpt}</p>
                )}
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          )}

          {/* Secondary cards */}
          {rest.slice(0, 2).map((blog) => (
            <article key={blog.id} className="card group flex gap-4 p-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                <Image src={blog.image} alt={blog.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="96px" />
              </div>
              <div className="flex flex-col justify-between min-w-0">
                <div>
                  <span className="badge badge-accent text-2xs mb-2" style={{ fontSize: "0.65rem" }}>{blog.category}</span>
                  <h3 className="font-bold text-neutral-800 text-sm group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold mt-2" style={{ color: "var(--color-primary)" }}>
                  Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-primary)" }}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeader
          tag="Patient Stories"
          title="What Our Patients Say"
          subtitle="Real voices, real experiences — stories of care from the TMPM family."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Quote className="w-7 h-7 text-amber-300 opacity-80" />
              <p className="text-sm text-blue-100/90 leading-relaxed flex-1">"{t.text}"</p>
              <div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0 bg-white/10">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-blue-200/70">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <p className="section-tag"><span className="w-6 h-px bg-current" />FAQ</p>
            <h2 className="section-title">Common <em>Questions</em></h2>
            <div className="divider-accent mb-6" />
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Find quick answers to questions about visiting the hospital, appointments, insurance, and patient services.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:+911234567890" className="flex items-center gap-3 p-4 rounded-2xl border border-neutral-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--color-primary-pale)" }}>
                  <Phone className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">Call Us</p>
                  <p className="text-xs text-neutral-400">+91 12345 67890</p>
                </div>
              </a>
              <a href="mailto:contact@tmpmhospital.com" className="flex items-center gap-3 p-4 rounded-2xl border border-neutral-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--color-primary-pale)" }}>
                  <Mail className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">Email Us</p>
                  <p className="text-xs text-neutral-400">contact@tmpmhospital.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  open === faq.id
                    ? "border-blue-200 shadow-md"
                    : "border-neutral-100 hover:border-neutral-200"
                )}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpen(open === faq.id ? null : faq.id)}
                  aria-expanded={open === faq.id}
                >
                  <span className={cn("font-semibold text-sm leading-snug", open === faq.id ? "text-blue-700" : "text-neutral-800")}>
                    {faq.question}
                  </span>
                  <ChevronDown className={cn("w-4 h-4 shrink-0 transition-transform duration-300", open === faq.id && "rotate-180")}
                    style={{ color: open === faq.id ? "var(--color-primary)" : "#9ca3af" }} />
                </button>
                <div className={cn("transition-all duration-300 ease-in-out overflow-hidden", open === faq.id ? "max-h-80 opacity-100" : "max-h-0 opacity-0")}>
                  <p className="px-5 pb-5 text-sm text-neutral-500 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Gallery preview ───────────────────────────────────────────────────────────
export function GalleryPreview({ images }: { images: GalleryImage[] }) {
  return (
    <section id="gallery" className="section-padding" style={{ background: "var(--color-bg-alt)" }}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-tag"><span className="w-6 h-px bg-current" />Gallery</p>
            <h2 className="section-title">Our <em>Facilities</em></h2>
            <div className="divider-accent mt-3" />
          </div>
          <Link href="/gallery" className="btn-outline shrink-0">Full Gallery <ArrowRight className="w-4 h-4" /></Link>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[440px] md:h-[360px]">
          {images.slice(0, 5).map((img, i) => (
            <Link
              key={img.id}
              href="/gallery"
              className={cn(
                "relative rounded-2xl overflow-hidden group",
                i === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-end p-3">
                <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300">
                  {img.alt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
export function ContactCTA() {
  return (
    <section
      id="appointment"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--color-text)" }}
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "var(--color-primary-light)" }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "var(--color-accent)" }} />

      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-tag justify-center text-amber-400">
            <span className="w-6 h-px bg-current" />
            Get In Touch
            <span className="w-6 h-px bg-current" />
          </p>
          <h2 className="section-title text-white mt-2 mb-4">
            Need Medical <em className="text-amber-400">Assistance?</em>
          </h2>
          <div className="divider-accent mx-auto mb-6" style={{ background: "var(--color-accent)" }} />
          <p className="text-neutral-400 text-base max-w-xl mx-auto leading-relaxed mb-10">
            Our expert doctors and caring staff are available 24 × 7. Book an appointment or reach us directly for emergencies.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-accent text-white font-bold px-8 py-3.5">
              Book an Appointment <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/20 text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              Emergency Line
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
