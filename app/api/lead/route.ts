import { after, NextResponse } from "next/server";
import { z } from "zod";
import { INTEREST_IDS, INTEREST_LABELS } from "@/lib/catalog";
import { validatePhone } from "@/lib/phone";
import { saveLead } from "@/lib/storage";
import { notifyTelegram } from "@/lib/telegram";
import type { Lead } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8_000;

const OK_MESSAGE = "Менеджер перезвонит вам в рабочее время и всё оформит.";
const DUPLICATE_MESSAGE = "Заявка уже обрабатывается менеджером";

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => v || undefined);

const schema = z.object({
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

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const raw = await req.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) {
    return json({ success: false, message: "Слишком большая заявка." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ success: false, message: "Не удалось прочитать заявку. Обновите страницу и попробуйте ещё раз." }, 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fieldErrors[field] ??= issue.message;
    }
    return json({ success: false, message: "Проверьте поля формы.", fieldErrors }, 400);
  }
  const data = parsed.data;

  // Бот заполнил скрытое поле: отвечаем «успехом», но ничего не сохраняем и не шлём.
  if (data.website) {
    return json({ success: true, status: "created", message: OK_MESSAGE });
  }

  const phone = validatePhone(data.phone);
  if (!phone.ok) {
    return json({ success: false, message: phone.message, fieldErrors: { phone: phone.message } }, 400);
  }

  const lead: Lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: data.name,
    phone: phone.e164,
    interest: data.interest,
    interestLabel: INTEREST_LABELS[data.interest],
    comment: data.comment,
    attribution: Object.fromEntries(
      Object.entries(data.attribution ?? {}).filter(([, v]) => v),
    ),
  };

  let result;
  try {
    result = await saveLead(lead);
  } catch (err) {
    console.error("[lead] не удалось сохранить заявку", err instanceof Error ? err.message : err);
    return json(
      {
        success: false,
        message:
          "Заявка не сохранилась. Нажмите кнопку ещё раз через минуту или загляните к нам на Короля, 9.",
      },
      503,
    );
  }

  if (result === "duplicate") {
    return json({ success: true, status: "duplicate", message: DUPLICATE_MESSAGE });
  }

  // Уведомление уходит после ответа: клиент не ждёт Telegram, а сбой Telegram не ломает заявку.
  after(() => notifyTelegram(lead));

  return json({ success: true, status: "created", message: OK_MESSAGE });
}
