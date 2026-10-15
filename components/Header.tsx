"use client";

import React, { useState } from "react";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bean-parchment/95 backdrop-blur-none border-b border-bean-border transition-colors">
      {/* Top micro-announcement bar */}
      <div className="bg-bean-espresso text-bean-parchment px-4 py-1.5 text-xs font-mono flex flex-wrap justify-between items-center tracking-tight">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-bean-crack animate-pulse" />
          <span>МИНСК · УЛ. КОРОЛЯ, 9</span>
          <span className="hidden sm:inline text-bean-muted">|</span>
          <span className="hidden sm:inline">ОБЖАРКА ЗЕРНА КАЖДЫЙ ЧЕТВЕРГ</span>
        </div>
        <div className="text-bean-chaff hidden md:block">
          ДОСТАВКА В ПЯТНИЦУ · ОТ 50 BYN БЕСПЛАТНО
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <CoffeeBeanIcon size={28} roast="crack" className="group-hover:rotate-12" />
          <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-bean-espresso group-hover:text-bean-crack transition-colors">
            КВАРТА
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-bean-muted tracking-widest uppercase">
            / обжарка зерна
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-bean-espresso">
          <a
            href="#roast-simulator"
            className="hover:text-bean-crack transition-colors flex items-center gap-1.5"
          >
            <span>Анатомия зерна</span>
            <span className="font-mono text-[10px] bg-bean-crema px-1.5 py-0.5 border border-bean-border text-bean-crack">
              3D
            </span>
          </a>
          <a
            href="#freshness"
            className="hover:text-bean-crack transition-colors"
          >
            Почему свежесть
          </a>
          <a
            href="#story"
            className="hover:text-bean-crack transition-colors"
          >
            О мастерской
          </a>
          <a
            href="#catalog"
            className="hover:text-bean-crack transition-colors"
          >
            Ассортимент
          </a>
          <a
            href="#subscription"
            className="hover:text-bean-crack transition-colors"
          >
            Подписка
          </a>
          <a
            href="#delivery"
            className="hover:text-bean-crack transition-colors"
          >
            Доставка
          </a>
        </nav>

        {/* CTA and Mobile trigger */}
        <div className="flex items-center gap-3">
          <a
            href="#order"
            className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-mono tracking-wider uppercase text-bean-parchment bg-bean-espresso hover:bg-bean-crack border border-bean-espresso transition-all duration-150 active:translate-y-0.5 shadow-craft-sm"
          >
            Заказать свежее зерно
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-bean-espresso border border-bean-border hover:bg-bean-crema"
            aria-label="Переключить меню"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-bean-border bg-bean-parchment px-4 py-6 space-y-4 font-mono text-sm">
          <a
            href="#roast-simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-bean-border/60 text-bean-crack font-bold"
          >
            [●] АНАТОМИЯ ЗЕРНА (СИМУЛЯТОР)
          </a>
          <a
            href="#freshness"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-bean-border/60 hover:text-bean-crack"
          >
            [01] ПОЧЕМУ СВЕЖЕСТЬ
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-bean-border/60 hover:text-bean-crack"
          >
            [02] О МАСТЕРСКОЙ
          </a>
          <a
            href="#catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-bean-border/60 hover:text-bean-crack"
          >
            [03] АССОРТИМЕНТ ЗЕРНА
          </a>
          <a
            href="#subscription"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-bean-border/60 hover:text-bean-crack"
          >
            [04] ПОДПИСКА НА МЕСЯЦ
          </a>
          <a
            href="#delivery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-bean-border/60 hover:text-bean-crack"
          >
            [05] ДОСТАВКА И САМОВЫВОЗ
          </a>
          <div className="pt-2 text-xs text-bean-muted">
            Самовывоз: Минск, ул. Короля, 9
            <br />
            Пн–Пт 8:00–20:00, Сб–Вс 10:00–18:00
          </div>
        </div>
      )}
    </header>
  );
}
