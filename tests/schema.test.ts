import assert from "node:assert/strict";
import { test } from "node:test";
import { leadSchema } from "../lib/lead-schema.ts";

const base = { name: "Аня", phone: "+375 (29) 123-45-67", interest: "subscription", comment: "" };

test("валидная заявка проходит, комментарий по умолчанию пустой", () => {
  const r = leadSchema.safeParse({ name: "Аня", phone: "+375291234567", interest: "ethiopia" });
  assert.equal(r.success, true);
  if (r.success) assert.equal(r.data.comment, "");
});

test("имя обрезается по краям и не короче 2 символов", () => {
  assert.equal(leadSchema.safeParse({ ...base, name: " А " }).success, false);
  const ok = leadSchema.safeParse({ ...base, name: "  Дмитрий  " });
  assert.equal(ok.success && ok.data.name, "Дмитрий");
});

test("неизвестный интерес отклоняется с понятным текстом", () => {
  const r = leadSchema.safeParse({ ...base, interest: "tea" });
  assert.equal(r.success, false);
  if (!r.success) assert.equal(r.error.issues[0].message, "Выберите, что вас интересует.");
});

test("пустые UTM-значения превращаются в undefined", () => {
  const r = leadSchema.safeParse({ ...base, attribution: { utm_source: "  ", utm_medium: "cpc" } });
  assert.equal(r.success, true);
  if (r.success) {
    assert.equal(r.data.attribution?.utm_source, undefined);
    assert.equal(r.data.attribution?.utm_medium, "cpc");
  }
});

test("слишком длинные значения отклоняются", () => {
  assert.equal(leadSchema.safeParse({ ...base, comment: "а".repeat(501) }).success, false);
  assert.equal(leadSchema.safeParse({ ...base, attribution: { utm_source: "x".repeat(201) } }).success, false);
});

test("лишние поля не ломают разбор, но не попадают в результат", () => {
  const r = leadSchema.safeParse({ ...base, isAdmin: true });
  assert.equal(r.success, true);
  if (r.success) assert.equal("isAdmin" in r.data, false);
});
