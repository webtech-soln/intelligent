"use server";

import { headers } from "next/headers";
import {
  isHoneypotTripped,
  parseContactForm,
  type FieldErrors,
} from "@/lib/contact-schema";
import { renderContactEmail } from "@/lib/email-template";
import { resolveTransport, sendContactEmail } from "@/lib/mailer";
import { verifyRecaptcha } from "@/lib/recaptcha";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: FieldErrors;
};

export const INITIAL_CONTACT_STATE: ContactFormState = {
  status: "idle",
  message: "",
};

const SUCCESS_MESSAGE =
  "Thanks — your enquiry is on its way. We'll reply within one business day.";
const GENERIC_ERROR =
  "Something went wrong sending your enquiry. Please try again, or email us directly.";

async function clientIp(): Promise<string | undefined> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");

  return forwarded?.split(",")[0]?.trim() || undefined;
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
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
