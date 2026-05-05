/**
 * Next.js Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * LEARNING NOTE — Why do we need to allowlist image domains?
 *
 * Next.js <Image> component optimises images on-the-fly (resizes, converts to
 * WebP/AVIF, adds lazy loading). For security, it only optimises images from
 * trusted domains you explicitly list here.
 *
 * Without adding Strapi's domain, you'd get an error:
 *   "Invalid src: hostname not configured"
 *
 * We add the vendor's Strapi server domain so images stored in Strapi CMS
 * can be served through Next.js image optimization.
 */

const nextConfig = {
  // ── Image optimisation ──────────────────────────────────────────────────────
  images: {
    formats:     ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        // Your local public folder images
        protocol: "https",
        hostname: "www.tmpmhospital.com",
      },
      {
        // Vendor Strapi backend — images uploaded here
        protocol: "https",
        hostname: "shirpurhospital.kwebmakerdigitalagency.com",
        pathname: "/uploads/**",  // Only allow the uploads path, not all routes
      },
      {
        // Allow any HTTPS image source as fallback
        // Narrow this down to specific domains once you know all your image sources
        protocol: "https",
        hostname: "**",
      },
    ],
    // Minimum cache TTL for optimised images (in seconds)
    minimumCacheTTL: 3600, // 1 hour
  },

  // ── Performance ─────────────────────────────────────────────────────────────
  compress:        true,
  poweredByHeader: false,  // Don't leak "X-Powered-By: Next.js" header
  reactStrictMode: true,

  // ── Experimental ────────────────────────────────────────────────────────────
  // ── Security & Cache Headers ────────────────────────────────────────────────
  headers: async () => [
    {
      // Apply to ALL routes
      source: "/(.*)",
      headers: [
        // Prevent MIME-type sniffing
        { key: "X-Content-Type-Options",  value: "nosniff"                    },
        // Prevent this site being embedded in iframes (clickjacking protection)
        { key: "X-Frame-Options",         value: "SAMEORIGIN"                 },
        // Legacy XSS filter (modern browsers use CSP instead)
        { key: "X-XSS-Protection",        value: "1; mode=block"              },
        // Only send referrer on same origin
        { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
        // Restrict access to browser features we don't need
        { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
    {
      // Long cache for static images in /public/images
      source: "/images/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      // Cache static assets (JS, CSS bundles)
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],

  // ── Redirects ───────────────────────────────────────────────────────────────
  // Add any URL redirects here (e.g. old pages to new ones)
  redirects: async () => [
    // Example: { source: "/old-page", destination: "/new-page", permanent: true },
  ],
};

export default nextConfig;
