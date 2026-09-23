import { db } from "./firestore";
import { events } from "../src/app/data/events";
import { readFileSync } from "node:fs";
import path from "node:path";

const API_URL = process.env.EXPRESS_API_URL ?? "http://localhost:4000";

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

function fileToDataUri(publicImagePath: string): string {
  const absolutePath = path.resolve("public", publicImagePath.replace(/^\//, ""));
  const ext = path.extname(absolutePath).toLowerCase();
  const mime = MIME_BY_EXT[ext];
  if (!mime) throw new Error(`Unsupported image extension: ${ext}`);
  const bytes = readFileSync(absolutePath);
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

async function wipeEventsCollection() {
  const eventsCollection = db.collection("Events");
  const snapshot = await eventsCollection.get();
  if (snapshot.empty) {
    console.log("Events collection already empty.");
    return;
  }
  const docs = snapshot.docs;
  const chunkSize = 400;
  for (let i = 0; i < docs.length; i += chunkSize) {
    const batch = db.batch();
    for (const doc of docs.slice(i, i + chunkSize)) {
      batch.delete(doc.ref);
    }
    await batch.commit();
  }
  console.log(`Deleted ${docs.length} existing events.`);
}

async function createEventViaApi(event: (typeof events)[number]) {
  const { id, ...eventWithoutId } = event;
  const imageDataUri = fileToDataUri(event.image);

  const res = await fetch(`${API_URL}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: eventWithoutId, imageDataUri }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create "${event.title}": ${res.status} ${text}`);
  }

  const { event: createdEvent } = await res.json();
  console.log(`Created "${createdEvent.title}" -> ${createdEvent.image}`);
}

async function main() {
  await wipeEventsCollection();
  for (const event of events) {
    await createEventViaApi(event);
  }
  console.log(`Seeded ${events.length} Brown club events via the API.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
