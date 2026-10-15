"use client";

import React, { useState } from "react";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

interface RoastPhase {
  temp: number;
  name: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  textColor: string;
  beanScale: number;
  crackOpen: boolean;
  smoke: boolean;
  flavorProfile: string;
}

const ROAST_PHASES: RoastPhase[] = [
  {
    temp: 20,
    name: "Зеленое зерно",
    shortDesc: "Свежий урожай (влажность ~11%)",
    fullDesc:
      "Зерно поступает в мастерскую в джутовых мешках. Оно твердое, серо-зеленое и пахнет свежескошенной травой и зеленым горошком.",
    color: "#5B6C50",
    textColor: "text-[#5B6C50]",
    beanScale: 1.0,
    crackOpen: false,
    smoke: false,
    flavorProfile: "Трава, зеленый чай, плотная клетчатка",
  },
  {
    temp: 130,
    name: "Сушка (Drying)",
    shortDesc: "Выпаривание внутренней влаги",
    fullDesc:
      "Барабан ростера нагревается. Зерно теряет влагу, желтеет и начинает пахнуть свежим сеном и теплыми злаками.",
    color: "#D9A865",
    textColor: "text-[#B57D3E]",
    beanScale: 1.08,
    crackOpen: false,
    smoke: false,
    flavorProfile: "Сушеные яблоки, солод, сено",
  },
  {
    temp: 165,
    name: "Реакция Майяра",
    shortDesc: "Карамелизация сахаров",
    fullDesc:
      "Сахара и аминокислоты внутри зерна вступают в реакцию. Зерно приобретает благородный коричный оттенок. Рождается аромат свежей выпечки.",
    color: "#B57D3E",
    textColor: "text-[#B57D3E]",
    beanScale: 1.18,
    crackOpen: false,
    smoke: false,
    flavorProfile: "Тосты, выпечка, тростниковый сахар",
  },
  {
    temp: 196,
    name: "ПЕРВЫЙ КРЭК (First Crack)",
    shortDesc: "Пик раскрытия! Зерно трескается",
    fullDesc:
      "Кульминация обжарки! Внутреннее давление пара разрывает клеточную структуру зерна с громким щелчком («крэк»). Зерно увеличивается в 2 раза, раскрываются яркие цветочные и ягодные кислоты.",
    color: "#C45525",
    textColor: "text-[#C45525]",
    beanScale: 1.35,
    crackOpen: true,
    smoke: true,
    flavorProfile: "Жасмин, бергамот, спелое красное яблоко",
  },
  {
    temp: 208,
    name: "Светлая обжарка (Drop!)",
    shortDesc: "Выгрузка для фильтра (Эфиопия)",
    fullDesc:
      "Мы останавливаем обжарку и сбрасываем батч в охладитель. Весь цветочный букет и природная сладость Иргачеффе и Уилы запечатаны внутри.",
    color: "#8C4F2B",
    textColor: "text-[#8C4F2B]",
    beanScale: 1.38,
    crackOpen: true,
    smoke: false,
    flavorProfile: "Цветочный мед, цитрус, черный чай",
  },
  {
    temp: 216,
    name: "Эспрессо-профиль",
    shortDesc: "Выгрузка под кофемашину и турку",
    fullDesc:
      "Для Бразилии Серрадо мы доводим зерно до плотного шоколадного цвета. Кислотность уступает место бархатистой крема и нотам грецкого ореха.",
    color: "#2C1A11",
    textColor: "text-bean-espresso",
    beanScale: 1.42,
    crackOpen: true,
    smoke: false,
    flavorProfile: "Темный шоколад, какао, грецкий орех",
  },
];

export function RoastingSimulator() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(3); // Start at First Crack!
  const currentPhase = ROAST_PHASES[activePhaseIndex];

  return (
    <section className="py-16 sm:py-24 border-b border-bean-border bg-bean-crema/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-bean-border">
          <div>
            <div className="font-mono text-xs text-bean-muted uppercase tracking-widest mb-2 flex items-center gap-2">
              <CoffeeBeanIcon size={16} roast="green" />
              <span>[01.1] Интерактивный процесс обжарки</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-bean-espresso">
              Анатомия 5-килограммового батча
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-body text-bean-muted max-w-md text-sm sm:text-base leading-relaxed">
            Покрутите температуру, чтобы увидеть, как сырое зеленое зерно
            трансформируется в барабане ростера на ул. Короля, 9.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Interactive Bean Stage */}
          <div className="lg:col-span-6 bg-bean-parchment border-2 border-bean-espresso p-8 sm:p-12 relative flex flex-col items-center justify-center min-h-[380px] shadow-craft">
            {/* Live Temp Badge */}
            <div className="absolute top-4 left-4 font-mono text-xs px-3 py-1 bg-bean-espresso text-bean-parchment font-bold tracking-wider">
              ТЕМПЕРАТУРА: {currentPhase.temp}°C
            </div>

            {currentPhase.crackOpen && (
              <div className="absolute top-4 right-4 font-mono text-[11px] px-2.5 py-1 bg-bean-crack text-bean-parchment uppercase font-bold tracking-widest animate-pulse">
                ⚡ FIRST CRACK!
              </div>
            )}

            {/* Morphing Animated SVG Bean */}
            <div className="relative my-8 flex items-center justify-center">
              {/* Heat glow / smoke effect */}
              {currentPhase.smoke && (
                <div className="absolute -top-10 w-24 h-16 opacity-60 animate-bounce pointer-events-none">
                  <div className="text-center font-mono text-xs text-bean-crack font-bold tracking-widest">
                    * КРЭК! *
                  </div>
                </div>
              )}

              {/* Large Animated Bean */}
              <div
                className="transition-all duration-700 ease-out"
                style={{
                  transform: `scale(${currentPhase.beanScale})`,
                }}
              >
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="filter drop-shadow-md"
                >
                  {/* Bean Shape with live fill color */}
                  <path
                    d="M50 8C75 8 92 25 92 50C92 75 75 92 50 92C25 92 8 75 8 50C8 25 25 8 50 8Z"
                    fill={currentPhase.color}
                    className="transition-colors duration-700"
                  />
                  {/* Center Crack / Creep */}
                  <path
                    d={
                      currentPhase.crackOpen
                        ? "M50 16C44 28 56 38 48 50C40 62 55 72 50 84"
                        : "M50 20C46 30 54 40 49 50C44 60 53 70 50 80"
                    }
                    stroke="#F9F6F0"
                    strokeWidth={currentPhase.crackOpen ? "4.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-500"
                    opacity={currentPhase.crackOpen ? "0.95" : "0.7"}
                  />
                  {/* Subtle roasting oil sheen */}
                  {currentPhase.temp >= 208 && (
                    <circle
                      cx="65"
                      cy="35"
                      r="12"
                      fill="#FFFFFF"
                      opacity="0.15"
                    />
                  )}
                </svg>
              </div>
            </div>

            {/* Flavor descriptor pill */}
            <div className="w-full mt-4 pt-4 border-t border-bean-border flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-bean-muted gap-2">
              <span>ПРОФИЛЬ ВКУСА:</span>
              <span className="font-bold text-bean-espresso">
                {currentPhase.flavorProfile}
              </span>
            </div>
          </div>

          {/* Controls & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-bean-crack font-bold mb-1">
                ФАЗА {activePhaseIndex + 1} ИЗ {ROAST_PHASES.length} · {currentPhase.temp}°C
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-bean-espresso mb-3">
                {currentPhase.name}
              </h3>
              <p className="font-body text-base sm:text-lg text-bean-muted leading-relaxed">
                {currentPhase.fullDesc}
              </p>
            </div>

            {/* Clickable Phase Tabs */}
            <div className="space-y-2 pt-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-bean-muted mb-2 font-bold">
                Выберите контрольную точку температуры:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ROAST_PHASES.map((phase, idx) => {
                  const isActive = idx === activePhaseIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhaseIndex(idx)}
                      className={`text-left p-2.5 border transition-all text-xs font-mono ${
                        isActive
                          ? "bg-bean-espresso text-bean-parchment border-bean-espresso font-bold shadow-craft-sm"
                          : "bg-bean-parchment text-bean-espresso border-bean-border hover:border-bean-espresso"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{phase.temp}°C</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: phase.color }}
                        />
                      </div>
                      <div className="truncate mt-1 opacity-90">{phase.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fact Box */}
            <div className="p-4 bg-bean-parchment border-l-4 border-bean-crack border border-bean-border text-xs font-mono text-bean-espresso leading-relaxed">
              💡 <strong>Почему мы не используем темную обжарку «итальянского» типа?</strong>
              <br />
              При температуре выше 225°C природный сахар зерна сгорает в золу, оставляя лишь едкую горечь. Мы обжариваем так, чтобы в вашей чашке чувствовалась терруарная сладость ягоды, а не угли.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
