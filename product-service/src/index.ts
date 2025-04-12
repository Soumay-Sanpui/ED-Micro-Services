import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import registered_events from "./events/events";

const app = express();
const PORT: string | number = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

/**
 * Root endpoint - optional
 */
app.get("/", (req: Request, res: Response) => {
    res.send("Product Service is Live 🚀");
});

/**
 * Health check endpoint for monitoring purposes
 */
app.get("/health", (req: Request, res: Response) => {
    res.status(200).send({ data: "OK", message: "Product Service is Running Fine" });
});

/**
 * Start listening for messages from RabbitMQ
 */
registered_events();

app.listen(PORT, () => {
    console.log(`✅ Product Service is running on: http://localhost:${PORT}`);
});
