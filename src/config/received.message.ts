// import { sendPush } from "../notifPush/notifPush.controller"
import { testRabbitMQ } from '../config/rabbit';
import { sendEmail } from '../config/send.email';

type EmailMessage = {
  email: string;
  types: string;
  text: string[];
};

function isEmailMessage(value: unknown): value is EmailMessage {
  if (!value || typeof value !== 'object') return false;

  const message = value as Partial<EmailMessage>;
  return (
    typeof message.email === 'string' &&
    typeof message.types === 'string' &&
    Array.isArray(message.text) &&
    message.text.every((item) => typeof item === 'string')
  );
}

export async function consumeMessagesEmail(cola: string) {
  const { channel } = await testRabbitMQ();
  await channel.assertQueue(cola, { durable: true });
  await channel.consume(cola, (message) => {
    if (message) {
      void (async () => {
        const parsedMessage: unknown = JSON.parse(message.content.toString());

        if (!isEmailMessage(parsedMessage)) {
          channel.nack(message, false, false);
          return;
        }

        const sent = await sendEmail(
          parsedMessage.email,
          parsedMessage.types,
          parsedMessage.text,
        );

        if (sent) {
          channel.ack(message);
          return;
        }

        channel.nack(message, false, true);
      })();
    }
  });
}
