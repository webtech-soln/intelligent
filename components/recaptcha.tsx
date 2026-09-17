"use client";

import { useEffect, useRef, useState } from "react";

type RecaptchaApi = {
  render: (
    container: HTMLElement,
    parameters: {
      sitekey: string;
      theme?: "light" | "dark";
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    }
  ) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
    __onRecaptchaLoad?: () => void;
  }
}

const SCRIPT_SRC =
  "https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit";

// Shared across every instance so the script is only ever requested once.
let loader: Promise<RecaptchaApi> | null = null;

function loadRecaptcha(): Promise<RecaptchaApi> {
  if (loader) return loader;

  loader = new Promise<RecaptchaApi>((resolve, reject) => {
    if (window.grecaptcha?.render) {
      resolve(window.grecaptcha);
      return;
    }

    window.__onRecaptchaLoad = () => {
      if (window.grecaptcha) {
        resolve(window.grecaptcha);
      } else {
        reject(new Error("reCAPTCHA loaded without an API"));
      }
    };

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Could not load reCAPTCHA"));
    document.head.appendChild(script);
  });

  return loader;
}

export function Recaptcha({
  siteKey,
  onVerifiedChange,
  resetKey,
  error,
}: {
  siteKey: string | undefined;
  onVerifiedChange: (verified: boolean) => void;
  /** Bump to force a fresh challenge — v2 tokens are single use. */
  resetKey: number;
  error?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!siteKey || !containerRef.current || widgetIdRef.current !== null) {
      return;
    }

    let cancelled = false;

    loadRecaptcha()
      .then((api) => {
        // Guard against the effect being torn down mid-load, and against
        // React's development double-invoke rendering the widget twice.
        if (cancelled || !containerRef.current || widgetIdRef.current !== null) {
          return;
        }

        widgetIdRef.current = api.render(containerRef.current, {
          sitekey: siteKey,
          theme: "light",
          callback: () => onVerifiedChange(true),
          "expired-callback": () => onVerifiedChange(false),
          "error-callback": () => onVerifiedChange(false),
        });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [siteKey, onVerifiedChange]);

  useEffect(() => {
    if (resetKey === 0 || widgetIdRef.current === null) return;

    window.grecaptcha?.reset(widgetIdRef.current);
    onVerifiedChange(false);
  }, [resetKey, onVerifiedChange]);

  if (!siteKey) {
    return (
      <p className="rounded-sm border border-dashed border-line bg-surface-2 px-4 py-3 font-mono text-xs leading-relaxed text-fg-2">
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set, so the challenge is hidden.
        Add it to <span className="text-fg">.env.local</span> to enable
        reCAPTCHA.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div ref={containerRef} />
      {loadFailed ? (
        <p className="text-[13px] text-[#c2410c]">
          reCAPTCHA could not load. Check your connection and refresh the page.
        </p>
      ) : null}
      {error ? (
        <p className="text-[13px] text-[#c2410c]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
