/**
 * Ритм недели «Кварты»: заявки пн–ср → обжарка в четверг → доставка в пятницу → самовывоз сб–вс.
 * Считаем по дате в Минске (Europe/Minsk), а не по часовому поясу посетителя.
 */

export type WeekStep = 0 | 1 | 2 | 3;

export type WeekStatus = {
  /** индекс текущего этапа: 0 — приём заявок, 1 — обжарка, 2 — доставка, 3 — самовывоз */
  step: WeekStep;
  /** для новой заявки: до какого дня принимаем, когда обжарка и когда доставка */
  deadline: string;
  roast: string;
  delivery: string;
  note: string;
};

const DAY_MS = 86_400_000;
const THURSDAY = 4;

/** Дата в Минске как UTC-полночь: getUTCDay() и т.п. дают день недели по Минску. */
function minskDate(now: Date): Date {
  const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Minsk",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

const dateFormat = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "UTC",
  weekday: "short",
  day: "numeric",
  month: "long",
});

export function getWeekStatus(now: Date): WeekStatus {
  const today = minskDate(now);
  const dow = today.getUTCDay(); // 0 — вс … 6 — сб

  // Следующая обжарка — ближайший четверг строго после сегодняшнего дня,
  // если сегодня четверг, то партия уже жарится, новые заявки уходят в следующую.
  const daysToThursday = (THURSDAY - dow + 7) % 7 || 7;
  const roast = new Date(today.getTime() + daysToThursday * DAY_MS);
  const delivery = new Date(roast.getTime() + DAY_MS);
  const deadline = new Date(roast.getTime() - DAY_MS);

  let step: WeekStep;
  let note: string;
  if (dow >= 1 && dow <= 3) {
    step = 0;
    note = "Сейчас принимаем заявки на ближайшую обжарку: оставьте заявку, и мы перезвоним.";
  } else if (dow === 4) {
    step = 1;
    note = "Сегодня жарим партию. Новые заявки поедут со следующей обжаркой.";
  } else if (dow === 5) {
    step = 2;
    note = "Сегодня развозим свежую обжарку по Минску. Новые заявки — на следующую партию.";
  } else {
    step = 3;
    note = "Сегодня зерно можно забрать на Короля, 9. Заявки принимаем, поедут со следующей обжаркой.";
  }

  return {
    step,
    deadline: dateFormat.format(deadline),
    roast: dateFormat.format(roast),
    delivery: dateFormat.format(delivery),
    note,
  };
}
