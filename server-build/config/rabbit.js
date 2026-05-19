"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRabbitMQ = testRabbitMQ;
const amqplib_1 = __importDefault(require("amqplib"));
const cli_color_1 = __importDefault(require("cli-color"));
const env_1 = require("./env");
async function testRabbitMQ(retries = 5) {
    try {
        const connection = await amqplib_1.default.connect(env_1.env.rabbitmq.url);
        const channel = await connection.createChannel();
        return { connection, channel };
    }
    catch (err) {
        if (retries === 0)
            throw err;
        console.log(cli_color_1.default.red('Retrying RabbitMQ connection...'));
        await new Promise((res) => setTimeout(res, 3000));
        return testRabbitMQ(retries - 1);
    }
}
//# sourceMappingURL=rabbit.js.map