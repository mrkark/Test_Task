import Arrow from "./Arrow";
import FreshRuler from "./FreshRuler";
import OrderLink from "./OrderLink";
import WeekStatusPlate from "./WeekStatusPlate";

export default function Hero() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-[1240px] px-5 pb-14 pt-10 md:pb-20 md:pt-16">
        <p className="eyebrow">Ремесленная обжарка · с 2019 года · партии по 5 кг</p>

        <h1 className="mt-6 max-w-[17ch] text-balance font-display text-[clamp(2.5rem,8.4vw,6.4rem)] font-medium leading-[0.98] tracking-tight md:max-w-[20ch]">
          Свежесть — это когда зерно у вас на кухне на{" "}
          <em className="whitespace-nowrap text-accent">1–3&nbsp;день</em> после обжарки
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-6">
            <p className="font-mono text-[0.95rem] leading-relaxed">
              Жарим по 5 кг по четвергам.
              <br />
              Развозим по Минску по пятницам.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#menu" className="btn btn-solid">
                Выбрать зерно
                <Arrow />
              </a>
              <OrderLink href="#order" interest="subscription" className="btn btn-line">
                Оформить подписку
              </OrderLink>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <WeekStatusPlate />
          </div>
        </div>

        <FreshRuler className="mt-14 md:mt-16" />
      </div>
    </section>
  );
}
