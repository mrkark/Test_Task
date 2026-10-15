import { INTERESTS } from "./catalog";

/**
 * Статистика заявок для бота: сколько и когда. Всё считается по дате в Минске (Europe/Minsk),
 * как и «Ритм недели» на сайте: заявка в 23:30 по Минску относится к этому дню, а не к завтрашнему по UTC.
 */

export type Period = "week" | "month" | "all";
export const PERIODS: Period[] = ["week", "month", "all"];
export const isPeriod = (v: string): v is Period => (PERIODS as string[]).includes(v);

/** Заголовки периодов: «ЗАЯВКИ: 7 ДНЕЙ». «Месяц» — это четыре полные недели, чтобы корзины были ровными. */
export const PERIOD_TITLES: Record<Period, string> = {
  week: "7 дней",
  month: "4 недели",
  all: "всё время",
};

export type StatLead = { createdAt: string; interest: string };

export type Stats = {
  period: Period;
  total: number;
  /** среднее число заявок в день за период */
  perDay: number;
  today: number;
  yesterday: number;
  /** корзина с наибольшим числом заявок (первая из равных); null, если заявок нет */
  best: { label: string; count: number } | null;
  /** корзины периода: дни, недели или месяцы */
  buckets: { label: string; count: number }[];
  byInterest: { label: string; count: number }[];
  /** пять последних заявок за всё время, без имён и телефонов */
  recent: { when: string; label: string }[];
};

const TZ = "Europe/Minsk";
const DAY_MS = 86_400_000;
const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const WEEKDAYS = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
const pad = (n: number) => String(n).padStart(2, "0");

const partsFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export type MinskTime = { y: number; m: number; d: number; hh: number; mm: number };

export function minskTime(date: Date): MinskTime {
  const p: Record<string, string> = {};
  for (const part of partsFormat.formatToParts(date)) p[part.type] = part.value;
  return { y: +p.year, m: +p.month, d: +p.day, hh: +p.hour, mm: +p.minute };
}

/** Номер календарного дня (дни с 1970-01-01 по Минску): удобно складывать и сравнивать. */
const dayNumber = (y: number, m: number, d: number) => Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
const dayOf = (t: MinskTime) => dayNumber(t.y, t.m, t.d);
const fromDay = (n: number) => new Date(n * DAY_MS);

const dayLabel = (n: number) => {
  const d = fromDay(n);
  return `${WEEKDAYS[d.getUTCDay()]} ${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}`;
};

const rangeLabel = (a: number, b: number) => {
  const da = fromDay(a);
  const db = fromDay(b);
  return da.getUTCMonth() === db.getUTCMonth()
    ? `${da.getUTCDate()}–${db.getUTCDate()} ${MONTHS[db.getUTCMonth()]}`
    : `${da.getUTCDate()} ${MONTHS[da.getUTCMonth()]}–${db.getUTCDate()} ${MONTHS[db.getUTCMonth()]}`;
};

export const interestLabel = (id: string) => INTERESTS.find((i) => i.id === id)?.label ?? id;

/** «15 окт, 14:43» по Минску. */
export function formatMinskStamp(date: Date): string {
  const t = minskTime(date);
  return `${t.d} ${MONTHS[t.m - 1]}, ${pad(t.hh)}:${pad(t.mm)}`;
}

type Bucket = { label: string; from: number; to: number; count: number };

function makeBuckets(period: Period, today: number, firstDay: number): Bucket[] {
  if (period === "week") {
    return Array.from({ length: 7 }, (_, i) => {
      const n = today - 6 + i;
      return { label: dayLabel(n), from: n, to: n, count: 0 };
    });
  }
  if (period === "month") {
    return Array.from({ length: 4 }, (_, i) => {
      const from = today - 27 + 7 * i;
      return { label: rangeLabel(from, from + 6), from, to: from + 6, count: 0 };
    });
  }
  // all: помесячно, от месяца первой заявки до текущего, но не больше 12 последних месяцев
  const monthIndex = (n: number) => {
    const d = fromDay(n);
    return d.getUTCFullYear() * 12 + d.getUTCMonth();
  };
  const end = monthIndex(today);
  const start = Math.max(monthIndex(firstDay), end - 11);
  const out: Bucket[] = [];
  for (let mi = start; mi <= end; mi++) {
    const y = Math.floor(mi / 12);
    const m = (mi % 12) + 1;
    const from = dayNumber(y, m, 1);
    const to = dayNumber(m === 12 ? y + 1 : y, m === 12 ? 1 : m + 1, 1) - 1;
    out.push({ label: `${MONTHS[m - 1]} ${y}`, from, to, count: 0 });
  }
  return out;
}

export function computeStats(leads: StatLead[], period: Period, now: Date): Stats {
  const today = dayOf(minskTime(now));

  const items = leads.flatMap((l) => {
    const at = new Date(l.createdAt);
    return Number.isNaN(at.getTime()) ? [] : [{ at, day: dayOf(minskTime(at)), interest: l.interest }];
  });

  const firstDay = items.length ? Math.min(...items.map((i) => i.day)) : today;
  const buckets = makeBuckets(period, today, firstDay);

  const windowFrom = buckets[0].from;
  const windowTo = buckets[buckets.length - 1].to;
  // «всё время» считаем по всем заявкам, остальные периоды — только внутри окна
  const inWindow = period === "all" ? items : items.filter((i) => i.day >= windowFrom && i.day <= windowTo);

  for (const item of inWindow) {
    const b = buckets.find((x) => item.day >= x.from && item.day <= x.to);
    if (b) b.count++;
  }

  const total = inWindow.length;
  const days = period === "week" ? 7 : period === "month" ? 28 : Math.max(1, today - firstDay + 1);

  let best: Stats["best"] = null;
  for (const b of buckets) if (b.count > 0 && (!best || b.count > best.count)) best = { label: b.label, count: b.count };

  const counts = new Map<string, number>();
  for (const item of inWindow) counts.set(item.interest, (counts.get(item.interest) ?? 0) + 1);
  const byInterest = [...counts]
    .map(([id, count]) => ({ label: interestLabel(id), count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ru"));

  const recent = [...items]
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 5)
    .map((i) => ({ when: formatMinskStamp(i.at), label: interestLabel(i.interest) }));

  return {
    period,
    total,
    perDay: total / days,
    today: items.filter((i) => i.day === today).length,
    yesterday: items.filter((i) => i.day === today - 1).length,
    best,
    buckets: buckets.map(({ label, count }) => ({ label, count })),
    byInterest,
    recent,
  };
}
