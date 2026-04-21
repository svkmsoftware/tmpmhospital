/**
 * Strapi Webhook Handler
 * ─────────────────────────────────────────────────────────────────────────────
 * LEARNING NOTE — What is a webhook?
 *
 * A webhook is a URL you give to another service (Strapi) and say:
 *   "Call this URL whenever something changes."
 *
 * When a content editor saves changes in Strapi, Strapi sends a POST request
 * to this endpoint. We then tell Next.js to clear its cache for that content
 * so the next visitor gets fresh data immediately.
 *
 * HOW TO SET UP IN STRAPI:
 *   1. Go to Strapi Admin → Settings → Webhooks → Create new webhook
 *   2. Name: "Next.js Revalidate"
 *   3. URL: https://www.tmpmhospital.com/api/revalidate
 *   4. Events: entry.create ✓  entry.update ✓  entry.delete ✓
 *   5. Headers → Add header: x-revalidate-secret = [same value as REVALIDATE_SECRET env var]
 *
 * SECURITY:
 *   We check a secret header so only Strapi can trigger revalidation.
 *   Without this, anyone who knows the URL could clear your cache.
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Map Strapi model names → our cache tags
// When Strapi sends a webhook for the "about" model, we clear the "about" cache tag
const MODEL_TO_TAG: Record<string, string> = {
  about:       "about",
  departments: "departments",
  doctors:     "doctors",
  blogs:       "blogs",
  careers:     "careers",
};

export async function POST(request: NextRequest) {
  // ── 1. Verify the secret ───────────────────────────────────────────────────
  const secret = request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    // If no secret is configured, log a warning but allow (for initial setup)
    console.warn("[Webhook] REVALIDATE_SECRET not set — consider adding it for security");
  } else if (secret !== expectedSecret) {
    console.warn("[Webhook] Invalid revalidate secret — request rejected");
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // ── 2. Parse the Strapi webhook payload ────────────────────────────────────
  let body: { model?: string; event?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const model = body.model ?? "";
  const tag = MODEL_TO_TAG[model];

  if (tag) {
    // ── 3. Clear the cache for this content type ─────────────────────────────
    revalidateTag(tag);
    console.log(`[Webhook] Revalidated cache tag: "${tag}" (model: "${model}", event: "${body.event}")`);
    return NextResponse.json({
      revalidated: true,
      tag,
      model,
      timestamp: new Date().toISOString(),
    });
  }

  // Unknown model — revalidate everything as a safe fallback
  for (const t of Object.values(MODEL_TO_TAG)) {
    revalidateTag(t);
  }

  console.log(`[Webhook] Unknown model "${model}" — revalidated all tags`);
  return NextResponse.json({
    revalidated: true,
    tag:         "all",
    model,
    timestamp:   new Date().toISOString(),
  });
}

// Reject non-POST requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
