import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "../../data/events";
import styles from "../../css/EventDetailPage.module.css";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage(
  props: PageProps<"/events/[id]">
) {
  const { id } = await props.params;
  const event = events.find((item) => item.id === id);

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
