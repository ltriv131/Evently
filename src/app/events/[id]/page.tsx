import Link from "next/link";
import { notFound } from "next/navigation";
import type { EventInfo } from "../../types/event";
import styles from "../../css/EventDetailPage.module.css";

async function getEvent(id: string): Promise<EventInfo | null> {
  const apiUrl = process.env.EXPRESS_API_URL ?? "http://localhost:4000";
  const res = await fetch(
    `${apiUrl}/api/events?ids=${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch event");
  const data: { events: EventInfo[] } = await res.json();
  return data.events[0] ?? null;
}

export default async function EventDetailPage(
  props: PageProps<"/events/[id]">
) {
  const { id } = await props.params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Link href="/events" className={styles.back}>
          ← Back to Events
        </Link>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={event.image}
            alt={event.imageAlt}
          />
        </div>
        <div className={styles.meta}>
          <p className={styles.date}>{event.date}</p>
          <span className={styles.dot} />
          <p className={styles.category}>{event.category}</p>
        </div>
        <h1 className={styles.title}>{event.title}</h1>
        <div className={styles.details}>
          <p>{event.location}</p>
          <p>{event.time}</p>
        </div>
        <p className={styles.description}>{event.description}</p>
        <a className={styles.registerButton} href="#">
          Register
        </a>
      </div>
    </div>
  );
}
