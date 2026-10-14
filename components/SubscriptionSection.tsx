"use client";

import React from "react";
import { SUBSCRIPTION_PLAN } from "@/lib/data";

interface SubscriptionSectionProps {
  onSelectSubscription: () => void;
}

export function SubscriptionSection({ onSelectSubscription }: SubscriptionSectionProps) {
  return (
    <section id="subscription" className="py-16 sm:py-24 border-b border-craft-border bg-craft-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-craft-dark bg-craft-surface p-6 sm:p-10 lg:p-12 relative shadow-craft">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-craft-accent text-craft-bg font-mono text-xs tracking-widest uppercase px-3 py-1 font-bold">
            Бесплатная доставка
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading and explanation */}
            <div className="lg:col-span-7">
              <div className="font-mono text-xs text-craft-muted uppercase tracking-widest mb-2">
                [04] Регулярный кофе без суеты
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-craft-dark mb-4">
                Кофейная подписка «Кварта»
              </h2>
              <p className="font-body text-base sm:text-lg text-craft-muted mb-6 leading-relaxed">
                Вам больше не нужно вспоминать в четверг, остался ли дома кофе.
                Каждый месяц мы отправляем вам <strong>2 разные свежеобжаренные пачки по 250 грамм</strong>{" "}
                (всего 500 г — идеальный объем на месяц для 1–2 чашек в день) с бесплатной
                доставкой прямо к вам домой или в офис.
              </p>

              <div className="space-y-3 mb-8">
                {SUBSCRIPTION_PLAN.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-craft-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm sm:text-base font-body text-craft-dark">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Pricing & Action */}
            <div className="lg:col-span-5 bg-craft-bg border border-craft-dark p-6 sm:p-8 text-center flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-craft-muted block mb-2">
                  Фиксированный тариф
                </span>
                <div className="font-mono text-5xl sm:text-6xl font-bold text-craft-dark mb-2">
                  54 <span className="text-xl font-normal text-craft-muted">BYN</span>
                </div>
                <div className="font-mono text-xs text-craft-muted uppercase tracking-wider mb-6">
                  За 2 пачки по 250 г / месяц
                </div>
                <div className="text-xs font-body text-craft-dark/70 mb-6 border-t border-b border-craft-border py-3">
                  Без предоплаты на год вперёд. Оплата курьеру при получении или по факту доставки.
                </div>
              </div>

              <button
                type="button"
                onClick={onSelectSubscription}
                className="w-full py-4 px-6 bg-craft-dark text-craft-bg font-mono text-xs sm:text-sm uppercase tracking-wider hover:bg-craft-accent transition-colors shadow-craft-sm"
              >
                Оформить подписку на кофе →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
