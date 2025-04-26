// src/utils/index.js
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");

const {
    APP_SECRET,
    EXCHANGE_NAME,
    NOTIFICATION_SERVICE,
    MSG_QUEUE_URL,
} = require("../config");

// Validate signature
module.exports.ValidateSignature = async (req) => {
    try {
        const signature = req.get("Authorization");
        if (!signature) return false;

        const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
        req.user = payload;
        return true;
    } catch (error) {
        console.log("Error validating signature:", error);
        return false;
    }
};

// Format data
module.exports.FormateData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data Not found!");
    }
};

// Message Broker
module.exports.CreateChannel = async () => {
    try {
        console.log('Attempting to connect to RabbitMQ at:', MSG_QUEUE_URL);
        const connection = await amqplib.connect(MSG_QUEUE_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
        console.log('Successfully connected to RabbitMQ');
        return channel;
    } catch (err) {
        console.error("Error creating channel:", err);
        throw err;
    }
};

module.exports.PublishMessage = (channel, service, msg) => {
    try {
        if (!channel) {
            console.warn('Cannot publish message: No RabbitMQ channel available');
            return;
        }

        channel.publish(EXCHANGE_NAME, service, Buffer.from(JSON.stringify(msg)));
        console.log("Message sent:", msg);
    } catch (error) {
        console.error("Error publishing message:", error);
        throw error;
    }
};

module.exports.SubscribeMessage = async (channel, service) => {
    try {
        if (!channel) {
            console.warn('Cannot subscribe to messages: No RabbitMQ channel available');
            return;
        }

        const q = await channel.assertQueue("", { exclusive: true });
        console.log(` Waiting for messages in queue: ${q.queue}`);

        channel.bindQueue(q.queue, EXCHANGE_NAME, NOTIFICATION_SERVICE);

        channel.consume(
            q.queue,
            (msg) => {
                if (msg && msg.content) {
                    console.log("Message received:", msg.content.toString());
                    service.SubscribeEvents(msg.content.toString());
                }
                console.log("[X] received");
            },
            {
                noAck: true,
            }
        );
    } catch (error) {
        console.error("Error subscribing to message:", error);
        // Just log the error instead of throwing it
        // This allows the application to function without RabbitMQ
    }
};