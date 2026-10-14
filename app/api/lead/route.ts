import { after, NextResponse } from "next/server";
import { INTEREST_LABELS } from "@/lib/catalog";
import { leadSchema } from "@/lib/lead-schema";
import { validatePhone } from "@/lib/phone";
import { saveLead } from "@/lib/storage";
import { notifyTelegram } from "@/lib/telegram";
import type { Lead } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8_000;

const OK_MESSAGE = "Менеджер перезвонит вам в рабочее время и всё оформит.";
const DUPLICATE_MESSAGE = "Заявка уже обрабатывается менеджером";

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

  const parsed = leadSchema.safeParse(body);
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
