const amqp = require('amqplib');

const QUEUE = 'notifications';

async function sendToQueue(notification) {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(notification)), { persistent: true });
  setTimeout(() => {
    channel.close();
    conn.close();
  }, 500);
}

module.exports = { sendToQueue }; 