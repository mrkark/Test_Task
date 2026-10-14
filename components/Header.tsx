const NAV = [
  { href: "#menu", label: "Зерно" },
  { href: "#subscription", label: "Подписка" },
  { href: "#delivery", label: "Доставка" },
];

export default function Header() {
  return (
    <header className="border-b">
      <div className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.06em] sm:text-xs">
          <span>Минск · ул. Короля, 9</span>
          <span className="hidden min-[420px]:inline">Обжарка по четвергам</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] items-end justify-between gap-6 px-5 py-5 md:py-6">
        <a href="#top" className="block no-underline" aria-label="Кварта — на главную">
          <span className="block font-display text-[1.9rem] font-bold leading-none tracking-tight">
            КВАРТА
          </span>
          <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            ремесленная обжарка кофе
          </span>
        </a>

        <nav aria-label="Разделы" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium underline decoration-line decoration-1 underline-offset-[6px] hover:decoration-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#order" className="btn btn-line !min-h-11 !px-4 text-sm">
          Заказать
        </a>
      </div>
    </header>
  );
}
