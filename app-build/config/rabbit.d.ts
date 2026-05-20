import amqp from 'amqplib';
export declare function testRabbitMQ(retries?: number): Promise<{
    connection: amqp.ChannelModel;
    channel: amqp.Channel;
}>;
