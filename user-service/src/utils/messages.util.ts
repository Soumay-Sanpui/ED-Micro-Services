// user-service/src/utils/messages.util.ts
import amqp from 'amqplib';
const RABBITMQ_URL = 'amqp://guest:guest@rabbitmq';

export async function produceMessage(exchange: string, routingKey: string, message: any) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(exchange, 'direct', { durable: false });
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

        console.log(`✅ Message sent to "${routingKey}" via exchange "${exchange}":`, message);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('❌ Error producing message:', error);
    }
}

export async function consumeQueue(exchange: string, queue: string, routingKey: string, onMessage: (msg: any) => void) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(exchange, 'direct', { durable: false });
        await channel.assertQueue(queue, { durable: false });
        await channel.bindQueue(queue, exchange, routingKey);

        console.log(`🎧 Waiting for "${routingKey}" in queue "${queue}" via exchange "${exchange}"...`);

        await channel.consume(queue, (msg) => {
            if (msg) {
                const content = msg.content.toString();
                try {
                    const data = JSON.parse(content);
                    onMessage(data);
                } catch {
                    console.warn('⚠️ Could not parse message:', content);
                }
            }
        }, { noAck: true });

    } catch (error) {
        console.error('❌ Error consuming message:', error);
    }
}
