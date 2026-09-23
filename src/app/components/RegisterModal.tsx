"use client";
import { useEffect } from "react";
import Image from "next/image";
import type { EventInfo } from "../types/event";
import styles from "../css/RegisterModal.module.css";

export type RegistrationStatus = {
  type: "success" | "error";
  message: string;
} | null;

export default function RegisterModal({
  event,
  onClose,
  onSubmit,
  status,
}: {
  event: EventInfo;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: RegistrationStatus;
}) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-modal-title"
      >
        <div className={styles.cover}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.coverImage}
            src={event.image}
            alt={event.imageAlt}
          />
          <div className={styles.coverTint} />
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close registration form"
            onClick={onClose}
          >
            <Image src="/icons/x-circle.svg" alt="" width={16} height={16} />
          </button>
          <div className={styles.coverDetails}>
            <p className={styles.coverEyebrow}>{event.category} Registration</p>
            <p className={styles.coverTitle} id="register-modal-title">
              {event.title}
            </p>
            <p className={styles.coverMeta}>
              {event.date} • {event.time} at {event.location}
            </p>
          </div>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <p className={styles.intro}>
            Submit your details below to request a slot in this event.
          </p>
          {status && (
            <p
              className={`${styles.status} ${
                status.type === "success"
                  ? styles.statusSuccess
                  : styles.statusError
              }`}
              role="status"
            >
              {status.message}
            </p>
          )}
          <div className={styles.fields}>
            <div className={styles.nameRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="firstName">
                  First Name
                </label>
                <input
                  className={styles.input}
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="e.g. Rowan"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className={styles.input}
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="e.g. Voss"
                  required
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email Address
              </label>
              <input
                className={styles.input}
                id="email"
                name="email"
                type="email"
                placeholder="e.g. rowan.voss@atelier.com"
                required
              />
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Confirm Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
