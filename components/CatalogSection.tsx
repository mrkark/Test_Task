"use client";

import React from "react";
import { COFFEE_CATALOG } from "@/lib/data";
import { CoffeeCard } from "./CoffeeCard";

interface CatalogSectionProps {
  onSelectItem: (itemId: string, itemName: string) => void;
}

export function CatalogSection({ onSelectItem }: CatalogSectionProps) {
  return (
    <section id="catalog" className="py-16 sm:py-24 border-b border-craft-border bg-craft-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-craft-border">
          <div>
            <div className="font-mono text-xs text-craft-muted uppercase tracking-widest mb-2">
              [03] Текущая обжарка
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-craft-dark">
              Спешелти-меню на эту неделю
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-body text-craft-muted max-w-md text-sm sm:text-base">
            Обжариваем в четверг ровно столько, сколько заказали. Каждая пачка
            снабжена датой обжарки и клапаном дегазации.
          </p>
        </div>

        {/* Spec Sheet / Menu List (NOT a generic card grid) */}
        <div className="border-t border-craft-border">
          {COFFEE_CATALOG.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              item={coffee}
              onSelect={onSelectItem}
            />
          ))}
        </div>

        {/* Footnote about grind */}
        <div className="mt-8 p-4 bg-craft-surface/60 border border-craft-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-craft-dark">
          <div>
            💡 <span className="font-bold">Нужен помол?</span> Бесплатно смелем под ваш
            способ (турка, эспрессо, фильтр, воронка V60, гейзер). Просто укажите это
            в комментарии к заказу.
          </div>
          <a
            href="#order"
            className="text-craft-accent hover:underline font-bold shrink-0 uppercase tracking-wider"
          >
            Перейти к оформлению →
          </a>
        </div>
      </div>
    </section>
  );
}
