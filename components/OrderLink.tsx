"use client";

import type { ReactNode } from "react";
import { INTEREST_EVENT, type InterestId } from "@/lib/catalog";

/**
 * Ссылка-якорь к форме. Скролл делает браузер (smooth через CSS), а перед этим
 * сообщаем форме, что выбрать в «Что интересует». Без JS работает как обычный якорь.
 */
export default function OrderLink({
  href = "#order",
  interest,
  className,
  children,
}: {
  href?: string;
  interest?: InterestId;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        if (interest) {
          window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }));
        }
      }}
    >
      {children}
    </a>
  );
}
