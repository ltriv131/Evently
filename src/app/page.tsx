"use client";
import { events } from "./data/events";
import FeaturedEventsCarousel from "./components/FeaturedEventsCarousel";
import { useEffect, useState } from "react";
import { useEventsByIds } from "./hooks/useEventsByIds";

// The events shown in the hero carousel, in slide order.
const featuredEventIds = ["GUOf8d7cm7AswSPq0VMq", "ZnQm0zQwdKEFDhn7u6AS", "kTXw6dpn0pmVirvTXbfp"];

export default function Home() {
  const { events: featuredEvents, isLoading, error } = useEventsByIds(featuredEventIds);
  
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
