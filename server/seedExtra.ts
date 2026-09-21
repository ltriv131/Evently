import { db } from "./firestore";
import type { EventInfo } from "../src/app/types/event";

const IMAGES: { image: string; imageAlt: string }[] = [
  {
    image: "/images/events/hand-building-with-stoneware-clay.jpg",
    imageAlt: "Hand-built stoneware vessel resting on a linen cloth",
  },
  {
    image: "/images/events/woodturning-at-soot-workshop.jpg",
    imageAlt: "Wooden stool on a lathe inside a woodturning workshop",
  },
  {
    image: "/images/events/mineral-sourcing-in-the-high-atlas.jpg",
    imageAlt: "Raw mineral stone specimen against a window",
  },
  {
    image: "/images/events/surfaces-and-patina-a-group-show.jpg",
    imageAlt: "Ceramic bowl with a weathered, patinated surface",
  },
  {
    image: "/images/events/glazing-and-firing-the-long-process.png",
    imageAlt: "Potter glazing ceramic mugs on a wooden table",
  },
];

const TOPICS = [
  "Wheel Throwing",
  "Natural Dyeing",
  "Copper Enamelling",
  "Bookbinding",
  "Screen Printing",
  "Willow Weaving",
  "Glass Fusing",
  "Leatherworking",
  "Blacksmithing Basics",
  "Paper Marbling",
  "Indigo Shibori",
  "Wood Carving",
  "Macrame",
  "Candle Making",
  "Soap Crafting",
  "Mosaic Tiling",
  "Felting Wool",
  "Batik Dyeing",
  "Chainmail Jewellery",
  "Terrarium Building",
];

const FORMATS = [
  "Workshop",
  "Masterclass",
  "Taster Session",
  "Evening Class",
  "Open Studio",
  "Weekend Intensive",
];

const CATEGORIES = [
  "Workshop",
  "Talk",
  "Exhibition",
  "Studio Visit",
  "Market",
  "Panel",
  "Demo",
];

const LOCATIONS = [
  "London Studio",
  "Edinburgh",
  "Bristol",
  "Online",
  "London Gallery",
  "Manchester",
  "Glasgow",
  "Leeds",
  "Brighton",
  "Cardiff",
];

const TIMES = [
  "09:00-12:00",
  "10:00-14:00",
  "13:00-16:00",
  "18:00-20:00",
  "18:30-21:00",
  "19:00 GMT",
  "All day",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function dateForIndex(i: number): string {
  const dayOfYear = 10 + i * 9;
  const date = new Date(Date.UTC(2026, 0, dayOfYear));
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = MONTHS[date.getUTCMonth()];
  return `${day} ${month} 2026`;
}

const COUNT = 40;

function buildEvents(): Omit<EventInfo, "id">[] {
  return Array.from({ length: COUNT }, (_, i) => {
    const topic = TOPICS[i % TOPICS.length];
    const format = FORMATS[i % FORMATS.length];
    const title = `${topic} ${format}`;
    const { image, imageAlt } = IMAGES[i % IMAGES.length];

    return {
      image,
      imageAlt,
      date: dateForIndex(i),
      category: CATEGORIES[i % CATEGORIES.length],
      title,
      location: LOCATIONS[i % LOCATIONS.length],
      time: TIMES[i % TIMES.length],
      description: `Join us for a hands-on ${format.toLowerCase()} exploring ${topic.toLowerCase()}, open to all skill levels.`,
    };
  });
}

async function main() {
  const eventsCollection = db.collection("Events");
  const extraEvents = buildEvents();
  const batch = db.batch();

  for (const data of extraEvents) {
    batch.set(eventsCollection.doc(), data);
  }

  await batch.commit();
  console.log(`Seeded ${extraEvents.length} additional events into the Events collection.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
