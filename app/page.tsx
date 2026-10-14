import Delivery from "@/components/Delivery";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Story from "@/components/Story";
import Subscription from "@/components/Subscription";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Story />
        <Menu />
        <Subscription />
        <Delivery />
      </main>
      <Footer />
    </>
  );
}
