import { SITE } from "./content";

export type MailMessage = {
  subject: string;
  html: string;
  text: string;
  /** Set so that hitting Reply in the inbox answers the person who wrote in. */
  replyTo: string;
};

export type MailTransport = "resend" | "smtp";

function requireFrom(): string {
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!from) {
    throw new Error(
      "CONTACT_FROM_EMAIL is not set. It must be an address on a domain you have verified with your email provider."
    );
  }

  return from;
}

function recipient(): string {
  return process.env.CONTACT_TO_EMAIL ?? SITE.email;
}

/**
 * Picks a transport from the environment: Resend when an API key is present,
 * otherwise SMTP. Adding a third provider means adding one branch here — the
 * rest of the contact flow is transport agnostic.
 */
export function resolveTransport(): MailTransport | null {
  if (process.env.RESEND_API_KEY) return "resend";
  if (process.env.SMTP_HOST) return "smtp";
  return null;
}

async function sendWithResend(message: MailMessage): Promise<void> {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: requireFrom(),
    to: recipient(),
    replyTo: message.replyTo,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });

  if (error) {
    throw new Error(`Resend rejected the message: ${error.message}`);
  }
}

async function sendWithSmtp(message: MailMessage): Promise<void> {
  const nodemailer = (await import("nodemailer")).default;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // Port 465 uses implicit TLS; everything else upgrades via STARTTLS.
    secure: port === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASSWORD
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
  });

  await transporter.sendMail({
    from: requireFrom(),
    to: recipient(),
    replyTo: message.replyTo,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

export async function sendContactEmail(message: MailMessage): Promise<void> {
  const transport = resolveTransport();

  if (!transport) {
    throw new Error(
      "No email transport is configured. Set RESEND_API_KEY, or SMTP_HOST and its credentials."
    );
  }

  if (transport === "resend") {
    await sendWithResend(message);
    return;
  }

  await sendWithSmtp(message);
}
