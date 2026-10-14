"use client";

import { useEffect, useState } from "react";
import { getWeekStatus, type WeekStatus } from "@/lib/week";

/**
 * Плашка «статус недели». Даты считаются в браузере после гидрации, чтобы статичный HTML
 * не устаревал в кэше. До этого показываем нейтральный текст той же высоты — без прыжков вёрстки.
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
    <div
      className="border border-ink bg-surface p-5 shadow-[2px_2px_0_0_var(--color-ink)]"
      aria-live="polite"
    >
      <p className="eyebrow">Следующая партия</p>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-mono text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-muted">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 min-h-[3.1rem] border-t pt-3 text-[0.95rem] leading-snug">
        {s?.note ?? "Принимаем заявки с понедельника по среду, жарим в четверг, развозим в пятницу."}
      </p>
    </div>
  );
}
