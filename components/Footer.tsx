export default function Footer() {
  return (
    <footer className="border-t border-chaff/20 bg-char text-chaff-soft">
      <div className="mx-auto grid max-w-[1240px] gap-6 px-5 py-10 text-[0.95rem] md:grid-cols-12 md:gap-x-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-bold uppercase leading-none tracking-[0.08em] text-chaff">
            Кварта
          </p>
          <p className="mt-2 text-[0.8rem] italic">ремесленная обжарка кофе</p>
        </div>
        <p className="md:col-span-4">
          Минск, ул. Короля, 9
          <br />
          пн–пт 8:00–20:00, сб–вс 10:00–18:00
        </p>
        <p className="md:col-span-3">Учебный проект: «Кварта» — вымышленный клиент.</p>
      </div>
    </footer>
  );
}
