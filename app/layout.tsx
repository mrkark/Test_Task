import type { Metadata, Viewport } from "next";
import { Alegreya, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

/*
  ДОПУЩЕНИЕ: в промпте для заголовков предложен Fraunces, но на Google Fonts у него нет
  кириллицы — русские буквы упали бы в системный fallback. Берём Alegreya: тёплая
  «книжная» антиква с настоящим курсивом и полной кириллицей.
*/
const display = Alegreya({
  subsets: ["cyrillic", "latin"],
  style: ["normal", "italic"],
  variable: "--f-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--f-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["cyrillic", "latin"],
  variable: "--f-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Кварта — свежеобжаренный кофе в Минске",
  description: "Ремесленная обжарка в Минске: жарим по четвергам, развозим по пятницам.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f4ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
