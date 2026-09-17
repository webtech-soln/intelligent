"use server";

import { headers } from "next/headers";
import {
  isHoneypotTripped,
  parseContactForm,
  type ContactFormState,
} from "@/lib/contact-schema";
import { renderContactEmail } from "@/lib/email-template";
import { resolveTransport, sendContactEmail } from "@/lib/mailer";
import { verifyRecaptcha } from "@/lib/recaptcha";

// NOTE: this file is "use server" — it may export async functions and nothing
// else. Types and constants belong in lib/contact-schema.ts.

const SUCCESS_MESSAGE =
  "Thanks — your enquiry is on its way. We'll reply within one business day.";
const GENERIC_ERROR =
  "Something went wrong sending your enquiry. Please try again, or email us directly.";

async function clientIp(): Promise<string | undefined> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");

  return forwarded?.split(",")[0]?.trim() || undefined;
}

/**
 * Never lets an exception escape: an uncaught throw in a Server Action has no
 * error boundary to land in and blanks the whole page instead of showing the
 * form's own error state.
 */
export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    return await handleSubmission(formData);
  } catch (error) {
    console.error("[contact] Unhandled error while handling enquiry", error);
    return { status: "error", message: GENERIC_ERROR };
  }
}

async function handleSubmission(formData: FormData): Promise<ContactFormState> {
  // Silently accept spam so bots get no signal about what tripped them up.
  if (isHoneypotTripped(formData)) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const parsed = parseContactForm(formData);

  if (parsed.errors) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: parsed.errors,
    };
  }

  const token = formData.get("g-recaptcha-response");
  const captcha = await verifyRecaptcha(
    typeof token === "string" ? token : "",
    await clientIp()
  );

  if (!captcha.ok) {
    console.warn("[contact] reCAPTCHA rejected:", captcha.reason);
    return {
      status: "error",
      message: "We couldn't verify that you're human. Please tick the box and try again.",
      fieldErrors: { recaptcha: "Verification failed. Please try again." },
    };
  }

  if (!resolveTransport()) {
    console.error(
      "[contact] No email transport configured — enquiry was validated but not delivered."
    );
    return { status: "error", message: GENERIC_ERROR };
  }

  const email = renderContactEmail(parsed.data);

  try {
    await sendContactEmail({
      subject: email.subject,
      html: email.html,
      text: email.text,
      replyTo: parsed.data.email,
    });
  } catch (error) {
    console.error("[contact] Failed to send enquiry", error);
    return { status: "error", message: GENERIC_ERROR };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
