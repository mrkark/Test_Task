import { formatMinskStamp, PERIOD_TITLES, type Stats } from "./stats";

/*
  Оформление сообщений бота в стиле сайта.
  — Заголовок прописными, как трафаретная печать на мешке (на сайте это Oswald).
  — Под заголовком «линейка обжарки»: зелёное → жёлтое → светлая → средняя → тёмная,
    те же пять стадий и цвета, что у зерна в начале страницы.
  — Тон тёплый и простой, без восклицаний и снобизма; курсив — как подписи на сайте.
  — Столбики статистики моноширинные (<pre>), чтобы колонки ровно стояли.
*/

export const RULER = "🟢🟡🟠🟤⚫";

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const heading = (title: string) => `<b>${esc(title.toUpperCase())}</b>\n${RULER}`;

/** Склонение: 1 заявка, 2 заявки, 5 заявок. */
export function plural(n: number, one: string, few: string, many: string): string {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b === 1) return one;
  if (b >= 2 && b <= 4) return few;
  return many;
}

/** 1,7 и 2 (без «2,0»). */
const num = (n: number) => (Math.round(n * 10) / 10).toFixed(1).replace(".", ",").replace(/,0$/, "");

const COMMANDS = [
  "/stats: сколько заявок и когда",
  "/stop: поставить уведомления на паузу",
  "/restart: начать заново, настройки сбросятся",
].join("\n");

export type WelcomeKind = "start" | "already" | "resumed" | "restart";

export function welcomeText(kind: WelcomeKind): string {
  const lead = {
    start: "Привет! Я присылаю сюда заявки с сайта сразу, как их оставят.",
    already: "Уведомления уже включены, ничего менять не нужно.",
    resumed: "Уведомления снова включены. Заявки, которые пришли за паузу, видны в /stats.",
    restart: "Начинаем заново: настройки сброшены, уведомления включены.",
  }[kind];
  return `${heading("Кварта: заявки с сайта")}\n\n${lead}\n\n${COMMANDS}\n\n<i>Жарим по четвергам, развозим по пятницам.</i>`;
}

export const stopText = () =>
  `${heading("Уведомления на паузе")}\n\nЗаявки с сайта по-прежнему сохраняются, просто я не буду присылать их сюда. Посмотреть всё можно в /stats, а вернуть уведомления — командой /start.`;

export const alreadyStoppedText = () =>
  `${heading("Уведомления на паузе")}\n\nОни уже выключены. Чтобы вернуть, нажмите /start.`;

export const unauthorizedText = (chatId: string) =>
  `<b>КВАРТА</b>\n\nЭтот бот работает только для команды Кварты. Если вы из команды, передайте администратору номер этого чата: <code>${esc(chatId)}</code>.`;

export const unknownText = () => "Не понял. Доступно: /stats, /stop, /restart.";

function bar(count: number, max: number): string {
  const n = count === 0 ? 0 : Math.max(1, Math.round((count / max) * 10));
  return "█".repeat(n) + "·".repeat(10 - n);
}

export function formatStats(s: Stats, now: Date): string {
  const head = heading(`Заявки: ${PERIOD_TITLES[s.period]}`);
  const stamp = `<i>Обновлено ${esc(formatMinskStamp(now))}</i>`;

  if (s.total === 0) {
    return `${head}\n\nЗа этот период заявок не было. Как только появятся, я напишу сюда.\n\n${stamp}`;
  }

  const lines: string[] = [head, ""];
  lines.push(`Всего: <b>${s.total}</b> ${plural(s.total, "заявка", "заявки", "заявок")}`);
  lines.push(`В среднем: ${num(s.perDay)} в день`);
  lines.push(`Сегодня: ${s.today}, вчера: ${s.yesterday}`);
  if (s.best) lines.push(`Больше всего: ${esc(s.best.label)}, ${s.best.count}`);

  const max = Math.max(...s.buckets.map((b) => b.count));
  const width = Math.max(...s.buckets.map((b) => b.label.length));
  const table = s.buckets.map((b) => `${b.label.padEnd(width)}  ${bar(b.count, max)}  ${b.count}`);
  lines.push("", `<pre>${esc(table.join("\n"))}</pre>`);

  if (s.byInterest.length) {
    lines.push("<b>Что выбирали</b>");
    for (const i of s.byInterest) lines.push(`${esc(i.label)}: ${i.count}`);
    lines.push("");
  }

  if (s.recent.length) {
    lines.push("<b>Последние заявки</b>");
    for (const r of s.recent) lines.push(`${esc(r.when)}: ${esc(r.label)}`);
    lines.push("");
  }

  lines.push(stamp);
  return lines.join("\n");
}
