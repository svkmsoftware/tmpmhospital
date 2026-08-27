// Blog content now lives in `src/data/blog-posts/` — one file per article,
// aggregated by `blog-posts/index.ts`. This file is kept as a stable import
// path so existing consumers (`blogs/page.tsx`, `blogs/[slug]/page.tsx`, etc.)
// don't need to change. To add a new blog, see `blog-posts/index.ts`.
export { blogPosts as blogs } from "./blog-posts";
