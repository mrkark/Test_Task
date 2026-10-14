import { PRODUCTS } from "@/lib/catalog";
import Arrow from "./Arrow";
import OrderLink from "./OrderLink";

/** Каталог — не сетка карточек, а спек-лист: строка на лот, характеристики моноширинным. */
export default function Menu() {
  return (
    <section id="menu" className="border-b">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-8">
          <p className="eyebrow md:col-span-3">02 — Зерно</p>
          <div className="md:col-span-8 md:col-start-5">
            <h2 className="max-w-[18ch] text-balance font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-medium leading-[1.05] tracking-tight">
              Что мы жарим сейчас
            </h2>
            <p className="mt-4 max-w-[40ch] text-muted">
              Пачки по 250 г. Нажмите «Заказать», и форма внизу заполнится сама.
            </p>
          </div>
        </div>

        <ol className="mt-12 border-t border-ink md:mt-16">
          {PRODUCTS.map((p, i) => (
            <li
              key={p.id}
              className="grid gap-5 border-b py-8 md:grid-cols-12 md:gap-x-6 md:py-10"
            >
              <span className="font-mono text-sm text-muted md:col-span-1 md:pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="md:col-span-5">
                <h3 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-medium leading-none tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[1.0625rem] italic">{p.notes}</p>
              </div>

              <dl className="grid grid-cols-[auto_1fr] content-start gap-x-5 gap-y-1.5 font-mono text-[13px] md:col-span-3 md:pt-1.5">
                {p.specs.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="text-muted">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-end justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:justify-between">
                <p className="font-mono">
                  <span className="text-3xl font-medium">{p.price}</span>
                  <span className="ml-1.5 text-sm text-muted">BYN</span>
                </p>
                <OrderLink href="#order" interest={p.id} className="btn btn-line">
                  Заказать
                  <Arrow />
                </OrderLink>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
