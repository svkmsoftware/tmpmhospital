"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export interface FeaturedBlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
  slug?: string;
}

// How long each post is highlighted before rotating to the next — change this
// single value to speed up/slow down the round-robin.
const FEATURED_ROTATE_MS = 6000;

// Side-list entry — mirrors the non-clickable fallback used elsewhere for
// posts without a detail page yet (e.g. "comming soon" placeholders).
function SideCard({ post }: { post: FeaturedBlogPost }) {
  const content = (
    <>
      <div className="relative w-28 shrink-0 overflow-hidden">
        <Image
          src={post.image ?? "/images/blogs/hospital_opening.png"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="112px"
        />
      </div>
      <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
        <h3 className="font-bold text-neutral-800 text-sm group-hover:text-cyan-700 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <div className="flex items-center gap-1 text-xs font-semibold mt-2 text-primary">
          Read <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </>
  );

  if (post.slug) {
    return (
      <Link href={`/blogs/${post.slug}`} className="card group flex overflow-hidden">
        {content}
      </Link>
    );
  }
  return <article className="card group flex overflow-hidden">{content}</article>;
}

// Rotates the whole "featured + side list" cluster round-robin: every
// FEATURED_ROTATE_MS, the next complete post is promoted into the big card,
// and the side list refreshes to show the others (so nothing is duplicated
// between the two, and every post gets its turn in the spotlight).
export function FeaturedBlogCarousel({ posts }: { posts: FeaturedBlogPost[] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const candidates = posts.filter((p) => p.slug);
  const count = candidates.length;

  useEffect(() => {
    if (isPaused || count <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, FEATURED_ROTATE_MS);
    return () => clearInterval(id);
  }, [isPaused, count]);

  if (count === 0) return null;
  const featured = candidates[index % count];
  const sideItems = posts.filter((p) => p.id !== featured.id).slice(0, 3);

  return (
    <>
      <div
        className="lg:col-span-3 card group flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Link href={`/blogs/${featured.slug}`} className="flex flex-col flex-1">
          <div className="relative aspect-video overflow-hidden">
            <Image
              key={featured.id}
              src={featured.image ?? "/images/blogs/health_camp.png"}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 60vw"
              priority
            />
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
        </Link>

        {count > 1 && (
          <div className="flex items-center gap-2 px-6 pb-5">
            {candidates.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Show featured article ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index % count ? "w-6 bg-cyan-600" : "w-1.5 bg-neutral-200 hover:bg-neutral-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-2 flex flex-col gap-4">
        {sideItems.map((post) => (
          <SideCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
