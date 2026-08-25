import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft, Clock, CheckCircle2, Quote } from "lucide-react";
import { PageBanner } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { blogs } from "@/data/blogs";
import { cn, formatDate } from "@/lib/utils";
import type { BlogContentBlock } from "@/types";

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
              <h3
                key={i}
                className="text-base md:text-lg font-bold mt-6 mb-1"
                style={{ color: "var(--color-accent-dark)" }}
              >
                {block.text}
              </h3>
            );
          }
          return (
            <div key={i} className="mt-10 mb-2 first:mt-0">
              <h2
                className="text-xl md:text-2xl font-bold text-neutral-800"
                style={{ fontFamily: "var(--font-display)" }}
              >
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
                className="relative rounded-2xl p-6 my-8 pl-14"
                style={{ background: "var(--color-primary-pale)", borderLeft: "4px solid var(--color-primary)" }}
              >
                <Quote
                  className="w-6 h-6 absolute left-5 top-6"
                  color="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.15}
                />
                <p
                  className="text-base md:text-lg leading-relaxed font-medium text-neutral-800 italic"
                  style={{ fontFamily: "var(--font-display)" }}
                >
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
                  <span
                    className="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: "var(--gradient-main)" }}
                  >
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
                  <CheckCircle2
                    className="w-5 h-5 shrink-0 mt-0.5"
                    color="var(--color-primary)"
                    strokeWidth={2}
                  />
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
      <PageBanner
        image={blog.heroImage ?? blog.image}
        title={blog.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.category },
        ]}
        height="md"
        showContent={false}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="max-w-3xl mx-auto">
            <h1
              className="text-2xl md:text-4xl font-bold text-neutral-800 leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {blog.title}
            </h1>

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
                <User className="w-3.5 h-3.5" /> {blog.author}
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
