import amqp from 'amqplib';
import clc from 'cli-color';
import { env } from './env';

export async function testRabbitMQ(retries = 5) {
  try {
    const connection = await amqp.connect(env.rabbitmq.url);
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (err) {
    if (retries === 0) throw err;
    console.log(clc.red('Retrying RabbitMQ connection...'));
    await new Promise((res) => setTimeout(res, 3000));
    return testRabbitMQ(retries - 1);
  }
}
