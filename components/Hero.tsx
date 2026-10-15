import FreshRuler from "./FreshRuler";
import OrderLink from "./OrderLink";
import RoastBean from "./RoastBean";
import WeekStatusPlate from "./WeekStatusPlate";

export default function Hero() {
  return (
    <section className="grain-light bg-leaf text-chaff">
      <div className="mx-auto grid max-w-[1240px] gap-x-12 gap-y-14 px-5 pb-16 pt-10 md:grid-cols-12 md:pb-24 md:pt-14">
        <div className="md:col-span-7">
          <h1 className="h-stamp text-[clamp(2.3rem,5.6vw,4.9rem)]">
            Свежесть — это когда зерно у вас на кухне на <span className="whitespace-nowrap">1–3 день</span> после обжарки
          </h1>
          <p className="mt-8 max-w-[30ch] text-xl leading-snug md:text-[1.4rem]">
            Жарим по 5 кг по четвергам. Развозим по Минску по пятницам.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#menu" className="btn btn-amber">
              Выбрать зерно
            </a>
            <OrderLink href="#order" interest="subscription" className="btn btn-outline-chaff">
              Оформить подписку
            </OrderLink>
          </div>
        </div>

        <div className="md:col-span-5 md:row-span-2">
          <RoastBean />
        </div>

        <div className="md:col-span-7 md:self-end">
          <WeekStatusPlate />
        </div>

        <div className="md:col-span-12">
          <FreshRuler />
        </div>
      </div>
    </section>
  );
}
