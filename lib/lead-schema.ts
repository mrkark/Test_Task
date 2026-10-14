import { z } from "zod";
import { INTEREST_IDS } from "./catalog";

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || undefined);

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Напишите, как к вам обращаться.").max(60, "Имя слишком длинное."),
  phone: z.string().trim().min(1, "Укажите телефон, чтобы менеджер мог перезвонить.").max(40),
  interest: z.enum(INTEREST_IDS, { message: "Выберите, что вас интересует." }),
  comment: z.string().trim().max(500, "Комментарий длиннее 500 символов.").default(""),
  website: z.string().max(200).optional(), // ловушка для ботов
  attribution: z
    .object({
      utm_source: optional(200),
      utm_medium: optional(200),
      utm_campaign: optional(200),
      utm_content: optional(200),
      utm_term: optional(200),
      yclid: optional(200),
      fbclid: optional(200),
      gclid: optional(200),
      referrer: optional(300),
      landing_page: optional(300),
    })
    .optional(),
});
