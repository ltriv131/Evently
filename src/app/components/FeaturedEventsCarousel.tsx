import Image from "next/image";
import type { EventInfo } from "../types/event";
import FeaturedEventCard from "./FeaturedEventCard";
import styles from "../css/FeaturedEventsCarousel.module.css";

export default function FeaturedEventsCarousel({
  events,
  activeIndex,
  onPrev,
  onNext,
  onSelectIndex,
}: {
  events: EventInfo[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}) {
  const activeEvent = events[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.eyebrow}>
        <p className={styles.eyebrowNumber}>01</p>
        <span className={styles.eyebrowLine} />
        <p className={styles.eyebrowLabel}>Featured Events</p>
      </div>
      <p className={styles.heading}>All your clubs in one place</p>
      <div className={styles.carousel}>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Previous featured event"
            onClick={onPrev}
          >
            <Image src="/icons/chevron-left.svg" alt="" width={24} height={24} />
          </button>
          <div className={styles.pagination}>
            {events.map((event, index) => (
              <button
                key={event.id}
                type="button"
                className={`${styles.paginationDot} ${
                  index === activeIndex ? styles.paginationDotActive : ""
                }`}
                aria-label={`Show featured event ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => onSelectIndex(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Next featured event"
            onClick={onNext}
          >
            <Image src="/icons/chevron-right.svg" alt="" width={24} height={24} />
          </button>
        </div>
        {activeEvent && <FeaturedEventCard event={activeEvent} />}
      </div>
    </section>
  );
}
