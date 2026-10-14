import React from "react";
import { WORKSHOP_INFO } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-craft-dark text-craft-bg pt-16 pb-12 border-t border-craft-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-craft-dark/40 border-stone-800">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5">
            <a href="#" className="inline-block font-heading text-3xl font-bold tracking-tight text-craft-bg mb-3">
              КВАРТА
            </a>
            <p className="font-body text-sm text-craft-sand max-w-sm leading-relaxed mb-6">
              Маленькая независимая обжарка в центре Минска. Жарим батчами по 5 кг
              по четвергам, доставляем по пятницам. Честный кофе для дома и офиса.
            </p>
            <div className="font-mono text-xs text-stone-400">
              © {new Date().getFullYear()} Обжарка «Кварта». Все права защищены.
            </div>
          </div>

          {/* Location & Contacts */}
          <div className="md:col-span-4 font-mono text-xs space-y-3 text-stone-300">
            <div className="text-craft-accent font-bold uppercase tracking-wider mb-2">
              Мастерская и самовывоз:
            </div>
            <div>г. Минск, ул. Короля, 9</div>
            <div>Пн–Пт: {WORKSHOP_INFO.schedule.weekdays}</div>
            <div>Сб–Вс: {WORKSHOP_INFO.schedule.weekends}</div>
            <div className="pt-2">
              Прямая связь:{" "}
              <a href="https://t.me/kvarta_roastery" className="text-craft-bg underline hover:text-craft-accent">
                Telegram @kvarta_roastery
              </a>
            </div>
          </div>

          {/* Quick links & Back to top */}
          <div className="md:col-span-3 font-mono text-xs flex flex-col justify-between">
            <div className="space-y-2 text-stone-400">
              <div>
                <a href="#freshness" className="hover:text-craft-bg transition-colors">
                  → Почему свежесть
                </a>
              </div>
              <div>
                <a href="#catalog" className="hover:text-craft-bg transition-colors">
                  → Ассортимент зерна
                </a>
              </div>
              <div>
                <a href="#subscription" className="hover:text-craft-bg transition-colors">
                  → Кофейная подписка
                </a>
              </div>
              <div>
                <a href="#delivery" className="hover:text-craft-bg transition-colors">
                  → Условия доставки
                </a>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#"
                className="inline-flex items-center gap-1 text-craft-sand hover:text-craft-bg uppercase tracking-wider text-[11px]"
              >
                <span>Наверх</span>
                <span>↑</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal notice */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-stone-500">
          <div>
            ИП Ковальчук А. С. · Зарегистрирован Мингорисполкомом · УНП 193290000
          </div>
          <div>
            Сайт не использует cookie для отслеживания личных данных.
          </div>
        </div>
      </div>
    </footer>
  );
}
