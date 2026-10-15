const NAV = [
  { href: "#menu", label: "Зерно" },
  { href: "#subscription", label: "Подписка" },
  { href: "#delivery", label: "Доставка" },
];

export default function Header() {
  return (
    <header className="grain-light bg-leaf text-chaff">
      <p className="border-b border-chaff/25 px-5 py-2 text-center text-sm text-chaff-soft">
        Минск, ул. Короля, 9. Обжарка по четвергам.
      </p>

      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-5">
        <a href="#top" className="block no-underline" aria-label="Кварта — на главную">
          <span className="block font-display text-[2rem] font-bold uppercase leading-none tracking-[0.08em]">
            Кварта
          </span>
          <span className="mt-1 block text-[0.8rem] italic leading-none text-chaff-soft">
            ремесленная обжарка кофе
          </span>
        </a>

        <nav aria-label="Разделы" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-lg uppercase tracking-[0.06em] underline decoration-transparent decoration-2 underline-offset-[8px] hover:decoration-amber"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#order" className="btn btn-outline-chaff !min-h-11 !px-4 !text-base">
          Заказать
        </a>
      </div>
    </header>
  );
}
