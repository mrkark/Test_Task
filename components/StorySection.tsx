import React from "react";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

export function StorySection() {
  return (
    <section id="story" className="py-16 sm:py-24 border-b border-bean-border dark:border-bean-dark-border bg-bean-crema/30 dark:bg-bean-dark-surface/30 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Editorial Frame: Founders & Roaster Specs */}
          <div className="lg:col-span-5">
            <div className="border-2 border-bean-espresso dark:border-bean-dark-border bg-bean-crema dark:bg-bean-dark-card p-6 sm:p-8 relative shadow-craft dark:shadow-craft-dark">
              <div className="font-mono text-xs text-bean-muted dark:text-bean-dark-muted uppercase tracking-widest pb-3 border-b border-bean-border dark:border-bean-dark-border flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <CoffeeBeanIcon size={14} roast="medium" />
                  <span>Мастерская на Короля, 9</span>
                </span>
                <span>Минск · 2019</span>
              </div>

              {/* Graphic illustration: Stylized Roaster Drum & Bean Inspection */}
              <div className="my-6 aspect-[4/3] bg-bean-parchment dark:bg-bean-dark-bg border border-bean-border dark:border-bean-dark-border flex flex-col justify-center items-center p-6 text-center relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <CoffeeBeanIcon size={24} roast="green" />
                  <span className="font-mono text-xs text-bean-muted dark:text-bean-dark-muted">→</span>
                  <CoffeeBeanIcon size={28} roast="light" />
                  <span className="font-mono text-xs text-bean-muted dark:text-bean-dark-muted">→</span>
                  <CoffeeBeanIcon size={24} roast="dark" />
                </div>
                <div className="font-heading text-lg font-bold text-bean-espresso dark:text-bean-dark-text">
                  Барабанный ростер на 5 кг
                </div>
                <div className="font-mono text-xs text-bean-muted dark:text-bean-dark-muted mt-1 max-w-xs">
                  Ручной щуп для проверки зерна каждые 30 секунд обжарки
                </div>

                <div className="mt-4 px-3 py-1 bg-bean-crema dark:bg-bean-dark-surface border border-bean-border dark:border-bean-dark-border font-mono text-[10px] uppercase tracking-wider text-bean-crack dark:text-bean-dark-accent font-bold">
                  Партия 5000 г · Контроль на слух
                </div>
              </div>

              <div className="pt-2 text-xs font-mono text-bean-muted dark:text-bean-dark-muted space-y-1.5">
                <div className="flex justify-between border-b border-bean-border/50 dark:border-bean-dark-border/50 pb-1">
                  <span>ОСНОВАТЕЛИ:</span>
                  <span className="font-bold text-bean-espresso dark:text-bean-dark-text">АНЯ И ДМИТРИЙ</span>
                </div>
                <div className="flex justify-between border-b border-bean-border/50 dark:border-bean-dark-border/50 pb-1">
                  <span>ОТБОР ЗЕРНА:</span>
                  <span className="font-bold text-bean-espresso dark:text-bean-dark-text">100% АРАБИКА SPECIALTY</span>
                </div>
                <div className="flex justify-between">
                  <span>СТАЖ В КОФЕЙНОЙ СФЕРЕ:</span>
                  <span className="font-bold text-bean-espresso dark:text-bean-dark-text">11 ЛЕТ В МИНСКЕ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story Narrative: ONLY BOLD HEADING */}
          <div className="lg:col-span-7">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EBE1] mb-6 leading-tight">
              «Мы не строим кофейную фабрику. Мы слышим хлопок каждого зерна».
            </h2>

            <div className="space-y-4 font-body text-bean-espresso/85 dark:text-bean-dark-text/85 text-base sm:text-lg leading-relaxed">
              <p>
                До 2019 года мы с Димой работали шеф-бариста в минских кофейнях.
                Каждый день мы настраивали помол и видели одну и ту же боль: зерно
                от крупных европейских брендов приезжает в Беларусь спустя 3–4 месяца
                после обжарки. К этому моменту тонкие цветочные кислоты улетучиваются,
                оставляя обычный усредненный вкус.
              </p>
              <p>
                Мы открыли свою мастерскую на ул. Короля, 9 и поставили ростер
                вместимостью всего в <strong>5 килограммов</strong>. В таком объеме
                обжарщик управляет процессом вручную: регулирует поток горячего воздуха,
                следит за подъемом температуры по секундомеру и слушает звонкий
                «первый крэк» собственными ушами.
              </p>
              <p className="font-mono text-sm text-bean-crack dark:text-bean-dark-accent border-l-2 border-bean-crack dark:border-bean-dark-accent pl-4 py-1 italic bg-bean-crema/40 dark:bg-bean-dark-card/40">
                «Мы жарим только то зерно, которое заказали до среды. В четверг печь
                выдает свежий батч, а в пятницу зерно уже у вас в чашке».
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-bean-border dark:border-bean-dark-border flex flex-wrap items-center gap-6 font-mono text-xs text-bean-muted dark:text-bean-dark-muted">
              <div>
                <span className="font-bold text-bean-espresso dark:text-bean-dark-text block text-base font-heading">
                  12 000+ кг
                </span>
                обжаренного спешелти зерна
              </div>
              <div className="h-8 w-[1px] bg-bean-border dark:bg-bean-dark-border hidden sm:block" />
              <div>
                <span className="font-bold text-bean-espresso dark:text-bean-dark-text block text-base font-heading">
                  1–3 дня
                </span>
                от ростера до вашей чашки
              </div>
              <div className="h-8 w-[1px] bg-bean-border dark:bg-bean-dark-border hidden sm:block" />
              <div>
                <span className="font-bold text-bean-espresso dark:text-bean-dark-text block text-base font-heading">
                  0 складов
                </span>
                строго свежая четверговая партия
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
