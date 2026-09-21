"use client";
import { useEffect, useState } from "react";
import type { EventInfo } from "../types/event";

export function useEventSearch(query: string) {
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setEvents([]);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(`/api/events?query=${encodeURIComponent(query)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to search events");
        return res.json();
      })
      .then((data: { events: EventInfo[] }) => {
        if (!cancelled) setEvents(data.events);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to search events.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { events, isLoading, error };
}
