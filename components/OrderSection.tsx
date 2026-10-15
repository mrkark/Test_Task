"use client";

import React, { useState, useEffect } from "react";
import { formatBelarusPhone, isValidBelarusPhone } from "@/lib/validations";
import { captureUtm, UtmParams } from "@/lib/utm";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

interface OrderSectionProps {
  selectedInterest: string;
  onInterestChange: (interest: string) => void;
}

export function OrderSection({ selectedInterest, onInterestChange }: OrderSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [grindOption, setGrindOption] = useState<string>("whole-bean");
  const [comment, setComment] = useState("");
  const [utmData, setUtmData] = useState<UtmParams>({});

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "duplicate" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  useEffect(() => {
    // Capture UTM on mount
    const utm = captureUtm();
    setUtmData(utm);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatBelarusPhone(raw);
    setPhone(formatted);

    if (phoneError) {
      if (isValidBelarusPhone(formatted)) {
        setPhoneError(null);
      }
    }
  };

  const handlePhoneBlur = () => {
    if (phone.trim().length > 0 && !isValidBelarusPhone(phone)) {
      setPhoneError("Пожалуйста, введите корректный номер Беларуси: +375 (29/33/44/25) XXX-XX-XX");
    } else {
      setPhoneError(null);
    }
  };

  const grindOptions = [
    { id: "whole-bean", label: "В цельных зёрнах", desc: "Максимальная свежесть", iconRoast: "light" as const },
    { id: "v60-filter", label: "Под фильтр / воронку V60", desc: "Средний помол", iconRoast: "medium" as const },
    { id: "espresso", label: "Под эспрессо", desc: "Мелкий помол", iconRoast: "dark" as const },
    { id: "cezve", label: "Под турку / джезву", desc: "В пудру", iconRoast: "espresso" as const },
    { id: "french-press", label: "Под френч-пресс", desc: "Крупный помол", iconRoast: "drying" as const },
  ];

  const interestOptions = [
    { id: "subscription", label: "Кофейная подписка (54 BYN / мес)" },
    { id: "ethiopia-yirgacheffe", label: "Эфиопия Иргачеффе (32 BYN)" },
    { id: "colombia-huila", label: "Колумбия Уила (29 BYN)" },
    { id: "brazil-cerrado", label: "Бразилия Серрадо (26 BYN)" },
    { id: "drip-assorted", label: "Дрип-пакеты, 10 шт (18 BYN)" },
    { id: "consultation", label: "Консультация по выбору зерна" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validations
    let hasError = false;
    if (name.trim().length < 2) {
      setNameError("Пожалуйста, укажите ваше имя (минимум 2 буквы)");
      hasError = true;
    } else {
      setNameError(null);
    }

    if (!isValidBelarusPhone(phone)) {
      setPhoneError("Номер должен начинаться с +375 и содержать код оператора (29, 33, 44, 25, 17)");
      hasError = true;
    } else {
      setPhoneError(null);
    }

    if (hasError) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setServerMessage("");

    // Prepare full comment including selected grind option
    const grindLabel = grindOptions.find((g) => g.id === grindOption)?.label || "В зернах";
    const fullComment = `Помол: ${grindLabel}${comment.trim() ? `. Пожелания: ${comment.trim()}` : ""}`;

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        interest: selectedInterest,
        comment: fullComment,
        utm_source: utmData.utm_source,
        utm_medium: utmData.utm_medium,
        utm_campaign: utmData.utm_campaign,
        utm_content: utmData.utm_content,
        utm_term: utmData.utm_term,
        referrer: utmData.referrer,
        page: typeof window !== "undefined" ? window.location.pathname : undefined,
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.duplicate) {
          setSubmitStatus("duplicate");
          setServerMessage(
            data.message || "Вы уже оставляли заявку на этот номер. Менеджер уже в пути или скоро наберёт вам!"
          );
        } else {
          setSubmitStatus("success");
          setServerMessage(
            data.message || "Заявка успешно принята! Мы перезвоним вам в течение 15 минут для подтверждения."
          );
          // Reset form fields
          setName("");
          setPhone("");
          setComment("");
        }
      } else {
        setSubmitStatus("error");
        setServerMessage(
          data.error || "Не удалось отправить заявку. Попробуйте еще раз или напишите нам в Telegram."
        );
      }
    } catch (err) {
      setSubmitStatus("error");
      setServerMessage(
        "Произошла ошибка связи с сервером. Пожалуйста, проверьте интернет-соединение."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-16 sm:py-24 border-b border-bean-border dark:border-bean-dark-border bg-bean-parchment dark:bg-bean-dark-bg relative z-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-bean-espresso dark:border-bean-dark-border bg-bean-crema dark:bg-bean-dark-surface p-6 sm:p-10 lg:p-12 shadow-craft dark:shadow-craft-dark">
          <div className="font-mono text-xs text-bean-muted dark:text-bean-dark-muted uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <CoffeeBeanIcon size={14} roast="crack" />
            <span>[07] Оформление свежей обжарки</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-bean-espresso dark:text-bean-dark-text mb-4">
            Заказ свежего зерна из четверговой партии
          </h2>
          <p className="font-body text-sm sm:text-base text-bean-muted dark:text-bean-dark-muted mb-8 max-w-xl leading-relaxed">
            Оставьте номер телефона. Наш обжарщик или менеджер свяжется с вами,
            подтвердит помол, согласует удобный адрес доставки на пятницу или
            подготовит самовывоз на ул. Короля, 9. Оплата при получении.
          </p>

          {/* Feedback states */}
          {submitStatus === "success" && (
            <div className="mb-8 p-6 bg-bean-parchment dark:bg-bean-dark-card border-2 border-bean-espresso dark:border-bean-dark-border text-bean-espresso dark:text-bean-dark-text">
              <div className="font-mono text-xs text-bean-crack dark:text-bean-dark-accent uppercase tracking-widest mb-1 font-bold flex items-center gap-1.5">
                <CoffeeBeanIcon size={14} roast="crack" />
                <span>✓ ЗАЯВКА ПРИНЯТА В ОБЖАРОЧНЫЙ ПЛАН</span>
              </div>
              <p className="font-heading text-xl font-bold mb-2">
                Спасибо за выбор свежего зерна «Кварта»!
              </p>
              <p className="text-sm font-body text-bean-muted dark:text-bean-dark-muted leading-relaxed">
                {serverMessage}
              </p>
              <button
                type="button"
                onClick={() => setSubmitStatus("idle")}
                className="mt-4 inline-block font-mono text-xs uppercase underline tracking-wider text-bean-espresso dark:text-bean-dark-text hover:text-bean-crack dark:hover:text-bean-dark-accent cursor-pointer"
              >
                Отправить еще одну заявку
              </button>
            </div>
          )}

          {submitStatus === "duplicate" && (
            <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-stone-800 dark:text-amber-200">
              <div className="font-mono text-xs text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-1 font-bold">
                ℹ ЗАЯВКА УЖЕ ОБРАБАТЫВАЕТСЯ
              </div>
              <p className="text-sm font-body leading-relaxed">{serverMessage}</p>
              <div className="mt-3 text-xs font-mono text-stone-600 dark:text-amber-300">
                Защита от дублей: номер уже зафиксирован в плане на эту пятницу.
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-8 p-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200">
              <div className="font-mono text-xs uppercase tracking-widest mb-1 font-bold text-red-700 dark:text-red-400">
                ⚠ ОШИБКА ОТПРАВКИ
              </div>
              <p className="text-sm font-body leading-relaxed">{serverMessage}</p>
              <p className="mt-2 text-xs font-mono text-red-800 dark:text-red-300">
                Вы также можете связаться с нами напрямую в Telegram:{" "}
                <a href="https://t.me/kvarta_roastery" target="_blank" rel="noopener noreferrer" className="underline font-bold">
                  @kvarta_roastery
                </a>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* 1. What interests you (Chips / Radio) */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-bean-espresso dark:text-bean-dark-text font-bold mb-3">
                1. Выберите сорт или подписку:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {interestOptions.map((opt) => {
                  const isChecked = selectedInterest === opt.id || selectedInterest === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onInterestChange(opt.id)}
                      className={`text-left p-3 text-xs sm:text-sm font-mono transition-all border cursor-pointer ${
                        isChecked
                          ? "bg-bean-espresso dark:bg-bean-dark-accent text-bean-parchment dark:text-bean-dark-bg border-bean-espresso dark:border-bean-dark-accent font-bold shadow-craft-sm dark:shadow-craft-sm-dark"
                          : "bg-bean-parchment dark:bg-bean-dark-card text-bean-espresso dark:text-bean-dark-text border-bean-border dark:border-bean-dark-border hover:border-bean-espresso dark:hover:border-bean-dark-accent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CoffeeBeanIcon
                          size={14}
                          roast={isChecked ? "crack" : "drying"}
                          className={isChecked ? "opacity-100" : "opacity-40"}
                        />
                        <span>{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Grind Selector (Интерактивный выбор помола зерна) */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-bean-espresso dark:text-bean-dark-text font-bold mb-3 flex items-center justify-between">
                <span>2. Помол зерна (бесплатно):</span>
                <span className="text-bean-crack dark:text-bean-dark-accent font-normal text-[11px] lowercase">
                  * смолем прямо перед отправкой
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {grindOptions.map((g) => {
                  const isSelected = grindOption === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrindOption(g.id)}
                      className={`p-2.5 text-left border transition-all text-xs font-mono flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "bg-bean-espresso dark:bg-bean-dark-accent text-bean-parchment dark:text-bean-dark-bg border-bean-espresso dark:border-bean-dark-accent font-bold shadow-craft-sm dark:shadow-craft-sm-dark"
                          : "bg-bean-parchment dark:bg-bean-dark-card text-bean-espresso dark:text-bean-dark-text border-bean-border dark:border-bean-dark-border hover:border-bean-espresso dark:hover:border-bean-dark-accent"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <CoffeeBeanIcon size={14} roast={g.iconRoast} />
                        {isSelected && <span className="text-[10px] text-bean-crack dark:text-bean-dark-bg font-bold">✓</span>}
                      </div>
                      <div className="font-bold leading-tight">{g.label}</div>
                      <div className="text-[10px] opacity-75 mt-1">{g.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="lead-name"
                  className="block font-mono text-xs uppercase tracking-wider text-bean-espresso dark:text-bean-dark-text font-bold mb-1"
                >
                  3. Ваше имя *
                </label>
                <input
                  id="lead-name"
                  type="text"
                  placeholder="Как к вам обращаться?"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError(null);
                  }}
                  className={`w-full bg-transparent border-b-2 py-3 px-1 text-sm sm:text-base font-body text-bean-espresso dark:text-bean-dark-text placeholder-bean-muted/60 dark:placeholder-bean-dark-muted/60 focus:outline-none transition-colors ${
                    nameError
                      ? "border-bean-crack dark:border-bean-dark-accent"
                      : "border-bean-border dark:border-bean-dark-border focus:border-bean-espresso dark:focus:border-bean-dark-accent"
                  }`}
                  disabled={isSubmitting}
                />
                {nameError && (
                  <p className="mt-1.5 text-xs font-mono text-bean-crack dark:text-bean-dark-accent">
                    {nameError}
                  </p>
                )}
              </div>

              {/* Phone (Belarusian with auto-masking) */}
              <div>
                <label
                  htmlFor="lead-phone"
                  className="block font-mono text-xs uppercase tracking-wider text-bean-espresso dark:text-bean-dark-text font-bold mb-1"
                >
                  4. Белорусский телефон для связи *
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  placeholder="+375 (29) 000-00-00"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  className={`w-full bg-transparent border-b-2 py-3 px-1 text-sm sm:text-base font-mono text-bean-espresso dark:text-bean-dark-text placeholder-bean-muted/60 dark:placeholder-bean-dark-muted/60 focus:outline-none transition-colors ${
                    phoneError
                      ? "border-bean-crack dark:border-bean-dark-accent"
                      : "border-bean-border dark:border-bean-dark-border focus:border-bean-espresso dark:focus:border-bean-dark-accent"
                  }`}
                  disabled={isSubmitting}
                />
                {phoneError ? (
                  <p className="mt-1.5 text-xs font-mono text-bean-crack dark:text-bean-dark-accent">
                    {phoneError}
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] font-mono text-bean-muted dark:text-bean-dark-muted">
                    Формат: +375 (29/33/44/25) XXX-XX-XX
                  </p>
                )}
              </div>
            </div>

            {/* 4. Comment / Delivery address */}
            <div className="pt-2">
              <label
                htmlFor="lead-comment"
                className="block font-mono text-xs uppercase tracking-wider text-bean-espresso dark:text-bean-dark-text font-bold mb-1"
              >
                5. Адрес доставки в Минске или самовывоз
              </label>
              <textarea
                id="lead-comment"
                rows={2}
                placeholder="Например: доставка в пятницу на пр. Независимости 15, кв. 4 или самовывоз на ул. Короля, 9"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-transparent border-b-2 border-bean-border dark:border-bean-dark-border focus:border-bean-espresso dark:focus:border-bean-dark-accent py-2 px-1 text-sm font-body text-bean-espresso dark:text-bean-dark-text placeholder-bean-muted/60 dark:placeholder-bean-dark-muted/60 focus:outline-none transition-colors resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* 5. Submit CTA Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 px-8 font-mono text-sm uppercase tracking-widest bg-bean-espresso dark:bg-bean-dark-accent text-bean-parchment dark:text-bean-dark-bg hover:bg-bean-crack dark:hover:bg-bean-crack disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-craft dark:shadow-craft-dark active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-bean-parchment border-t-transparent rounded-full animate-spin" />
                    <span>Внесение зерна в план обжарки...</span>
                  </>
                ) : (
                  <>
                    <CoffeeBeanIcon size={16} roast="light" />
                    <span>Заказать свежеобжаренное зерно</span>
                    <span className="font-bold">→</span>
                  </>
                )}
              </button>

              <div className="mt-3 text-center text-xs font-mono text-bean-muted dark:text-bean-dark-muted flex items-center justify-center gap-1.5">
                <CoffeeBeanIcon size={12} roast="medium" />
                <span>Оплата курьеру при получении пачки или при самовывозе на Короля, 9.</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
