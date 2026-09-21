import express from "express";
import { eventsRouter } from "./routes/events";

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json({ limit: "10mb" }));
app.use("/api/events", eventsRouter);

app.listen(port, () => {
  console.log(`Events server listening on port ${port}`);
});
