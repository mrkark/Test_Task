import LeadForm from "./LeadForm";

export default function Order() {
  return (
    <section id="order" className="border-b bg-surface">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 md:grid-cols-12 md:gap-x-8 md:py-24">
        <div className="md:col-span-5">
          <p className="eyebrow">05 — Заявка</p>
          <h2 className="mt-6 max-w-[14ch] text-balance font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.02] tracking-tight">
            Оставьте заявку, мы перезвоним
          </h2>
          <p className="mt-6 max-w-[36ch] text-[1.0625rem]">
            Менеджер позвонит в рабочее время, уточнит сорта, помол и адрес и сам всё оформит.
          </p>
          <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 font-mono text-sm">
            <dt className="text-muted">Адрес</dt>
            <dd>Минск, ул. Короля, 9</dd>
            <dt className="text-muted">пн–пт</dt>
            <dd>8:00–20:00</dd>
            <dt className="text-muted">сб–вс</dt>
            <dd>10:00–18:00</dd>
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
