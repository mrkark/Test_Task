import assert from "node:assert/strict";
import { test } from "node:test";
import { getWeekStatus } from "../lib/week.ts";

// 2026-10-14 — среда по Минску.
test("среда: идёт приём заявок, обжарка — в ближайший четверг", () => {
  const s = getWeekStatus(new Date("2026-10-14T09:00:00Z"));
  assert.equal(s.step, 0);
  assert.equal(s.roast, "чт, 15 октября");
  assert.equal(s.delivery, "пт, 16 октября");
  assert.equal(s.deadline, "ср, 14 октября");
});

test("четверг: партию уже жарим, новые заявки уходят на следующую неделю", () => {
  const s = getWeekStatus(new Date("2026-10-15T09:00:00Z"));
  assert.equal(s.step, 1);
  assert.equal(s.roast, "чт, 22 октября");
});

test("пятница: доставка", () => {
  const s = getWeekStatus(new Date("2026-10-16T09:00:00Z"));
  assert.equal(s.step, 2);
  assert.equal(s.roast, "чт, 22 октября");
});

test("суббота и воскресенье: самовывоз", () => {
  assert.equal(getWeekStatus(new Date("2026-10-17T09:00:00Z")).step, 3);
  assert.equal(getWeekStatus(new Date("2026-10-18T09:00:00Z")).step, 3);
});

test("понедельник: приём заявок", () => {
  const s = getWeekStatus(new Date("2026-10-19T09:00:00Z"));
  assert.equal(s.step, 0);
  assert.equal(s.roast, "чт, 22 октября");
});

test("дата считается по Минску, а не по UTC: 23:30 UTC в среду — уже четверг в Минске", () => {
  const s = getWeekStatus(new Date("2026-10-14T23:30:00Z"));
  assert.equal(s.step, 1);
});
