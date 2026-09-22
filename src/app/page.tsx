"use client";
import { events } from "./data/events";
import FeaturedEventsCarousel from "./components/FeaturedEventsCarousel";
import { useState } from "react";

// The events shown in the hero carousel, in slide order.
const featuredEvents = [events[4], events[0], events[1]];

export default function Home() {
  // TODO: replace with real carousel state (e.g. useState) and wire up
  // navigation - this is intentionally left as a no-op stub.
  const [activeIndex, setActiveIndex]=useState(0)

  function handlePrev() {
    setActiveIndex((prev) => Math.abs((prev - 1) % featuredEvents.length));
  }

  function handleNext() {
    setActiveIndex((prev) => (prev + 1) % 3)
  }

  function handleSelectIndex(index: number) {
    setActiveIndex(index);
  }

  return (
    <FeaturedEventsCarousel
      events={featuredEvents}
      activeIndex={activeIndex}
      onPrev={handlePrev}
      onNext={handleNext}
      onSelectIndex={handleSelectIndex}
    />
  );
}
