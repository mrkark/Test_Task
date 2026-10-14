/**
 * Белорусские мобильные номера: +375 (XX) XXX-XX-XX, коды операторов 25, 29, 33, 44.
 * Один и тот же код используется в форме (маска, подсказки) и на сервере (проверка и нормализация).
 */

export const BY_MOBILE_CODES = ["25", "29", "33", "44"] as const;

/**
 * Достаёт из введённой строки до 9 цифр национальной части номера.
 * Понимает «+375 (29) 123-45-67», «80291234567», «375291234567» и «291234567».
 */
export function nationalDigits(input: string): string {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("375")) {
    d = d.slice(3);
  } else if (d.length >= 10 && d.startsWith("80")) {
    // внутренний формат с «8 0»: 8 029 123-45-67. Срезаем, только когда номер уже введён целиком,
    // иначе пришлось бы гадать по первой цифре, пока человек печатает.
    d = d.slice(2);
  }
  return d.slice(0, 9);
}

/** Маска для поля ввода: +375 (29) 123-45-67 */
export function formatPhone(national: string): string {
  const n = national.slice(0, 9);
  if (!n) return "";
  let out = `+375 (${n.slice(0, 2)}`;
  if (n.length >= 2) out += ") ";
  if (n.length > 2) out += n.slice(2, 5);
  if (n.length > 5) out += `-${n.slice(5, 7)}`;
  if (n.length > 7) out += `-${n.slice(7, 9)}`;
  return out;
}

export type PhoneCheck = { ok: true; e164: string; national: string } | { ok: false; message: string };

export function validatePhone(input: string): PhoneCheck {
  const n = nationalDigits(input);

  if (n.length === 0) {
    return { ok: false, message: "Укажите телефон, чтобы менеджер мог перезвонить." };
  }
  if (n.length < 9) {
    return {
      ok: false,
      message: `Номер неполный: после +375 нужно 9 цифр, сейчас ${n.length}.`,
    };
  }
  const code = n.slice(0, 2);
  if (!(BY_MOBILE_CODES as readonly string[]).includes(code)) {
    return {
      ok: false,
      message: "Это не белорусский мобильный. Коды операторов: 25, 29, 33 и 44.",
    };
  }
  return { ok: true, e164: `+375${n}`, national: n };
}
