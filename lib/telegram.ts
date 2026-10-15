import { activeRecipients } from "./bot";
import { allowedChats } from "./bot-config";
import { heading } from "./bot-text";
import { getChat } from "./bot-store";
import { formatPhone, nationalDigits } from "./phone";
import type { Lead } from "./types";

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function sourceLine(lead: Lead): string {
  const a = lead.attribution;
  const utm = [a.utm_source, a.utm_medium].filter(Boolean).join(" / ");
  if (utm) return utm;
  if (a.yclid) return "Яндекс (yclid)";
  if (a.fbclid) return "Meta / Instagram (fbclid)";
  if (a.gclid) return "Google (gclid)";
  return "прямой заход или метки не переданы";
}

export function formatLead(lead: Lead): string {
  const a = lead.attribution;
  const row = (label: string, value?: string) =>
    value ? `${label}: ${escapeHtml(value)}` : null;

  const lines = [
    heading("Новая заявка"),
    "",
    row("Имя", lead.name),
    `Телефон: ${escapeHtml(formatPhone(nationalDigits(lead.phone)))}`,
    row("Что интересует", lead.interestLabel),
    row("Комментарий", lead.comment),
    "",
    "<b>Откуда пришёл</b>",
    row("Источник", sourceLine(lead)),
    row("Кампания", a.utm_campaign),
    row("Объявление", a.utm_content),
    row("Запрос", a.utm_term),
    row("Реферер", a.referrer),
    row("Страница входа", a.landing_page),
  ];

  return lines.filter((l): l is string => l !== null).join("\n");
}

/**
 * Шлёт заявку в чаты команды, у которых уведомления не на паузе (/stop в боте).
 * Без TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID тихо пропускает.
 * Никогда не бросает исключений: заявка уже сохранена, сбой уведомления не должен её ломать.
 */
export async function notifyTelegram(lead: Lead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = [...allowedChats()];
  if (!token || chats.length === 0) {
    console.info("[telegram] пропущено: не заданы TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID");
    return;
  }

  const recipients = await activeRecipients(chats, getChat);
  const text = formatLead(lead);

  await Promise.all(
    recipients.map(async (chatId) => {
      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
          signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) console.error("[telegram] ответ", res.status, (await res.text()).slice(0, 200));
      } catch (err) {
        console.error("[telegram] не удалось отправить", err instanceof Error ? err.message : err);
      }
    }),
  );
}
