"use client";

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
};

const UTM_STORAGE_KEY = "kvarta_utm_data_v1";

/**
 * Captures UTM parameters from URL and saves into sessionStorage.
 * Returns the active UTM parameters.
 */
export function captureUtm(): UtmParams {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const hasUtm =
      urlParams.has("utm_source") ||
      urlParams.has("utm_medium") ||
      urlParams.has("utm_campaign");

    if (hasUtm) {
      const captured: UtmParams = {
        utm_source: urlParams.get("utm_source") || undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
        utm_term: urlParams.get("utm_term") || undefined,
        referrer: document.referrer || undefined,
        landing_page: window.location.pathname,
      };
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
      return captured;
    }

    // Try reading cached session
    const cached = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }

    // Fallback default
    return {
      referrer: document.referrer || undefined,
      landing_page: window.location.pathname,
    };
  } catch {
    return {};
  }
}
