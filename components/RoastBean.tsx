import { BeanPaths } from "./Bean";

/*
  Главный момент страницы. Зерно в «барабане» проходит все стадии обжарки (CSS, 14 секунд),
  на первом треске раздувается и роняет шелуху. Рядом подписаны стадии, текущая подсвечена.
  Всё на чистом CSS: ни JS, ни картинок. При prefers-reduced-motion остаётся статичное зерно.
*/

const STAGES = [
  { name: "Зелёное", note: "Так зерно приезжает к нам." },
  { name: "Сушка", note: "Зерно желтеет и пахнет сеном." },
  { name: "Первый треск", note: "Светлая обжарка: цветы и фрукты." },
  { name: "Средняя", note: "Карамель, орех, шоколад." },
  { name: "Тёмная", note: "Второй треск: горчинка и дым." },
];

// шкала по краю барабана, как на циферблате термометра: 36 делений, каждое третье длиннее
const TICKS = Array.from({ length: 36 }, (_, i) => {
  const a = (i * 10 * Math.PI) / 180;
  const r2 = 190;
  const r1 = i % 3 === 0 ? 174 : 182;
  const f = (n: number) => Math.round(n * 100) / 100;
  return {
    i,
    x1: f(200 + r1 * Math.cos(a)),
    y1: f(200 + r1 * Math.sin(a)),
    x2: f(200 + r2 * Math.cos(a)),
    y2: f(200 + r2 * Math.sin(a)),
  };
});

// кусочки шелухи вылетают из трещины зерна в разные стороны
const FLAKES = [
  { x: 192, y: 130, dx: -130, dy: -110, r: 220 },
  { x: 206, y: 160, dx: 140, dy: -90, r: -180 },
  { x: 196, y: 196, dx: -150, dy: 20, r: 160 },
  { x: 208, y: 228, dx: 150, dy: 70, r: -240 },
  { x: 194, y: 262, dx: -90, dy: 130, r: 200 },
  { x: 204, y: 112, dx: 60, dy: -150, r: -140 },
  { x: 200, y: 244, dx: 40, dy: 150, r: 260 },
];

export default function RoastBean() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 400 400"
        className="roast-svg mx-auto block w-full max-w-[420px]"
        role="img"
        aria-label="Кофейное зерно в барабане обжарочной машины: за 14 секунд оно проходит путь от зелёного до тёмного."
      >
        <circle cx="200" cy="200" r="188" fill="#475a2d" />
        <circle cx="200" cy="200" r="188" fill="none" stroke="#e4d9b8" strokeOpacity=".55" strokeWidth="2" />
        {TICKS.map((t) => (
          <line
            key={t.i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="#e4d9b8"
            strokeOpacity=".55"
            strokeWidth="2"
          />
        ))}

        <g className="roast-swell">
          <g transform="translate(200 200) rotate(-14) scale(1.08) translate(-100 -140)">
            <BeanPaths />
          </g>
        </g>

        {FLAKES.map((f, i) => (
          <path
            key={i}
            className="chaff"
            d={`M${f.x} ${f.y} q7 -5 14 0 q-7 5 -14 0z`}
            style={{ "--dx": `${f.dx}px`, "--dy": `${f.dy}px`, "--r": `${f.r}deg` } as React.CSSProperties}
          />
        ))}
      </svg>

      <figcaption className="mt-8">
        <ol className="grid gap-1.5">
          {STAGES.map((s, i) => (
            <li
              key={s.name}
              className="stage pl-4"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="font-display text-xl font-semibold uppercase tracking-[0.04em]">
                {s.name}
              </span>
              <span className="ml-3 text-[0.95rem]">{s.note}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
