"use client";

import React, { useState } from "react";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-bean-parchment/95 dark:bg-bean-dark-surface/95 backdrop-blur-none border-b border-bean-border dark:border-bean-dark-border transition-colors">
      {/* Top micro-announcement bar */}
      <div className="bg-bean-espresso dark:bg-[#0B0604] text-bean-parchment dark:text-bean-dark-text px-4 py-1.5 text-xs font-mono flex flex-wrap justify-between items-center tracking-tight border-b border-stone-900/50">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-bean-crack animate-pulse" />
          <span className="whitespace-nowrap">МИНСК · УЛ. КОРОЛЯ, 9</span>
          <span className="hidden sm:inline text-bean-muted dark:text-stone-500">|</span>
          <span className="hidden sm:inline whitespace-nowrap">ОБЖАРКА ЗЕРНА КАЖДЫЙ ЧЕТВЕРГ</span>
        </div>
        <div className="text-bean-chaff hidden md:block whitespace-nowrap">
          ДОСТАВКА В ПЯТНИЦУ · ОТ 50 BYN БЕСПЛАТНО
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo (never squished) */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "body")}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <CoffeeBeanIcon size={28} roast="crack" className="group-hover:rotate-12 transition-transform" />
          <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-bean-espresso dark:text-bean-dark-text group-hover:text-bean-crack dark:group-hover:text-bean-dark-accent transition-colors whitespace-nowrap">
            КВАРТА
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-bean-muted dark:text-bean-dark-muted tracking-widest uppercase hidden sm:inline whitespace-nowrap">
            / обжарка зерна
          </span>
        </a>

        {/* Desktop Navigation Links — Strictly NO line wrapping! */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs xl:text-sm font-medium text-bean-espresso dark:text-bean-dark-text shrink-0">
          <a
            href="#roast-simulator"
            onClick={(e) => handleNavClick(e, "#roast-simulator")}
            className="hover:text-bean-crack dark:hover:text-bean-dark-accent transition-colors whitespace-nowrap flex items-center gap-1.5 py-1"
          >
            <span>Анатомия зерна</span>
            <span className="font-mono text-[9px] bg-bean-crema dark:bg-bean-dark-card px-1.5 py-0.5 border border-bean-border dark:border-bean-dark-border text-bean-crack dark:text-bean-dark-accent font-bold">
              ИНТЕРАКТИВ
            </span>
          </a>
          <a
            href="#freshness"
            onClick={(e) => handleNavClick(e, "#freshness")}
            className="hover:text-bean-crack dark:hover:text-bean-dark-accent transition-colors whitespace-nowrap py-1"
          >
            Почему свежесть
          </a>
          <a
            href="#story"
            onClick={(e) => handleNavClick(e, "#story")}
            className="hover:text-bean-crack dark:hover:text-bean-dark-accent transition-colors whitespace-nowrap py-1"
          >
            О мастерской
          </a>
          <a
            href="#catalog"
            onClick={(e) => handleNavClick(e, "#catalog")}
            className="hover:text-bean-crack dark:hover:text-bean-dark-accent transition-colors whitespace-nowrap py-1"
          >
            Ассортимент
          </a>
          <a
            href="#subscription"
            onClick={(e) => handleNavClick(e, "#subscription")}
            className="hover:text-bean-crack dark:hover:text-bean-dark-accent transition-colors whitespace-nowrap py-1"
          >
            Подписка
          </a>
          <a
            href="#delivery"
            onClick={(e) => handleNavClick(e, "#delivery")}
            className="hover:text-bean-crack dark:hover:text-bean-dark-accent transition-colors whitespace-nowrap py-1"
          >
            Доставка
          </a>
        </nav>

        {/* Actions (Theme toggle + CTA + Mobile trigger) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* CTA Button */}
          <a
            href="#order"
            onClick={(e) => handleNavClick(e, "#order")}
            className="inline-flex items-center justify-center px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-mono tracking-wider uppercase text-bean-parchment bg-bean-espresso hover:bg-bean-crack dark:bg-bean-crack dark:hover:bg-bean-crack-hover border border-bean-espresso dark:border-bean-crack transition-all duration-150 active:translate-y-0.5 shadow-craft-sm whitespace-nowrap"
          >
            <span>Заказать зерно</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-bean-espresso dark:text-bean-dark-text border border-bean-border dark:border-bean-dark-border hover:bg-bean-crema dark:hover:bg-bean-dark-card transition-colors"
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
        <div className="lg:hidden border-t border-bean-border dark:border-bean-dark-border bg-bean-parchment dark:bg-bean-dark-surface px-4 py-6 space-y-3 font-mono text-sm shadow-xl">
          <a
            href="#roast-simulator"
            onClick={(e) => handleNavClick(e, "#roast-simulator")}
            className="block py-2.5 border-b border-bean-border/60 dark:border-bean-dark-border/60 text-bean-crack dark:text-bean-dark-accent font-bold whitespace-nowrap"
          >
            [●] АНАТОМИЯ ЗЕРНА (СИМУЛЯТОР 5 КГ)
          </a>
          <a
            href="#freshness"
            onClick={(e) => handleNavClick(e, "#freshness")}
            className="block py-2.5 border-b border-bean-border/60 dark:border-bean-dark-border/60 hover:text-bean-crack dark:hover:text-bean-dark-accent text-bean-espresso dark:text-bean-dark-text whitespace-nowrap"
          >
            [01] ПОЧЕМУ СВЕЖЕСТЬ
          </a>
          <a
            href="#story"
            onClick={(e) => handleNavClick(e, "#story")}
            className="block py-2.5 border-b border-bean-border/60 dark:border-bean-dark-border/60 hover:text-bean-crack dark:hover:text-bean-dark-accent text-bean-espresso dark:text-bean-dark-text whitespace-nowrap"
          >
            [02] О МАСТЕРСКОЙ
          </a>
          <a
            href="#catalog"
            onClick={(e) => handleNavClick(e, "#catalog")}
            className="block py-2.5 border-b border-bean-border/60 dark:border-bean-dark-border/60 hover:text-bean-crack dark:hover:text-bean-dark-accent text-bean-espresso dark:text-bean-dark-text whitespace-nowrap"
          >
            [03] АССОРТИМЕНТ ЗЕРНА
          </a>
          <a
            href="#subscription"
            onClick={(e) => handleNavClick(e, "#subscription")}
            className="block py-2.5 border-b border-bean-border/60 dark:border-bean-dark-border/60 hover:text-bean-crack dark:hover:text-bean-dark-accent text-bean-espresso dark:text-bean-dark-text whitespace-nowrap"
          >
            [04] ПОДПИСКА НА МЕСЯЦ
          </a>
          <a
            href="#delivery"
            onClick={(e) => handleNavClick(e, "#delivery")}
            className="block py-2.5 border-b border-bean-border/60 dark:border-bean-dark-border/60 hover:text-bean-crack dark:hover:text-bean-dark-accent text-bean-espresso dark:text-bean-dark-text whitespace-nowrap"
          >
            [05] ДОСТАВКА И САМОВЫВОЗ
          </a>
          <div className="pt-2 text-xs text-bean-muted dark:text-bean-dark-muted">
            Самовывоз: Минск, ул. Короля, 9
            <br />
            Пн–Пт 8:00–20:00, Сб–Вс 10:00–18:00
          </div>
        </div>
      )}
    </header>
  );
}
