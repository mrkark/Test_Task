import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Lead } from "./types";

/**
 * Хранилище заявок + защита от дублей на 10 минут (по номеру телефона).
 *
 * Два режима:
 *  1. Upstash Redis по REST (есть UPSTASH_REDIS_REST_URL / KV_REST_API_URL): основной режим на Vercel.
 *     Дедупликация атомарна: `SET dedup:<телефон> NX EX 600` либо ставит ключ, либо говорит «уже есть».
 *     Даже два одновременных запроса на разных инстансах не создадут две заявки.
 *  2. Файл JSONL (без Redis): для локальной разработки. На Vercel файловая система эфемерна
 *     (/tmp живёт до остановки инстанса), поэтому там это режим «лишь бы не потерять при проверке».
 */

export const DEDUP_WINDOW_SEC = 600;
export type SaveResult = "created" | "duplicate";

const LEADS_KEY = "kvarta:leads";
const dedupKey = (phone: string) => `kvarta:dedup:${phone}`;

export function redisConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

export async function redis<T = unknown>(
  cfg: { url: string; token: string },
  command: (string | number)[],
): Promise<T> {
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`Upstash HTTP ${res.status}`);
  const data = (await res.json()) as { result?: T; error?: string };
  if (data.error) throw new Error(`Upstash: ${data.error}`);
  return data.result as T;
}

async function saveToRedis(cfg: { url: string; token: string }, lead: Lead): Promise<SaveResult> {
  const key = dedupKey(lead.phone);
  const claimed = await redis<string | null>(cfg, ["SET", key, lead.id, "NX", "EX", DEDUP_WINDOW_SEC]);
  if (claimed !== "OK") return "duplicate";

  try {
    await redis(cfg, ["LPUSH", LEADS_KEY, JSON.stringify(lead)]);
  } catch (err) {
    // Заявку не сохранили: снимаем метку, чтобы повторная отправка не считалась дублем потерянной заявки.
    await redis(cfg, ["DEL", key]).catch(() => undefined);
    throw err;
  }
  return "created";
}

// --- файловый режим -------------------------------------------------------

/** телефон → время последней заявки (мс). Живёт в памяти инстанса и закрывает двойной клик. */
const recent = new Map<string, number>();

export function leadsFile(): string {
  if (process.env.LEADS_FILE) return process.env.LEADS_FILE;
  const dir = process.env.VERCEL ? os.tmpdir() : path.join(process.cwd(), ".data");
  return path.join(dir, "leads.jsonl");
}

async function saveToFile(lead: Lead): Promise<SaveResult> {
  const windowMs = DEDUP_WINDOW_SEC * 1000;
  const now = Date.now();

  for (const [phone, at] of recent) {
    if (now - at > windowMs) recent.delete(phone);
  }
  // Проверка и пометка идут синхронно, до первого await: две одновременные заявки
  // с одним номером не успеют обе пройти проверку.
  if (recent.has(lead.phone)) return "duplicate";
  recent.set(lead.phone, now);

  try {
    const file = leadsFile();
    await fs.mkdir(path.dirname(file), { recursive: true });

    // Переживаем перезапуск сервера: смотрим на хвост файла.
    const text = await fs.readFile(file, "utf8").catch(() => "");
    for (const line of text.split("\n").slice(-200)) {
      if (!line) continue;
      try {
        const saved = JSON.parse(line) as Lead;
        if (saved.phone === lead.phone && now - Date.parse(saved.createdAt) < windowMs) {
          return "duplicate";
        }
      } catch {
        /* битую строку пропускаем */
      }
    }

    await fs.appendFile(file, JSON.stringify(lead) + "\n", "utf8");
    return "created";
  } catch (err) {
    recent.delete(lead.phone);
    throw err;
  }
}

export async function saveLead(lead: Lead): Promise<SaveResult> {
  const cfg = redisConfig();
  if (cfg) return saveToRedis(cfg, lead);

  if (process.env.VERCEL) {
    console.warn(
      "[storage] Redis не настроен: заявки пишутся во временный файл и пропадут при остановке инстанса. Подключите Upstash Redis.",
    );
  }
  return saveToFile(lead);
}

/**
 * Все заявки, новые первыми. Нужны боту для статистики. Из Redis берём не больше 5000 последних,
 * этого хватает на годы работы микро-обжарочной, а ответ остаётся небольшим.
 */
export async function listLeads(): Promise<Lead[]> {
  const cfg = redisConfig();
  const lines: string[] = cfg
    ? await redis<string[]>(cfg, ["LRANGE", LEADS_KEY, 0, 4999])
    : (await fs.readFile(leadsFile(), "utf8").catch(() => "")).split("\n").reverse();

  const out: Lead[] = [];
  for (const line of lines) {
    if (!line) continue;
    try {
      out.push(JSON.parse(line) as Lead);
    } catch {
      /* битую строку пропускаем */
    }
  }
  return out;
}
