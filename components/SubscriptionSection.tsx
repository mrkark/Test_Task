"use client";

import React from "react";
import { SUBSCRIPTION_PLAN } from "@/lib/data";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

interface SubscriptionSectionProps {
  onSelectSubscription: () => void;
}

export function SubscriptionSection({ onSelectSubscription }: SubscriptionSectionProps) {
  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelectSubscription();
  };

  return (
    <section id="subscription" className="py-16 sm:py-24 border-b border-bean-border dark:border-bean-dark-border bg-bean-crema/40 dark:bg-bean-dark-surface/40 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-bean-espresso dark:border-bean-dark-border bg-bean-crema dark:bg-bean-dark-surface p-6 sm:p-10 lg:p-12 relative shadow-craft dark:shadow-craft-dark">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-bean-crack text-bean-parchment font-mono text-xs tracking-widest uppercase px-3 py-1 font-bold flex items-center gap-1.5 shadow-sm">
            <CoffeeBeanIcon size={12} roast="light" />
            <span>Бесплатная доставка по Минску</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: ONLY BOLD HEADING */}
            <div className="lg:col-span-7">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EBE1] mb-4">
                Кофейная подписка «Кварта»
              </h2>
              <p className="font-body text-base sm:text-lg text-bean-muted dark:text-bean-dark-muted mb-6 leading-relaxed">
                Забудьте о ситуациях, когда утром дома закончился кофе.
                Каждый месяц мы отправляем вам <strong>2 разные свежеобжаренные пачки по 250 грамм</strong>{" "}
                (всего 500 г зерна — оптимально для 1–2 отличных чашек в день) с бесплатной
                доставкой прямо к вам домой или в офис.
              </p>

              <div className="space-y-3 mb-8">
                {SUBSCRIPTION_PLAN.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CoffeeBeanIcon size={14} roast="crack" className="mt-1 shrink-0" />
                    <span className="text-sm sm:text-base font-body text-bean-espresso dark:text-bean-dark-text">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Pricing & Action */}
            <div className="lg:col-span-5 bg-bean-parchment dark:bg-bean-dark-card border-2 border-bean-espresso dark:border-bean-dark-border p-6 sm:p-8 text-center flex flex-col justify-between shadow-craft-sm dark:shadow-craft-sm-dark">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-bean-muted dark:text-bean-dark-muted block mb-2">
                  Тариф подписки
                </span>
                <div className="font-mono text-5xl sm:text-6xl font-bold text-bean-espresso dark:text-bean-dark-text mb-2">
                  54 <span className="text-xl font-normal text-bean-muted dark:text-bean-dark-muted">BYN</span>
                </div>
                <div className="font-mono text-xs text-bean-muted dark:text-bean-dark-muted uppercase tracking-wider mb-6 flex items-center justify-center gap-1">
                  <span>2 пачки по 250 г зерна / месяц</span>
                </div>
                <div className="text-xs font-body text-bean-muted dark:text-bean-dark-muted mb-6 border-t border-b border-bean-border dark:border-bean-dark-border py-3">
                  Без предоплаты на год. Оплата курьеру при передаче свежего зерна.
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubscribeClick}
                className="w-full py-4 px-6 bg-bean-espresso dark:bg-bean-dark-accent text-bean-parchment dark:text-bean-dark-bg font-mono text-xs sm:text-sm uppercase tracking-wider hover:bg-bean-crack dark:hover:bg-bean-crack transition-colors shadow-craft-sm cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                Оформить подписку на свежее зерно →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
