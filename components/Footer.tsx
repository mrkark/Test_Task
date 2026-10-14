export default function Footer() {
  return (
    <footer>
      <div className="mx-auto grid max-w-[1240px] gap-6 px-5 py-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-bold leading-none tracking-tight">КВАРТА</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            ремесленная обжарка кофе
          </p>
        </div>
        <p className="font-mono text-xs leading-relaxed text-muted md:col-span-4">
          Минск, ул. Короля, 9
          <br />
          пн–пт 8:00–20:00 · сб–вс 10:00–18:00
        </p>
        <p className="font-mono text-xs leading-relaxed text-muted md:col-span-3">
          Учебный проект: «Кварта» — вымышленный клиент.
        </p>
      </div>
    </footer>
  );
}
