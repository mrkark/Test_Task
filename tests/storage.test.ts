import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { formatLead } from "../lib/telegram.ts";

const dir = await mkdtemp(path.join(os.tmpdir(), "kvarta-"));
process.env.LEADS_FILE = path.join(dir, "leads.json");
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.KV_REST_API_URL;

const { saveLead } = await import("../lib/storage.ts");

const lead = (phone: string, over: Record<string, unknown> = {}) => ({
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  name: "Аня",
  phone,
  interest: "subscription" as const,
  interestLabel: "Подписка",
  comment: "",
  attribution: {},
  ...over,
});

test("двойное нажатие: два одновременных запроса с одним номером дают одну заявку", async () => {
  const [a, b] = await Promise.all([saveLead(lead("+375291111111")), saveLead(lead("+375291111111"))]);
  assert.deepEqual([a, b].sort(), ["created", "duplicate"]);
  const lines = (await readFile(process.env.LEADS_FILE!, "utf8")).trim().split("\n");
  assert.equal(lines.filter((l) => l.includes("+375291111111")).length, 1);
});

test("повтор через секунду — тоже дубль", async () => {
  assert.equal(await saveLead(lead("+375292222222")), "created");
  assert.equal(await saveLead(lead("+375292222222")), "duplicate");
});

test("другой номер — новая заявка", async () => {
  assert.equal(await saveLead(lead("+375293333333")), "created");
  assert.equal(await saveLead(lead("+375444444444")), "created");
});

test("повтор после 10 минут разрешён (память + файл состарены)", async () => {
  const old = new Date(Date.now() - 11 * 60 * 1000).toISOString();
  assert.equal(await saveLead(lead("+375335555555", { createdAt: old })), "created");
  // В памяти метка свежая, поэтому проверяем только файл: перезапуск сервера = новый процесс.
  const { spawnSync } = await import("node:child_process");
  const script = `
    const { saveLead } = await import(${JSON.stringify(new URL("../lib/storage.ts", import.meta.url).href)});
    const r = await saveLead(${JSON.stringify(lead("+375335555555"))});
    console.log(r);
  `;
  const out = spawnSync(process.execPath, ["--import", new URL("./register.mjs", import.meta.url).href, "--input-type=module", "-e", script], {
    env: process.env,
    encoding: "utf8",
  });
  assert.equal(out.stdout.trim(), "created", out.stderr);
});

test("после перезапуска свежая заявка с тем же номером всё ещё дубль (читаем файл)", async () => {
  await saveLead(lead("+375296666666"));
  const { spawnSync } = await import("node:child_process");
  const script = `
    const { saveLead } = await import(${JSON.stringify(new URL("../lib/storage.ts", import.meta.url).href)});
    console.log(await saveLead(${JSON.stringify(lead("+375296666666"))}));
  `;
  const out = spawnSync(process.execPath, ["--import", new URL("./register.mjs", import.meta.url).href, "--input-type=module", "-e", script], {
    env: process.env,
    encoding: "utf8",
  });
  assert.equal(out.stdout.trim(), "duplicate", out.stderr);
});

test("Telegram: сообщение содержит метки и экранирует HTML", () => {
  const text = formatLead(
    lead("+375291234567", {
      name: "<b>Аня</b>",
      comment: "помол & адрес",
      attribution: {
        utm_source: "instagram",
        utm_medium: "cpc",
        utm_campaign: "oktyabr",
        utm_content: "ad-3",
        landing_page: "/?utm_source=instagram",
      },
    }),
  );
  assert.match(text, /&lt;b&gt;Аня&lt;\/b&gt;/);
  assert.match(text, /помол &amp; адрес/);
  assert.match(text, /Источник: instagram \/ cpc/);
  assert.match(text, /Объявление: ad-3/);
  assert.match(text, /\+375 \(29\) 123-45-67/);
});

test("Telegram: без меток — понятная пометка, пустые строки не выводятся", () => {
  const text = formatLead(lead("+375291234567"));
  assert.match(text, /прямой заход/);
  assert.doesNotMatch(text, /Кампания/);
});
