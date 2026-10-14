/*
  ДОПУЩЕНИЕ: из ТЗ известно, что Аня и Дмитрий раньше работали бариста, обжаривают с 2019 года
  партиями по 5 кг и не держат зерно на складе. Всё остальное в тексте — авторская подача,
  чтобы рассказ звучал живо. Клиенту перед публикацией нужно прочитать и поправить.
*/
export default function Story() {
  return (
    <section id="story" className="border-b">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 md:grid-cols-12 md:gap-x-8 md:py-24">
        <p className="eyebrow md:col-span-3">01 — Кто мы</p>

        <div className="md:col-span-8 md:col-start-5">
          <h2 className="max-w-[22ch] text-balance font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-medium leading-[1.05] tracking-tight">
            Мы — Аня и Дмитрий. Раньше стояли за баром, теперь стоим у ростера.
          </h2>

          <div className="mt-9 grid gap-6 text-[1.0625rem] md:grid-cols-2 md:gap-x-10">
            <p>
              Мы оба работали бариста. Варили кофе, разговаривали с людьми у стойки и всё чаще
              ловили себя на мысли: хорошее зерно можно испортить просто тем, что оно долго лежит и
              ждёт покупателя.
            </p>
            <p>
              В 2019 году мы ушли из кофеен и купили ростер на 5 килограммов. Это очень мало, и это
              был наш выбор: в такой партии мы знаем каждую обжарку и не думаем, куда девать остатки.
            </p>
            <p>
              Поэтому у нас простой порядок. В четверг жарим, в пятницу развозим по Минску. К вам
              зерно приезжает на 1–3 день после обжарки, а не через месяц после того, как его
              поставили на полку.
            </p>
            <p>
              Не знаете, что выбрать, — напишите нам. Подскажем, с чего начать, и не будем
              предлагать то, что сами бы пить не стали.
            </p>
          </div>

          <blockquote className="mt-14 border-l-2 border-accent pl-6 md:pl-8">
            <p className="max-w-[24ch] text-balance font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium italic leading-[1.1] tracking-tight">
              Мы не жарим про запас. Кофе должен жить, а не лежать на полках.
            </p>
            <footer className="mt-5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
              Аня и Дмитрий · Минск, ул. Короля, 9
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
