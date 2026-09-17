import type { ContactSubmission } from "./contact-schema";
import { SITE } from "./content";

const COLORS = {
  ink: "#08152b",
  inkSoft: "#102844",
  gold: "#f5b517",
  brand: "#1567d3",
  page: "#f4f7fb",
  panel: "#f7f9fc",
  fg: "#0d1a2b",
  fg2: "#5b6b82",
  line: "#e2e9f2",
  lineInv: "#26405f",
} as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keeps the author's paragraphing intact inside the HTML body. */
function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(date);
}

function detailRow(label: string, value: string, href?: string): string {
  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:${COLORS.brand};text-decoration:none;font-weight:600;">${escapeHtml(value)}</a>`
    : `<span style="color:${COLORS.fg};font-weight:600;">${escapeHtml(value)}</span>`;

  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${COLORS.line};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.fg2};width:132px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:14px 0;border-bottom:1px solid ${COLORS.line};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:${COLORS.fg};">${content}</td>
    </tr>`;
}

export type ContactEmail = {
  subject: string;
  html: string;
  text: string;
};

export function renderContactEmail(
  submission: ContactSubmission,
  submittedAt: Date = new Date()
): ContactEmail {
  const subject = `New enquiry — ${submission.service} — ${submission.name}`;
  const timestamp = formatTimestamp(submittedAt);
  const replyHref = `mailto:${submission.email}?subject=${encodeURIComponent(
    `Re: your enquiry with ${SITE.name}`
  )}`;

  const rows = [
    detailRow("Name", submission.name),
    detailRow("Email", submission.email, `mailto:${submission.email}`),
    submission.company ? detailRow("Company", submission.company) : "",
    submission.phone
      ? detailRow("Phone", submission.phone, `tel:${submission.phone.replace(/[^\d+]/g, "")}`)
      : "",
    detailRow("Service", submission.service),
    detailRow("Received", timestamp),
  ]
    .filter(Boolean)
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.page};">
<div style="display:none;font-size:1px;color:${COLORS.page};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
  ${escapeHtml(submission.name)} wants to talk about ${escapeHtml(submission.service)}.
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${COLORS.page};">
  <tr>
    <td align="center" style="padding:32px 16px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${COLORS.line};">

        <!-- Header -->
        <tr>
          <td style="background-color:${COLORS.ink};padding:26px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="vertical-align:middle;">
                  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:800;letter-spacing:0.04em;color:#ffffff;line-height:1.2;">INTELLIGENT</div>
                  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.15em;color:${COLORS.gold};line-height:1.2;">TECH SOLUTIONS</div>
                </td>
                <td align="right" style="vertical-align:middle;">
                  <span style="display:inline-block;background-color:${COLORS.inkSoft};border:1px solid ${COLORS.lineInv};border-radius:999px;padding:7px 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;color:${COLORS.gold};">NEW ENQUIRY</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td style="height:4px;background-color:${COLORS.gold};line-height:4px;font-size:0;">&nbsp;</td></tr>

        <!-- Intro -->
        <tr>
          <td style="padding:32px 32px 8px 32px;">
            <h1 style="margin:0 0 8px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:24px;line-height:1.25;font-weight:800;letter-spacing:-0.02em;color:${COLORS.fg};">
              ${escapeHtml(submission.name)} wants to talk
            </h1>
            <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${COLORS.fg2};">
              A new enquiry came in through the contact form on itechsolutions.us.
            </p>
          </td>
        </tr>

        <!-- Details -->
        <tr>
          <td style="padding:16px 32px 0 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:28px 32px 0 32px;">
            <p style="margin:0 0 10px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.fg2};">Project details</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${COLORS.panel};border-radius:8px;border-left:3px solid ${COLORS.gold};">
              <tr>
                <td style="padding:18px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:${COLORS.fg};">
                  ${escapeMultiline(submission.details)}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Action -->
        <tr>
          <td style="padding:28px 32px 32px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background-color:${COLORS.gold};border-radius:6px;">
                  <a href="${escapeHtml(replyHref)}" style="display:inline-block;padding:14px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:${COLORS.ink};text-decoration:none;">
                    Reply to ${escapeHtml(submission.name.split(" ")[0] ?? submission.name)}
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:14px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:${COLORS.fg2};">
              Replying to this email also goes straight to ${escapeHtml(submission.email)}.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:${COLORS.panel};border-top:1px solid ${COLORS.line};padding:20px 32px;">
            <p style="margin:0 0 4px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:${COLORS.fg2};">
              The sender confirmed they may be contacted about this enquiry, and passed reCAPTCHA verification.
            </p>
            <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:${COLORS.fg2};">
              ${escapeHtml(SITE.name)} · ${escapeHtml(SITE.city)}, ${escapeHtml(SITE.region)} · ${escapeHtml(SITE.phone)}
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    `NEW ENQUIRY — ${SITE.name}`,
    "",
    `Name:     ${submission.name}`,
    `Email:    ${submission.email}`,
    submission.company ? `Company:  ${submission.company}` : null,
    submission.phone ? `Phone:    ${submission.phone}` : null,
    `Service:  ${submission.service}`,
    `Received: ${timestamp}`,
    "",
    "PROJECT DETAILS",
    submission.details,
    "",
    `Reply to: ${submission.email}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
}
