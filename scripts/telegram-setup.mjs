// Подключает бота к сайту: node --env-file=.env.local scripts/telegram-setup.mjs https://ваш-домен.vercel.app
// Ставит вебхук с секретом и список команд. Ничего не печатает из секретов.
const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const site = (process.argv[2] ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

if (!token || !secret || !site.startsWith("https://")) {
  console.error("Нужны TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET и https-адрес сайта аргументом.");
  process.exit(1);
}

const call = async (method, body) => {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`${method}: ${data.description}`);
};

await call("setWebhook", {
  url: `${site}/api/telegram`,
  secret_token: secret,
  allowed_updates: ["message", "callback_query"],
  drop_pending_updates: true,
});
await call("setMyCommands", {
  commands: [
    { command: "start", description: "Включить уведомления о заявках" },
    { command: "stats", description: "Сколько заявок и когда" },
    { command: "stop", description: "Поставить уведомления на паузу" },
    { command: "restart", description: "Начать заново" },
  ],
});
console.log(`Готово: вебхук ${site}/api/telegram, команды обновлены.`);
