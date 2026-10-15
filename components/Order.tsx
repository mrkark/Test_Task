import LeadForm from "./LeadForm";

export default function Order() {
  return (
    <section id="order" className="grain-light bg-char text-chaff">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 md:grid-cols-12 md:gap-x-12 md:py-24">
        <div className="md:col-span-5">
          <h2 className="h-stamp text-[clamp(2.2rem,5vw,4rem)]">Оставьте заявку, мы перезвоним</h2>
          <p className="mt-6 max-w-[36ch] text-[1.0625rem]">
            Менеджер позвонит в рабочее время, уточнит сорта, помол и адрес и сам всё оформит.
          </p>
          <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            <dt className="text-chaff-soft">Адрес</dt>
            <dd>Минск, ул. Короля, 9</dd>
            <dt className="text-chaff-soft">пн–пт</dt>
            <dd className="font-display text-lg tracking-[0.02em]">8:00–20:00</dd>
            <dt className="text-chaff-soft">сб–вс</dt>
            <dd className="font-display text-lg tracking-[0.02em]">10:00–18:00</dd>
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
