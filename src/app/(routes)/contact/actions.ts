"use server";

import { fetchGraphQL } from "@/lib/graphql/client"; // adjust to wherever fetchGraphQL actually lives
import { CREATE_CONTACT_SUBMISSION_MUTATION } from "@/lib/graphql/queries";

interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  department?: string;
  message: string;
}

interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(input: ContactFormInput): Promise<SubmitResult> {
  // Mutation only accepts name/email/subject/message today —
  // fold the extra fields in until the schema is extended.
  const extraLines = [
    input.department && `Department: ${input.department}`,
    input.phone && `Phone: ${input.phone}`,
  ].filter(Boolean);

  const message = extraLines.length
    ? `${extraLines.join("\n")}\n\n${input.message}`
    : input.message;

  try {
    await fetchGraphQL(CREATE_CONTACT_SUBMISSION_MUTATION, {
      data: {
        name: input.name,
        email: input.email,
        subject: input.subject,
        message,
      },
    });
    return { success: true };
  } catch (e) {
    console.error("[GraphQL] submitContactForm failed:", e);
    return { success: false, error: "Something went wrong. Please try again in a moment." };
  }
}