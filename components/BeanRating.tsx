import { type BeanState, formatRating, MAX_RATING, ratingBeans } from "@/lib/rating";

/*
  Оценка зёрнами вместо звёзд. Контур зерна и трещина — как в components/Bean.tsx.
  Целое зерно залито цветом текста, половинка залита слева, пустое — только контур.
  Трещина на залитой части рисуется цветом фона секции (var(--color-cinnamon)), на пустой — цветом текста.
*/

const CREASE_TOP = "M100 22C81 61 90.5 100.5 100 140"; // верхняя половина трещины лежит в левой половине зерна
const CREASE_BOTTOM = "M100 140C109.5 179.5 119 219 100 258"; // нижняя — в правой

function RatingBean({ state }: { state: BeanState }) {
  const bg = "var(--color-cinnamon)";
  return (
    <svg viewBox="0 0 200 280" className="h-8 w-auto" aria-hidden="true">
      {state === "full" && <ellipse cx="100" cy="140" rx="78" ry="118" fill="currentColor" />}
      {state === "half" && <path d="M100 22A78 118 0 0 0 100 258Z" fill="currentColor" />}
      <ellipse cx="100" cy="140" rx="78" ry="118" fill="none" stroke="currentColor" strokeWidth="14" />
      <path
        d={CREASE_TOP}
        fill="none"
        stroke={state === "empty" ? "currentColor" : bg}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={CREASE_BOTTOM}
        fill="none"
        stroke={state === "full" ? bg : "currentColor"}
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function BeanRating({
  value,
  label = "Наша оценка",
  className = "",
}: {
  value: number;
  label?: string;
  className?: string;
}) {
  const text = formatRating(value);
  return (
    <div
      role="img"
      aria-label={`${label}: ${text} из ${MAX_RATING}`}
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}
    >
      <span className="flex items-center gap-1.5" aria-hidden="true">
        {ratingBeans(value).map((state, i) => (
          <RatingBean key={i} state={state} />
        ))}
      </span>
      <span className="font-display text-2xl font-semibold leading-none" aria-hidden="true">
        {text}
      </span>
      <span className="text-base font-medium" aria-hidden="true">
        {label}
      </span>
    </div>
  );
}
