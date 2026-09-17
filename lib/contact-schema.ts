import { SERVICE_CHIPS } from "./content";

export type ContactField =
  | "name"
  | "email"
  | "company"
  | "phone"
  | "service"
  | "details"
  | "consent"
  | "recaptcha";

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  details: string;
};

export type FieldErrors = Partial<Record<ContactField, string>>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: FieldErrors;
};

/**
 * Lives here rather than beside the server action: a "use server" module may
 * only export async functions, so exporting this object from there crashes the
 * production build at module evaluation.
 */
export const INITIAL_CONTACT_STATE: ContactFormState = {
  status: "idle",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates the raw form payload. Every rule here is also enforced client-side
 * by the browser, but the server treats the request as untrusted input.
 */
export function parseContactForm(
  formData: FormData
): { data: ContactSubmission; errors: null } | { data: null; errors: FieldErrors } {
  const submission: ContactSubmission = {
    name: clean(formData.get("name")),
    email: clean(formData.get("email")),
    company: clean(formData.get("company")),
    phone: clean(formData.get("phone")),
    service: clean(formData.get("service")),
    details: clean(formData.get("details")),
  };

  const errors: FieldErrors = {};

  if (submission.name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (submission.name.length > 100) {
    errors.name = "That name is too long.";
  }

  if (!EMAIL_PATTERN.test(submission.email)) {
    errors.email = "Please enter a valid email address.";
  } else if (submission.email.length > 200) {
    errors.email = "That email address is too long.";
  }

  if (submission.company.length > 120) {
    errors.company = "That company name is too long.";
  }

  if (submission.phone.length > 40) {
    errors.phone = "That phone number is too long.";
  }

  if (!submission.service) {
    errors.service = "Please choose the service you need.";
  } else if (!SERVICE_CHIPS.includes(submission.service as (typeof SERVICE_CHIPS)[number])) {
    errors.service = "Please choose one of the listed services.";
  }

  if (submission.details.length < 10) {
    errors.details = "Please tell us a little more about the project.";
  } else if (submission.details.length > 5000) {
    errors.details = "Please keep the brief under 5000 characters.";
  }

  if (clean(formData.get("consent")) !== "yes") {
    errors.consent = "Please confirm we may contact you about this enquiry.";
  }

  if (Object.keys(errors).length > 0) {
    return { data: null, errors };
  }

  return { data: submission, errors: null };
}

/** Bots fill in every field they find, including ones humans never see. */
export function isHoneypotTripped(formData: FormData): boolean {
  return clean(formData.get("website")) !== "";
}
