"use client";
import { useState } from "react";
import type { EventInfo } from "../types/event";
import RegisterModal, { type RegistrationStatus } from "./RegisterModal";
import styles from "../css/EventDetailPage.module.css";
import { User } from "../types/user";

export default function EventRegistration({ event }: { event: EventInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<RegistrationStatus>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {id: id, registeredPeople: registeredPeople, ..._} = event;

    const data = new FormData(e.currentTarget).entries()
    const user = Object.fromEntries(data) as unknown as User;
    if (registeredPeople.some(p => p.email === user.email)) {
      console.log("Duplicate Person");
      setStatus({ type: "error", message: "You're already registered!" });
      return;
    }
    registeredPeople.push(user)
    const eventEdits = {registeredPeople: registeredPeople}
    const eventEditsId = {id: id, ...eventEdits}
    const res = await fetch("/api/events/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventEdits: eventEditsId}),
      });
    if (res.ok) {
      setStatus({
        type: "success",
        message: "Done! You are now registered for this event.",
      });
    } else {
      setStatus({ type: "error", message: "Failed to register for this event." });
      console.log("Could not register for event")
    }
    return;
  }

  return (
    <>
      <button
        type="button"
        className={styles.registerButton}
        onClick={() => setIsOpen(true)}
      >
        Register
      </button>
      {isOpen && (
        <RegisterModal
          event={event}
          onClose={() => {setIsOpen(false); setStatus(null)}}
          onSubmit={handleSubmit}
          status={status}
        />
      )}
    </>
  );
}
