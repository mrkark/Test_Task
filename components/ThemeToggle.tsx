"use client";

import React, { useEffect, useState } from "react";
import { CoffeeBeanIcon } from "./CoffeeBeanIcon";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme from localStorage or system preference
    const saved = localStorage.getItem("kvarta_theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("kvarta_theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("kvarta_theme", "dark");
      setIsDark(true);
    }
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 border border-bean-border dark:border-bean-dark-border opacity-0 ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 border transition-all duration-200 flex items-center justify-center gap-1.5 font-mono text-xs ${
        isDark
          ? "bg-bean-dark-card border-bean-dark-border text-bean-chaff hover:border-bean-dark-accent shadow-craft-sm-dark"
          : "bg-bean-crema border-bean-border text-bean-espresso hover:border-bean-espresso shadow-craft-sm"
      } ${className}`}
      aria-label={isDark ? "Переключить на светлую тему" : "Переключить на темную тему"}
      title={isDark ? "Светлая тема" : "Темная тема (эспрессо-обжарка)"}
    >
      {isDark ? (
        <>
          {/* Sun icon for light switch */}
          <svg className="w-4 h-4 text-bean-chaff" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" strokeWidth="2" />
            <path strokeWidth="2" strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-bold text-bean-dark-text">СВЕТ</span>
        </>
      ) : (
        <>
          {/* Coffee bean / dark roast icon */}
          <CoffeeBeanIcon size={16} roast="espresso" />
          <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-bold text-bean-espresso">ТЬМА</span>
        </>
      )}
    </button>
  );
}
