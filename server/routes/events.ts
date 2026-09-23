import { Router } from "express";
import { FieldPath} from "firebase-admin/firestore";
import { db, addEvent, editEvent } from "../firestore";
import type { EventInfo } from "../../src/app/types/event";
import { uploadImageToCloudinary } from "../../src/app/cloudinary/cloudinary";

const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 24;

const eventsCollection = db.collection("Events");

function toEventInfo(doc: FirebaseFirestore.DocumentSnapshot): EventInfo {
  return { id: doc.id, ...(doc.data() as Omit<EventInfo, "id">) };
}

export const eventsRouter = Router();

eventsRouter.get("/", async (req, res) => {
  try {
    const idsParam = req.query.ids;
    const queryParam = req.query.query;

    if (typeof queryParam === "string" && queryParam.length > 0) {
      const querySnapshot = await eventsCollection
        .where("title", ">=", queryParam)
        .where("title", "<=", queryParam + "\uf8ff")
        .get();
      const matched = querySnapshot.docs.map(toEventInfo);
      res.json({ events: matched });
      return;
    }

    if (typeof idsParam === "string" && idsParam.length > 0) {
      const ids = idsParam.split(",");
      const snapshots = await db.getAll(
        ...ids.map((id) => eventsCollection.doc(id))
      );
      const matched = snapshots.filter((doc) => doc.exists).map(toEventInfo);
      res.json({ events: matched });
      return;
    }

    const limit = Math.min(
      Math.max(Number(req.query.limit) || DEFAULT_LIMIT, 1),
      MAX_LIMIT
    );
    const cursor =
      typeof req.query.cursor === "string" ? req.query.cursor : null;

    let query = eventsCollection
      .orderBy(FieldPath.documentId())
      .limit(limit + 1);

    if (cursor) {
      const cursorDoc = await eventsCollection.doc(cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }

    const snapshot = await query.get();
    const hasNextPage = snapshot.docs.length > limit;
    const page = snapshot.docs.slice(0, limit).map(toEventInfo);
    const nextCursor = hasNextPage ? page[page.length - 1].id : null;

    res.json({ events: page, nextCursor });
  } catch (error) {
    console.error("Failed to fetch events from Firestore", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

eventsRouter.post("/", async (req, res) => {
  try {
    const eventToAdd = req.body.event;
    const imageDataUri = req.body.imageDataUri;

    if (imageDataUri) {
      eventToAdd.image = await uploadImageToCloudinary(imageDataUri);
    }

    const createdEvent = await addEvent(eventToAdd);
    res.status(201).json({ event: createdEvent });

  } catch (error) {
    console.error("Failed to create event in Firestore", error);
    res.status(500).json({ error: "Failed to create event" });
  }
  return;
});

eventsRouter.post("/edit/",async (req, res) => {
  try {
    const eventData = req.body.eventEdits;
    const {id, ...eventEdits} = eventData;
    await editEvent(id, eventEdits);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to update event")
    res.status(500).json({error: "Failed to update event"}).send()
  }
  return;
})

