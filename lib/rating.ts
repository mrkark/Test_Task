export type BeanState = "full" | "half" | "empty";

export const MAX_RATING = 5;

/** Приводит оценку к шагу в ползерна и в пределах 0…max. Нечисловое значение считается нулём. */
export function normalizeRating(value: number, max = MAX_RATING): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(max, Math.max(0, Math.round(value * 2) / 2));
}

/** Раскладывает оценку на пять зёрен: целое, половинка или пустое. 4,5 → 4 целых и половинка. */
export function ratingBeans(value: number, max = MAX_RATING): BeanState[] {
  const v = normalizeRating(value, max);
  return Array.from({ length: max }, (_, i) => (v >= i + 1 ? "full" : v >= i + 0.5 ? "half" : "empty"));
}

/** Число по-русски: 4,5 и 4 (без «4,0»). */
export function formatRating(value: number, max = MAX_RATING): string {
  return String(normalizeRating(value, max)).replace(".", ",");
}
