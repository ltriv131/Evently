"use client";
import Image from "next/image";
import EventCard from "../components/EventCard";
import { events } from "../data/events";
import styles from "../css/EventsPage.module.css";
import { useState } from "react";
import { useSavedEvents } from "../hooks/useSavedEvents";
export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const { savedIds, isSaved, toggleSaved, isLoaded } = useSavedEvents();

  const submitQuery = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents page refresh

    setSubmittedQuery(searchQuery.trim());
  };

  const savedEvents = events.filter((event) => savedIds.includes(event.id));

  const filteredEvents = submittedQuery
    ? savedEvents.filter((event) =>
        event.title.toLowerCase().startsWith(submittedQuery.toLowerCase())
      )
    : savedEvents;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <h1 className={styles.title}>Saved Events</h1>
          <p className={styles.subtitle}>
            Pick back up where you left off
          </p>
        </div>
        <form className={styles.searchBar} onSubmit={submitQuery}>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search events"
            aria-label="Search events"
            value={searchQuery}
            onChange={(event) => (setSearchQuery(event.target.value))}
          />
          <button
            className={styles.searchButton}
            type="submit"
            aria-label="Submit search"
          >
            <Image
              className={styles.searchIcon}
              src="/icons/search.svg"
              alt=""
              width={20}
              height={20}
            />
          </button>
        </form>
      </div>
      <div className={styles.gridSection}>
        {isLoaded && filteredEvents.length === 0 ? (
          <p>No saved events yet.</p>
        ) : (
          <div className={styles.grid}>
            {isLoaded &&
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isSaved={isSaved(event.id)}
                  onToggleSave={toggleSaved}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
