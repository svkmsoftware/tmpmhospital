# SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital & Research Center
**Website: [tmpmhospital.com](https://www.tmpmhospital.com)**

A production-ready Next.js 14 + TypeScript hospital website built with App Router, Tailwind CSS, and a fully typed API abstraction layer.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Custom Design System |
| Fonts | Inter + Poppins (via next/font) |
| Images | next/image (optimized, WebP/AVIF) |
| Icons | Lucide React |
| SEO | next/metadata, JSON-LD, sitemap.ts, robots.ts |
| Security | Security headers in next.config.ts |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, SEO, Navbar, Footer)
│   ├── page.tsx                ← Homepage
│   ├── sitemap.ts              ← Auto-generated XML sitemap
│   ├── robots.ts               ← robots.txt
│   ├── api/
│   │   ├── contact/route.ts    ← Contact form endpoint
│   │   ├── doctors/route.ts    ← Doctors REST endpoint
│   │   └── departments/route.ts
│   └── (routes)/
│       ├── about/page.tsx
│       ├── departments/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       ├── doctors/
│       │   ├── page.tsx
│       │   └── [id]/page.tsx
│       ├── blogs/page.tsx
│       ├── careers/page.tsx
│       ├── contact/page.tsx
│       ├── gallery/page.tsx
│       ├── opd/page.tsx
│       ├── ipd/page.tsx
│       ├── day-care/page.tsx
│       └── tpa-insurance/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Sticky mega-dropdown navbar
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx     ← Animated hero slider
│   │   ├── HomeAboutStats.tsx  ← About + animated stats + departments
│   │   └── HomeSections.tsx    ← Blogs, testimonials, FAQ, gallery, CTA
│   └── ui/
│       ├── ScrollToTop.tsx
│       └── SectionHeader.tsx
├── data/                       ← In-memory data (swap for API calls)
│   ├── doctors.ts
│   ├── departments.ts
│   ├── blogs.ts
│   ├── services.ts             ← IPD / OPD / DayCare / Jobs
│   ├── static.ts               ← Testimonials, stats, FAQs, gallery, insurance
│   └── visionMission.ts
├── lib/
│   ├── api/index.ts            ← API abstraction layer ← SWAP HERE for real API
│   └── utils/index.ts
├── styles/
│   └── globals.css             ← Tailwind + design tokens
└── types/
    └── index.ts                ← All TypeScript types
```

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

### 5. Type check
```bash
npm run type-check
```

---

## Integrating a Real API

All data fetching is centralized in **`src/lib/api/index.ts`**.

To switch from in-memory data to a real backend, replace the return statement in any function:

```ts
// BEFORE (in-memory)
export async function getDoctors() {
  return { data: doctorsData, success: true };
}

// AFTER (real API)
export async function getDoctors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`, {
    next: { revalidate: 60 }, // ISR — revalidate every 60s
  });
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
}
```

The TypeScript return types stay identical — no component changes needed.

---

## SEO Features

- ✅ Per-page `metadata` with title, description, canonical, Open Graph
- ✅ JSON-LD structured data (Hospital schema) in root layout
- ✅ Auto-generated `sitemap.xml` via `sitemap.ts`
- ✅ `robots.txt` via `robots.ts`
- ✅ `next/image` for optimized images (WebP, AVIF, lazy loading)
- ✅ Semantic HTML with ARIA labels throughout
- ✅ Skip-to-content link for accessibility

---

## Security Headers (next.config.ts)

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- Long-term image caching: `Cache-Control: public, max-age=31536000, immutable`

---

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Self-hosted (Node.js)
```bash
npm run build
npm start
# Runs on port 3000 — put Nginx in front
```

### Docker
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Contact Form Integration

The contact form in `src/app/api/contact/route.ts` currently logs submissions.

To send emails, uncomment and configure one of:

**Resend (recommended):**
```bash
npm install resend
```
```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({ from: "noreply@tmpmhospital.com", to: "contact@tmpmhospital.com", subject: body.subject, html: `<p>${body.message}</p>` });
```

---

## License
© 2025 SVKM's Tapanbhai Mukeshbhai Patel Memorial Hospital & Research Center. All Rights Reserved.

---

## 🔌 Strapi CMS Integration

### Architecture Overview

```
Browser  →  Next.js (Server)  →  Strapi API  →  Database
                ↓ (if Strapi fails)
           Local mock data (fallback)
```

The website **always works** even if Strapi is down — it falls back to local data automatically.

### How to Set Up

**Step 1: Get a Strapi API token from the vendor**
1. Ask the vendor to create a **Read-only** API token in their Strapi admin
2. Path: Strapi Admin → Settings → API Tokens → Create new API Token
3. Set: Type = "Read-only", Duration = "Unlimited"
4. Copy the token

**Step 2: Create your `.env.local` file**
```bash
cp .env.local.example .env.local
```
Then open `.env.local` and fill in:
```
STRAPI_API_TOKEN=paste_token_here
USE_STRAPI=true
```

**Step 3: Run the dev server**
```bash
npm run dev
```

The About page now pulls live data from Strapi. If the API fails, it uses local data silently.

---

### File Structure for Strapi Integration

```
src/lib/strapi/
├── client.ts        ← Secure fetch wrapper (API token lives ONLY here)
└── transformers.ts  ← Convert raw API shapes → clean app types

src/types/
├── index.ts         ← App types (what components use)
└── strapi.ts        ← Strapi API types (what the API returns)

src/lib/api/
└── index.ts         ← Central data service (Strapi-first, local fallback)

src/app/api/
└── revalidate/
    └── route.ts     ← Webhook endpoint for instant cache clearing
```

---

### REST API vs GraphQL — Which Should You Use?

**We chose REST API** (not GraphQL) for these reasons:

| | REST | GraphQL |
|---|---|---|
| **Learning curve** | Low — like any web URL | High — new query language |
| **Debugging** | Easy — open URL in browser | Needs special tools |
| **Caching** | Built into Next.js fetch | Requires extra setup |
| **Your team** | Already knows REST | Would need training |
| **Strapi support** | Full, stable | Full, but more setup |

GraphQL is powerful when you have very complex data needs, but for a hospital website REST is the right choice.

---

### Strapi Populate — Why the Long URLs?

Strapi's REST API returns **shallow data** by default (no nested relations).
To get images and sub-items, you must "populate" them explicitly:

```
/api/about?populate[section][populate][featured_image][populate]=*
```

This means: "give me the about page, populate its sections, and for each section
populate its featured_image and all of that image's sub-fields."

Our `client.ts` handles all this — you never have to write these URLs manually.

---

### Setting Up the Webhook (for instant content updates)

When an editor saves changes in Strapi, you want the website to update immediately
(not wait 5 minutes for cache to expire).

**In Strapi Admin → Settings → Webhooks → Create new webhook:**
- Name: `Next.js Revalidate`
- URL: `https://www.tmpmhospital.com/api/revalidate`
- Events: `entry.create ✓` `entry.update ✓` `entry.delete ✓` `entry.publish ✓`
- Headers: `x-revalidate-secret` = `[your REVALIDATE_SECRET from .env.local]`

**Test the webhook:**
```bash
curl -X POST https://www.tmpmhospital.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: your_secret" \
  -d '{"model": "about", "event": "entry.update"}'
```

