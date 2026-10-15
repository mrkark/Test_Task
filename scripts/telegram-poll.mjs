// Локальный запуск без публичного адреса: node --env-file=.env.local --import ./tests/register.mjs scripts/telegram-poll.mjs
import { handleUpdate } from "../lib/bot.ts";
import { allowedChats } from "../lib/bot-config.ts";
import { getChat, setChat } from "../lib/bot-store.ts";
import { listLeads } from "../lib/storage.ts";
import { telegramApi } from "../lib/telegram-api.ts";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("Нужен TELEGRAM_BOT_TOKEN.");
  process.exit(1);
}
const base = `https://api.telegram.org/bot${token}`;
await fetch(`${base}/deleteWebhook`, { method: "POST" });

const deps = { allowed: allowedChats(), getChat, setChat, listLeads, api: telegramApi(token), now: () => new Date() };
console.log("Бот слушает. Ctrl+C — выйти.");

let offset = 0;
for (;;) {
  try {
    const res = await fetch(`${base}/getUpdates?timeout=30&offset=${offset}`);
    const { result = [] } = await res.json();
    for (const u of result) {
      offset = u.update_id + 1;
      await handleUpdate(u, deps).catch((e) => console.error("ошибка:", e.message));
    }
  } catch (e) {
    console.error("сеть:", e.message);
    await new Promise((r) => setTimeout(r, 3000));
  }
}
