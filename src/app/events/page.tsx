"use client";
import Image from "next/image";
import EventCard from "../components/EventCard";
import styles from "../css/EventsPage.module.css";
import { useSavedEvents } from "../hooks/useSavedEvents";
import { useInfiniteEvents } from "../hooks/useInfiniteEvents";

export default function EventsPage() {
  const { isSaved, toggleSaved } = useSavedEvents();
  const { events, isLoading, error, sentinelRef } = useInfiniteEvents();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <h1 className={styles.title}>Events</h1>
          <p className={styles.subtitle}>
            Explore upcoming talks, workshops, and studio gatherings.
          </p>
        </div>
        <div className={styles.searchBar}>
          <Image
            className={styles.searchIcon}
            src="/icons/search.svg"
            alt=""
            width={20}
            height={20}
          />
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search events"
            aria-label="Search events"
          />
        </div>
      </div>
      <div className={styles.gridSection}>
        <div className={styles.grid}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSaved={isSaved(event.id)}
              onToggleSave={toggleSaved}
            />
          ))}
        </div>
        <div ref={sentinelRef} />
        {isLoading && <p>Loading more events…</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
