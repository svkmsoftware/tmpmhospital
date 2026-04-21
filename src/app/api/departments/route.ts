import { NextResponse } from "next/server";
import { getDepartments } from "@/lib/api";

export async function GET() {
  try {
    const result = await getDepartments();
    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch departments", data: [] }, { status: 500 });
  }
}
