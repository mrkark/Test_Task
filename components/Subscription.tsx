import { SUBSCRIPTION } from "@/lib/catalog";
import OrderLink from "./OrderLink";
import WeekTimeline from "./WeekTimeline";

const POINTS = [
  `${SUBSCRIPTION.packs} пачки по ${SUBSCRIPTION.grams} г раз в месяц`,
  "Доставка по Минску в пятницу, без доплаты",
  "Какие сорта привозить, решаем вместе с менеджером при оформлении",
];

export default function Subscription() {
  return (
    <section id="subscription" className="grain-light bg-city text-chaff">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-12">
          <h2 className="h-stamp text-[clamp(2.2rem,5vw,4rem)] md:col-span-5">
            Две пачки в месяц. Доставка бесплатно
          </h2>

          <div className="md:col-span-7">
            <div className="flex flex-wrap items-end gap-x-8 gap-y-6">
              <p className="font-display font-semibold leading-none">
                <span className="text-[clamp(4rem,10vw,6.5rem)]">{SUBSCRIPTION.price}</span>
                <span className="ml-3 text-2xl">BYN в месяц</span>
              </p>
              <OrderLink href="#order" interest="subscription" className="btn btn-amber">
                Оформить подписку
              </OrderLink>
            </div>

            <ul className="mt-9 grid gap-3 text-[1.0625rem] md:max-w-[36rem]">
              {POINTS.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-[0.62em] h-2.5 w-2.5 shrink-0 bg-amber" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <h3 className="h-stamp mb-6 text-[1.4rem] text-chaff-soft">Ритм недели</h3>
          <WeekTimeline />
        </div>
      </div>
    </section>
  );
}
