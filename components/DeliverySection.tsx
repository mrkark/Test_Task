import React from "react";
import { WORKSHOP_INFO } from "@/lib/data";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

export function DeliverySection() {
  return (
    <section id="delivery" className="py-16 sm:py-24 border-b border-bean-border bg-bean-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-bean-border">
          <div>
            <div className="font-mono text-xs text-bean-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <CoffeeBeanIcon size={14} roast="dark" />
              <span>[06] Доставка свежего зерна</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-bean-espresso">
              Доставка по Минску и самовывоз
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-body text-bean-muted max-w-md text-sm sm:text-base">
            Зерно обжаривается в четверг и попадает к вам в пятницу — в идеальной фазе дегазации.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Delivery */}
          <div className="border border-bean-border bg-bean-crema/60 p-6 sm:p-8">
            <div className="font-mono text-xs text-bean-crack uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <CoffeeBeanIcon size={14} roast="crack" />
              <span>Вариант А · Курьерская доставка</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-bean-espresso mb-4">
              Развоз зерна по пятницам
            </h3>
            <p className="font-body text-sm sm:text-base text-bean-muted mb-6 leading-relaxed">
              Курьер забирает свежеобжаренные пачки прямо из цеха в пятницу утром и развозит по адресам в Минске в пределах МКАД (и микрорайонам рядом).
            </p>
            <div className="space-y-3 font-mono text-xs text-bean-espresso border-t border-bean-border pt-4">
              <div className="flex justify-between items-center py-1 border-b border-bean-border/60">
                <span className="text-bean-muted">Стоимость доставки:</span>
                <span className="font-bold">6 BYN</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-bean-border/60">
                <span className="text-bean-muted">При заказе от 50 BYN:</span>
                <span className="font-bold text-bean-crack uppercase">Бесплатно</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-bean-muted">По кофейной подписке:</span>
                <span className="font-bold text-bean-crack uppercase">Всегда бесплатно</span>
              </div>
            </div>
          </div>

          {/* Card 2: Self-Pickup Workshop */}
          <div className="border border-bean-border bg-bean-crema/60 p-6 sm:p-8">
            <div className="font-mono text-xs text-bean-espresso uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <CoffeeBeanIcon size={14} roast="espresso" />
              <span>Вариант Б · Самовывоз из мастерской</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-bean-espresso mb-4">
              ул. Короля, 9 (Минск)
            </h3>
            <p className="font-body text-sm sm:text-base text-bean-muted mb-6 leading-relaxed">
              Заглядывайте прямо в цех: почувствовать аромат обжарки, забрать зерно, выпить фильтр-кофе и пообщаться с основателями Аней или Дмитрием.
            </p>
            <div className="space-y-3 font-mono text-xs text-bean-espresso border-t border-bean-border pt-4">
              <div className="flex justify-between items-center py-1 border-b border-bean-border/60">
                <span className="text-bean-muted">Будние дни:</span>
                <span className="font-bold">{WORKSHOP_INFO.schedule.weekdays}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-bean-border/60">
                <span className="text-bean-muted">Выходные:</span>
                <span className="font-bold">{WORKSHOP_INFO.schedule.weekends}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-bean-muted">Стоимость:</span>
                <span className="font-bold text-bean-crack uppercase">Всегда бесплатно</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
