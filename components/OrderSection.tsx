"use client";

import React, { useState, useEffect } from "react";
import { formatBelarusPhone, isValidBelarusPhone } from "@/lib/validations";
import { captureUtm, UtmParams } from "@/lib/utm";

interface OrderSectionProps {
  selectedInterest: string;
  onInterestChange: (interest: string) => void;
}

export function OrderSection({ selectedInterest, onInterestChange }: OrderSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        interest: selectedInterest,
        comment: comment.trim() || undefined,
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

  const interestOptions = [
    { id: "subscription", label: "Кофейная подписка (54 BYN / мес)" },
    { id: "ethiopia-yirgacheffe", label: "Эфиопия Иргачеффе (32 BYN)" },
    { id: "colombia-huila", label: "Колумбия Уила (29 BYN)" },
    { id: "brazil-cerrado", label: "Бразилия Серрадо (26 BYN)" },
    { id: "drip-assorted", label: "Дрип-пакеты, 10 шт (18 BYN)" },
    { id: "consultation", label: "Консультация / Другой вопрос" },
  ];

  return (
    <section id="order" className="py-16 sm:py-24 border-b border-craft-border bg-craft-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-craft-dark bg-craft-surface p-6 sm:p-10 lg:p-12 shadow-craft">
          <div className="font-mono text-xs text-craft-muted uppercase tracking-widest mb-3">
            [06] Оформление заявки
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-craft-dark mb-4">
            Заказ свежеобжаренного кофе
          </h2>
          <p className="font-body text-sm sm:text-base text-craft-muted mb-8 max-w-xl leading-relaxed">
            Оставьте номер телефона. Наш менеджер перезвонит, уточнит удобный
            способ помола (под турку, фильтр или зерно), адрес и согласует доставку на пятницу.
            Оплата при получении.
          </p>

          {/* Feedback states */}
          {submitStatus === "success" && (
            <div className="mb-8 p-6 bg-craft-bg border-2 border-craft-dark text-craft-dark">
              <div className="font-mono text-xs text-craft-accent uppercase tracking-widest mb-1 font-bold">
                ✓ ЗАЯВКА ПРИНЯТА
              </div>
              <p className="font-heading text-xl font-bold mb-2">
                Спасибо за заказ свежего кофе!
              </p>
              <p className="text-sm font-body text-craft-muted leading-relaxed">
                {serverMessage}
              </p>
              <button
                type="button"
                onClick={() => setSubmitStatus("idle")}
                className="mt-4 inline-block font-mono text-xs uppercase underline tracking-wider text-craft-dark hover:text-craft-accent"
              >
                Отправить еще одну заявку
              </button>
            </div>
          )}

          {submitStatus === "duplicate" && (
            <div className="mb-8 p-6 bg-amber-50 border border-amber-300 text-stone-800">
              <div className="font-mono text-xs text-amber-800 uppercase tracking-widest mb-1 font-bold">
                ℹ ЗАЯВКА УЖЕ ОБРАБАТЫВАЕТСЯ
              </div>
              <p className="text-sm font-body leading-relaxed">{serverMessage}</p>
              <div className="mt-3 text-xs font-mono text-stone-600">
                Защита от случайных повторных нажатий: номер уже в очереди у менеджера.
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 text-red-900">
              <div className="font-mono text-xs uppercase tracking-widest mb-1 font-bold text-red-700">
                ⚠ ОШИБКА ОТПРАВКИ
              </div>
              <p className="text-sm font-body leading-relaxed">{serverMessage}</p>
              <p className="mt-2 text-xs font-mono text-red-800">
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
              <label className="block font-mono text-xs uppercase tracking-wider text-craft-dark font-bold mb-3">
                1. Что вас интересует:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {interestOptions.map((opt) => {
                  const isChecked = selectedInterest === opt.id || selectedInterest === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onInterestChange(opt.id)}
                      className={`text-left p-3 text-xs sm:text-sm font-mono transition-all border ${
                        isChecked
                          ? "bg-craft-dark text-craft-bg border-craft-dark font-bold shadow-craft-sm"
                          : "bg-craft-bg text-craft-dark border-craft-border hover:border-craft-dark"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 border flex items-center justify-center text-[9px] ${isChecked ? "border-craft-bg" : "border-craft-muted"}`}>
                          {isChecked ? "●" : ""}
                        </span>
                        <span>{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Contact info (Understated border-bottom line inputs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="lead-name"
                  className="block font-mono text-xs uppercase tracking-wider text-craft-dark font-bold mb-1"
                >
                  2. Ваше имя *
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
                  className={`w-full bg-transparent border-b-2 py-3 px-1 text-sm sm:text-base font-body text-craft-dark placeholder-craft-muted/70 focus:outline-none transition-colors ${
                    nameError
                      ? "border-craft-accent"
                      : "border-craft-border focus:border-craft-dark"
                  }`}
                  disabled={isSubmitting}
                />
                {nameError && (
                  <p className="mt-1.5 text-xs font-mono text-craft-accent">
                    {nameError}
                  </p>
                )}
              </div>

              {/* Phone (Belarusian with auto-masking) */}
              <div>
                <label
                  htmlFor="lead-phone"
                  className="block font-mono text-xs uppercase tracking-wider text-craft-dark font-bold mb-1"
                >
                  3. Белорусский номер телефона *
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  placeholder="+375 (29) 000-00-00"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  className={`w-full bg-transparent border-b-2 py-3 px-1 text-sm sm:text-base font-mono text-craft-dark placeholder-craft-muted/70 focus:outline-none transition-colors ${
                    phoneError
                      ? "border-craft-accent"
                      : "border-craft-border focus:border-craft-dark"
                  }`}
                  disabled={isSubmitting}
                />
                {phoneError ? (
                  <p className="mt-1.5 text-xs font-mono text-craft-accent">
                    {phoneError}
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] font-mono text-craft-muted">
                    Формат: +375 (29/33/44/25) XXX-XX-XX
                  </p>
                )}
              </div>
            </div>

            {/* 3. Comment / Preferences */}
            <div className="pt-2">
              <label
                htmlFor="lead-comment"
                className="block font-mono text-xs uppercase tracking-wider text-craft-dark font-bold mb-1"
              >
                4. Пожелания (помол, адрес, время звонка)
              </label>
              <textarea
                id="lead-comment"
                rows={3}
                placeholder="Например: помолоть под турку; адрес: Минск, пр. Победителей 10; удобнее звонить после 14:00"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-transparent border-b-2 border-craft-border focus:border-craft-dark py-2 px-1 text-sm font-body text-craft-dark placeholder-craft-muted/70 focus:outline-none transition-colors resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* 4. Submit CTA Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 sm:py-5 px-8 font-mono text-sm uppercase tracking-widest bg-craft-dark text-craft-bg hover:bg-craft-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-craft active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-craft-bg border-t-transparent rounded-full animate-spin" />
                    <span>Отправка заявки в мастерскую...</span>
                  </>
                ) : (
                  <>
                    <span>Оформить заказ на свежую обжарку</span>
                    <span className="font-bold">→</span>
                  </>
                )}
              </button>

              <div className="mt-3 text-center text-xs font-mono text-craft-muted">
                🔒 Данные используются только для связи менеджера. Никакого спама.
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
