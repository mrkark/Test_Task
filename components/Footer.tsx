"use client";

import React from "react";
import { WORKSHOP_INFO } from "@/lib/data";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

export function Footer() {
  const scrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-bean-espresso dark:bg-[#0B0604] text-bean-parchment pt-16 pb-12 border-t border-bean-espresso dark:border-stone-900 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800 dark:border-stone-900">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5">
            <a
              href="#"
              onClick={(e) => scrollTo(e, "top")}
              className="inline-flex items-center gap-2 font-heading text-3xl font-bold tracking-tight text-bean-parchment mb-3 group cursor-pointer"
            >
              <CoffeeBeanIcon size={26} roast="crack" className="group-hover:rotate-12 transition-transform" />
              <span>КВАРТА</span>
            </a>
            <p className="font-body text-sm text-stone-300 max-w-sm leading-relaxed mb-6">
              Маленькая независимая обжарка в центре Минска. Жарим батчами по 5 кг
              по четвергам, доставляем по пятницам. Честное спешелти-зерно без складского хранения.
            </p>
            <div className="font-mono text-xs text-stone-400 flex items-center gap-2">
              <CoffeeBeanIcon size={12} roast="light" />
              <span>© {new Date().getFullYear()} Обжарка «Кварта». Минск, ул. Короля, 9.</span>
            </div>
          </div>

          {/* Location & Contacts */}
          <div className="md:col-span-4 font-mono text-xs space-y-3 text-stone-300">
            <div className="text-bean-crack font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CoffeeBeanIcon size={12} roast="crack" />
              <span>Мастерская и самовывоз:</span>
            </div>
            <div>г. Минск, ул. Короля, 9</div>
            <div>Пн–Пт: {WORKSHOP_INFO.schedule.weekdays}</div>
            <div>Сб–Вс: {WORKSHOP_INFO.schedule.weekends}</div>
            <div className="pt-2">
              Прямая связь:{" "}
              <a href="https://t.me/kvarta_roastery" target="_blank" rel="noopener noreferrer" className="text-bean-parchment underline hover:text-bean-crack transition-colors">
                Telegram @kvarta_roastery
              </a>
            </div>
          </div>

          {/* Quick links & Back to top */}
          <div className="md:col-span-3 font-mono text-xs flex flex-col justify-between">
            <div className="space-y-2 text-stone-400">
              <div>
                <a
                  href="#roast-simulator"
                  onClick={(e) => scrollTo(e, "#roast-simulator")}
                  className="hover:text-bean-parchment transition-colors text-bean-chaff"
                >
                  → Анатомия обжарки зерна
                </a>
              </div>
              <div>
                <a
                  href="#freshness"
                  onClick={(e) => scrollTo(e, "#freshness")}
                  className="hover:text-bean-parchment transition-colors"
                >
                  → Почему важна свежесть
                </a>
              </div>
              <div>
                <a
                  href="#catalog"
                  onClick={(e) => scrollTo(e, "#catalog")}
                  className="hover:text-bean-parchment transition-colors"
                >
                  → Спешелти-зерно этой недели
                </a>
              </div>
              <div>
                <a
                  href="#subscription"
                  onClick={(e) => scrollTo(e, "#subscription")}
                  className="hover:text-bean-parchment transition-colors"
                >
                  → Кофейная подписка на месяц
                </a>
              </div>
              <div>
                <a
                  href="#delivery"
                  onClick={(e) => scrollTo(e, "#delivery")}
                  className="hover:text-bean-parchment transition-colors"
                >
                  → Доставка по пятницам
                </a>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={(e) => scrollTo(e, "top")}
                className="inline-flex items-center gap-1.5 text-stone-300 hover:text-bean-parchment uppercase tracking-wider text-[11px] cursor-pointer"
              >
                <CoffeeBeanIcon size={12} roast="light" />
                <span>Наверх к началу</span>
                <span>↑</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal notice */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-stone-500">
          <div>
            ИП Ковальчук А. С. · Зарегистрирован Мингорисполкомом · УНП 193290000
          </div>
          <div>
            Ремесленная кофейная обжарка · ул. Короля, 9, Минск, Беларусь
          </div>
        </div>
      </div>
    </footer>
  );
}
