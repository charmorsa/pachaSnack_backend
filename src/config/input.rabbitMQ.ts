import { testRabbitMQ } from '../config/rabbit';

export async function sendMessage(cola: string, mensaje: string) {
  try {
    const { channel, connection } = await testRabbitMQ();

    await channel.assertQueue(cola, { durable: true });
    channel.sendToQueue(cola, Buffer.from(mensaje));

    await channel.close();
    await connection.close();

    return true;
  } catch (error) {
    console.log('error Rabbit', error);
    return false;
  }
}
