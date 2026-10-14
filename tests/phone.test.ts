import assert from "node:assert/strict";
import { test } from "node:test";
import { formatPhone, nationalDigits, validatePhone } from "../lib/phone.ts";

const GOOD = [
  "+375 (29) 123-45-67",
  "+375291234567",
  "375291234567",
  "80291234567",
  "8 029 123-45-67",
  "291234567",
  " +375 (44) 765-43-21 ",
  "+375 25 111 22 33",
  "+375 33 111-22-33",
];

for (const raw of GOOD) {
  test(`принимает: ${raw}`, () => {
    const r = validatePhone(raw);
    assert.equal(r.ok, true, JSON.stringify(r));
  });
}

test("нормализует разные записи в один E.164", () => {
  const set = new Set(
    ["+375 (29) 123-45-67", "80291234567", "291234567", "375291234567"].map((s) => {
      const r = validatePhone(s);
      return r.ok ? r.e164 : "ERR";
    }),
  );
  assert.deepEqual([...set], ["+375291234567"]);
});

test("отклоняет неполный номер и подсказывает, сколько цифр", () => {
  const r = validatePhone("+375 (29) 123-45");
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.message, /9 цифр, сейчас 7/);
});

test("отклоняет чужие коды: российский, городской Минска, 26", () => {
  for (const raw of ["+7 912 345-67-89", "+375 17 123-45-67", "+375 (26) 123-45-67", "+375 (28) 123-45-67"]) {
    assert.equal(validatePhone(raw).ok, false, raw);
  }
});

test("пустая строка и мусор", () => {
  assert.equal(validatePhone("").ok, false);
  assert.equal(validatePhone("абв").ok, false);
});

test("лишние цифры отбрасываются, а не превращаются в другой номер", () => {
  const r = validatePhone("+375291234567999");
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.e164, "+375291234567");
});

test("маска при наборе", () => {
  assert.equal(formatPhone(""), "");
  assert.equal(formatPhone("2"), "+375 (2");
  assert.equal(formatPhone("29"), "+375 (29) ");
  assert.equal(formatPhone("291"), "+375 (29) 1");
  assert.equal(formatPhone("2912345"), "+375 (29) 123-45");
  assert.equal(formatPhone("291234567"), "+375 (29) 123-45-67");
});

test("маска, пропущенная через nationalDigits, возвращает те же цифры", () => {
  for (const n of ["2", "29", "291", "29123", "2912345", "29123456", "291234567"]) {
    assert.equal(nationalDigits(formatPhone(n)), n);
  }
});
