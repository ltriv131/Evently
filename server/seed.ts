import { db } from "./firestore";
import { events } from "../src/app/data/events";

async function main() {
  const eventsCollection = db.collection("Events");
  const batch = db.batch();

  for (const { id, ...data } of events) {
    batch.set(eventsCollection.doc(id), data);
  }

  await batch.commit();
  console.log(`Seeded ${events.length} events into the Events collection.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
