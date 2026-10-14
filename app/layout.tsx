import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F6F4EE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Обжарка «Кварта» · Свежий кофе в Минске",
  description:
    "Ремесленная обжарка кофе партиями по 5 кг. Жарим по четвергам, по пятницам развозим по Минску. Свежесть — зерно у вас на 1–3 день после обжарки.",
  keywords: [
    "кофе минск",
    "свежая обжарка",
    "обжарка кварта",
    "купить кофе в зернах минск",
    "подписка на кофе минск",
    "спешелти кофе минск",
  ],
  authors: [{ name: "Обжарка Кварта", url: "https://kvarta-coffee.by" }],
  creator: "Аня и Дмитрий",
  metadataBase: new URL("https://kvarta-coffee.by"),
  openGraph: {
    title: "Обжарка «Кварта» · Кофе 1–3 дня после обжарки в Минске",
    description:
      "Маленькая мастерская на Короля, 9. Обжариваем по четвергам, доставляем по пятницам прямо в руки. Попробуйте свежесть без пафоса.",
    url: "https://kvarta-coffee.by",
    siteName: "Обжарка Кварта",
    locale: "ru_BY",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Обжарка кофе Кварта — Минск, Короля 9",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Обжарка «Кварта» · Свежий кофе в Минске",
    description: "Жарим по четвергам, развозим по пятницам. Зерно на 1–3 день после обжарки.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* LocalBusiness Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Обжарка «Кварта»",
              description: "Ремесленная микрообжарка кофе в Минске",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Короля, 9",
                addressLocality: "Минск",
                addressCountry: "BY",
              },
              openingHours: ["Mo-Fr 08:00-20:00", "Sa-Su 10:00-18:00"],
              priceRange: "18 - 54 BYN",
              founders: [
                { "@type": "Person", name: "Аня" },
                { "@type": "Person", name: "Дмитрий" },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-craft-bg text-craft-dark min-h-screen selection:bg-craft-accent selection:text-craft-bg antialiased">
        {children}
      </body>
    </html>
  );
}
