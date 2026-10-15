"use client";

import React from "react";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

export function Hero() {
  const scrollTo = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative border-b border-bean-border dark:border-bean-dark-border overflow-hidden bg-bean-parchment dark:bg-bean-dark-bg transition-colors z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 relative z-10">
        {/* Top metadata stamp with bean icon */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs text-bean-muted dark:text-bean-dark-muted mb-6 tracking-wider uppercase">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bean-crema dark:bg-bean-dark-card border border-bean-border dark:border-bean-dark-border text-bean-espresso dark:text-bean-dark-text">
            <CoffeeBeanIcon size={14} roast="green" />
            <span>Спешелти зерно свежего урожая</span>
          </span>
          <span className="text-bean-border dark:text-bean-dark-border">/</span>
          <span>Батчи по 5 кг</span>
          <span className="text-bean-border dark:text-bean-dark-border">/</span>
          <span>Минск, ул. Короля, 9</span>
        </div>

        {/* Asymmetrical grid: Main Typography vs Roasting Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-bean-espresso dark:text-bean-dark-text leading-[1.08] mb-6">
              Кофе, который обжарили вчера. Зерно на{" "}
              <span className="italic font-normal text-bean-crack dark:text-bean-dark-accent underline decoration-1 underline-offset-8">
                1–3 день
              </span>{" "}
              после печи.
            </h1>

            <p className="font-body text-lg sm:text-xl text-bean-muted dark:text-bean-dark-muted leading-relaxed max-w-2xl mb-8">
              Мы — Аня и Дмитрий. Раньше мы работали бариста, а с 2019 года
              обжариваем кофе небольшими партиями по 5 кг в Минске. Мы не держим
              складов: обжариваем зерно строго по четвергам и развозим по пятницам,
              пока эфирные масла сохраняют свой пиковый аромат.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo("#catalog")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-mono tracking-wider uppercase bg-bean-crack text-bean-parchment hover:bg-bean-crack-hover dark:bg-bean-dark-accent dark:hover:bg-bean-crack transition-colors shadow-craft active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <CoffeeBeanIcon size={16} roast="light" />
                <span>Выбрать свежее зерно →</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("#roast-simulator")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-mono tracking-wider uppercase bg-bean-crema dark:bg-bean-dark-card text-bean-espresso dark:text-bean-dark-text border border-bean-border dark:border-bean-dark-border hover:border-bean-espresso dark:hover:border-bean-dark-accent transition-colors cursor-pointer"
              >
                <span>Анатомия обжарки 5 кг</span>
              </button>
            </div>
          </div>

          {/* Right sidebar: Roasting Batch Live Card */}
          <div className="lg:col-span-4 bg-bean-crema dark:bg-bean-dark-surface border-2 border-bean-espresso dark:border-bean-dark-border p-6 sm:p-7 shadow-craft dark:shadow-craft-dark">
            <div className="font-mono text-xs uppercase text-bean-muted dark:text-bean-dark-muted pb-3 border-b border-bean-border dark:border-bean-dark-border flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <CoffeeBeanIcon size={14} roast="medium" />
                <span>Партия недели</span>
              </span>
              <span className="text-bean-crack dark:text-bean-dark-accent font-bold animate-pulse">● В ОБРАБОТКЕ</span>
            </div>

            <div className="space-y-4 py-4 text-xs font-mono text-bean-espresso dark:text-bean-dark-text">
              <div className="flex justify-between items-baseline border-b border-bean-border/60 dark:border-bean-dark-border/60 pb-2">
                <span className="text-bean-muted dark:text-bean-dark-muted">Объем ростера:</span>
                <span className="font-bold">5 кг (барабанный тип)</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-bean-border/60 dark:border-bean-dark-border/60 pb-2">
                <span className="text-bean-muted dark:text-bean-dark-muted">День обжарки:</span>
                <span className="font-bold">Каждый четверг</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-bean-border/60 dark:border-bean-dark-border/60 pb-2">
                <span className="text-bean-muted dark:text-bean-dark-muted">День доставки:</span>
                <span className="font-bold">Каждая пятница</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-bean-border/60 dark:border-bean-dark-border/60 pb-2">
                <span className="text-bean-muted dark:text-bean-dark-muted">Контроль крэка:</span>
                <span className="font-bold text-bean-crack dark:text-bean-dark-accent">Ручной на слух</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-bean-muted dark:text-bean-dark-muted">Доставка по Минску:</span>
                <span className="font-bold text-bean-crack dark:text-bean-dark-accent">от 50 BYN бесплатно</span>
              </div>
            </div>

            {/* Micro Bean Anatomy Indicator */}
            <div className="mt-4 pt-4 border-t border-bean-border dark:border-bean-dark-border bg-bean-parchment dark:bg-bean-dark-card p-3 text-xs leading-relaxed text-bean-muted dark:text-bean-dark-muted flex items-start gap-2.5">
              <CoffeeBeanIcon size={20} roast="crack" className="shrink-0 mt-0.5" />
              <div>
                <strong className="text-bean-espresso dark:text-bean-dark-text">Правило «Кварты»:</strong>{" "}
                мы пакуем зерно в пачки с трехслойным клапаном дегазации прямо в день обжарки.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
