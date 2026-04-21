/**
 * Strapi API Client
 * ─────────────────────────────────────────────────────────────────────────────
 * LEARNING NOTE — Why a separate client file?
 *
 * This file is the ONLY place in the entire codebase that knows how to talk
 * to Strapi. Benefits:
 *   1. Security: API token lives only here, never in components
 *   2. Single config: change base URL in one place, not 20 components
 *   3. Consistent error handling: all API errors handled the same way
 *   4. Caching: Next.js fetch caching configured here once
 *   5. Type safety: every response is typed before leaving this file
 *
 * IMPORTANT SECURITY RULES:
 *   - STRAPI_API_URL and STRAPI_API_TOKEN are server-only env vars
 *   - They have NO "NEXT_PUBLIC_" prefix, so Next.js NEVER sends them to the browser
 *   - This file must only be imported by server components or API routes
 *   - Client components ("use client") must never import this file
 */

import type { StrapiResponse, StrapiAboutPage } from "@/types/strapi";

// ── Configuration ─────────────────────────────────────────────────────────────

const STRAPI_URL   = process.env.STRAPI_API_URL   ?? "";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN  ?? "";
const USE_STRAPI   = process.env.USE_STRAPI === "true";

/** Build an absolute URL for a Strapi media file */
export function strapiMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  // If already absolute (starts with http), return as-is
  if (path.startsWith("http")) return path;
  // Otherwise prepend the Strapi base URL
  return `${STRAPI_URL}${path}`;
}

// ── Core fetch wrapper ────────────────────────────────────────────────────────

interface FetchOptions {
  /**
   * Next.js ISR revalidation in seconds.
   * - 0 = no cache (always fresh — use for contact forms, etc.)
   * - 60 = revalidate every 60 seconds
   * - false = cache forever until next deploy
   */
  revalidate?: number | false;
  tags?: string[];      // Cache tags for on-demand revalidation
}

/**
 * The core fetch function. All Strapi requests go through here.
 *
 * LEARNING NOTE — Next.js fetch caching:
 *   Next.js extends the native `fetch` API with caching superpowers.
 *   `next: { revalidate: 60 }` means: cache this response for 60 seconds,
 *   then silently fetch fresh data in the background (ISR = Incremental Static Regeneration).
 *   Users always get a fast cached page, never a slow loading state.
 */
async function strapiGet<T>(
  endpoint: string,
  params: Record<string, string> = {},
  options: FetchOptions = { revalidate: 60 }
): Promise<T> {
  if (!STRAPI_URL) {
    throw new Error(
      "STRAPI_API_URL is not set. Add it to your .env.local file."
    );
  }

  // Build query string from params object
  const qs = new URLSearchParams(params).toString();
  const url = `${STRAPI_URL}/api/${endpoint}${qs ? `?${qs}` : ""}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add auth token if available
  // Even if Strapi is public, always use a token — it lets you track usage
  // and immediately revoke access if needed
  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  let response: Response;

  try {
    response = await fetch(url, {
      headers,
      // Next.js ISR: cache + revalidate
      next: {
        revalidate: options.revalidate,
        tags: options.tags,
      },
    });
  } catch (networkError) {
    // Network failure (Strapi is down, DNS error, etc.)
    throw new Error(
      `Network error fetching ${endpoint}: ${String(networkError)}`
    );
  }

  if (!response.ok) {
    // HTTP error (401 = bad token, 403 = no permission, 404 = not found, etc.)
    throw new Error(
      `Strapi API error: ${response.status} ${response.statusText} — ${url}`
    );
  }

  const json = await response.json() as T;
  return json;
}

// ── Public API functions ───────────────────────────────────────────────────────
// These are what the rest of the app imports and calls.
// Each function handles ONE specific API endpoint.

/**
 * Fetch the About page data from Strapi.
 *
 * LEARNING NOTE — Strapi population:
 *   By default Strapi returns only shallow data (no nested relations).
 *   You must explicitly "populate" each relation you want.
 *   The populate syntax looks complex but follows a pattern:
 *     populate[FIELD][populate]=* means "give me FIELD and all of its sub-fields"
 */
export async function fetchAboutPage(): Promise<StrapiAboutPage | null> {
  if (!USE_STRAPI) return null;

  try {
    const result = await strapiGet<StrapiResponse<StrapiAboutPage>>(
      "about",
      {
        // Populate the banner image
        "populate[About_banner][populate]": "*",
        // Populate all section components and their nested relations
        "populate[section][populate][featured_image][populate]": "*",
        "populate[section][populate][President_details][populate]": "featured_image",
        "populate[section][populate][management_details][populate]": "featured_image",
        "populate[section][populate][trustee_details][populate]": "featured_image",
        "populate[section][populate][why_choose_details][populate]": "featured_image",
        "populate[section][populate][gallery_section][populate]": "Image",
      },
      {
        revalidate: 300,  // Cache for 5 minutes — content doesn't change often
        tags: ["about"],  // Tag for on-demand revalidation if needed
      }
    );

    return result.data;
  } catch (error) {
    // Log the error on the server (visible in terminal / Vercel logs)
    // but return null so the page can fall back to local data gracefully
    console.error("[Strapi] fetchAboutPage failed:", error);
    return null;
  }
}

/**
 * Revalidate cached About page data on demand.
 * Call this from an API route when Strapi sends a webhook after content changes.
 *
 * LEARNING NOTE — On-demand revalidation:
 *   When your content editor saves changes in Strapi, Strapi can call a
 *   webhook URL on your Next.js site. That webhook calls revalidateTag("about")
 *   which clears the cache for this endpoint. The next visitor gets fresh data.
 *   This is much better than a 5-minute wait!
 */
export { USE_STRAPI };
