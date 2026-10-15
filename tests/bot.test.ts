import assert from "node:assert/strict";
import test from "node:test";
import { activeRecipients, handleUpdate, parseCommand, type BotDeps, type ChatState } from "../lib/bot.ts";

function setup(allowed = ["100"], leads: { createdAt: string; interest: string }[] = []) {
  const chats = new Map<string, ChatState>();
  const sent: { chatId: string; text: string; markup?: unknown }[] = [];
  const edits: { messageId: number; text: string }[] = [];
  const answers: { id: string; text?: string }[] = [];
  const deps: BotDeps = {
    allowed: new Set(allowed),
    getChat: async (id) => chats.get(id) ?? null,
    setChat: async (id, s) => void chats.set(id, s),
    listLeads: async () => leads,
    api: {
      sendMessage: async (chatId, text, markup) => void sent.push({ chatId, text, markup }),
      editMessageText: async (_c, messageId, text) => void edits.push({ messageId, text }),
      answerCallbackQuery: async (id, text) => void answers.push({ id, text }),
    },
    now: () => new Date("2026-10-15T09:00:00Z"),
  };
  const say = (text: string, chat = 100) => handleUpdate({ message: { message_id: 1, chat: { id: chat }, text } }, deps);
  const press = (data: string, chat = 100) =>
    handleUpdate({ callback_query: { id: "cb1", data, message: { message_id: 7, chat: { id: chat } } } }, deps);
  return { chats, sent, edits, answers, say, press };
}

test("parseCommand: суффикс бота и регистр", () => {
  assert.equal(parseCommand("/Stats@KvartaBot  week"), "stats");
  assert.equal(parseCommand("привет"), "");
});

test("/start: приветствие и включённые уведомления; повтор не ломает", async () => {
  const t = setup();
  await t.say("/start");
  assert.equal(t.chats.get("100")?.active, true);
  assert.match(t.sent[0].text, /КВАРТА: ЗАЯВКИ С САЙТА/);
  await t.say("/start");
  assert.match(t.sent[1].text, /уже включены/);
});

test("/stop ставит на паузу, /start возвращает, повторный /stop не меняет", async () => {
  const t = setup();
  await t.say("/stop");
  assert.equal(t.chats.get("100")?.active, false);
  await t.say("/stop");
  assert.match(t.sent[1].text, /уже выключены/);
  await t.say("/start");
  assert.equal(t.chats.get("100")?.active, true);
  assert.match(t.sent[2].text, /снова включены/);
});

test("/restart сбрасывает период и включает уведомления", async () => {
  const t = setup();
  await t.press("stats:all");
  await t.say("/stop");
  await t.say("/restart");
  assert.deepEqual({ a: t.chats.get("100")?.active, p: t.chats.get("100")?.period }, { a: true, p: "week" });
});

test("/stats показывает цифры и кнопки периодов; кнопка меняет период и правит сообщение", async () => {
  const t = setup(["100"], [{ createdAt: "2026-10-15T08:00:00Z", interest: "subscription" }]);
  await t.say("/stats");
  assert.match(t.sent[0].text, /Всего: <b>1<\/b> заявка/);
  await t.press("stats:month");
  assert.equal(t.chats.get("100")?.period, "month");
  assert.equal(t.edits[0].messageId, 7);
  assert.match(t.edits[0].text, /4 НЕДЕЛИ/);
  assert.equal(t.answers.length, 1, "на кнопку отвечаем ровно один раз");
});

test("чужой чат: на команду — отказ с номером чата, на текст — тишина, кнопки не работают", async () => {
  const t = setup(["100"]);
  await t.say("/stats", 999);
  assert.match(t.sent[0].text, /<code>999<\/code>/);
  assert.doesNotMatch(t.sent[0].text, /Всего/);
  await t.say("привет", 999);
  assert.equal(t.sent.length, 1);
  await t.press("stats:all", 999);
  assert.equal(t.edits.length, 0);
  assert.equal(t.answers[0].text, "Нет доступа");
  assert.equal(t.chats.size, 0, "чужой чат ничего не записал");
});

test("неизвестная команда и поддельный период безобидны", async () => {
  const t = setup();
  await t.say("/dance");
  assert.match(t.sent[0].text, /Не понял/);
  await t.press("stats:evil");
  assert.equal(t.edits.length, 0);
});

test("получатели уведомлений: пауза исключает чат, сбой хранилища заявку не теряет", async () => {
  const state = (active: boolean): ChatState => ({ active, period: "week", updatedAt: "" });
  const r = await activeRecipients(["1", "2", "3"], async (id) => {
    if (id === "1") return state(false);
    if (id === "2") throw new Error("redis down");
    return null;
  });
  assert.deepEqual(r, ["2", "3"]);
});
