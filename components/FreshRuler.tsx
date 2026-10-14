const DAYS = Array.from({ length: 15 }, (_, i) => i);
const FRESH = [1, 2, 3]; // дни после обжарки, когда зерно оказывается у клиента

/** Линейка «дни после обжарки»: 0 — четверг, 1–3 — зерно уже у вас на кухне. Только вёрстка, без картинок. */
export default function FreshRuler({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
        role="img"
        aria-label="Шкала дней после обжарки от 0 до 14. Зерно приезжает к вам на 1–3 день."
      >
        <p
          className="pb-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-accent sm:text-xs"
          style={{ gridColumn: "2 / 16", gridRow: 1 }}
        >
          зерно у вас на кухне
        </p>
        <div
          className="h-2 border-x border-t border-accent"
          style={{ gridColumn: "2 / 4", gridRow: 2 }}
          aria-hidden="true"
        />
        {DAYS.map((d) => {
          const hot = d === 0 || FRESH.includes(d);
          return (
            <div key={d} style={{ gridColumn: d + 1, gridRow: 3 }} aria-hidden="true">
              <div className={`border-l ${hot ? "h-5 border-ink" : "h-3 border-muted"}`} />
              <span
                className={`block pl-1 pt-1 font-mono text-[10px] sm:text-xs ${hot ? "text-ink" : "text-muted"}`}
              >
                {d}
              </span>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.06em] text-muted sm:text-xs">
        Дни после обжарки · 0 — четверг, жарим · 1 — пятница, везём
      </figcaption>
    </figure>
  );
}
