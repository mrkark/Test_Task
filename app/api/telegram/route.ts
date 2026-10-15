import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { handleUpdate, type TgUpdate } from "@/lib/bot";
import { allowedChats, botToken, webhookSecret } from "@/lib/bot-config";
import { getChat, setChat } from "@/lib/bot-store";
import { listLeads } from "@/lib/storage";
import { telegramApi } from "@/lib/telegram-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/**
 * Вебхук Telegram. Закрыт по умолчанию: без TELEGRAM_WEBHOOK_SECRET отвечает 503,
 * с неверным заголовком X-Telegram-Bot-Api-Secret-Token — 401.
 * На ошибки обработки отвечаем 200, иначе Telegram будет бесконечно повторять то же обновление.
 */
export async function POST(req: Request) {
  const token = botToken();
  const secret = webhookSecret();
  if (!token || !secret) return NextResponse.json({ ok: false, error: "bot is not configured" }, { status: 503 });

  if (!same(req.headers.get("x-telegram-bot-api-secret-token") ?? "", secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let update: TgUpdate;
  try {
    update = (await req.json()) as TgUpdate;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await handleUpdate(update, {
      allowed: allowedChats(),
      getChat,
      setChat,
      listLeads,
      api: telegramApi(token),
      now: () => new Date(),
    });
  } catch (err) {
    console.error("[bot] ошибка обработки", err instanceof Error ? err.message : err);
  }
  return NextResponse.json({ ok: true });
}
