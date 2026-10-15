import type { Metadata, Viewport } from "next";
import { Literata, Oswald } from "next/font/google";
import AttributionCapture from "@/components/AttributionCapture";
import "./globals.css";

/*
  Oswald — плотный узкий гротеск, похожий на трафаретную печать на мешках с зелёным кофе
  (страна, регион, сорт). Им набраны заголовки и цифры.
  Literata — тёплая текстовая антиква для всего остального.
  Оба шрифта с кириллицей, оба вариативные: два файла вместо четырёх.
*/
const display = Oswald({
  subsets: ["cyrillic", "latin"],
  variable: "--f-display",
  display: "swap",
});

const text = Literata({
  subsets: ["cyrillic", "latin"],
  style: ["normal", "italic"],
  variable: "--f-text",
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
  themeColor: "#3d4c26",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${text.variable}`}>
      <body>
        <AttributionCapture />
        {children}
      </body>
    </html>
  );
}
