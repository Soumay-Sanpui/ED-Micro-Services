import express from "express";
import {Request, Response} from "express";
import cors from "cors";
import {produceMessage} from "./utils/messages.util";
import Redis from "ioredis";
import consul from "consul";
import os from "os";

const app = express();
const PORT: string | number = process.env.PORT || 3000;
const redis = new Redis({host: "redis", port: 6379});
const service_name = "user";
const service_id = `${service_name}-${os.hostname()}`;
const consulClient = new consul({
    host: "consul",
    port: 8500,
});

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
    
    consulClient.agent.service.register({
        name: service_name,
        id: service_id,
        address: service_name,
        port: Number(PORT),
        check: {
            http: `http://${service_name}:${PORT}/health`,
            interval: "60s",
            timeout: "10s",
            name: `${service_name} health check`
        }
    }).then(() => {
        console.log(`${service_name} registered with consul.`);
    }).catch((err) => {
        console.error('Error registering with Consul:', err);
        throw err;
    });
    
    // Handle graceful shutdown and de-register from Consul
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
});

function gracefulShutdown() {
    console.log('Received shutdown signal, de-registering from Consul...');
    consulClient.agent.service.deregister(service_id)
        .then(() => {
            console.log(`${service_name} de-registered from Consul`);
            process.exit(0);
        })
        .catch((err) => {
            console.error('Error de-registering from Consul:', err);
            process.exit(1);
        });
    
    // Shutdown after timeout even if Consul doesn't respond
    setTimeout(() => {
        console.log('Forced shutdown after timeout');
        process.exit(1);
    }, 5000);
}