const MAP_URL = `https://yandex.by/maps/?text=${encodeURIComponent("Минск, улица Короля, 9")}`;

export default function Delivery() {
  return (
    <section id="delivery" className="border-b">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-8">
          <p className="eyebrow md:col-span-3">04 — Доставка и самовывоз</p>
          <h2 className="max-w-[20ch] text-balance font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-medium leading-[1.05] tracking-tight md:col-span-8 md:col-start-5">
            Привезём в пятницу или ждём на Короля, 9
          </h2>
        </div>

        <div className="mt-12 grid border-t border-ink md:mt-16 md:grid-cols-2">
          <div className="border-b py-8 md:border-b-0 md:border-r md:py-10 md:pr-10">
            <p className="eyebrow">Доставка по Минску</p>
            <p className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
              По пятницам, до двери
            </p>
            <ul className="mt-5 grid gap-2 text-[1.0625rem]">
              <li>
                <span className="font-mono font-medium">Бесплатно</span> — от 50 BYN и для подписки.
              </li>
              <li className="text-muted">
                Если заказ меньше, менеджер назовёт стоимость доставки или предложит забрать самому.
              </li>
            </ul>
          </div>

          <div className="py-8 md:py-10 md:pl-10">
            <p className="eyebrow">Самовывоз</p>
            <p className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
              Минск, ул. Короля, 9
            </p>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 font-mono text-sm">
              <dt className="text-muted">пн–пт</dt>
              <dd>8:00–20:00</dd>
              <dt className="text-muted">сб–вс</dt>
              <dd>10:00–18:00</dd>
            </dl>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-medium underline decoration-accent decoration-2 underline-offset-[6px] hover:decoration-ink"
            >
              Открыть на карте
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
