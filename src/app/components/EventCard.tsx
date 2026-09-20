"use client";
import Image from "next/image";
import Link from "next/link";
import type { EventInfo } from "../types/event";
import styles from "../css/EventCard.module.css";

export default function EventCard({
  event,
  isSaved,
  onToggleSave,
}: {
  event: EventInfo;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}) {
  const {
    id,
    image,
    imageAlt,
    date,
    category,
    title,
    location,
    time,
    description,
    cta = "Register →",
  } = event;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.image} src={image} alt={imageAlt} />
        <button
          type="button"
          className={`${styles.saveButton} ${
            isSaved ? styles.saveButtonActive : ""
          }`}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove ${title} from saved` : `Save ${title}`}
          onClick={() => onToggleSave(id)}
        >
          <Image
            src={isSaved ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
            alt=""
            width={18}
            height={18}
          />
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <p className={styles.date}>{date}</p>
          <span className={styles.dot} />
          <p className={styles.category}>{category}</p>
        </div>
        <Link href={`/events/${id}`}>
          <p className={styles.title}>{title}</p>
        </Link>
        <div className={styles.details}>
          <p className={styles.location}>{location}</p>
          <p className={styles.time}>{time}</p>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <Link href={`/events/${id}`} className={styles.action}>
            {cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
