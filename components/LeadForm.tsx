"use client";

import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import { INTERESTS, INTEREST_EVENT, type InterestId } from "@/lib/catalog";
import { formatPhone, nationalDigits, validatePhone } from "@/lib/phone";
import { getAttribution } from "@/lib/utm";

type Status = "idle" | "loading" | "success" | "error";
type Field = "name" | "phone" | "interest";
type Errors = Partial<Record<Field, string>>;

type Success = { name: string; phone: string; duplicate: boolean; message: string };

const NETWORK_ERROR =
  "Заявка не ушла: нет связи с сервером. Проверьте интернет и нажмите кнопку ещё раз. Всё, что вы ввели, сохранено, а если заявка всё же дошла, дубля не будет.";
const SERVER_ERROR =
  "Что-то пошло не так на нашей стороне. Нажмите кнопку ещё раз через минуту или загляните к нам на Короля, 9.";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<InterestId | "">("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // ловушка для ботов, человек её не видит

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState<Success | null>(null);

  // Жёсткая блокировка двойного нажатия: ref обновляется синхронно, state — нет.
  const sending = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Кнопки «Заказать» в каталоге и «Оформить подписку» выбирают пункт в форме.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<InterestId>).detail;
      if (INTERESTS.some((i) => i.id === id)) {
        setInterest(id);
        setErrors((prev) => ({ ...prev, interest: undefined }));
      }
    };
    window.addEventListener(INTEREST_EVENT, onSelect);
    return () => window.removeEventListener(INTEREST_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function onPhoneChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    let digits = nationalDigits(next);
    // Backspace по символу маски («)», «-», пробел») не меняет цифры, тогда удаляем последнюю цифру,
    // иначе маска «возвращала» бы символ и стереть номер было бы невозможно.
    if (next.length < phone.length && digits === nationalDigits(phone)) {
      digits = digits.slice(0, -1);
    }
    setPhone(formatPhone(digits));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  }

  function validate(): Errors {
    const found: Errors = {};
    if (name.trim().length < 2) found.name = "Напишите, как к вам обращаться.";
    const check = validatePhone(phone);
    if (!check.ok) found.phone = check.message;
    if (!interest) found.interest = "Выберите, что вас интересует.";
    return found;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;

    const found = validate();
    setErrors(found);
    if (found.name) return nameRef.current?.focus();
    if (found.phone) return phoneRef.current?.focus();
    if (found.interest) return;

    sending.current = true;
    setStatus("loading");
    setServerError("");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          interest,
          comment: comment.trim(),
          website,
          attribution: getAttribution(),
        }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSuccess({
          name: name.trim(),
          phone,
          duplicate: data.status === "duplicate",
          message: data.message,
        });
        setName("");
        setPhone("");
        setInterest("");
        setComment("");
        setStatus("success");
      } else if (res.status === 400 && data?.fieldErrors) {
        setErrors(data.fieldErrors as Errors);
        setStatus("idle");
      } else {
        setServerError(data?.message ?? SERVER_ERROR);
        setStatus("error");
      }
    } catch {
      setServerError(NETWORK_ERROR);
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      sending.current = false;
    }
  }

  if (status === "success" && success) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="relative border-2 border-ink bg-chaff p-6 text-ink shadow-[4px_4px_0_0_var(--color-amber)] outline-none md:p-8"
      >
        <span
          className="stamp stamp-down absolute right-5 top-5 bg-chaff px-3 py-1 font-display text-lg font-semibold uppercase tracking-[0.08em] text-stamp"
          aria-hidden="true"
        >
          {success.duplicate ? "Уже у нас" : "Принято"}
        </span>
        <h3 className="h-stamp max-w-[12ch] pr-28 text-[clamp(2rem,4vw,2.8rem)]">
          Спасибо, {success.name}!
        </h3>
        <p className="mt-5 text-[1.0625rem]">{success.message}</p>
        <p className="mt-2 text-ink-soft">
          Ждите звонок на{" "}
          <span className="font-display text-lg tracking-[0.03em] text-ink">{success.phone}</span>. Мы
          на связи пн–пт 8:00–20:00, сб–вс 10:00–18:00.
        </p>
        <button type="button" className="btn btn-outline-ink mt-7" onClick={() => setStatus("idle")}>
          Оставить ещё одну заявку
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-8" aria-busy={loading}>
      <label className="block">
        <span className="text-lg font-medium">Имя</span>
        <input
          ref={nameRef}
          className="field"
          name="name"
          type="text"
          autoComplete="given-name"
          maxLength={60}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "err-name" : undefined}
          placeholder="Как к вам обращаться"
        />
        {errors.name && (
          <p id="err-name" role="alert" className="mt-2 text-base text-flag">
            {errors.name}
          </p>
        )}
      </label>

      <label className="block">
        <span className="text-lg font-medium">Телефон</span>
        <input
          ref={phoneRef}
          className="field font-display tracking-[0.04em]"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={onPhoneChange}
          onBlur={() => {
            if (!phone) return;
            const check = validatePhone(phone);
            setErrors((prev) => ({ ...prev, phone: check.ok ? undefined : check.message }));
          }}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "err-phone" : "hint-phone"}
          placeholder="+375 (29) 123-45-67"
        />
        {errors.phone ? (
          <p id="err-phone" role="alert" className="mt-2 text-base text-flag">
            {errors.phone}
          </p>
        ) : (
          <p id="hint-phone" className="mt-2 text-sm text-chaff-soft">
            Мобильный: 25, 29, 33 или 44.
          </p>
        )}
      </label>

      <fieldset>
        <legend className="text-lg font-medium">Что интересует</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((item) => (
            <label key={item.id} className="cursor-pointer">
              <input
                type="radio"
                name="interest"
                value={item.id}
                checked={interest === item.id}
                onChange={() => {
                  setInterest(item.id);
                  if (errors.interest) setErrors((prev) => ({ ...prev, interest: undefined }));
                }}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center rounded-sm border-2 border-chaff-soft px-4 font-display text-lg font-medium uppercase tracking-[0.04em] transition-colors hover:bg-chaff/15 peer-checked:border-amber peer-checked:bg-amber peer-checked:text-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-chaff">
                {item.label}
              </span>
            </label>
          ))}
        </div>
        {errors.interest && (
          <p role="alert" className="mt-3 text-base text-flag">
            {errors.interest}
          </p>
        )}
      </fieldset>

      <label className="block">
        <span className="text-lg font-medium">Комментарий</span>
        <textarea
          className="field"
          name="comment"
          rows={3}
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Помол, адрес доставки, пожелания"
        />
      </label>

      {/* Ловушка для ботов: скрыта от людей и скринридеров, заполненная заявка тихо отбрасывается. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Сайт
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div>
        {status === "error" && (
          <p role="alert" className="mb-4 border-l-4 border-flag pl-4">
            {serverError}
          </p>
        )}
        <button type="submit" className="btn btn-amber w-full md:w-auto md:min-w-[18rem]" disabled={loading}>
          {loading ? "Отправляем…" : status === "error" ? "Отправить ещё раз" : "Отправить заявку"}
        </button>
        <p className="mt-4 max-w-[44ch] text-sm text-chaff-soft">
          Номер нужен только чтобы перезвонить по заявке. Оплачивать на сайте ничего не нужно.
        </p>
      </div>
    </form>
  );
}
