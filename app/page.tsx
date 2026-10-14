import Delivery from "@/components/Delivery";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Order from "@/components/Order";
import Story from "@/components/Story";
import Subscription from "@/components/Subscription";

/** Структурированные данные для поисковиков: адрес, часы работы, зона доставки. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Кварта",
  description: "Ремесленная обжарка кофе: партии по 5 кг, обжарка по четвергам, доставка по Минску по пятницам.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Короля, 9",
    addressLocality: "Минск",
    addressCountry: "BY",
  },
  areaServed: "Минск",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="top">
        <Hero />
        <Story />
        <Menu />
        <Subscription />
        <Delivery />
        <Order />
      </main>
      <Footer />
    </>
  );
}
