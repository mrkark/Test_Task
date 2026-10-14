import type { InterestId } from "./catalog";

/** Откуда пришёл клиент: метки рекламы, реферер и страница входа. */
export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  /** клик-идентификаторы рекламных систем: Яндекс Директ, Meta (Instagram), Google */
  yclid?: string;
  fbclid?: string;
  gclid?: string;
  referrer?: string;
  landing_page?: string;
};

export type Lead = {
  id: string;
  createdAt: string; // ISO 8601, UTC
  name: string;
  phone: string; // E.164: +375291234567
  interest: InterestId;
  interestLabel: string;
  comment: string;
  attribution: Attribution;
};
