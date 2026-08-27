import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft, Clock, CheckCircle2, Quote } from "lucide-react";
import { PAGE_BANNER_HEIGHTS } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { blogs } from "@/data/blogs";
import { getBlogAuthorInfo } from "@/lib/blog";
import { cn, formatDate } from "@/lib/utils";
import type { Blog, BlogContentBlock } from "@/types";

const BLOG_HERO_BANNER = "/images/Blog_Page_Hero_Banner.png";

// One-line toggle for the dark hero overlay — same idea as the showOverlay
// prop on department pages. The reference banner design reads fine with no
// overlay at all (the gradient image already has enough contrast), so this
// is off by default; flip to `true` if a future banner image needs it back.
const SHOW_HERO_OVERLAY = false;

// Flat white "name tag" label — the author name/designation styling used on
// the hero, matching the reference design (Sample Blog Hero Banner.png):
// solid white pill, dark bold text, no glass/blur effects.
function HeroNameTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block bg-white text-neutral-900 font-extrabold px-3 py-1.5 rounded shadow-md whitespace-nowrap uppercase tracking-wide",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Constant gradient background shared by every blog article — the title and
// author info are rendered programmatically on top, so a custom hero graphic
// no longer needs to be designed per article. Height matches PageBanner's
// "md" size (the default every other page uses) so the blog hero never drifts
// out of sync with the rest of the site.
function BlogHero({ blog }: { blog: Blog }) {
  const authorInfo = getBlogAuthorInfo(blog);
  const hasPhoto = Boolean(authorInfo.photo);

  return (
    <section className={cn("relative w-full overflow-hidden flex items-end", PAGE_BANNER_HEIGHTS.md)}>
      <Image
        src={BLOG_HERO_BANNER}
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {SHOW_HERO_OVERLAY && <div className="absolute inset-0 bg-gradient-hero"></div>}

      {/* Full-height, width-capped wrapper matching container-custom's own
          max-width/centering — anchors the photo to the title's right edge
          instead of the raw viewport edge, so they stay close together
          regardless of screen width. */}
      <div className="absolute inset-0 container-custom">
        <div className="relative w-full h-full flex items-end pb-8 md:pb-10 pt-16">
          <div className="w-full md:pr-40 lg:pr-56">
            <nav aria-label="Breadcrumb" className="mb-3">
              <ol className="flex items-center gap-2 text-xs text-cyan-100/90 flex-wrap drop-shadow">
                <li className="flex items-center gap-2">
                  <a href="/" className="hover:text-white transition-colors">Home</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white/40">/</span>
                  <a href="/blogs" className="hover:text-white transition-colors">Blogs</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white/40">/</span>
                  <span className="text-white font-medium">{blog.category}</span>
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance leading-tight max-w-3xl drop-shadow-lg">
              {blog.title}
            </h1>

            {/* Mobile fallback — no room for the bleeding photo, so just a
                compact name tag below the title. */}
            <div className="mt-4 md:hidden">
              <HeroNameTag className="text-xs">{authorInfo.name}</HeroNameTag>
            </div>
          </div>

          {/* Author photo — a large bust-crop bleeding off the bottom-right
              edge of the title's own container, with the name/designation
              tags overlapping its lower portion, per the reference design.
              Desktop only; mobile uses the compact tag above instead. Every
              photo is cropped to this exact box (object-top keeps the head
              in frame and crops from the bottom), so consultants line up at
              a consistent size regardless of their source photo's shape. */}
          {hasPhoto && (
            <div className="hidden md:block absolute bottom-0 right-0 w-32 lg:w-40">
              <div className="relative w-full h-44 lg:h-56 rounded-t-2xl overflow-hidden shadow-2xl">
                <Image src={authorInfo.photo!} alt={authorInfo.name} fill className="object-cover object-top" sizes="160px" />
              </div>
              <div className="absolute inset-x-0 bottom-0 pb-2 flex flex-col items-center gap-1">
                <HeroNameTag className="text-xs">{authorInfo.name}</HeroNameTag>
                {authorInfo.designation && (
                  <HeroNameTag className="text-[10px]">{authorInfo.designation}</HeroNameTag>
                )}
              </div>
            </div>
          )}
          {!hasPhoto && (
            <div className="hidden md:block absolute bottom-8 right-0">
              <HeroNameTag className="text-xs">{authorInfo.name}</HeroNameTag>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Words-per-minute used for the reading-time estimate — derived purely from
// content length, so it stays accurate automatically as articles are edited.
const WORDS_PER_MINUTE = 200;

function estimateReadingMinutes(blocks: BlogContentBlock[]): number {
  const words = blocks
    .flatMap((b) => [b.text ?? "", ...(b.items ?? [])])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// A paragraph whose *entire* text is wrapped in ** ... ** (not just a phrase
// within it) is treated as a pull-quote / callout rather than a plain bold
// sentence — a deliberate emphasis signal already present in the source text.
function isCalloutParagraph(text: string): boolean {
  const t = text.trim();
  return t.startsWith("**") && t.endsWith("**") && t.slice(2, -2).indexOf("**") === -1;
}

interface Props {
  params: { slug: string };
}

function getBlogBySlug(slug: string) {
  return blogs.find((b) => b.slug === slug) ?? null;
}

export async function generateStaticParams() {
  return blogs.filter((b) => b.slug).map((b) => ({ slug: b.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return { title: "Article Not Found" };
  return {
    title: blog.seoTitle ?? blog.title,
    description: blog.metaDescription ?? blog.excerpt,
    keywords: blog.focusKeywords,
    alternates: { canonical: `https://www.tmpmhospital.com/blogs/${blog.slug}` },
    openGraph: {
      title: blog.seoTitle ?? blog.title,
      description: blog.metaDescription ?? blog.excerpt,
      images: [blog.heroImage ?? blog.image],
    },
  };
}

// Renders **bold** spans inline within a line of text, leaving everything else as-is.
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-neutral-800">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function BlogBody({ blocks }: { blocks: BlogContentBlock[] }) {
  // The very first paragraph (before any heading) reads as the article's lede —
  // given a slightly larger, lighter treatment, same as a magazine/editorial intro.
  const ledeIndex = blocks.findIndex((b) => b.type === "paragraph");
  const firstHeadingIndex = blocks.findIndex((b) => b.type === "heading");
  const isLede = (i: number) => i === ledeIndex && (firstHeadingIndex === -1 || i < firstHeadingIndex);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          if (block.level === 3) {
            return (
              <h3 key={i} className="text-base md:text-lg font-bold mt-6 mb-1 text-accent-dark">
                {block.text}
              </h3>
            );
          }
          return (
            <div key={i} className="mt-10 mb-2 first:mt-0">
              <h2 className="font-display text-xl md:text-2xl font-bold text-neutral-800">
                {block.text}
              </h2>
              <div className="divider-accent mt-2"></div>
            </div>
          );
        }

        if (block.type === "paragraph") {
          const text = block.text ?? "";

          if (isCalloutParagraph(text)) {
            return (
              <div
                key={i}
                className="relative rounded-2xl p-6 my-8 pl-14 bg-primary-pale border-l-4 border-primary"
              >
                <Quote
                  className="w-6 h-6 absolute left-5 top-6 text-primary"
                  fill="currentColor"
                  fillOpacity={0.15}
                />
                <p className="font-display text-base md:text-lg leading-relaxed font-medium text-neutral-800 italic">
                  {text.trim().slice(2, -2)}
                </p>
              </div>
            );
          }

          return (
            <p
              key={i}
              className={cn(
                "text-neutral-600 leading-relaxed",
                isLede(i) && "text-lg md:text-xl leading-relaxed text-neutral-700 font-normal",
              )}
            >
              {renderInline(text)}
            </p>
          );
        }

        if (block.type === "orderedList") {
          return (
            <ol key={i} className="space-y-3 my-6">
              {block.items?.map((item, j) => (
                <li key={j} className="flex gap-3.5 text-neutral-600 leading-relaxed">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold shrink-0 mt-0.5 bg-gradient-main">
                    {j + 1}
                  </span>
                  <span className="pt-0.5">{renderInline(item)}</span>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-2.5 my-6">
              {block.items?.map((item, j) => (
                <li key={j} className="flex gap-3 text-neutral-600 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-primary" strokeWidth={2} />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}

export default async function BlogDetailPage({ params }: Props) {
  const blog = getBlogBySlug(params.slug);
  if (!blog || !blog.content) notFound();

  const readingMinutes = estimateReadingMinutes(blog.content);

  return (
    <>
      <BlogHero blog={blog} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-8 pb-6 border-b border-neutral-100">
              <span
                className={cn(
                  "badge badge-primary inline-flex items-center gap-1.5",
                )}
              >
                <Tag className="w-3 h-3" /> {blog.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(blog.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {readingMinutes} min read
              </span>
            </div>

            <BlogBody blocks={blog.content} />

            {blog.focusKeywords && blog.focusKeywords.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-12 pt-6 border-t border-neutral-100">
                {blog.focusKeywords.map((kw) => (
                  <span key={kw} className="badge badge-accent text-xs">
                    {kw}
                  </span>
                ))}
              </div>
            )}

            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-cyan-700 hover:text-cyan-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
          </article>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
