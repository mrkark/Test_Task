"use client";

import React, { useState, useEffect, useRef } from "react";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

interface RoastPhase {
  temp: number;
  timeInRoaster: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  beanScale: number;
  crackOpen: boolean;
  smoke: boolean;
  flavorProfile: string;
  chemistry: string;
  colorName: string;
}

const ROAST_PHASES: RoastPhase[] = [
  {
    temp: 20,
    timeInRoaster: "00:00",
    name: "Сырое зеленое зерно",
    shortDesc: "Свежий урожай арабики (влажность ~11%)",
    fullDesc:
      "Зерно поступает в мастерскую на ул. Короля, 9 в плотных джутовых мешках. Зёрна твердые, серо-зеленого оттенка, пахнут свежескошенной луговой травой, сырым горошком и свежестью горного терруара.",
    color: "#5B6C50",
    beanScale: 1.0,
    crackOpen: false,
    smoke: false,
    flavorProfile: "Трава, зелёный чай, плотная сырая клетчатка",
    chemistry: "Высокая влажность (11%), плотная кристаллическая структура",
    colorName: "Оливково-зелёный (Green Arabica)",
  },
  {
    temp: 130,
    timeInRoaster: "04:30",
    name: "Фаза сушки (Drying)",
    shortDesc: "Интенсивное выпаривание внутренней влаги",
    fullDesc:
      "Барабан ростера вращается со скоростью 60 об/мин при непрерывном потоке горячего воздуха. Зерно постепенно теряет влагу, меняет цвет на соломенно-желтый и наполняет цех ароматом теплого сена, хлебного мякиша и злаков.",
    color: "#D9A865",
    beanScale: 1.08,
    crackOpen: false,
    smoke: false,
    flavorProfile: "Печеное яблоко, светлый солод, подсушенное сено",
    chemistry: "Влага падает до 5%, хлорофилл разрушается",
    colorName: "Золотисто-жёлтый (Chaff & Straw)",
  },
  {
    temp: 165,
    timeInRoaster: "08:15",
    name: "Реакция Майяра и карамелизация",
    shortDesc: "Рождение фирменного аромата обжарки",
    fullDesc:
      "Критический момент профиля: аминокислоты и сахара вступают в термохимическую реакцию. Зерно быстро коричневеет, приобретая оттенок корицы. Появляется сладкий аромат свежей сдобной выпечки и карамели.",
    color: "#B57D3E",
    beanScale: 1.18,
    crackOpen: false,
    smoke: false,
    flavorProfile: "Тосты, тростниковый сахар, карамельная корочка",
    chemistry: "Синтез меланоидинов, зарождение 800+ ароматических соединений",
    colorName: "Коричный / светлая карамель",
  },
  {
    temp: 196,
    timeInRoaster: "10:50",
    name: "ПЕРВЫЙ КРЭК (First Crack)",
    shortDesc: "Кульминация! Зерно раскрывается со звонким щелчком",
    fullDesc:
      "Внутреннее давление пара разрывает клеточные стенки зерна с отчетливым громким щелчком, похожим на попкорн. Зерно увеличивается почти в 2 раза, бороздка раскрывается, высвобождая тонкие ягодные и цветочные кислоты спешелти-арабики.",
    color: "#C45525",
    beanScale: 1.34,
    crackOpen: true,
    smoke: true,
    flavorProfile: "Жасмин, бергамот, спелая вишня, красное яблоко",
    chemistry: "Экзотермический пик, расширение пор и высвобождение CO₂",
    colorName: "Терракотовый румянец (First Crack)",
  },
  {
    temp: 208,
    timeInRoaster: "12:10",
    name: "Светлая обжарка (Drop под фильтр)",
    shortDesc: "Выгрузка батча для V60, Chemex и фильтр-кофеварки",
    fullDesc:
      "Идеальный баланс для африканских и колумбийских сортов (Эфиопия Иргачеффе, Уила). Мы сбрасываем батч в охладительное сито, запечатывая природную ягодную сладость, сочную кислотность и тончайший аромат цветов.",
    color: "#8C4F2B",
    beanScale: 1.38,
    crackOpen: true,
    smoke: false,
    flavorProfile: "Цветочный мед, черная смородина, спелый персик",
    chemistry: "Максимальное сохранение органических кислот и терруара",
    colorName: "Теплый ореховый каштан",
  },
  {
    temp: 216,
    timeInRoaster: "13:30",
    name: "Эспрессо-профиль (Drop под кофемашину)",
    shortDesc: "Плотное тело и бархатная крема для рожковых машин и турки",
    fullDesc:
      "Для плотных сортов вроде Бразилии Серрадо мы продолжаем обжарку еще 80 секунд. Кислотность смягчается, сахара карамелизуются до глубокого шоколадно-орехового профиля с густой кремовой пенкой и долгим послевкусием.",
    color: "#2C1A11",
    beanScale: 1.42,
    crackOpen: true,
    smoke: false,
    flavorProfile: "Темный шоколад, жареный фундук, сливочная помадка",
    chemistry: "Карамелизация сахарозы, выделение микро-капель кофейных масел",
    colorName: "Глубокий шоколадный эспрессо",
  },
];

const PHASE_DURATION_MS = 4200; // Duration per phase in milliseconds

export function RoastingSimulator() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance loop
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalStep = 50;
    const progressIncrement = (intervalStep / PHASE_DURATION_MS) * 100;

    progressIntervalRef.current = setInterval(() => {
      setPhaseProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);

    timerRef.current = setInterval(() => {
      setActivePhaseIndex((prevIndex) => (prevIndex + 1) % ROAST_PHASES.length);
      setPhaseProgress(0);
    }, PHASE_DURATION_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPaused]);

  const currentPhase = ROAST_PHASES[activePhaseIndex];

  return (
    <section id="roast-simulator" className="py-16 sm:py-24 border-b border-[#3D2619] bg-[#170E09] relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: ONLY BOLD HEADING */}
        <div className="mb-10 sm:mb-14 pb-6 border-b border-[#3D2619]">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5EBE1]">
            Анатомия 5-килограммового батча
          </h2>
        </div>

        {/* Live Auto-Animation Status Bar */}
        <div className="mb-8 p-3.5 bg-[#1F130C] border border-[#3D2619] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPaused ? "bg-stone-500" : "bg-bean-crack"}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPaused ? "bg-stone-500" : "bg-bean-crack"}`} />
            </span>
            <span className="font-bold text-[#F5EBE1] tracking-wider uppercase">
              {isPaused ? "Анимация приостановлена" : "Идёт автоматический цикл обжарки 5 кг"}
            </span>
            <span className="text-[#3D2619] hidden sm:inline">•</span>
            <span className="text-[#A38F7F] hidden sm:inline">
              Стадия {activePhaseIndex + 1} из {ROAST_PHASES.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="px-2.5 py-1 bg-[#2A1910] hover:bg-[#382216] border border-[#3D2619] text-[#F5EBE1] uppercase text-[11px] tracking-wider transition-colors cursor-pointer"
            >
              {isPaused ? "▶ Продолжить" : "⏸ Пауза"}
            </button>
            <span className="text-[#A38F7F] text-[11px]">
              {currentPhase.timeInRoaster} / 14:00 мин
            </span>
          </div>
        </div>

        {/* Continuous Step Progress Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {ROAST_PHASES.map((phase, idx) => {
            const isCurrent = idx === activePhaseIndex;
            const isCompleted = idx < activePhaseIndex;

            return (
              <div
                key={idx}
                className={`p-2.5 border transition-all text-left font-mono relative overflow-hidden ${
                  isCurrent
                    ? "bg-[#25150D] border-bean-crack text-[#F5EBE1] shadow-craft-sm"
                    : isCompleted
                    ? "bg-[#1C110A] border-[#3D2619] text-[#A38F7F]"
                    : "bg-[#140C07] border-[#29170E] text-stone-600"
                }`}
              >
                {/* Live linear progress bar for active stage */}
                {isCurrent && !isPaused && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-bean-crack transition-all duration-75"
                    style={{ width: `${phaseProgress}%` }}
                  />
                )}

                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold ${isCurrent ? "text-bean-crack" : ""}`}>
                    0{idx + 1}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: phase.color }}
                  />
                </div>
                <div className="text-xs font-bold truncate">{phase.temp}°C</div>
                <div className="text-[10px] truncate opacity-80">{phase.name}</div>
              </div>
            );
          })}
        </div>

        {/* Simulator Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Interactive Bean Stage */}
          <div className="lg:col-span-6 bg-[#1C110A] border-2 border-[#3D2619] p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[420px] shadow-craft">
            {/* Live Temp Badge */}
            <div className="absolute top-4 left-4 font-mono text-xs px-3 py-1.5 bg-[#120A06] text-[#F5EBE1] font-bold tracking-wider border border-[#3D2619] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bean-crack animate-pulse" />
              <span>ТЕМПЕРАТУРА: {currentPhase.temp}°C</span>
            </div>

            {/* Time in roaster badge */}
            <div className="absolute top-4 right-4 font-mono text-xs px-3 py-1.5 bg-[#120A06] text-[#D9A865] font-bold tracking-wider border border-[#3D2619]">
              ⏱ {currentPhase.timeInRoaster}
            </div>

            {currentPhase.crackOpen && (
              <div className="absolute top-14 right-4 font-mono text-[11px] px-2.5 py-1 bg-bean-crack text-white uppercase font-bold tracking-widest animate-pulse">
                ⚡ FIRST CRACK!
              </div>
            )}

            {/* Morphing Animated SVG Bean */}
            <div className="relative my-10 flex items-center justify-center">
              {/* Heat glow / smoke effect */}
              {currentPhase.smoke && (
                <div className="absolute -top-12 w-28 h-16 opacity-90 animate-bounce pointer-events-none flex flex-col items-center">
                  <div className="font-mono text-xs text-bean-crack font-bold tracking-widest bg-[#120A06]/80 px-2 py-0.5 border border-bean-crack">
                    * КРЭК! *
                  </div>
                  <div className="text-[10px] font-mono text-[#D9A865]">щелчок зерна</div>
                </div>
              )}

              {/* Large Animated Morphing Bean */}
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  transform: `scale(${currentPhase.beanScale})`,
                }}
              >
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="filter drop-shadow-xl"
                >
                  {/* Bean Body with live fill color */}
                  <path
                    d="M50 8C75 8 92 25 92 50C92 75 75 92 50 92C25 92 8 75 8 50C8 25 25 8 50 8Z"
                    fill={currentPhase.color}
                    className="transition-colors duration-700"
                  />

                  {/* Center Crack / Crease */}
                  <path
                    d={
                      currentPhase.crackOpen
                        ? "M50 16C44 28 56 38 48 50C40 62 55 72 50 84"
                        : "M50 20C46 30 54 40 49 50C44 60 53 70 50 80"
                    }
                    stroke="#F5EBE1"
                    strokeWidth={currentPhase.crackOpen ? "4.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-500"
                    opacity={currentPhase.crackOpen ? "0.95" : "0.75"}
                  />

                  {/* Subtle roasting oil sheen for dark / espresso */}
                  {currentPhase.temp >= 208 && (
                    <circle
                      cx="65"
                      cy="35"
                      r="12"
                      fill="#FFFFFF"
                      opacity="0.18"
                    />
                  )}
                </svg>
              </div>
            </div>

            {/* Live Color Swatch & Color Name */}
            <div className="w-full mt-4 pt-4 border-t border-[#3D2619] flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[#A38F7F] gap-2">
              <span className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full inline-block border border-stone-500"
                  style={{ backgroundColor: currentPhase.color }}
                />
                <span>ЦВЕТ ЗЕРНА:</span>
              </span>
              <span className="font-bold text-[#F5EBE1] text-right">
                {currentPhase.colorName}
              </span>
            </div>
          </div>

          {/* Text Description of the Current Roasting Stage */}
          <div className="lg:col-span-6 bg-[#1F130C] border-2 border-[#3D2619] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#3D2619] pb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-bean-crack font-bold flex items-center gap-1.5">
                  <CoffeeBeanIcon size={14} roast="crack" />
                  <span>Стадия 0{activePhaseIndex + 1} · {currentPhase.temp}°C</span>
                </span>
                <span className="font-mono text-xs text-[#D9A865]">
                  Партия 5 кг
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5EBE1] leading-tight">
                {currentPhase.name}
              </h3>

              <div className="font-mono text-xs text-bean-crack font-medium bg-[#2A1810] px-3 py-1.5 border border-[#3D2619]">
                {currentPhase.shortDesc}
              </div>

              <p className="font-body text-base text-[#D4C3B5] leading-relaxed pt-1">
                {currentPhase.fullDesc}
              </p>

              {/* Chemical Transformation & Flavor Profile Details */}
              <div className="space-y-2.5 pt-3 border-t border-[#3D2619] text-xs font-mono">
                <div className="bg-[#170E09] p-3 border border-[#3D2619]">
                  <div className="text-[#A38F7F] uppercase text-[10px] tracking-wider mb-1">
                    🔬 Процессы внутри клетки зерна:
                  </div>
                  <div className="text-[#F5EBE1] font-medium">
                    {currentPhase.chemistry}
                  </div>
                </div>

                <div className="bg-[#170E09] p-3 border border-[#3D2619]">
                  <div className="text-[#D9A865] uppercase text-[10px] tracking-wider mb-1">
                    ☕ Вкусовой профиль на этой стадии:
                  </div>
                  <div className="text-[#F5EBE1] font-medium">
                    {currentPhase.flavorProfile}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Educational Callout */}
            <div className="mt-6 pt-4 border-t border-[#3D2619] text-xs font-mono text-[#A38F7F] flex items-center gap-2">
              <CoffeeBeanIcon size={14} roast="light" />
              <span>Зерно обжаривается в четверг и доставляется вам на 1–3 день свежести.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
