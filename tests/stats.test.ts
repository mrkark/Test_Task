import assert from "node:assert/strict";
import test from "node:test";
import { computeStats } from "../lib/stats.ts";
import { formatStats, plural } from "../lib/bot-text.ts";

// 15 окт 2026, 12:00 по Минску (UTC+3)
const NOW = new Date("2026-10-15T09:00:00Z");
const at = (iso: string, interest = "subscription") => ({ createdAt: iso, interest });

test("склонение: 1 заявка, 2 заявки, 5 заявок, 11 заявок, 21 заявка", () => {
  const f = (n: number) => plural(n, "заявка", "заявки", "заявок");
  assert.deepEqual([1, 2, 5, 11, 12, 21, 22, 25].map(f), ["заявка", "заявки", "заявок", "заявок", "заявок", "заявка", "заявки", "заявок"]);
});

test("день считается по Минску: 23:30 по UTC уже следующий день", () => {
  // 14 окт 21:30 UTC = 15 окт 00:30 Минск → «сегодня»
  const s = computeStats([at("2026-10-14T21:30:00Z")], "week", NOW);
  assert.equal(s.today, 1);
  assert.equal(s.yesterday, 0);
});

test("неделя: семь корзин, последняя — сегодня, заявки вне окна не считаются", () => {
  const s = computeStats(
    [at("2026-10-15T08:00:00Z"), at("2026-10-15T07:00:00Z"), at("2026-10-12T08:00:00Z"), at("2026-10-01T08:00:00Z")],
    "week",
    NOW,
  );
  assert.equal(s.buckets.length, 7);
  assert.equal(s.total, 3);
  assert.equal(s.buckets[6].count, 2);
  assert.equal(s.buckets[6].label, "чт 15.10");
  assert.equal(s.best?.count, 2);
  assert.equal(s.perDay, 3 / 7);
});

test("4 недели: четыре корзины по семь дней", () => {
  const s = computeStats([at("2026-10-15T08:00:00Z"), at("2026-09-20T08:00:00Z"), at("2026-09-10T08:00:00Z")], "month", NOW);
  assert.equal(s.buckets.length, 4);
  assert.equal(s.total, 2);
  assert.equal(s.buckets[3].count, 1);
});

test("всё время: помесячно, с месяца первой заявки; счёт по всем заявкам", () => {
  const s = computeStats([at("2026-08-03T08:00:00Z"), at("2026-10-15T08:00:00Z")], "all", NOW);
  assert.deepEqual(s.buckets.map((b) => [b.label, b.count]), [["авг 2026", 1], ["сен 2026", 0], ["окт 2026", 1]]);
  assert.equal(s.total, 2);
});

test("пустая статистика не падает и пишет понятный текст", () => {
  const s = computeStats([], "all", NOW);
  assert.equal(s.total, 0);
  assert.equal(s.best, null);
  assert.match(formatStats(s, NOW), /заявок не было/);
});

test("битые даты пропускаются, неизвестный интерес выводится как есть", () => {
  const s = computeStats([at("не дата"), at("2026-10-15T08:00:00Z", "mystery")], "week", NOW);
  assert.equal(s.total, 1);
  assert.equal(s.byInterest[0].label, "mystery");
});

test("текст статистики: заголовок прописными, линейка обжарки, экранирование, моноширинная таблица", () => {
  const s = computeStats([at("2026-10-15T08:00:00Z", "<x>"), at("2026-10-14T08:00:00Z")], "week", NOW);
  const t = formatStats(s, NOW);
  assert.match(t, /^<b>ЗАЯВКИ: 7 ДНЕЙ<\/b>\n🟢🟡🟠🟤⚫/);
  assert.match(t, /Всего: <b>2<\/b> заявки/);
  assert.match(t, /&lt;x&gt;/);
  assert.match(t, /<pre>[\s\S]+<\/pre>/);
  assert.match(t, /Обновлено 15 окт, 12:00/);
});
