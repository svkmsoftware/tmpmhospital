import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { PageBanner } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getBlogPageData, getAllBlogsData } from "@/lib/graphql/services";
import { blogs as localBlogs } from "@/data/blogs";
import { FeaturedBlogCarousel } from "@/components/blog/FeaturedBlogCarousel";

export const metadata: Metadata = {
  title: "Health & Wellness Insights",
  description: "Stay informed with the latest health tips, medical news, and wellness insights from the expert doctors at SVKM's TMPM Hospital.",
  alternates: { canonical: "https://www.tmpmhospital.com/blogs" },
};

// Renders as a real link when the blog has a detail page (`slug`), otherwise
// as a plain (non-clickable) article — same as today, for entries with no
// article body yet.
function BlogCard({
  slug,
  className,
  children,
}: {
  slug?: string;
  className: string;
  children: ReactNode;
}) {
  if (slug) {
    return (
      <Link href={`/blogs/${slug}`} className={className}>
        {children}
      </Link>
    );
  }
  return <article className={className}>{children}</article>;
}

export default async function BlogsPage() {
  let blogPage = null, allBlogs = null;
  try {
    [blogPage, allBlogs] = await Promise.all([getBlogPageData(), getAllBlogsData()]);
  } catch { /* use local fallback */ }

  const heading    = blogPage?.heading    ?? "Health & Wellness Insights";
  const subheading = blogPage?.subheading ?? "Stay informed with tips, research, and news from our expert team.";

  // Merge: blogPage blogs + allBlogs collection, deduplicate by title
  const gqlBlogs = [
    ...(blogPage?.blogs ?? []),
    ...(allBlogs ?? []),
  ].filter((b, i, arr) => arr.findIndex((x) => x.title === b.title) === i);

  interface BlogCardData {
    id: string;
    title: string;
    excerpt: string;
    image: string | null;
    slug?: string;
  }

  const blogs: BlogCardData[] = gqlBlogs.length > 0
    ? gqlBlogs
    : localBlogs.map((b) => ({
        id: String(b.id), title: b.title, excerpt: b.excerpt ?? "",
        image: b.image, slug: b.slug,
      }));

  const [featured, ...rest] = blogs;
  // Only posts with a real detail page (`slug`) are eligible to rotate through
  // the main featured slot — placeholder/"comming soon" entries are excluded.
  const featuredCandidates = blogs.filter((b) => b.slug);

  return (
    <>
      <PageBanner image="/images/departments_banner_new.png" title={heading} subtitle={subheading}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Featured + grid layout */}
          {featured && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
              {/* Featured card + side list rotate together, round-robin, through
                  complete posts — whichever post is currently featured is excluded
                  from the side list so nothing is ever shown twice. */}
              {featuredCandidates.length > 0 ? (
                <FeaturedBlogCarousel posts={blogs} />
              ) : (
                <>
                  <BlogCard slug={featured.slug} className="lg:col-span-3 card group flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <Image src={featured.image ?? "/images/blogs/health_camp.png"}
                        alt={featured.title} fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:1024px) 100vw, 60vw" priority />
                      <span className="absolute top-4 left-4 badge badge-accent">Featured</span>
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <h2 className="font-bold text-neutral-800 text-xl group-hover:text-cyan-700 transition-colors leading-snug mb-3">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="text-sm text-neutral-500 leading-relaxed flex-1 line-clamp-3">
                          {featured.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </BlogCard>

                  <div className="lg:col-span-2 flex flex-col gap-4">
                    {rest.slice(0, 3).map((blog, i) => (
                      <BlogCard key={i} slug={blog.slug} className="card group flex overflow-hidden">
                        <div className="relative w-28 shrink-0 overflow-hidden">
                          <Image src={blog.image ?? "/images/blogs/hospital_opening.png"}
                            alt={blog.title} fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="112px" />
                        </div>
                        <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
                          <h3 className="font-bold text-neutral-800 text-sm group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug">
                            {blog.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs font-semibold mt-2 text-primary">
                            Read <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </BlogCard>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* All remaining blogs */}
          {rest.length > 3 && (
            <>
              <h3 className="text-xl font-bold text-neutral-800 mb-6">More Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {rest.slice(3).map((blog, i) => (
                  <BlogCard key={i} slug={blog.slug} className="card group flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <Image src={blog.image ?? "/images/blogs/health_camp.png"}
                        alt={blog.title} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, 33vw" />
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="font-bold text-neutral-800 text-sm group-hover:text-cyan-700 transition-colors leading-snug mb-2">
                        {blog.title}
                      </h3>
                      {blog.excerpt && (
                        <p className="text-xs text-neutral-500 line-clamp-2 flex-1">{blog.excerpt}</p>
                      )}
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                        Read More <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </BlogCard>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      {/* <ContactCTA /> */}
    </>
  );
}
