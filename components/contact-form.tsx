"use client";

import { useActionState, useCallback, useRef, useState } from "react";
import { Check, ChevronDown, CircleAlert, CircleCheck } from "lucide-react";
import { Button } from "./ui";
import { Recaptcha } from "./recaptcha";
import { SERVICE_CHIPS } from "@/lib/content";
import {
  INITIAL_CONTACT_STATE,
  submitContactForm,
  type ContactFormState,
} from "@/app/contact/actions";
import type { ContactField } from "@/lib/contact-schema";

const FIELD_BASE =
  "h-[50px] w-full rounded-sm border bg-surface-2 px-4 text-[15px] text-fg outline-none transition-colors placeholder:text-fg-2";
const LABEL = "text-[13px] font-semibold text-fg";
const DANGER = "#c2410c";

function fieldClasses(invalid: boolean, extra = ""): string {
  return `${FIELD_BASE} ${
    invalid ? "border-[#c2410c] focus:border-[#c2410c]" : "border-line focus:border-brand"
  } ${extra}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="text-[13px] text-[#c2410c]" role="alert">
      {message}
    </p>
  );
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [service, setService] = useState("");
  const [consent, setConsent] = useState(true);
  const [verified, setVerified] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleVerifiedChange = useCallback((value: boolean) => {
    setVerified(value);
  }, []);

  const [state, formAction, pending] = useActionState(
    async (previousState: ContactFormState, formData: FormData) => {
      const result = await submitContactForm(previousState, formData);

      // Every response invalidates the reCAPTCHA token, so ask for a fresh
      // challenge. On success, clear the form ready for the next enquiry.
      setResetKey((value) => value + 1);

      if (result.status === "success") {
        formRef.current?.reset();
        setService("");
        setConsent(true);
      }

      return result;
    },
    INITIAL_CONTACT_STATE
  );

  const errors = state.fieldErrors ?? {};
  const errorId = (field: ContactField) => `${field}-error`;
  const describedBy = (field: ContactField) =>
    errors[field] ? errorId(field) : undefined;

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-1 flex-col gap-6.5 rounded-lg border border-line bg-surface p-7 shadow-panel lg:p-11"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.021em] text-fg">
          Tell us about your project
        </h2>
        <p className="text-sm text-fg-2">
          Fields marked with an asterisk are required.
        </p>
      </div>

      {state.status !== "idle" && state.message ? (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-start gap-3 rounded-sm border p-4 text-sm leading-[1.6] ${
            state.status === "success"
              ? "border-brand/30 bg-brand-soft text-fg"
              : "border-[#c2410c]/30 bg-[#fdf0e8] text-fg"
          }`}
        >
          {state.status === "success" ? (
            <CircleCheck className="mt-0.5 size-4.5 shrink-0 text-brand" />
          ) : (
            <CircleAlert className="mt-0.5 size-4.5 shrink-0" style={{ color: DANGER }} />
          )}
          {state.message}
        </div>
      ) : null}

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="name">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={fieldClasses(Boolean(errors.name))}
          />
          <FieldError id={errorId("name")} message={errors.name} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="email">
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={fieldClasses(Boolean(errors.email))}
          />
          <FieldError id={errorId("email")} message={errors.email} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            maxLength={120}
            autoComplete="organization"
            placeholder="Company name"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describedBy("company")}
            className={fieldClasses(Boolean(errors.company))}
          />
          <FieldError id={errorId("company")} message={errors.company} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={LABEL} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            autoComplete="tel"
            placeholder="(330) 000-0000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={fieldClasses(Boolean(errors.phone))}
          />
          <FieldError id={errorId("phone")} message={errors.phone} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={LABEL} htmlFor="service">
          What do you need? *
        </label>
        <div className="relative">
          <select
            id="service"
            name="service"
            required
            value={service}
            onChange={(event) => setService(event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={describedBy("service")}
            className={fieldClasses(
              Boolean(errors.service),
              `appearance-none pr-11 ${service ? "" : "text-fg-2"}`
            )}
          >
            <option value="">Select a service</option>
            {SERVICE_CHIPS.map((chip) => (
              <option key={chip} value={chip}>
                {chip}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-5.5 -translate-y-1/2 text-fg-2" />
        </div>
        <FieldError id={errorId("service")} message={errors.service} />
      </div>

      <div className="flex flex-wrap gap-2.5">
        {SERVICE_CHIPS.map((chip) => {
          const active = chip === service;
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setService(active ? "" : chip)}
              aria-pressed={active}
              className={`rounded-full border px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                active
                  ? "border-ink bg-ink text-fg-inv"
                  : "border-line bg-surface-2 text-fg-2 hover:border-brand hover:text-brand"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <label className={LABEL} htmlFor="details">
          Project details *
        </label>
        <textarea
          id="details"
          name="details"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="What are you trying to solve, what systems are you running today, and when do you need it live?"
          aria-invalid={Boolean(errors.details)}
          aria-describedby={describedBy("details")}
          className={`h-37.5 w-full resize-none rounded-sm border bg-surface-2 p-4 text-[15px] leading-[1.6] text-fg outline-none transition-colors placeholder:text-fg-2 ${
            errors.details
              ? "border-[#c2410c] focus:border-[#c2410c]"
              : "border-line focus:border-brand"
          }`}
        />
        <FieldError id={errorId("details")} message={errors.details} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2.5 text-sm text-fg-2">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="peer sr-only"
            required
          />
          <span
            aria-hidden="true"
            className={`flex size-4.5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
              consent ? "border-brand bg-brand" : "border-line bg-surface-2"
            } peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand`}
          >
            {consent ? <Check className="size-3 text-fg-inv" /> : null}
          </span>
          I agree to be contacted about this enquiry.
        </label>
        <FieldError id={errorId("consent")} message={errors.consent} />
      </div>

      <Recaptcha
        siteKey={SITE_KEY}
        onVerifiedChange={handleVerifiedChange}
        resetKey={resetKey}
        error={errors.recaptcha}
      />

      <div className="flex flex-wrap items-center gap-4.5">
        <Button
          type="submit"
          disabled={pending || (Boolean(SITE_KEY) && !verified)}
          className={
            pending || (Boolean(SITE_KEY) && !verified)
              ? "cursor-not-allowed opacity-60"
              : ""
          }
        >
          {pending ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="font-mono text-xs text-fg-2">
          {SITE_KEY && !verified
            ? "Confirm the reCAPTCHA to enable sending"
            : "Typical reply time: under 1 business day"}
        </p>
      </div>
    </form>
  );
}
