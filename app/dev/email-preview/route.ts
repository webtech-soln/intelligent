import { notFound } from "next/navigation";
import { renderContactEmail } from "@/lib/email-template";

/**
 * Development-only preview of the contact notification email.
 * Visit /dev/email-preview to iterate on the template without sending mail.
 * Append ?format=text to see the plain-text alternative.
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const email = renderContactEmail({
    name: "Jane Okafor",
    email: "jane@northgate-supply.com",
    company: "Northgate Supply Co.",
    phone: "(330) 555-0148",
    service: "ERP systems",
    details:
      "We're running QuickBooks plus three spreadsheets for stock across two warehouses, and it's falling apart at month end.\n\nWe'd like to move to a single ERP before our next fiscal year starts in April. Around 40 staff, 12 of whom would need daily access. Can you scope a migration?",
  });

  const format = new URL(request.url).searchParams.get("format");

  if (format === "text") {
    return new Response(`Subject: ${email.subject}\n\n${email.text}`, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(email.html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
