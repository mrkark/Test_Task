import assert from "node:assert/strict";
import { test } from "node:test";
import { formatRating, normalizeRating, ratingBeans } from "../lib/rating.ts";

test("целая оценка: заполненные зёрна, остальные пустые", () => {
  assert.deepEqual(ratingBeans(4), ["full", "full", "full", "full", "empty"]);
  assert.deepEqual(ratingBeans(5), ["full", "full", "full", "full", "full"]);
  assert.deepEqual(ratingBeans(0), ["empty", "empty", "empty", "empty", "empty"]);
});

test("половинка идёт сразу после целых зёрен", () => {
  assert.deepEqual(ratingBeans(4.5), ["full", "full", "full", "full", "half"]);
  assert.deepEqual(ratingBeans(0.5), ["half", "empty", "empty", "empty", "empty"]);
  assert.deepEqual(ratingBeans(2.5), ["full", "full", "half", "empty", "empty"]);
});

test("всегда пять зёрен", () => {
  for (const v of [0, 0.5, 1, 3.5, 5, 99, -3, NaN]) assert.equal(ratingBeans(v).length, 5, String(v));
});

test("округление до половины, границы 0…5, мусор — ноль", () => {
  assert.equal(normalizeRating(4.3), 4.5);
  assert.equal(normalizeRating(4.2), 4);
  assert.equal(normalizeRating(7), 5);
  assert.equal(normalizeRating(-1), 0);
  assert.equal(normalizeRating(NaN), 0);
  assert.equal(normalizeRating(Infinity), 0);
});

test("число по-русски: запятая, без лишнего «,0»", () => {
  assert.equal(formatRating(4.5), "4,5");
  assert.equal(formatRating(4), "4");
  assert.equal(formatRating(4.2), "4");
});
