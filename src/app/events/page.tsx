"use client";
import Image from "next/image";
import Link from "next/link";
import EventCard from "../components/EventCard";
import styles from "../css/EventsPage.module.css";
import { useSavedEvents } from "../hooks/useSavedEvents";
import { useInfiniteEvents } from "../hooks/useInfiniteEvents";
import { useEventSearch } from "../hooks/useEventSearch";
import { useState } from "react";

export default function EventsPage() {
  const { isSaved, toggleSaved } = useSavedEvents();
  const {
    events: infiniteEvents,
    isLoading: infiniteLoading,
    error: infiniteError,
    sentinelRef,
  } = useInfiniteEvents();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const {
    events: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useEventSearch(submittedQuery);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedQuery(query);
  }

  const isSearching = submittedQuery.length > 0;
  const displayedEvents = isSearching ? searchResults : infiniteEvents;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <h1 className={styles.title}>Events</h1>
          <p className={styles.subtitle}>
            Explore upcoming club events.
          </p>
        </div>
        <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      <div className={styles.gridSection}>
        <Link href="/events/create" className={styles.createEventButton}>
          Create Event
        </Link>
        { isSearching && searchResults.length === 0 && !searchLoading && <h1>No events found</h1> }
        <div className={styles.grid}>
          {displayedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSaved={isSaved(event.id)}
              onToggleSave={toggleSaved}
            />
          ))}
        </div>
        {isSearching ? (
          <>
            {searchLoading && <p>Searching…</p>}
            {searchError && <p>{searchError}</p>}
          </>
        ) : (
          <>
            <div ref={sentinelRef} />
            {infiniteLoading && <p>Loading more events…</p>}
            {infiniteError && <p>{infiniteError}</p>}
          </>
        )}
      </div>
    </div>
  );
}
