"use client";

import { useEffect, useState } from "react";
import { getWeekStatus, type WeekStatus } from "@/lib/week";

/**
 * Бирка с датами следующей партии, как бумажная бирка на мешке. Даты считаются в браузере
 * после гидрации, чтобы статичный HTML не устаревал в кэше. До этого показываем нейтральный
 * текст той же высоты, без прыжков вёрстки.
 */
export default function WeekStatusPlate() {
  const [s, setS] = useState<WeekStatus | null>(null);

  useEffect(() => {
    setS(getWeekStatus(new Date()));
  }, []);

  const rows: [string, string][] = [
    ["Заявки до", s?.deadline ?? "среды"],
    ["Обжарка", s?.roast ?? "каждый четверг"],
    ["Доставка", s?.delivery ?? "каждую пятницу"],
  ];

  return (
    <div className="max-w-[34rem] border-2 border-ink bg-chaff p-5 text-ink shadow-[4px_4px_0_0_var(--color-amber)] md:p-6">
      <p className="font-display text-xl font-semibold uppercase tracking-[0.04em]">Следующая партия</p>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-ink-soft">{label}</dt>
            <dd className="font-display text-lg font-medium tracking-[0.02em]">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 min-h-[3.4rem] border-t-2 border-ink pt-3 leading-snug">
        {s?.note ?? "Принимаем заявки с понедельника по среду, жарим в четверг, развозим в пятницу."}
      </p>
    </div>
  );
}
