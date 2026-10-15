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
    const orderElement = document.getElementById("order");
    if (orderElement) {
      orderElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-bean-parchment text-bean-espresso relative selection:bg-bean-crack selection:text-bean-parchment">
      {/* Floating Animated Coffee Beans Background Canvas */}
      <CoffeeBeansCanvas />

      {/* Landing Page Content */}
      <Header />
      <Hero />
      <div id="roast-simulator">
        <RoastingSimulator />
      </div>
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
