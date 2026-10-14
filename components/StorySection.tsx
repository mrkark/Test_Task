import React from "react";

export function StorySection() {
  return (
    <section id="story" className="py-16 sm:py-24 border-b border-craft-border bg-craft-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Editorial Frame: Founders & Workshop Specs */}
          <div className="lg:col-span-5">
            <div className="border border-craft-dark bg-craft-surface p-6 sm:p-8 relative shadow-craft">
              <div className="font-mono text-xs text-craft-muted uppercase tracking-widest pb-3 border-b border-craft-border flex justify-between">
                <span>Мастерская на Короля, 9</span>
                <span>Минск · 2019</span>
              </div>

              {/* Graphic illustration / Stylized Craft roaster representation */}
              <div className="my-6 aspect-[4/3] bg-craft-subtle border border-craft-border flex flex-col justify-center items-center p-6 text-center">
                <div className="w-16 h-16 rounded-full border border-craft-dark flex items-center justify-center font-mono text-lg font-bold text-craft-accent mb-3">
                  5 kg
                </div>
                <div className="font-heading text-lg font-bold text-craft-dark">
                  Барабанный ростер партийного типа
                </div>
                <div className="font-mono text-xs text-craft-muted mt-1">
                  Ручной контроль температуры зерна каждые 30 секунд
                </div>
              </div>

              <div className="pt-2 text-xs font-mono text-craft-muted space-y-1">
                <div>ОСНОВАТЕЛИ: АНЯ И ДМИТРИЙ</div>
                <div>СПЕЦИАЛИЗАЦИЯ: СПЕШЕЛТИ ЗЕРНО СВЕЖЕГО УРОЖАЯ</div>
                <div>СТАЖ В КОФЕЙНОЙ ИНДУСТРИИ: 11 ЛЕТ</div>
              </div>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-7">
            <div className="font-mono text-xs text-craft-muted uppercase tracking-widest mb-3">
              [02] Кто мы такие
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-craft-dark mb-6 leading-tight">
              «Мы не строим кофейную империю. Мы просто любим отличный кофе».
            </h2>

            <div className="space-y-4 font-body text-craft-dark/80 text-base sm:text-lg leading-relaxed">
              <p>
                До 2019 года мы с Димой работали бариста в минских кофейнях. Каждый
                день мы готовили сотни чашек и видели одну и ту же проблему: даже самое
                дорогое зерно из Европы приезжает в Минск спустя 2–3 месяца после обжарки,
                растеряв половину своего букета.
              </p>
              <p>
                Тогда мы решили поставить свой небольшой ростер на ул. Короля, 9. 
                Мы сознательно выбрали объем партии всего в <strong>5 килограммов</strong>:
                при таком объеме обжарщик держит в руках буквально каждую пробу и слышит
                первый крэк зерна собственными ушами.
              </p>
              <p className="font-mono text-sm text-craft-accent border-l-2 border-craft-accent pl-4 py-1 italic">
                «Наша цель — чтобы вы пили кофе именно в тот момент, когда он благоухает
                цветами, ягодами или карамелью, а не ждал своего часа на полке».
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-craft-border flex flex-wrap items-center gap-6 font-mono text-xs text-craft-muted">
              <div>
                <span className="font-bold text-craft-dark block text-base font-heading">
                  12 000+
                </span>
                обжаренных килограммов
              </div>
              <div className="h-8 w-[1px] bg-craft-border hidden sm:block" />
              <div>
                <span className="font-bold text-craft-dark block text-base font-heading">
                  1–3 дня
                </span>
                от печи до вашей чашки
              </div>
              <div className="h-8 w-[1px] bg-craft-border hidden sm:block" />
              <div>
                <span className="font-bold text-craft-dark block text-base font-heading">
                  0 посредников
                </span>
                прямой контакт с клиентом
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
