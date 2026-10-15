"use client";

import { useEffect, useState } from "react";
import { getWeekStatus, type WeekStep } from "@/lib/week";

const STEPS: { days: string; title: string; text: string }[] = [
  {
    days: "Пн–Ср",
    title: "Принимаем заявки",
    text: "Вы оставляете заявку, менеджер перезванивает и всё оформляет.",
  },
  {
    days: "Чт",
    title: "Жарим партию",
    text: "Обжариваем по 5 кг, без запаса на склад.",
  },
  {
    days: "Пт",
    title: "Развозим по Минску",
    text: "Курьер привозит зерно до двери. От 50 BYN доставка бесплатная.",
  },
  {
    days: "Сб–Вс",
    title: "Самовывоз",
    text: "Заходите на Короля, 9: с 10:00 до 18:00. В будни мы открыты с 8:00 до 20:00.",
  },
];

/** «Ритм недели»: четыре этапа по порядку (это настоящая последовательность, поэтому нумерация уместна). */
export default function WeekTimeline() {
  const [today, setToday] = useState<WeekStep | null>(null);

  useEffect(() => {
    setToday(getWeekStatus(new Date()).step);
  }, []);

  return (
    <ol className="grid gap-0 md:grid-cols-4 md:gap-x-6">
      {STEPS.map((step, i) => {
        const active = today === i;
        return (
          <li
            key={step.days}
            aria-current={active ? "step" : undefined}
            className={`border-t-4 pb-8 pt-4 md:pb-0 ${active ? "border-amber" : "border-chaff-soft/50"}`}
          >
            <p className="flex items-center gap-3 font-display text-xl font-medium">
              <span>
                {i + 1}. {step.days}
              </span>
              {active && (
                <span className="bg-amber px-2 py-0.5 text-sm font-semibold uppercase tracking-[0.06em] text-ink">
                  сегодня
                </span>
              )}
            </p>
            <h3 className="h-stamp mt-3 text-[1.7rem]">{step.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-snug text-chaff-soft">{step.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
