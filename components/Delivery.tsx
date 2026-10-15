const MAP_URL = `https://yandex.by/maps/?text=${encodeURIComponent("Минск, улица Короля, 9")}`;

export default function Delivery() {
  return (
    <section id="delivery" className="grain-light bg-roast text-chaff">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <h2 className="h-stamp max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)]">
          Привезём в пятницу или ждём на Короля, 9
        </h2>

        <div className="mt-12 grid border-t-4 border-chaff-soft/50 md:mt-16 md:grid-cols-2">
          <div className="border-b-2 border-chaff-soft/30 py-8 md:border-b-0 md:border-r-2 md:py-10 md:pr-10">
            <h3 className="h-stamp text-[clamp(1.8rem,3.4vw,2.6rem)]">Доставка по Минску</h3>
            <p className="mt-3 text-xl italic">По пятницам, до двери.</p>
            <ul className="mt-5 grid gap-2">
              <li>
                <span className="font-display text-lg font-semibold uppercase tracking-[0.04em] text-amber">
                  Бесплатно
                </span>{" "}
                от 50 BYN и для подписки.
              </li>
              <li className="text-chaff-soft">
                Если заказ меньше, менеджер назовёт стоимость доставки или предложит забрать самому.
              </li>
            </ul>
          </div>

          <div className="py-8 md:py-10 md:pl-10">
            <h3 className="h-stamp text-[clamp(1.8rem,3.4vw,2.6rem)]">Самовывоз</h3>
            <p className="mt-3 text-xl italic">Минск, ул. Короля, 9.</p>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
              <dt className="text-chaff-soft">пн–пт</dt>
              <dd className="font-display text-lg tracking-[0.02em]">8:00–20:00</dd>
              <dt className="text-chaff-soft">сб–вс</dt>
              <dd className="font-display text-lg tracking-[0.02em]">10:00–18:00</dd>
            </dl>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-medium text-amber underline decoration-2 underline-offset-[6px] hover:text-chaff"
            >
              Открыть на карте
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
