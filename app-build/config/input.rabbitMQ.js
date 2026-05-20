"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
const rabbit_1 = require("../config/rabbit");
async function sendMessage(cola, mensaje) {
    try {
        const { channel, connection } = await (0, rabbit_1.testRabbitMQ)();
        await channel.assertQueue(cola, { durable: true });
        channel.sendToQueue(cola, Buffer.from(mensaje));
        await channel.close();
        await connection.close();
        return true;
    }
    catch (error) {
        console.log('error Rabbit', error);
        return false;
    }
}
//# sourceMappingURL=input.rabbitMQ.js.map