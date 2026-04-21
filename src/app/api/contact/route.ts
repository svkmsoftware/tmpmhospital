import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  department?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    // Basic server-side validation
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ success: false, message: "Required fields missing." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, message: "Invalid email address." }, { status: 400 });
    }

    /**
     * TODO: Integrate email sending here.
     * Example with nodemailer:
     *   await transporter.sendMail({ from, to: "contact@tmpmhospital.com", subject, html });
     *
     * Example with Resend:
     *   await resend.emails.send({ from, to, subject, html });
     */

    console.log("New contact form submission:", {
      name: body.name,
      email: body.email,
      subject: body.subject,
      department: body.department,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Message received. We will get back to you shortly." });
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
