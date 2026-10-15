/**
 * Настройки бота из окружения.
 *  TELEGRAM_BOT_TOKEN       токен от @BotFather
 *  TELEGRAM_CHAT_ID         чат(ы) команды, через запятую; сюда приходят заявки
 *  TELEGRAM_ALLOWED_CHAT_IDS  необязательно: ещё чаты, которым разрешены команды
 *  TELEGRAM_WEBHOOK_SECRET  секрет вебхука; без него вебхук отвечает 503 (закрыто по умолчанию)
 */

const split = (v?: string) =>
  (v ?? "")
    .split(/[\s,;]+/)
    .map((x) => x.trim())
    .filter(Boolean);

export function allowedChats(env: Record<string, string | undefined> = process.env): Set<string> {
  return new Set([...split(env.TELEGRAM_CHAT_ID), ...split(env.TELEGRAM_ALLOWED_CHAT_IDS)]);
}

export const botToken = (env: Record<string, string | undefined> = process.env) => env.TELEGRAM_BOT_TOKEN || null;
export const webhookSecret = (env: Record<string, string | undefined> = process.env) =>
  env.TELEGRAM_WEBHOOK_SECRET || null;
