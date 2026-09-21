"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EventInfo } from "../types/event";

export function useInfiniteEvents() {
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cursorRef = useRef<string | null>(null);
  const hasMoreRef = useRef(true);
  const isLoadingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMoreRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const query = cursorRef.current
        ? `?cursor=${encodeURIComponent(cursorRef.current)}`
        : "";
      const res = await fetch(`/api/events${query}`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data: { events: EventInfo[]; nextCursor: string | null } = await res.json();

      setEvents((prev) => {
        const existingIds = new Set(prev.map((event) => event.id));
        return [...prev, ...data.events.filter((event) => !existingIds.has(event.id))];
      });
      cursorRef.current = data.nextCursor;
      hasMoreRef.current = data.nextCursor !== null;
    } catch {
      setError("Failed to load events.");
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) loadMore();
      });
      observer.observe(node);
      observerRef.current = observer;
    },
    [loadMore]
  );

  return { events, isLoading, error, sentinelRef };
}
