import express from "express";
import {Request, Response} from "express";
import cors from "cors";
import {produceMessage} from "./utils/messages.util";
import Redis from "ioredis";

const app = express();
const PORT: string | number = process.env.PORT || 3000;
const redis = new Redis({host: "redis", port: 6379});

app.use(cors({origin: '*'}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("User Service is Live 🚀");
    return;
});

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send({data: "OK", message: "User Service is Running Fine"});
    return;
});

app.get("/create-user", async (req: Request, res: Response) => {
    const new_user = {
        userID: "Test_ID_1001",
        userName: "Test user 1"
    };

    await produceMessage("main_exchange", "user.created", new_user);

    res.status(201).json({
        message: "User created and event sent 🎉",
        user: new_user
    });
    return;
});

app.get("/cache-user", async (req: Request, res: Response) => {
    const start = Date.now();
    const cachedUserCount = await redis.get('usercount');
    const end = Date.now();

    console.log(`⏱️ Redis fetch time: ${end - start} ms`);

    if (cachedUserCount) {
        return res.status(200).json({ data: cachedUserCount });
    }

    let count = 0;
    for (let i = 0; i < 100000; i++) {
        count = (count + 1) % 98;
    }

    await redis.set('usercount', count.toString(), 'EX', 120);
    return res.status(200).json({ data: count });
});


app.listen(PORT, () => {
    console.log(`✅ User Service is running on: http://localhost:${PORT}`);
});