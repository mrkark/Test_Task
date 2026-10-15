const DAYS = Array.from({ length: 15 }, (_, i) => i);
const FRESH = [1, 2, 3]; // дни после обжарки, когда зерно оказывается у клиента

/** Линейка «дни после обжарки»: 0 — четверг, 1–3 — зерно уже у вас. Только вёрстка, без картинок. */
export default function FreshRuler({ className = "" }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
        role="img"
        aria-label="Шкала дней после обжарки от 0 до 14. Зерно приезжает к вам на 1–3 день."
      >
        <p
          className="pb-2 font-display text-lg font-medium uppercase tracking-[0.04em] text-amber"
          style={{ gridColumn: "2 / 16", gridRow: 1 }}
        >
          Зерно у вас на кухне
        </p>
        <div
          className="h-2.5 border-x-2 border-t-2 border-amber"
          style={{ gridColumn: "2 / 5", gridRow: 2 }}
          aria-hidden="true"
        />
        {DAYS.map((d) => {
          const hot = d === 0 || FRESH.includes(d);
          return (
            <div key={d} style={{ gridColumn: d + 1, gridRow: 3 }} aria-hidden="true">
              <div className={`border-l-2 ${hot ? "h-6 border-chaff" : "h-3.5 border-chaff-soft/60"}`} />
              <span
                className={`block pl-1 pt-1 font-display text-sm sm:text-base ${hot ? "text-chaff" : "text-chaff-soft"}`}
              >
                {d}
              </span>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-4 max-w-[60ch] text-[0.95rem] text-chaff-soft">
        Дни после обжарки. День 0 — четверг, мы жарим. День 1 — пятница, везём. К третьему дню зерно
        уже у вас, на пике вкуса.
      </figcaption>
    </figure>
  );
}
