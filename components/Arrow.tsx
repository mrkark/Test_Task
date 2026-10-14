/** Кастомная стрелка вместо иконки из пака: линия 1.5px, без заливок. */
export default function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M2 9h13M10 4l5 5-5 5" />
    </svg>
  );
}
