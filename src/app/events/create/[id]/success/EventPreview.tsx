"use client";

import EventCard from "../../../../components/EventCard";
import { useEventsByIds } from "../../../../hooks/useEventsByIds";
import styles from "../../../../css/EventSuccessPage.module.css";

export default function EventPreview({ id }: { id: string }) {
  const { events, isLoading, error } = useEventsByIds([id]);
  const event = events[0];

  if (isLoading) {
    return <div className={styles.previewPlaceholder}>Loading preview…</div>;
  }

  if (error || !event) {
    return (
      <div className={styles.previewPlaceholder}>
        Preview unavailable.
      </div>
    );
  }

  return <EventCard event={event} isSaved={false} onToggleSave={() => {}} />;
}
