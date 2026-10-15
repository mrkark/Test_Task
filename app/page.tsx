"use client";

import React, { useState } from "react";
import { CoffeeBeansCanvas } from "@/components/CoffeeBeansCanvas";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RoastingSimulator } from "@/components/RoastingSimulator";
import { FreshnessCycle } from "@/components/FreshnessCycle";
import { StorySection } from "@/components/StorySection";
import { CatalogSection } from "@/components/CatalogSection";
import { SubscriptionSection } from "@/components/SubscriptionSection";
import { DeliverySection } from "@/components/DeliverySection";
import { OrderSection } from "@/components/OrderSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [selectedInterest, setSelectedInterest] = useState<string>("subscription");

  const scrollToOrder = (interestId: string) => {
    setSelectedInterest(interestId);
    setTimeout(() => {
      const orderElement = document.getElementById("order");
      if (orderElement) {
        orderElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <main className="min-h-screen flex flex-col bg-bean-parchment dark:bg-bean-dark-bg text-bean-espresso dark:text-bean-dark-text relative selection:bg-bean-crack selection:text-bean-parchment transition-colors duration-300">
      {/* Floating Animated Coffee Beans Background Canvas (strictly -z-10) */}
      <CoffeeBeansCanvas />

      {/* Landing Page Content */}
      <Header />
      <Hero />
      <RoastingSimulator />
      <FreshnessCycle />
      <StorySection />
      <CatalogSection onSelectItem={(id) => scrollToOrder(id)} />
      <SubscriptionSection onSelectSubscription={() => scrollToOrder("subscription")} />
      <DeliverySection />
      <OrderSection
        selectedInterest={selectedInterest}
        onInterestChange={(id) => setSelectedInterest(id)}
      />
      <Footer />
    </main>
  );
}
