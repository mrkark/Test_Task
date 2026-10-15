"use client";

import React from "react";
import { COFFEE_CATALOG } from "@/lib/data";
import { CoffeeCard } from "./CoffeeCard";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

interface CatalogSectionProps {
  onSelectItem: (itemId: string, itemName: string) => void;
}

export function CatalogSection({ onSelectItem }: CatalogSectionProps) {
  return (
    <section id="catalog" className="py-16 sm:py-24 border-b border-bean-border bg-bean-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-bean-border">
          <div>
            <div className="font-mono text-xs text-bean-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <CoffeeBeanIcon size={14} roast="light" />
              <span>[04] Свежий урожай и текущие профили</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-bean-espresso">
              Спешелти-зерно этой недели
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-body text-bean-muted max-w-md text-sm sm:text-base">
            Жарим в четверг под заказ. Зерно пакуется в фольгированные пачки с клапаном
            дегазации, сохраняя богатство вкуса и эфирные масла.
          </p>
        </div>

        {/* Spec Sheet / Menu List */}
        <div className="border-t border-bean-border">
          {COFFEE_CATALOG.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              item={coffee}
              onSelect={onSelectItem}
            />
          ))}
        </div>

        {/* Free Grind Notice Box with Bean Visuals */}
        <div className="mt-8 p-4 bg-bean-crema border border-bean-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-bean-espresso">
          <div className="flex items-center gap-2.5">
            <CoffeeBeanIcon size={20} roast="crack" />
            <div>
              <span className="font-bold">Нужен профессиональный помол?</span> Бесплатно смелем зерно под ваш метод (турка, эспрессо, фильтр, воронка V60, френч-пресс). Выберите опцию в форме заказа ниже.
            </div>
          </div>
          <a
            href="#order"
            className="text-bean-crack hover:underline font-bold shrink-0 uppercase tracking-wider"
          >
            Перейти к оформлению заявки →
          </a>
        </div>
      </div>
    </section>
  );
}
