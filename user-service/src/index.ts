import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { produceMessage } from "./utils/messages.util";

const app = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("User Service is Live 🚀");
});

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send({ data: "OK", message: "User Service is Running Fine" });
});

app.get("/create-user", async (req: Request, res: Response) => {
    const new_user: { userName: string, userID: string } = {
        userID: "Test_ID_1001",
        userName: "Test user 1"
    };

    // 👇 RabbitMQ par event bhejna
    await produceMessage("main_exchange", "user.created", new_user);

    res.status(201).json({
        message: "User created and event sent 🎉",
        user: new_user
    });
});

app.listen(PORT, () => {
    console.log(`✅ User Service is running on: http://localhost:${PORT}`);
});
