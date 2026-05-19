"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeMessagesEmail = consumeMessagesEmail;
const rabbit_1 = require("../config/rabbit");
const send_email_1 = require("../config/send.email");
function isEmailMessage(value) {
    if (!value || typeof value !== 'object')
        return false;
    const message = value;
    return (typeof message.email === 'string' &&
        typeof message.types === 'string' &&
        Array.isArray(message.text) &&
        message.text.every((item) => typeof item === 'string'));
}
async function consumeMessagesEmail(cola) {
    const { channel } = await (0, rabbit_1.testRabbitMQ)();
    await channel.assertQueue(cola, { durable: true });
    await channel.consume(cola, (message) => {
        if (message) {
            void (async () => {
                const parsedMessage = JSON.parse(message.content.toString());
                if (!isEmailMessage(parsedMessage)) {
                    channel.nack(message, false, false);
                    return;
                }
                const sent = await (0, send_email_1.sendEmail)(parsedMessage.email, parsedMessage.types, parsedMessage.text);
                if (sent) {
                    channel.ack(message);
                    return;
                }
                channel.nack(message, false, true);
            })();
        }
    });
}
//# sourceMappingURL=received.message.js.map