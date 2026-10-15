import React from "react";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

export function FreshnessCycle() {
  const weekDays = [
    {
      day: "ПН",
      title: "Сбор зерна",
      desc: "Отбор мешков зелёного зерна свежего урожая",
      highlight: false,
      roast: "green" as const,
    },
    {
      day: "ВТ",
      title: "Калибровка",
      desc: "Тестовые каппинги и замер плотности зерна",
      highlight: false,
      roast: "drying" as const,
    },
    {
      day: "СР",
      title: "Стоп заказов",
      desc: "Формируем 5-кг партии на обжарочную смену",
      highlight: false,
      roast: "light" as const,
    },
    {
      day: "ЧТ",
      title: "ДЕНЬ ОБЖАРКИ",
      desc: "Жарим батчами по 5 кг на Короля, 9 с 08:00 до 20:00",
      highlight: true,
      tag: "Ростер в работе",
      color: "bg-bean-crack text-bean-parchment",
      roast: "crack" as const,
    },
    {
      day: "ПТ",
      title: "ДЕНЬ ДОСТАВКИ",
      desc: "Курьер развозит зерно прямо к вашей двери (1-й день!)",
      highlight: true,
      tag: "Минск курьер",
      color: "bg-bean-espresso text-bean-parchment",
      roast: "dark" as const,
    },
    {
      day: "СБ",
      title: "Самовывоз",
      desc: "Мастерская открыта 10:00–18:00 для гостей и кофе",
      highlight: false,
      roast: "medium" as const,
    },
    {
      day: "ВС",
      title: "Дегустации",
      desc: "Каппинг экспериментальных микро-лотов",
      highlight: false,
      roast: "green" as const,
    },
  ];

  return (
    <section id="freshness" className="py-16 sm:py-24 border-b border-bean-border bg-bean-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-bean-border">
          <div>
            <div className="font-mono text-xs text-bean-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <CoffeeBeanIcon size={14} roast="light" />
              <span>[02] Дегазация и свежесть зерна</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-bean-espresso">
              Почему именно 1–3 день после печи?
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-body text-bean-muted max-w-md text-sm sm:text-base">
            В момент обжарки внутри структуры зерна запечатываются сотни ароматических соединений. Они начинают выдыхаться уже на 20-й день.
          </p>
        </div>

        {/* Weekly Timeline Visualizer */}
        <div className="mb-16">
          <div className="font-mono text-xs uppercase tracking-wider text-bean-muted mb-4 flex items-center gap-2">
            <span>Цикл обжарки недели в «Кварте»</span>
            <span className="h-[1px] flex-1 bg-bean-border" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {weekDays.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 border transition-all ${
                  item.highlight
                    ? "border-bean-espresso bg-bean-crema shadow-craft-sm"
                    : "border-bean-border bg-bean-parchment hover:bg-bean-crema/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-sm font-bold px-2 py-0.5 ${
                      item.color || "bg-bean-subtle text-bean-espresso"
                    }`}
                  >
                    {item.day}
                  </span>
                  <CoffeeBeanIcon size={16} roast={item.roast} />
                </div>
                <div className="font-heading font-bold text-base text-bean-espresso mb-1">
                  {item.title}
                </div>
                <p className="text-xs text-bean-muted leading-relaxed font-body">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison: Supermarket vs Kvarta Fresh Bean */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-bean-border p-6 bg-bean-crema/40">
            <div className="font-mono text-xs uppercase tracking-wider text-bean-muted mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stone-400" />
              <span>Зерно из супермаркета</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-bean-espresso mb-3">
              Обжарено 4–9 месяцев назад
            </h3>
            <ul className="space-y-2.5 text-sm text-bean-muted font-body">
              <li className="flex items-start gap-2">
                <span className="text-bean-espresso font-mono">—</span>
                <span>Эфирные масла в порах зерна окислились, остался лишь горький привкус древесины.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bean-espresso font-mono">—</span>
                <span>Маскирующая тёмная обжарка скрывает дефекты дешёвого коммерческого сырья.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bean-espresso font-mono">—</span>
                <span>Месяцы на складах при температурных перепадах уничтожают крема и тело напитка.</span>
              </li>
            </ul>
          </div>

          <div className="border-2 border-bean-espresso p-6 bg-bean-crema relative shadow-craft">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-bean-crack text-bean-parchment font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 font-bold">
              Стандарт свежести «Кварта»
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-bean-crack mb-3 flex items-center gap-2">
              <CoffeeBeanIcon size={14} roast="crack" />
              <span>Живое зерно «Кварта»</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-bean-espresso mb-3">
              1–3 день после обжарочного барабана
            </h3>
            <ul className="space-y-2.5 text-sm text-bean-espresso font-body">
              <li className="flex items-start gap-2">
                <span className="text-bean-crack font-bold font-mono">+</span>
                <span>Пик аромата: открытая пачка заполняет всю кухню нотами бергамота, ореха или яблока.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bean-crack font-bold font-mono">+</span>
                <span>Партии по 5 кг: обжарщик проверяет цвет и равномерность развития каждого зерна.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bean-crack font-bold font-mono">+</span>
                <span>Прямая доставка в Минске без посредников и складского простоя.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
