import { z } from "zod";

/**
 * Normalizes any entered phone string to clean Belarusian digits (e.g. 375291234567)
 */
export function normalizeBelarusPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("80") && digits.length === 11) {
    return "375" + digits.slice(2);
  }
  if (!digits.startsWith("375") && (digits.length === 9)) {
    return "375" + digits;
  }
  return digits;
}

/**
 * Validates Belarusian phone numbers (valid codes: 29, 33, 44, 25, 17)
 */
export function isValidBelarusPhone(raw: string): boolean {
  const normalized = normalizeBelarusPhone(raw);
  // Must be 12 digits starting with 375 + valid operator/city prefix + 7 digits
  const regex = /^375(29|33|44|25|17)\d{7}$/;
  return regex.test(normalized);
}

/**
 * Formats digits to readable +375 (XX) XXX-XX-XX format
 */
export function formatBelarusPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  let clean = digits;
  if (clean.startsWith("80")) {
    clean = "375" + clean.slice(2);
  } else if (!clean.startsWith("375") && clean.length > 0) {
    clean = "375" + clean;
  }
  clean = clean.slice(0, 12);

  if (clean.length === 0) return "";
  if (clean.length <= 3) return `+${clean}`;
  if (clean.length <= 5) return `+${clean.slice(0, 3)} (${clean.slice(3)}`;
  if (clean.length <= 8) return `+${clean.slice(0, 3)} (${clean.slice(3, 5)}) ${clean.slice(5)}`;
  if (clean.length <= 10) return `+${clean.slice(0, 3)} (${clean.slice(3, 5)}) ${clean.slice(5, 8)}-${clean.slice(8)}`;
  return `+${clean.slice(0, 3)} (${clean.slice(3, 5)}) ${clean.slice(5, 8)}-${clean.slice(8, 10)}-${clean.slice(10, 12)}`;
}

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Пожалуйста, укажите ваше имя (минимум 2 буквы)" })
    .max(80, { message: "Имя слишком длинное" }),
  phone: z
    .string()
    .min(7, { message: "Введите номер телефона" })
    .refine((val) => isValidBelarusPhone(val), {
      message: "Укажите корректный номер Беларуси: +375 (29/33/44/25) XXX-XX-XX",
    }),
  interest: z.string().min(1, { message: "Выберите, что вас интересует" }),
  comment: z.string().max(500, { message: "Комментарий не должен превышать 500 символов" }).optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  referrer: z.string().optional(),
  page: z.string().optional(),
});
