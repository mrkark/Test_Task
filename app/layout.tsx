import type { Metadata, Viewport } from "next";
import { Alegreya, JetBrains_Mono, Manrope } from "next/font/google";
import AttributionCapture from "@/components/AttributionCapture";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Кварта — свежеобжаренный кофе в Минске, доставка по пятницам";
const description =
  "Ремесленная обжарка в Минске: жарим по 5 кг по четвергам, развозим по пятницам. Зерно у вас на 1–3 день после обжарки. Подписка 54 BYN в месяц.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "свежеобжаренный кофе Минск",
    "кофе в зёрнах Минск",
    "обжарка кофе",
    "кофе с доставкой Минск",
    "подписка на кофе",
    "дрип-пакеты",
    "Кварта",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    siteName: "Кварта",
    url: "/",
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Кварта — ремесленная обжарка кофе, Минск" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f4ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <AttributionCapture />
        {children}
      </body>
    </html>
  );
}
