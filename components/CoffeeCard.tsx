"use client";

import React from "react";
import { CoffeeItem } from "@/lib/types";

interface CoffeeCardProps {
  item: CoffeeItem;
  onSelect: (itemId: string, itemName: string) => void;
}

export function CoffeeCard({ item, onSelect }: CoffeeCardProps) {
  return (
    <article className="group relative border-b border-craft-border py-6 sm:py-8 transition-colors hover:bg-craft-surface/50 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        {/* Left: Name, Badges, Region & Processing */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-craft-dark group-hover:text-craft-accent transition-colors">
              {item.name}
            </h3>
            {item.badge && (
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-craft-dark text-craft-bg">
                {item.badge}
              </span>
            )}
          </div>

          <div className="font-mono text-xs text-craft-muted mb-3 flex flex-wrap items-center gap-3">
            <span>{item.region}</span>
            <span>•</span>
            <span>{item.processing}</span>
            <span>•</span>
            <span className="text-craft-dark font-medium">{item.roastLevel}</span>
          </div>

          {/* Flavor Notes (Micro tracking, editorial style) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="font-mono text-[10px] text-craft-muted uppercase tracking-wider mr-1">
              Вкусовой профиль:
            </span>
            {item.flavorNotes.map((note, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-2 py-0.5 bg-craft-bg border border-craft-border text-craft-dark"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Weight, Price & Action CTA */}
        <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-craft-border/60">
          <div className="text-left md:text-right">
            <div className="font-mono text-xs text-craft-muted">{item.weight}</div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-craft-dark">
              {item.price}{" "}
              <span className="text-sm font-normal text-craft-muted">BYN</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelect(item.id, item.name)}
            className="inline-flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase tracking-wider bg-craft-dark text-craft-bg group-hover:bg-craft-accent transition-colors"
          >
            <span>Выбрать в заявку</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
