import { NextResponse } from "next/server";
import { getDoctors } from "@/lib/api";

export async function GET() {
  try {
    const result = await getDoctors();
    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch doctors", data: [] }, { status: 500 });
  }
}
