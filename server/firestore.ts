import { EventInfo } from "@/app/types/event";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore} from "firebase-admin/firestore";
import { readFileSync } from "node:fs";
import path from "node:path";

const keyPath = path.resolve(
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH ??
    "secrets/evently-a8ea1-firebase-adminsdk-fbsvc-8c5f4ec867.json"
);
const serviceAccount = JSON.parse(readFileSync(keyPath, "utf-8"));

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

export const db = getFirestore();

export const addEvent = async (event: Omit<EventInfo, "id">) => {
  const docRef = await db.collection("Events").add(event);
  return { id: docRef.id, ...event };
}

export const editEvent = async (id: string, eventEdits: Partial<EventInfo>) => {
  const docRef = db.collection("Events").doc(id);
  await docRef.update(eventEdits);
  
}