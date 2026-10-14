import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Subscription from "@/components/Subscription";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Story />
        <Subscription />
      </main>
    </>
  );
}
