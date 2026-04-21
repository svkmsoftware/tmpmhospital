import type { Metadata } from "next";
import Image from "next/image";
import { Calendar, Tag, ChevronRight } from "lucide-react";
import { PageBanner, SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/HomeSections";
import { getBlogs } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blogs & News",
  description:
    "Latest news, health tips, hospital updates, and community events from SVKM's TMPM Hospital, Shirpur.",
  alternates: { canonical: "https://www.tmpmhospital.com/blogs" },
};

export default async function BlogsPage() {
  const { data: blogs } = await getBlogs();

  return (
    <>

      <PageBanner
        image="/images/blog_image1.png"
        title="Blogs & News"
        subtitle="Stay informed with the latest updates, health insights, and hospital news."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader tag="Latest Updates" title="News & Articles" subtitle="Explore health tips, hospital news, and community outreach stories from our team." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {blogs.map((blog) => (
              <article key={blog.id} className="card group flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-accent flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {blog.date ? formatDate(blog.date) : "Recent"}
                    {blog.author && (
                      <>
                        <span className="text-neutral-300">·</span>
                        <span>{blog.author}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-bold text-neutral-800 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">
                    {blog.title}
                  </h2>
                  {blog.excerpt && (
                    <p className="text-sm text-neutral-500 line-clamp-3 flex-1">{blog.excerpt}</p>
                  )}
                  <div
                    className="mt-4 flex items-center gap-1 text-sm font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Read More{" "}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
