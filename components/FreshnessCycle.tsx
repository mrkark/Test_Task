import React from "react";

export function FreshnessCycle() {
  const weekDays = [
    {
      day: "ПН",
      title: "Сбор зерна",
      desc: "Отбор мешков зелёного зерна свежего урожая",
      highlight: false,
    },
    {
      day: "ВТ",
      title: "Калибровка",
      desc: "Тестовые каппинги и проверка влажности зерна",
      highlight: false,
    },
    {
      day: "СР",
      title: "Стоп заказов",
      desc: "Формируем партии на обжарочную смену недели",
      highlight: false,
    },
    {
      day: "ЧТ",
      title: "ДЕНЬ ОБЖАРКИ",
      desc: "Жарим батчами по 5 кг на Короля, 9 с 08:00 до 20:00",
      highlight: true,
      tag: "Печь работает",
      color: "bg-craft-accent text-craft-bg",
    },
    {
      day: "ПТ",
      title: "ДЕНЬ ДОСТАВКИ",
      desc: "Курьер развозит свежие пачки прямо к вашей двери",
      highlight: true,
      tag: "Доставка Минск",
      color: "bg-craft-dark text-craft-bg",
    },
    {
      day: "СБ",
      title: "Самовывоз",
      desc: "Мастерская открыта 10:00–18:00 для гостей и кофе",
      highlight: false,
    },
    {
      day: "ВС",
      title: "Дегустации",
      desc: "Каппинг новых экспериментальных лотов",
      highlight: false,
    },
  ];

  return (
    <section id="freshness" className="py-16 sm:py-24 border-b border-craft-border bg-craft-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-craft-border">
          <div>
            <div className="font-mono text-xs text-craft-muted uppercase tracking-widest mb-2">
              [01] Философия продукта
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-craft-dark">
              Почему именно 1–3 дня после обжарки?
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-body text-craft-muted max-w-md text-sm sm:text-base">
            Кофе — это скоропортящийся гастрономический продукт. Масла и эфирные
            соединения испаряются через 3–4 недели.
          </p>
        </div>

        {/* Weekly Timeline Visualizer */}
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-wider text-craft-muted mb-4 flex items-center gap-2">
            <span>Ритм недели мастерской «Кварта»</span>
            <span className="h-[1px] flex-1 bg-craft-border" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {weekDays.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 border transition-all ${
                  item.highlight
                    ? "border-craft-dark bg-craft-surface shadow-craft-sm"
                    : "border-craft-border bg-craft-bg/50 hover:bg-craft-surface/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-sm font-bold px-2 py-0.5 ${
                      item.color || "bg-craft-subtle text-craft-dark"
                    }`}
                  >
                    {item.day}
                  </span>
                  {item.tag && (
                    <span className="font-mono text-[9px] uppercase tracking-tighter text-craft-accent font-semibold">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="font-heading font-bold text-base text-craft-dark mb-1">
                  {item.title}
                </div>
                <p className="text-xs text-craft-muted leading-relaxed font-body">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Honest Comparison Table: Commercial shelf vs Kvarta batch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-craft-border p-6 bg-craft-surface/40">
            <div className="font-mono text-xs uppercase tracking-wider text-craft-muted mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stone-400" />
              <span>Кофе из супермаркета</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-craft-dark mb-3">
              Обжарен 4–9 месяцев назад
            </h3>
            <ul className="space-y-2.5 text-sm text-craft-muted font-body">
              <li className="flex items-start gap-2">
                <span className="text-craft-dark font-mono">—</span>
                <span>Эфирные масла окислились, оставив плоский горький привкус.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-craft-dark font-mono">—</span>
                <span>Усредненная темная обжарка, скрывающая дефекты старого зерна.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-craft-dark font-mono">—</span>
                <span>Месяцы на складах дистрибьюторов при перепадах температур.</span>
              </li>
            </ul>
          </div>

          <div className="border-2 border-craft-dark p-6 bg-craft-surface relative shadow-craft">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-craft-accent text-craft-bg font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 font-bold">
              Стандарт «Кварты»
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-craft-accent mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-craft-accent" />
              <span>Обжарка «Кварта»</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-craft-dark mb-3">
              1–3 день после обжарочной печи
            </h3>
            <ul className="space-y-2.5 text-sm text-craft-dark font-body">
              <li className="flex items-start gap-2">
                <span className="text-craft-accent font-bold font-mono">+</span>
                <span>Живой букет: отчетливые ноты бергамота, красного яблока, ореха.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-craft-accent font-bold font-mono">+</span>
                <span>Партии строго по 5 кг: обжарщик видит каждое зерно.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-craft-accent font-bold font-mono">+</span>
                <span>Прямая доставка в Минске без посредников и складов.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
