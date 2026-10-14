import { LeadRecord } from "./types";

/**
 * Sends a new lead notification to Telegram bot
 */
export async function sendTelegramNotification(lead: LeadRecord): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("[Telegram] Notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.");
    return false;
  }

  const utmInfo = [
    lead.utm_source ? `• <b>Источник:</b> ${escapeHtml(lead.utm_source)}` : null,
    lead.utm_medium ? `• <b>Канал:</b> ${escapeHtml(lead.utm_medium)}` : null,
    lead.utm_campaign ? `• <b>Кампания:</b> ${escapeHtml(lead.utm_campaign)}` : null,
    lead.utm_content ? `• <b>Объявление:</b> ${escapeHtml(lead.utm_content)}` : null,
    lead.referrer ? `• <b>Реферер:</b> ${escapeHtml(lead.referrer)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const message = `
☕ <b>НОВАЯ ЗАЯВКА С САЙТА «КВАРТА»</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Имя:</b> ${escapeHtml(lead.name)}
📞 <b>Телефон:</b> <code>${escapeHtml(lead.phone)}</code>
🎯 <b>Интересует:</b> ${escapeHtml(lead.interest)}
${lead.comment ? `💬 <b>Комментарий:</b> ${escapeHtml(lead.comment)}\n` : ""}
🕒 <b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}
${utmInfo ? `\n📊 <b>Рекламные метки:</b>\n${utmInfo}` : ""}
━━━━━━━━━━━━━━━━━━━━
`.trim();

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Telegram] API error:", res.status, errText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[Telegram] Failed to send message:", error);
    return false;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
