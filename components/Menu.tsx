import { PRODUCTS } from "@/lib/catalog";
import Bean from "./Bean";
import BeanRating from "./BeanRating";
import OrderLink from "./OrderLink";

/*
  Каталог — не сетка карточек, а список мешков: у каждого лота зерно своего цвета обжарки,
  название трафаретом и «штамп» с характеристиками, как пометки на мешке с зелёным кофе.
*/
export default function Menu() {
  return (
    <section id="menu" className="grain bg-cinnamon text-ink">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-12 md:gap-x-12">
          <h2 className="h-stamp text-[clamp(2.2rem,5vw,4rem)] md:col-span-5">Что мы жарим сейчас</h2>
          <p className="max-w-[40ch] text-xl md:col-span-6 md:col-start-7 md:self-end">
            Пачки по 250 г. Нажмите «Заказать», и форма внизу заполнится сама.
          </p>
        </div>

        <ul className="mt-12 border-t-2 border-ink md:mt-16">
          {PRODUCTS.map((p) => (
            <li
              key={p.id}
              className="group grid items-center gap-x-8 gap-y-5 border-b-2 border-ink py-8 md:grid-cols-12 md:py-10"
            >
              <div className="md:col-span-2">
                <Bean
                  color={p.bean}
                  className="h-28 w-auto -rotate-12 transition-transform duration-300 group-hover:rotate-[14deg] md:h-40"
                />
              </div>

              <div className="md:col-span-4">
                <h3 className="h-stamp text-[clamp(1.9rem,3.6vw,2.8rem)]">{p.name}</h3>
                <p className="mt-2 text-xl font-medium italic">{p.notes}</p>
                <BeanRating value={p.rating} className="mt-4" />
              </div>

              <dl className="stamp grid grid-cols-[auto_1fr] content-start gap-x-4 gap-y-1 px-4 py-3 text-base md:col-span-3">
                {p.specs.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt>{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-center justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:gap-5">
                <p className="font-display font-semibold leading-none">
                  <span className="text-5xl">{p.price}</span>
                  <span className="ml-2 text-xl">BYN</span>
                </p>
                <OrderLink href="#order" interest={p.id} className="btn btn-ink">
                  Заказать
                </OrderLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
