import type { Attribution } from "./types";

const STORAGE_KEY = "kvarta_attribution_v1";

const TRACKED = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid",
  "fbclid",
  "gclid",
] as const;

function readStored(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null; // приватный режим, запрет на хранилище — не страшно, посчитаем из адреса
  }
}

function fromLocation(): Attribution {
  const out: Attribution = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of TRACKED) {
    const value = params.get(key);
    if (value) out[key] = value.slice(0, 200);
  }

  try {
    if (document.referrer && new URL(document.referrer).host !== window.location.host) {
      out.referrer = document.referrer.slice(0, 300);
    }
  } catch {
    /* битый referrer игнорируем */
  }

  out.landing_page = (window.location.pathname + window.location.search).slice(0, 300);
  return out;
}

/**
 * Вызывается при входе на страницу. Правило: пока в этой вкладке нет меток, запоминаем первый заход;
 * если пришли по новой рекламной ссылке (есть utm_* или click-id), метки обновляются.
 * Так заявка не потеряет источник, даже если человек полистал страницу, ушёл к якорям и вернулся.
 */
export function captureAttribution(): void {
  try {
    const current = fromLocation();
    const hasCampaign = TRACKED.some((k) => current[k]);
    const stored = readStored();
    if (stored && !hasCampaign) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    /* хранилище недоступно: getAttribution() всё равно соберёт данные из адреса */
  }
}

/** Метки для отправки с формой. Если хранилище недоступно, берём из текущего адреса. */
export function getAttribution(): Attribution {
  return readStored() ?? fromLocation();
}
