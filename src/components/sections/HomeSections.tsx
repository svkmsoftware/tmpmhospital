"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { ArrowRight, ChevronDown, Star, Calendar, Tag, Quote,
         Phone, Mail, ChevronLeft, ChevronRight, Play, Stethoscope } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn, formatDate } from "@/lib/utils";
import type { Blog, Testimonial, FAQ, GalleryImage } from "@/types";

// ── Doctors' Advice (Image 5 style — horizontal scroll cards) ─────────────────
const doctorAdviceVideos = [
  { id: 1, title: "Is Your Back Pain a Slipped Disc?",          doctor: "Dr. Umang Shah",    image: "/images/blogs/health_camp.png",      category: "Orthopaedics" },
  { id: 2, title: "Felt a Snap in Your Knee? Meniscus Tear?",   doctor: "Dr. Aditya Mehra",  image: "/images/blogs/hospital_opening.png", category: "Orthopaedics" },
  { id: 3, title: "Breast Cancer: What You Never Knew",         doctor: "Dr. Priya Nair",    image: "/images/blogs/Health_camp.png",       category: "Oncology"     },
  { id: 4, title: "Oral Cancer — Recognize It Early",           doctor: "Dr. Haresh Mehta",  image: "/images/blogs/hospital_opening.png", category: "ENT"          },
  { id: 5, title: "Heart Attacks Kill Silently — Beware!",      doctor: "Dr. Harish Malhotra",image: "/images/blogs/Health_camp.png",       category: "Cardiology"  },
  { id: 6, title: "Managing Diabetes Through Diet",             doctor: "Dr. R. Sharma",     image: "/images/blogs/hospital_opening.png", category: "Endocrinology"},
];

export function DoctorsAdviceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-tag"><span className="w-6 h-px bg-current"></span>Expert Insights</p>
            <h2 className="section-title">Health Hub: <em className="gradient-text">Doctor&apos;s Advice</em></h2>
            <div className="divider-accent mt-3"></div>
          </div>
          {/* Nav arrows */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:-translate-x-0.5"
              style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:translate-x-0.5"
              style={{ background: "var(--gradient-main)" }}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll strip — like image 5 */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {doctorAdviceVideos.map((v) => (
            <div
              key={v.id}
              className="relative shrink-0 snap-start rounded-2xl overflow-hidden cursor-pointer group"
              style={{ width: 220, height: 320 }}
            >
              <Image src={v.image} alt={v.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="220px" />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="badge text-white text-2xs font-bold px-2 py-0.5 rounded-lg"
                      style={{ background: "var(--color-primary)", fontSize: "0.6rem" }}>
                  {v.category}
                </span>
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/60 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-xs font-semibold leading-tight mb-1 line-clamp-2">
                  {v.title}
                </p>
                <p className="text-white/60 text-xs flex items-center gap-1">
                  <Stethoscope className="w-3 h-3" /> {v.doctor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Blogs (Image 6 style — featured large + 3 side cards) ─────────────────────
export function BlogsSection({ blogs }: { blogs: Blog[] }) {
  const [featured, ...rest] = blogs;

  return (
    <section id="blogs" className="section-padding bg-gradient-section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-tag"><span className="w-6 h-px bg-current"></span>Latest Updates</p>
            <h2 className="section-title">Health &amp; Wellness <em className="gradient-text">Insights</em></h2>
            <div className="divider-accent mt-3"></div>
          </div>
          <Link href="/blogs" className="btn-outline shrink-0">All Posts <ArrowRight className="w-4 h-4" /></Link>
        </div>

        {/* Layout like image 6: large featured left + 3 stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Featured — spans 3 cols */}
          {featured && (
            <article className="lg:col-span-3 card group flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                {/* Category pill */}
                <div className="absolute top-4 left-4">
                  <span className="badge badge-accent flex items-center gap-1 text-xs">
                    <Tag className="w-3 h-3" /> {featured.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {featured.date ? formatDate(featured.date) : "Recent"}
                </div>
                <h3 className="font-bold text-neutral-800 text-xl group-hover:text-cyan-700 transition-colors leading-snug mb-3">
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p className="text-sm text-neutral-500 leading-relaxed flex-1 line-clamp-3">
                    {featured.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          )}

          {/* Side cards — stacked, spans 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.slice(0, 3).map((blog) => (
              <article key={blog.id} className="card group flex gap-0 overflow-hidden">
                {/* Thumbnail right side */}
                <div className="relative w-32 shrink-0 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="128px"
                  />
                </div>
                {/* Text left */}
                <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-2">
                      <Calendar className="w-3 h-3" />
                      {blog.date ? formatDate(blog.date) : "Recent"}
                    </div>
                    <h3 className="font-bold text-neutral-800 text-sm group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug">
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
      </div>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────────
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden"
             style={{ background: "#0f172a" }}>
      <div className="h-1 absolute top-0 left-0 right-0" style={{ background: "var(--gradient-main)" }}></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/5 pointer-events-none"></div>
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-green-500/5 pointer-events-none"></div>

      <div className="container-custom relative">
        <SectionHeader tag="Patient Stories" title="What Our Patients Say"
          subtitle="Real voices, real experiences — stories of care from the TMPM family." light />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl p-6 flex flex-col gap-4"
                 style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
              <Quote className="w-7 h-7 text-cyan-400 opacity-80" />
              <p className="text-sm text-cyan-100/90 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-500/30 shrink-0 bg-white/10">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-cyan-200/60">{t.role}</p>
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

// ── FAQ ────────────────────────────────────────────────────────────────────────
export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left sticky */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <p className="section-tag"><span className="w-6 h-px bg-current"></span>FAQ</p>
            <h2 className="section-title">Common <em className="gradient-text">Questions</em></h2>
            <div className="divider-accent mb-6"></div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Find quick answers to questions about visiting the hospital, appointments, insurance, and patient services.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { Icon: Phone, label: "Call Us", sub: "+91 12345 67890", href: "tel:+911234567890" },
                { Icon: Mail,  label: "Email Us", sub: "contact@tmpmhospital.com", href: "mailto:contact@tmpmhospital.com" },
              ].map(({ Icon, label, sub, href }) => (
                <a key={label} href={href}
                   className="flex items-center gap-3 p-4 rounded-2xl border border-neutral-100 hover:border-cyan-200 hover:bg-cyan-50 transition-all group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                       style={{ background: "var(--color-primary-pale)" }}>
                    <Icon className="w-4 h-4" color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{label}</p>
                    <p className="text-xs text-neutral-400">{sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id}
                   className={cn("rounded-2xl border transition-all duration-200 overflow-hidden",
                     open === faq.id ? "border-cyan-200 shadow-md" : "border-neutral-100 hover:border-neutral-200")}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpen(open === faq.id ? null : faq.id)}
                  aria-expanded={open === faq.id}
                >
                  <span className={cn("font-semibold text-sm leading-snug",
                    open === faq.id ? "text-cyan-700" : "text-neutral-800")}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn("w-4 h-4 shrink-0 transition-transform duration-300", open === faq.id && "rotate-180")}
                    color={open === faq.id ? "var(--color-primary)" : "#9ca3af"}
                  />
                </button>
                <div className={cn("transition-all duration-300 ease-in-out overflow-hidden",
                  open === faq.id ? "max-h-80 opacity-100" : "max-h-0 opacity-0")}>
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

// ── Gallery preview ────────────────────────────────────────────────────────────
export function GalleryPreview({ images }: { images: GalleryImage[] }) {
  return (
    <section id="gallery" className="section-padding bg-gradient-section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-tag"><span className="w-6 h-px bg-current"></span>Gallery</p>
            <h2 className="section-title">Our <em className="gradient-text">Facilities</em></h2>
            <div className="divider-accent mt-3"></div>
          </div>
          <Link href="/gallery" className="btn-outline shrink-0">Full Gallery <ArrowRight className="w-4 h-4" /></Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[440px] md:h-[360px]">
          {images.slice(0, 5).map((img, i) => (
            <Link key={img.id} href="/gallery"
                  className={cn("relative rounded-2xl overflow-hidden group",
                    i === 0 ? "col-span-2 row-span-2" : "")}>
              <Image src={img.src} alt={img.alt} fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-end p-3">
                <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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

// ── CTA ────────────────────────────────────────────────────────────────────────
export function ContactCTA() {
  return (
    <section id="appointment" className="relative section-padding overflow-hidden"
             style={{ background: "var(--gradient-main)" }}>
      <div className="absolute inset-0 opacity-10"
           style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
      <div className="container-custom relative text-center">
        <p className="section-tag justify-center text-white/70">
          <span className="w-6 h-px bg-current"></span> Get In Touch <span className="w-6 h-px bg-current"></span>
        </p>
        <h2 className="section-title text-white mt-2 mb-4">
          Need Medical <em>Assistance?</em>
        </h2>
        <div className="w-12 h-0.5 mx-auto mb-6 rounded-full bg-white/40"></div>
        <p className="text-white/80 text-base max-w-xl mx-auto leading-relaxed mb-10">
          Our expert doctors and caring staff are available 24 × 7. Book an appointment or reach us directly for emergencies.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="btn-outline-white font-bold px-8 py-3.5">
            Book an Appointment <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+911234567890"
             className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/15 hover:border-white transition-all duration-200">
            <Phone className="w-4 h-4" /> Emergency Line
          </a>
        </div>
      </div>
    </section>
  );
}
