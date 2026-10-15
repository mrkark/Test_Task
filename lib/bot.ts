import {
  alreadyStoppedText,
  formatStats,
  stopText,
  unauthorizedText,
  unknownText,
  welcomeText,
  type WelcomeKind,
} from "./bot-text";
import { computeStats, isPeriod, PERIODS, type Period, type StatLead } from "./stats";

/*
  Логика бота без привязки к сети: всё внешнее (Telegram, хранилище, время) приходит через `deps`.
  Поэтому её можно проверить тестами без токена и без интернета.

  Команды:
    /start    включить уведомления о новых заявках (при первом запуске — приветствие);
    /stop     поставить уведомления на паузу; заявки на сайте продолжают сохраняться;
    /restart  начать заново: период статистики и уведомления возвращаются к значениям по умолчанию;
    /stats    сколько заявок и когда (кнопками переключаются период: 7 дней, 4 недели, всё время).

  Доступ: только чаты из списка разрешённых. Бот видит имена и телефоны клиентов, поэтому чужим
  он отвечает отказом и номером их чата (чтобы администратор мог добавить его в список).
*/

export type ChatState = { active: boolean; period: Period; updatedAt: string };

export type Markup = { inline_keyboard: { text: string; callback_data: string }[][] };

export type BotApi = {
  sendMessage(chatId: string, text: string, markup?: Markup): Promise<void>;
  editMessageText(chatId: string, messageId: number, text: string, markup?: Markup): Promise<void>;
  answerCallbackQuery(id: string, text?: string): Promise<void>;
};

export type BotDeps = {
  allowed: ReadonlySet<string>;
  getChat(chatId: string): Promise<ChatState | null>;
  setChat(chatId: string, state: ChatState): Promise<void>;
  listLeads(): Promise<StatLead[]>;
  api: BotApi;
  now(): Date;
};

export type TgUpdate = {
  update_id?: number;
  message?: { message_id: number; chat: { id: number | string }; text?: string };
  callback_query?: {
    id: string;
    data?: string;
    message?: { message_id: number; chat: { id: number | string } };
  };
};

export const defaultState = (now: Date): ChatState => ({
  active: true,
  period: "week",
  updatedAt: now.toISOString(),
});

const BUTTON_TITLES: Record<Period, string> = { week: "7 дней", month: "4 недели", all: "Всё время" };

function pauseButton(state: ChatState) {
  return state.active
    ? { text: "Пауза", callback_data: "bot:stop" }
    : { text: "Включить", callback_data: "bot:start" };
}

export function startKeyboard(state: ChatState): Markup {
  return { inline_keyboard: [[{ text: "Статистика", callback_data: "bot:stats" }, pauseButton(state)]] };
}

export function statsKeyboard(state: ChatState): Markup {
  return {
    inline_keyboard: [
      PERIODS.map((p) => ({
        text: `${p === state.period ? "● " : ""}${BUTTON_TITLES[p]}`,
        callback_data: `stats:${p}`,
      })),
      [{ text: "Обновить", callback_data: `stats:${state.period}` }, pauseButton(state)],
    ],
  };
}

/** «/stats@KvartaBot» → «stats». Пустая строка, если это не команда. */
export function parseCommand(text: string): string {
  const first = text.trim().split(/\s+/)[0] ?? "";
  return first.startsWith("/") ? first.slice(1).split("@")[0].toLowerCase() : "";
}

/** Чаты, которым надо слать уведомления: разрешённые и не на паузе. Сбой хранилища не должен терять заявку. */
export async function activeRecipients(
  allowed: Iterable<string>,
  getChat: (chatId: string) => Promise<ChatState | null>,
): Promise<string[]> {
  const out: string[] = [];
  for (const id of allowed) {
    try {
      const state = await getChat(id);
      if (!state || state.active) out.push(id);
    } catch {
      out.push(id);
    }
  }
  return out;
}

async function statsView(state: ChatState, deps: BotDeps) {
  const stats = computeStats(await deps.listLeads(), state.period, deps.now());
  return { text: formatStats(stats, deps.now()), markup: statsKeyboard(state) };
}

async function doStart(chatId: string, existing: ChatState | null, deps: BotDeps) {
  const now = deps.now();
  const next: ChatState = { ...(existing ?? defaultState(now)), active: true, updatedAt: now.toISOString() };
  await deps.setChat(chatId, next);
  const kind: WelcomeKind = !existing ? "start" : existing.active ? "already" : "resumed";
  await deps.api.sendMessage(chatId, welcomeText(kind), startKeyboard(next));
}

async function doStop(chatId: string, existing: ChatState | null, deps: BotDeps) {
  if (existing && !existing.active) {
    await deps.api.sendMessage(chatId, alreadyStoppedText(), startKeyboard(existing));
    return;
  }
  const next: ChatState = { ...(existing ?? defaultState(deps.now())), active: false, updatedAt: deps.now().toISOString() };
  await deps.setChat(chatId, next);
  await deps.api.sendMessage(chatId, stopText(), startKeyboard(next));
}

async function doRestart(chatId: string, deps: BotDeps) {
  const next = defaultState(deps.now());
  await deps.setChat(chatId, next);
  await deps.api.sendMessage(chatId, welcomeText("restart"), startKeyboard(next));
}

async function doStats(chatId: string, state: ChatState, deps: BotDeps) {
  const { text, markup } = await statsView(state, deps);
  await deps.api.sendMessage(chatId, text, markup);
}

async function handleCallback(cb: NonNullable<TgUpdate["callback_query"]>, deps: BotDeps) {
  let answered = false;
  const answer = async (text?: string) => {
    if (answered) return;
    answered = true;
    await deps.api.answerCallbackQuery(cb.id, text);
  };

  try {
    const chatId = cb.message ? String(cb.message.chat.id) : null;
    if (!chatId || !deps.allowed.has(chatId)) return await answer("Нет доступа");

    const existing = await deps.getChat(chatId);
    const state = existing ?? defaultState(deps.now());
    const data = cb.data ?? "";

    if (data.startsWith("stats:")) {
      const period = data.slice("stats:".length);
      if (!isPeriod(period) || !cb.message) return await answer();
      const next: ChatState = { ...state, period, updatedAt: deps.now().toISOString() };
      await deps.setChat(chatId, next);
      const { text, markup } = await statsView(next, deps);
      await deps.api.editMessageText(chatId, cb.message.message_id, text, markup);
    } else if (data === "bot:stats") {
      await doStats(chatId, state, deps);
    } else if (data === "bot:stop") {
      await doStop(chatId, existing, deps);
    } else if (data === "bot:start") {
      await doStart(chatId, existing, deps);
    }
  } finally {
    // всегда снимаем «часики» с кнопки, даже если что-то пошло не так
    await answer().catch(() => undefined);
  }
}

export async function handleUpdate(update: TgUpdate, deps: BotDeps): Promise<void> {
  if (update.callback_query) return handleCallback(update.callback_query, deps);

  const msg = update.message;
  if (!msg?.text) return;

  const chatId = String(msg.chat.id);
  const command = parseCommand(msg.text);

  if (!deps.allowed.has(chatId)) {
    // Чужим отвечаем только на команды, обычный текст игнорируем (в группах бот не должен шуметь).
    if (command) await deps.api.sendMessage(chatId, unauthorizedText(chatId));
    return;
  }
  if (!command) return;

  const existing = await deps.getChat(chatId);

  switch (command) {
    case "start":
      return doStart(chatId, existing, deps);
    case "stop":
      return doStop(chatId, existing, deps);
    case "restart":
      return doRestart(chatId, deps);
    case "stats":
      return doStats(chatId, existing ?? defaultState(deps.now()), deps);
    default:
      return deps.api.sendMessage(chatId, unknownText());
  }
}
