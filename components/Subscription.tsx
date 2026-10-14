import { SUBSCRIPTION } from "@/lib/catalog";
import Arrow from "./Arrow";
import OrderLink from "./OrderLink";
import WeekTimeline from "./WeekTimeline";

export default function Subscription() {
  return (
    <section id="subscription" className="border-b bg-surface">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-8">
          <p className="eyebrow md:col-span-3">03 — Подписка</p>

          <div className="md:col-span-8 md:col-start-5">
            <h2 className="max-w-[20ch] text-balance font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-medium leading-[1.05] tracking-tight">
              Две пачки в месяц, доставка бесплатно
            </h2>

            <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-6">
              <p className="font-mono">
                <span className="text-[clamp(2.5rem,7vw,4rem)] font-medium leading-none">
                  {SUBSCRIPTION.price}
                </span>
                <span className="ml-2 text-base text-muted">BYN / мес</span>
              </p>
              <OrderLink href="#order" interest="subscription" className="btn btn-solid">
                Оформить подписку
                <Arrow />
              </OrderLink>
            </div>

            <ul className="mt-8 grid gap-3 text-[1.0625rem] md:max-w-[34rem]">
              <li className="flex gap-3">
                <span className="font-mono text-accent" aria-hidden="true">
                  —
                </span>
                {SUBSCRIPTION.packs} пачки по {SUBSCRIPTION.grams} г раз в месяц
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-accent" aria-hidden="true">
                  —
                </span>
                Доставка по Минску в пятницу, без доплаты
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-accent" aria-hidden="true">
                  —
                </span>
                Какие сорта привозить, решаем вместе с менеджером при оформлении
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <p className="eyebrow mb-6">Ритм недели</p>
          <WeekTimeline />
        </div>
      </div>
    </section>
  );
}
