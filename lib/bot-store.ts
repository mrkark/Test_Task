import { promises as fs } from "node:fs";
import path from "node:path";
import type { ChatState } from "./bot";
import { leadsFile, redis, redisConfig } from "./storage";

/** Состояние чатов: Redis на Vercel (ключ на чат), файл рядом с заявками локально. */

const key = (chatId: string) => `kvarta:bot:chat:${chatId}`;
const stateFile = () => path.join(path.dirname(leadsFile()), "bot-chats.json");

const valid = (v: unknown): v is ChatState =>
  !!v &&
  typeof v === "object" &&
  typeof (v as ChatState).active === "boolean" &&
  ["week", "month", "all"].includes((v as ChatState).period);

export async function getChat(chatId: string): Promise<ChatState | null> {
  const cfg = redisConfig();
  if (cfg) {
    const raw = await redis<string | null>(cfg, ["GET", key(chatId)]);
    if (!raw) return null;
    try {
      const v = JSON.parse(raw);
      return valid(v) ? v : null;
    } catch {
      return null;
    }
  }
  const all = await readFile();
  return valid(all[chatId]) ? all[chatId] : null;
}

export async function setChat(chatId: string, state: ChatState): Promise<void> {
  const cfg = redisConfig();
  if (cfg) {
    await redis(cfg, ["SET", key(chatId), JSON.stringify(state)]);
    return;
  }
  const all = await readFile();
  all[chatId] = state;
  const file = stateFile();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(all, null, 2), "utf8");
}

async function readFile(): Promise<Record<string, ChatState>> {
  try {
    return JSON.parse(await fs.readFile(stateFile(), "utf8"));
  } catch {
    return {};
  }
}
