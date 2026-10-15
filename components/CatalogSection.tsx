"use client";

import React from "react";
import { COFFEE_CATALOG } from "@/lib/data";
import { CoffeeCard } from "./CoffeeCard";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

interface CatalogSectionProps {
  onSelectItem: (itemId: string, itemName: string) => void;
}

export function CatalogSection({ onSelectItem }: CatalogSectionProps) {
  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const orderElement = document.getElementById("order");
    if (orderElement) {
      orderElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 border-b border-bean-border dark:border-bean-dark-border bg-bean-parchment dark:bg-bean-dark-bg relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: ONLY BOLD HEADING */}
        <div className="mb-8 sm:mb-12 pb-6 border-b border-[#3D2619]">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5EBE1]">
            Спешелти-зерно этой недели
          </h2>
        </div>

        {/* Spec Sheet / Menu List */}
        <div className="border-t border-bean-border dark:border-bean-dark-border">
          {COFFEE_CATALOG.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              item={coffee}
              onSelect={onSelectItem}
            />
          ))}
        </div>

        {/* Free Grind Notice Box with Bean Visuals */}
        <div className="mt-8 p-4 bg-bean-crema dark:bg-bean-dark-card border border-bean-border dark:border-bean-dark-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-bean-espresso dark:text-bean-dark-text">
          <div className="flex items-center gap-2.5">
            <CoffeeBeanIcon size={20} roast="crack" />
            <div>
              <span className="font-bold">Нужен профессиональный помол?</span> Бесплатно смелем зерно под ваш метод (турка, эспрессо, фильтр, воронка V60, френч-пресс). Выберите опцию в форме заказа ниже.
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToOrder}
            className="text-bean-crack dark:text-bean-dark-accent hover:underline font-bold shrink-0 uppercase tracking-wider cursor-pointer"
          >
            Перейти к оформлению заявки →
          </button>
        </div>
      </div>
    </section>
  );
}
