import type { CSSProperties } from "react";

/** Контур зерна без обёртки <svg>: используется и в герое, и в каталоге. Размер 200×280. */
export function BeanPaths() {
  return (
    <>
      <ellipse className="bean-body" cx="100" cy="140" rx="78" ry="118" />
      {/* правая половина темнее: плоская «тень», без градиента */}
      <path className="bean-shade" d="M100 22C62 100 138 180 100 258A78 118 0 0 0 100 22Z" />
      <ellipse className="bean-hi" cx="66" cy="92" rx="12" ry="32" transform="rotate(16 66 92)" />
      <path className="bean-crease" d="M100 22C62 100 138 180 100 258" fill="none" strokeLinecap="round" />
    </>
  );
}

/** Одно зерно нужного цвета, например для строки каталога. */
export default function Bean({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 280"
      className={className}
      style={{ "--bean": color } as CSSProperties}
      aria-hidden="true"
    >
      <BeanPaths />
    </svg>
  );
}
