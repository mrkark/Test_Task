"use client";

import React from "react";
import { CoffeeItem } from "@/lib/types";
import { CoffeeBeanIcon, BeanRoastType } from "./CoffeeBeanIcon";
import { CoffeeBeanRating } from "./CoffeeBeanRating";

interface CoffeeCardProps {
  item: CoffeeItem;
  onSelect: (itemId: string, itemName: string) => void;
}

export function CoffeeCard({ item, onSelect }: CoffeeCardProps) {
  // Determine roast profile and rating for each specific lot
  const getLotDetails = (id: string) => {
    switch (id) {
      case "ethiopia-yirgacheffe":
        return {
          roastType: "light" as BeanRoastType,
          roastBadge: "Светлая обжарка (фильтр / V60)",
          rating: 4.9,
          reviews: 48,
        };
      case "colombia-huila":
        return {
          roastType: "medium" as BeanRoastType,
          roastBadge: "Средняя обжарка (универсальная)",
          rating: 4.8,
          reviews: 36,
        };
      case "brazil-cerrado":
        return {
          roastType: "espresso" as BeanRoastType,
          roastBadge: "Плотная обжарка (эспрессо / турка)",
          rating: 4.9,
          reviews: 54,
        };
      default:
        return {
          roastType: "medium" as BeanRoastType,
          roastBadge: "10 готовых дрип-порций в азоте",
          rating: 5.0,
          reviews: 62,
        };
    }
  };

  const lot = getLotDetails(item.id);

  const handleSelectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(item.id, item.name);
  };

  return (
    <article className="group relative border-b border-bean-border dark:border-bean-dark-border py-6 sm:py-8 transition-colors hover:bg-bean-crema/50 dark:hover:bg-bean-dark-card/50 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        {/* Left: Name, Badges, Region & Processing */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-bean-espresso dark:text-bean-dark-text group-hover:text-bean-crack dark:group-hover:text-bean-dark-accent transition-colors flex items-center gap-2">
              <CoffeeBeanIcon
                size={22}
                roast={lot.roastType}
                className="group-hover:rotate-45 group-hover:scale-110"
              />
              <span>{item.name}</span>
            </h3>
            {item.badge && (
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-bean-espresso dark:bg-bean-dark-accent text-bean-parchment dark:text-bean-dark-bg font-bold">
                {item.badge}
              </span>
            )}
          </div>

          {/* 5-Bean Rating & Clear Roast Profile Badge */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 font-mono text-xs">
            {/* 5 Coffee Beans Product Rating */}
            <div className="flex items-center gap-1.5 py-0.5">
              <span className="text-[10px] uppercase text-bean-muted dark:text-bean-dark-muted tracking-wider">
                Оценка:
              </span>
              <CoffeeBeanRating
                rating={lot.rating}
                reviewsCount={lot.reviews}
                size={16}
              />
            </div>

            <span className="hidden sm:inline text-bean-border dark:text-bean-dark-border">•</span>

            {/* Clear, readable roast level badge */}
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-bean-crema dark:bg-bean-dark-card border border-bean-border dark:border-bean-dark-border text-bean-espresso dark:text-bean-dark-text text-[11px]">
              <CoffeeBeanIcon size={12} roast={lot.roastType} />
              <span>{lot.roastBadge}</span>
            </span>
          </div>

          <div className="font-mono text-xs text-bean-muted dark:text-bean-dark-muted mb-3 flex flex-wrap items-center gap-2">
            <span>{item.region}</span>
            <span>•</span>
            <span>{item.processing}</span>
            <span>•</span>
            <span className="text-bean-espresso dark:text-bean-dark-text font-medium">{item.roastLevel}</span>
          </div>

          {/* Flavor Notes (Micro tracking, editorial style) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="font-mono text-[10px] text-bean-muted dark:text-bean-dark-muted uppercase tracking-wider mr-1">
              Вкусовой профиль:
            </span>
            {item.flavorNotes.map((note, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-2 py-0.5 bg-bean-parchment dark:bg-bean-dark-surface border border-bean-border dark:border-bean-dark-border text-bean-espresso dark:text-bean-dark-text group-hover:border-bean-espresso dark:group-hover:border-bean-dark-accent transition-colors"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Weight, Price & Action CTA */}
        <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-bean-border/60 dark:border-bean-dark-border/60">
          <div className="text-left md:text-right">
            <div className="font-mono text-xs text-bean-muted dark:text-bean-dark-muted">{item.weight}</div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-bean-espresso dark:text-bean-dark-text">
              {item.price}{" "}
              <span className="text-sm font-normal text-bean-muted dark:text-bean-dark-muted">BYN</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSelectClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase tracking-wider bg-bean-espresso text-bean-parchment hover:bg-bean-crack dark:bg-bean-crack dark:hover:bg-bean-crack-hover transition-colors shadow-craft-sm cursor-pointer active:translate-y-0.5"
          >
            <span>Выбрать в заявку</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
