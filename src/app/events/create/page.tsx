"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EventCard from "../../components/EventCard";
import type { EventInfo } from "../../types/event";
import styles from "../../css/CreateEventPage.module.css";
import { useRouter } from "next/navigation";

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

type EventDraft = Omit<EventInfo, "id">;

const EMPTY_DRAFT: EventDraft = {
  image: "",
  imageAlt: "",
  date: "",
  category: "",
  title: "",
  location: "",
  time: "",
  description: "",
};

export default function CreateEventPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<EventDraft>(EMPTY_DRAFT);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  function updateField<K extends keyof EventDraft>(field: K, value: string) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (file && !file.type.startsWith("image/")) {
      setFileError("Please choose an image file.");
      setImageFile(null);
      e.target.value = "";
      return;
    }

    setFileError(null);
    setImageFile(file);
  }

  async function createEvent(event: EventDraft) {
    const eventToSubmit = { ...event };
    let imageDataUri: string | undefined;

    if (imageFile) {
      imageDataUri = await fileToDataUri(imageFile);
    } else {
      eventToSubmit.image = "/images/events/woodturning-at-soot-workshop.jpg"; // Use a default image if none is provided
    }

    fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event: eventToSubmit, imageDataUri }),
    }).then((res) => {
      if (!res.ok) {
        console.error("Failed to create event");
        setSubmissionSuccess(false);
      } else {
        console.log("Event created successfully");
        setSubmissionSuccess(true);
        router.push("/events/create/success");
      }});
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createEvent(draft);
  }

  const previewEvent: EventInfo = {
    id: "preview",
    image: draft.image,
    imageAlt: draft.imageAlt,
    date: draft.date || "14 Feb 2026",
    category: draft.category || "Category",
    title: draft.title || "Your Event Title Here",
    location: draft.location || "Event Location",
    time: draft.time || "10:00 - 14:00",
    description:
      draft.description ||
      "The description of your gathering will update here as you compose your submission on the left.",
  };

  return (
    <div className={styles.page}>
      <form className={styles.formColumn} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <div className={styles.breadcrumb}>
            <Link href="/events" className={styles.breadcrumbLink}>
              Events
            </Link>
            <span className={styles.breadcrumbDot} />
            <span className={styles.breadcrumbCurrent}>Create New</span>
          </div>
          <h1 className={styles.title}>Submit an Event</h1>
          <p className={styles.subtitle}>
            Fill out the details below to propose a workshop, studio visit,
            or quiet exhibition.
          </p>
        </div>

        <div className={styles.formFields}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="event-title">
              Event Title
            </label>
            <input
              id="event-title"
              className={styles.input}
              type="text"
              placeholder="e.g. Hand-Building with Stoneware Clay"
              value={draft.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldHalf}>
              <label className={styles.label} htmlFor="event-date">
                Date
              </label>
              <input
                id="event-date"
                className={styles.input}
                type="text"
                placeholder="14 Feb 2026"
                value={draft.date}
                onChange={(e) => updateField("date", e.target.value)}
              />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.label} htmlFor="event-time">
                Time Frame
              </label>
              <input
                id="event-time"
                className={styles.input}
                type="text"
                placeholder="10:00 - 14:00"
                value={draft.time}
                onChange={(e) => updateField("time", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldHalf}>
              <label className={styles.label} htmlFor="event-category">
                Category
              </label>
              <input
                id="event-category"
                className={styles.input}
                type="text"
                placeholder="Workshop, Studio Visit, Talk, etc."
                value={draft.category}
                onChange={(e) => updateField("category", e.target.value)}
              />
            </div>
            <div className={styles.fieldHalf}>
              <label className={styles.label} htmlFor="event-location">
                Location
              </label>
              <input
                id="event-location"
                className={styles.input}
                type="text"
                placeholder="e.g. London Studio"
                value={draft.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="event-image-file">
              Event Cover Image
            </label>
            <label className={styles.uploadContainer} htmlFor="event-image-file">
              <div className={styles.uploadIconCircle}>
                <Image
                  src="/icons/image.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <div className={styles.uploadText}>
                <p className={styles.uploadPrimaryText}>
                  Drag and drop your image, or browse
                </p>
                <p className={styles.uploadSecondaryText}>
                  Supports JPG, PNG up to 5MB (Recommended ratio 16:9)
                </p>
              </div>
            </label>
            <input
              id="event-image-file"
              className={styles.hiddenFileInput}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {imageFile && !fileError && (
              <p className={styles.selectedFileText}>
                Selected: {imageFile.name}
              </p>
            )}
            {fileError && <p className={styles.fileError}>{fileError}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="event-description">
              Event Description
            </label>
            <textarea
              id="event-description"
              className={styles.textarea}
              placeholder="Provide a detailed overview of the process, materials involved, and what participants can expect..."
              value={draft.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryButton}>
            Publish Event
          </button>
          <Link href="/events" className={styles.secondaryButton}>
            Cancel
          </Link>
        </div>
      </form>

      <div className={styles.previewColumn}>
        <div className={styles.previewHeader}>
          <Image src="/icons/eye.svg" alt="" width={16} height={16} />
          <span className={styles.previewLabel}>LIVE PREVIEW</span>
        </div>
        <EventCard
          event={previewEvent}
          isSaved={false}
          onToggleSave={() => {}}
        />
        <p className={styles.previewCaption}>
          This card will be visible in the Events Directory once approved by
          studio coordinators.
        </p>
      </div>
    </div>
  );
}
