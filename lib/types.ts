export type CoffeeItem = {
  id: string;
  name: string;
  region: string;
  variety?: string;
  processing: string;
  roastLevel: string;
  flavorNotes: string[];
  weight: string;
  price: number; // in BYN
  badge?: string;
  isPopular?: boolean;
};

export type LeadPayload = {
  name: string;
  phone: string;
  interest: string;
  comment?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  page?: string;
  timestamp?: string;
};

export type LeadRecord = LeadPayload & {
  id: string;
  createdAt: string;
};
