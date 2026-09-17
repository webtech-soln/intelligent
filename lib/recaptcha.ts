const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

type VerifyResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type RecaptchaResult =
  | { ok: true; skipped: boolean }
  | { ok: false; reason: string };

/**
 * Verifies a reCAPTCHA v2 checkbox token against Google's siteverify endpoint.
 *
 * With no secret configured we fail closed in production and skip in
 * development, so the form stays usable locally before keys are issued.
 */
export async function verifyRecaptcha(
  token: string,
  remoteIp?: string
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, reason: "RECAPTCHA_SECRET_KEY is not configured." };
    }
    console.warn(
      "[contact] RECAPTCHA_SECRET_KEY is not set — skipping verification in development."
    );
    return { ok: true, skipped: true };
  }

  if (!token) {
    return { ok: false, reason: "Missing reCAPTCHA token." };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  let result: VerifyResponse;

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, reason: `siteverify responded ${response.status}` };
    }

    result = (await response.json()) as VerifyResponse;
  } catch (error) {
    console.error("[contact] reCAPTCHA verification request failed", error);
    return { ok: false, reason: "Could not reach the reCAPTCHA service." };
  }

  if (!result.success) {
    return {
      ok: false,
      reason: result["error-codes"]?.join(", ") ?? "Verification failed.",
    };
  }

  return { ok: true, skipped: false };
}
