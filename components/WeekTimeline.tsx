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

/** «Ритм недели»: четыре этапа, текущий день по Минску подсвечивается после гидрации. */
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
            className={`relative border-t-2 pb-8 pt-4 md:pb-0 ${active ? "border-accent" : "border-ink"}`}
          >
            <p className="flex items-center gap-3 font-mono text-sm">
              <span className="font-medium">{step.days}</span>
              {active && (
                <span className="bg-accent px-1.5 py-0.5 text-[10px] uppercase tracking-[0.08em] text-paper">
                  сегодня
                </span>
              )}
            </p>
            <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight">
              {step.title}
            </h3>
            <p className="mt-2 text-[0.95rem] leading-snug text-muted">{step.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
