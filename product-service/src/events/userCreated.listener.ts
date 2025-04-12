import {consumeQueue} from "../utils/message.util";

export function userCreatedListener() {
    consumeQueue("main_exchange", "product-service-queue", "user.created", (data) => {
        console.log("📦 Product Service received user.created event:", data);

        // Simulate some action upon receiving the event
        // e.g., create user-specific product bucket, log activity, etc.
    });
}