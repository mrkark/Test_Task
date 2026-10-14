import React from "react";

export function Hero() {
  return (
    <section className="relative border-b border-craft-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        {/* Top metadata stamp */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs text-craft-muted mb-6 tracking-wider uppercase">
          <span className="px-2.5 py-1 bg-craft-surface border border-craft-border text-craft-dark">
            Минская микрообжарка
          </span>
          <span className="text-craft-sand">/</span>
          <span>Партии по 5 кг</span>
          <span className="text-craft-sand">/</span>
          <span>Основана в 2019 г.</span>
        </div>

        {/* Asymmetrical grid: Main Typography statement vs Roasting badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-craft-dark leading-[1.08] mb-6">
              Свежесть — это когда зерно у вас дома на{" "}
              <span className="italic font-normal text-craft-accent underline decoration-1 underline-offset-8">
                1–3 день
              </span>{" "}
              после обжарки.
            </h1>

            <p className="font-body text-lg sm:text-xl text-craft-muted leading-relaxed max-w-2xl mb-8">
              Мы — Аня и Дмитрий. Раньше работали бариста в Минске, а с 2019 года
              сами выбираем зелёное зерно и жарим его небольшими партиями по 5 кг.
              Жарим строго по четвергам, развозим по пятницам. Без долгого хранения
              на складах и без компромиссов со вкусом.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-mono tracking-wider uppercase bg-craft-accent text-craft-bg hover:bg-craft-accent-hover transition-colors shadow-craft active:translate-x-0.5 active:translate-y-0.5"
              >
                Выбрать кофе из четверговой обжарки →
              </a>
              <a
                href="#subscription"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-mono tracking-wider uppercase bg-craft-surface text-craft-dark border border-craft-border hover:border-craft-dark transition-colors"
              >
                Подписка на 2 пачки в месяц
              </a>
            </div>
          </div>

          {/* Right sidebar: Studio Specs Card (Editorial technical sheet) */}
          <div className="lg:col-span-4 bg-craft-surface border border-craft-border p-6 sm:p-7">
            <div className="font-mono text-xs uppercase text-craft-muted pb-3 border-b border-craft-border flex justify-between items-center">
              <span>Карточка мастерской</span>
              <span className="text-craft-accent">● LIVE</span>
            </div>

            <div className="space-y-4 py-4 text-xs font-mono text-craft-dark">
              <div className="flex justify-between items-baseline border-b border-craft-border/60 pb-2">
                <span className="text-craft-muted">День обжарки:</span>
                <span className="font-bold">Каждый четверг</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-craft-border/60 pb-2">
                <span className="text-craft-muted">День доставки:</span>
                <span className="font-bold">Каждая пятница</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-craft-border/60 pb-2">
                <span className="text-craft-muted">Объём партии:</span>
                <span className="font-bold">5 кг (ручной контроль)</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-craft-border/60 pb-2">
                <span className="text-craft-muted">Самовывоз:</span>
                <span className="font-bold">Минск, ул. Короля, 9</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-craft-muted">Бесплатная доставка:</span>
                <span className="font-bold text-craft-accent">от 50 BYN</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-craft-border bg-craft-bg/70 p-3 text-xs leading-relaxed text-craft-muted">
              <span className="font-bold text-craft-dark">Честный факт:</span> мы
              никогда не продаём кофе старше 14 дней. Если пачка осталась — мы
              списываем её на кофе брейки и дегустации.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
