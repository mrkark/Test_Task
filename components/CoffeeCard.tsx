"use client";

import React from "react";
import { CoffeeItem } from "@/lib/types";
import { CoffeeBeanIcon, BeanRoastType } from "./CoffeeBeanIcon";

interface CoffeeCardProps {
  item: CoffeeItem;
  onSelect: (itemId: string, itemName: string) => void;
}

export function CoffeeCard({ item, onSelect }: CoffeeCardProps) {
  // Determine roast visual parameters
  const getRoastConfig = (id: string): { type: BeanRoastType; level: number; label: string } => {
    switch (id) {
      case "ethiopia-yirgacheffe":
        return { type: "light", level: 2, label: "Светлая (Фильтр / Воронка)" };
      case "colombia-huila":
        return { type: "medium", level: 3, label: "Средняя (Универсальная)" };
      case "brazil-cerrado":
        return { type: "espresso", level: 4, label: "Плотная (Эспрессо / Турка)" };
      default:
        return { type: "medium", level: 3, label: "Дрип-фильтр (Готовые порции)" };
    }
  };

  const roastConfig = getRoastConfig(item.id);

  return (
    <article className="group relative border-b border-bean-border py-6 sm:py-8 transition-colors hover:bg-bean-crema/50 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        {/* Left: Name, Badges, Region & Processing */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-bean-espresso group-hover:text-bean-crack transition-colors flex items-center gap-2">
              <CoffeeBeanIcon
                size={22}
                roast={roastConfig.type}
                className="group-hover:rotate-45 group-hover:scale-110"
              />
              <span>{item.name}</span>
            </h3>
            {item.badge && (
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-bean-espresso text-bean-parchment">
                {item.badge}
              </span>
            )}
          </div>

          <div className="font-mono text-xs text-bean-muted mb-3 flex flex-wrap items-center gap-2.5">
            <span>{item.region}</span>
            <span>•</span>
            <span>{item.processing}</span>
            <span>•</span>
            <span className="text-bean-espresso font-medium flex items-center gap-1">
              <span>Обжарка:</span>
              <span className="inline-flex gap-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <CoffeeBeanIcon
                    key={lvl}
                    size={11}
                    roast={lvl <= roastConfig.level ? roastConfig.type : "drying"}
                    className={lvl <= roastConfig.level ? "opacity-100" : "opacity-25"}
                  />
                ))}
              </span>
              <span className="text-[11px] text-bean-muted ml-1">({roastConfig.label})</span>
            </span>
          </div>

          {/* Flavor Notes (Micro tracking, editorial style) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="font-mono text-[10px] text-bean-muted uppercase tracking-wider mr-1">
              Дескрипторы вкуса:
            </span>
            {item.flavorNotes.map((note, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-2 py-0.5 bg-bean-parchment border border-bean-border text-bean-espresso group-hover:border-bean-espresso transition-colors"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Weight, Price & Action CTA */}
        <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-bean-border/60">
          <div className="text-left md:text-right">
            <div className="font-mono text-xs text-bean-muted">{item.weight}</div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-bean-espresso">
              {item.price}{" "}
              <span className="text-sm font-normal text-bean-muted">BYN</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelect(item.id, item.name)}
            className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase tracking-wider bg-bean-espresso text-bean-parchment group-hover:bg-bean-crack transition-colors shadow-craft-sm"
          >
            <span>Выбрать в заявку</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
