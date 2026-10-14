"use client";

import React, { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-craft-bg/95 backdrop-blur-none border-b border-craft-border transition-colors">
      {/* Top micro-announcement bar */}
      <div className="bg-craft-dark text-craft-bg px-4 py-1.5 text-xs font-mono flex flex-wrap justify-between items-center tracking-tight">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-craft-accent animate-pulse" />
          <span>МИНСК · УЛ. КОРОЛЯ, 9</span>
          <span className="hidden sm:inline text-craft-muted">|</span>
          <span className="hidden sm:inline">ОБЖАРКА КАЖДЫЙ ЧЕТВЕРГ</span>
        </div>
        <div className="text-craft-sand hidden md:block">
          ДОСТАВКА В ПЯТНИЦУ · ОТ 50 BYN БЕСПЛАТНО
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#" className="flex items-baseline gap-2 group">
          <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-craft-dark group-hover:text-craft-accent transition-colors">
            КВАРТА
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-craft-muted tracking-widest uppercase">
            / обжарка кофе
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-craft-dark">
          <a
            href="#freshness"
            className="hover:text-craft-accent transition-colors"
          >
            Почему свежесть
          </a>
          <a
            href="#story"
            className="hover:text-craft-accent transition-colors"
          >
            О мастерской
          </a>
          <a
            href="#catalog"
            className="hover:text-craft-accent transition-colors"
          >
            Ассортимент
          </a>
          <a
            href="#subscription"
            className="hover:text-craft-accent transition-colors"
          >
            Подписка
          </a>
          <a
            href="#delivery"
            className="hover:text-craft-accent transition-colors"
          >
            Доставка
          </a>
        </nav>

        {/* CTA and Mobile trigger */}
        <div className="flex items-center gap-3">
          <a
            href="#order"
            className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-mono tracking-wider uppercase text-craft-bg bg-craft-dark hover:bg-craft-accent border border-craft-dark transition-all duration-150 active:translate-y-0.5"
          >
            Заказать свежий кофе
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-craft-dark border border-craft-border hover:bg-craft-surface"
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
        <div className="md:hidden border-t border-craft-border bg-craft-bg px-4 py-6 space-y-4 font-mono text-sm">
          <a
            href="#freshness"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-craft-border/60 hover:text-craft-accent"
          >
            [01] ПОЧЕМУ СВЕЖЕСТЬ
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-craft-border/60 hover:text-craft-accent"
          >
            [02] О МАСТЕРСКОЙ
          </a>
          <a
            href="#catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-craft-border/60 hover:text-craft-accent"
          >
            [03] АССОРТИМЕНТ И ЦЕНЫ
          </a>
          <a
            href="#subscription"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-craft-border/60 hover:text-craft-accent"
          >
            [04] ПОДПИСКА НА МЕСЯЦ
          </a>
          <a
            href="#delivery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-craft-border/60 hover:text-craft-accent"
          >
            [05] ДОСТАВКА И САМОВЫВОЗ
          </a>
          <div className="pt-2 text-xs text-craft-muted">
            Самовывоз: Минск, ул. Короля, 9
            <br />
            Пн–Пт 8:00–20:00, Сб–Вс 10:00–18:00
          </div>
        </div>
      )}
    </header>
  );
}
