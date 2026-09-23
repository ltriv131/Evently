import Image from "next/image";
import Link from "next/link";
import styles from "../../../../css/EventSuccessPage.module.css";
import EventPreview from "./EventPreview";

export default async function EventCreationSuccessPage(
  props: PageProps<"/events/create/[id]/success">
) {
  const { id } = await props.params;

  return (
    <div className={styles.page}>
      <div className={styles.successColumn}>
        <div className={styles.celebrationHeader}>
          <div className={styles.successBadge}>
            <Image
              className={styles.badgeIcon}
              src="/icons/check-circle.svg"
              alt=""
              width={16}
              height={16}
            />
            <p className={styles.badgeText}>Event Created</p>
          </div>
          <h1 className={styles.title}>Your event is on the horizon.</h1>
          <p className={styles.subtitle}>
            Thanks for creating an event! Your event should now be visible
            on the events page.
          </p>
        </div>

        <div className={styles.guidelinesCard}>
          <p className={styles.guidelinesTitle}>What happens next?</p>
          <div className={styles.guidelinesList}>
            <p className={styles.guidelinesItem}>
              • View registrations on your account portal.
            </p>
            <p className={styles.guidelinesItem}>
              • A confirmation email has been sent to you.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href={`/events/${id}`} className={styles.primaryButton}>
            View Event Listing
          </Link>
          <Link href="/events/create" className={styles.secondaryButton}>
            Create Another Event
          </Link>
          <Link href="/events" className={styles.tertiaryLink}>
            Back to Events Directory
          </Link>
        </div>
      </div>

      <div className={styles.previewColumn}>
        <div className={styles.previewHeader}>
          <Image src="/icons/eye.svg" alt="" width={16} height={16} />
          <span className={styles.previewLabel}>Your Created Event</span>
        </div>
        <EventPreview id={id} />
      </div>
    </div>
  );
}
