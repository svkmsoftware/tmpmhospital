/**
 * GraphQL API Client — Core Service
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * LEARNING: How GraphQL differs from REST at the HTTP level
 * ──────────────────────────────────────────────────────────
 *
 * REST:   GET  /api/about?populate=section          ← different URL per resource
 *         GET  /api/doctors
 *         GET  /api/departments
 *
 * GraphQL: POST /graphql    ← ALWAYS the same single URL
 *          Body: { "query": "...", "variables": { ... } }
 *
 * Key differences:
 * 1. GraphQL always uses POST (even for reading data)
 * 2. GraphQL always hits ONE endpoint (/graphql)
 * 3. The query itself describes WHAT data you want
 * 4. The server returns EXACTLY that — nothing more
 *
 * SECURITY NOTES:
 * ───────────────
 * • GRAPHQL_ENDPOINT is server-only (no NEXT_PUBLIC_ prefix)
 * • This file must only be imported in Server Components or API routes
 * • The browser NEVER directly calls your CMS — all requests go through Next.js
 *
 * CACHING:
 * ────────
 * Next.js 14 extends `fetch` with caching superpowers:
 * • next: { revalidate: 300 } = cache for 5 minutes, then silently refresh
 * • This means page loads are always FAST (cached), but content stays fresh
 */

// const GRAPHQL_ENDPOINT =
//   process.env.STRAPI_API_URL
//     ? `${process.env.STRAPI_API_URL}/graphql`
//     : "https://admin.tmpmhospital.com/graphql";

const GRAPHQL_ENDPOINT = `${process.env.STRAPI_API_URL}/graphql`;

// Optional auth token (if your Strapi GraphQL endpoint requires it)
const GRAPHQL_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

// ── Cache tag constants ────────────────────────────────────────────────────────
// Used for on-demand cache invalidation via webhooks (see /api/revalidate)
export const CACHE_TAGS = {
  about: "gql-about",
  home: "gql-home",
  departments: "gql-departments",
  doctors: "gql-doctors",
  blogs: "gql-blogs",
  careers: "gql-careers",
  contact: "gql-contact",
  opd: "gql-opd",
  ipd: "gql-ipd",
  daycare: "gql-daycare",
} as const;

// ── Types ─────────────────────────────────────────────────────────────────────

interface GraphQLRequestOptions {
  /**
   * Next.js ISR revalidation in seconds.
   * 300 = serve cached page for up to 5 minutes, then silently re-fetch.
   * 0   = never cache (always fresh — use for real-time data).
   * false = cache forever until next deployment.
   */
  revalidate?: number | false;
  /** Cache tags for on-demand revalidation from webhook */
  tags?: string[];
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; path?: string[] }>;
}

// ── Core fetch function ────────────────────────────────────────────────────────

/**
 * The single function that makes ALL GraphQL requests.
 *
 * LEARNING: Why we created this wrapper instead of calling fetch directly
 * ────────────────────────────────────────────────────────────────────────
 * 1. Single place for auth headers — change token once, affects all queries
 * 2. Consistent error handling — GraphQL errors are in response.data.errors,
 *    not in the HTTP status code (GraphQL usually returns 200 even on errors!)
 * 3. TypeScript generics — <T> means this function works for ANY query type
 * 4. Centralised caching config
 *
 * @param query     - The GraphQL query string
 * @param variables - Optional variables to pass to the query (for parameterized queries)
 * @param options   - Caching options for Next.js ISR
 */
export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: GraphQLRequestOptions = { revalidate: 300 },
): Promise<T> {
  // Build headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // Accept header tells the server we want JSON (standard for GraphQL)
    Accept: "application/json",
  };

  // Add auth token if available
  // LEARNING: GraphQL uses "Bearer" auth same as REST
  if (GRAPHQL_TOKEN) {
    headers["Authorization"] = `Bearer ${GRAPHQL_TOKEN}`;
  }

  let response: Response;

  try {
    response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST", // GraphQL ALWAYS uses POST
      headers,
      body: JSON.stringify({
        query, // Your GraphQL query string
        variables, // Optional: parameterized values
      }),
      // Next.js ISR caching — this is what makes pages fast
      next: {
        revalidate: options.revalidate,
        tags: options.tags,
      },
    });
  } catch (networkError) {
    // Network failure: CMS server is down, DNS error, no internet
    throw new Error(
      `[GraphQL] Network error calling ${GRAPHQL_ENDPOINT}: ${String(networkError)}`,
    );
  }

  if (!response.ok) {
    // HTTP-level error (401 bad token, 500 server crash, etc.)
    throw new Error(
      `[GraphQL] HTTP ${response.status} ${response.statusText} from ${GRAPHQL_ENDPOINT}`,
    );
  }

  const json: GraphQLResponse<T> = await response.json();

  /**
   * LEARNING: GraphQL error handling is different from REST!
   *
   * REST:    HTTP 404 = not found. HTTP 401 = unauthorized.
   * GraphQL: ALWAYS returns HTTP 200, even when there are errors!
   *          Errors live inside the response body: { errors: [...] }
   *
   * So you MUST check json.errors even after a successful HTTP response.
   */
  if (json.errors && json.errors.length > 0) {
    const errorMessages = json.errors.map((e) => e.message).join(", ");
    throw new Error(`[GraphQL] Query errors: ${errorMessages}`);
  }

  if (!json.data) {
    throw new Error("[GraphQL] Response has no data field.");
  }

  return json.data;
}
