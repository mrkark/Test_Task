import React from "react";
import { WORKSHOP_INFO } from "@/lib/data";

export function DeliverySection() {
  return (
    <section id="delivery" className="py-16 sm:py-24 border-b border-craft-border bg-craft-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-craft-border">
          <div>
            <div className="font-mono text-xs text-craft-muted uppercase tracking-widest mb-2">
              [05] Логистика
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-craft-dark">
              Доставка по Минску и самовывоз
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-body text-craft-muted max-w-md text-sm sm:text-base">
            Мы лично упаковываем каждую посылку и бережно передаем курьеру, чтобы зерно не тряслось неделями на складах.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Delivery */}
          <div className="border border-craft-border bg-craft-surface/50 p-6 sm:p-8">
            <div className="font-mono text-xs text-craft-accent uppercase tracking-widest mb-3">
              Вариант А · Курьерская доставка
            </div>
            <h3 className="font-heading text-2xl font-bold text-craft-dark mb-4">
              Развоз по пятницам
            </h3>
            <p className="font-body text-sm sm:text-base text-craft-muted mb-6 leading-relaxed">
              Так как обжарка происходит по четвергам, курьер забирает теплые пачки
              ранним утром в пятницу и развозит по адресам в пределах МКАД (и микрорайонам рядом).
            </p>
            <div className="space-y-3 font-mono text-xs text-craft-dark border-t border-craft-border pt-4">
              <div className="flex justify-between items-center py-1 border-b border-craft-border/60">
                <span className="text-craft-muted">Стоимость доставки:</span>
                <span className="font-bold">6 BYN</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-craft-border/60">
                <span className="text-craft-muted">При заказе от 50 BYN:</span>
                <span className="font-bold text-craft-accent uppercase">Бесплатно</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-craft-muted">По подписке:</span>
                <span className="font-bold text-craft-accent uppercase">Всегда бесплатно</span>
              </div>
            </div>
          </div>

          {/* Card 2: Self-Pickup Workshop */}
          <div className="border border-craft-border bg-craft-surface/50 p-6 sm:p-8">
            <div className="font-mono text-xs text-craft-dark uppercase tracking-widest mb-3">
              Вариант Б · Самовывоз из мастерской
            </div>
            <h3 className="font-heading text-2xl font-bold text-craft-dark mb-4">
              ул. Короля, 9 (Минск)
            </h3>
            <p className="font-body text-sm sm:text-base text-craft-muted mb-6 leading-relaxed">
              Заглядывайте прямо в цех: забрать заказ, выпить свежий фильтр, посмотреть на наш ростер и поболтать с Аней или Димой о кофе.
            </p>
            <div className="space-y-3 font-mono text-xs text-craft-dark border-t border-craft-border pt-4">
              <div className="flex justify-between items-center py-1 border-b border-craft-border/60">
                <span className="text-craft-muted">Будние дни:</span>
                <span className="font-bold">{WORKSHOP_INFO.schedule.weekdays}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-craft-border/60">
                <span className="text-craft-muted">Выходные:</span>
                <span className="font-bold">{WORKSHOP_INFO.schedule.weekends}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-craft-muted">Стоимость:</span>
                <span className="font-bold text-craft-accent uppercase">Всегда бесплатно</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
