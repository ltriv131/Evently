"use client";
import { useEffect, useState } from "react";
import type { EventInfo } from "../types/event";

export function useEventsByIds(ids: string[]) {
  const idsKey = ids.join(",");
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idsKey) {
      setEvents([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(`/api/events?ids=${encodeURIComponent(idsKey)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data: { events: EventInfo[] }) => {
        if (!cancelled) setEvents(data.events);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load saved events.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [idsKey]);

  return { events, isLoading, error };
}
