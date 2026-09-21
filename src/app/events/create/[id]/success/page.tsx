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
            <p className={styles.badgeText}>Submission Received</p>
          </div>
          <h1 className={styles.title}>Your event is on the horizon.</h1>
          <p className={styles.subtitle}>
            Thank you for contributing to the collective. Your workshop
            proposal has been successfully submitted and is now awaiting
            coordinator approval.
          </p>
        </div>

        <div className={styles.guidelinesCard}>
          <p className={styles.guidelinesTitle}>What happens next?</p>
          <div className={styles.guidelinesList}>
            <p className={styles.guidelinesItem}>
              • Our studio coordinators will review your listing details
              within 24 hours.
            </p>
            <p className={styles.guidelinesItem}>
              • Once approved, it will be published to the public Events
              Directory.
            </p>
            <p className={styles.guidelinesItem}>
              • A confirmation email has been sent to you with edit links
              and tracking details.
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
