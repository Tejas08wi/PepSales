const amqp = require('amqplib');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const { sendSMS } = require('../services/smsService');
const { sendInApp } = require('../services/inAppService');

const QUEUE = 'notifications';
const MAX_RETRIES = 3;

async function processNotification(msg, channel) {
  const notification = JSON.parse(msg.content.toString());
  try {
    const user = await User.findById(notification.user);
    if (!user) throw new Error('User not found');
    if (notification.type === 'email') {
      await sendEmail(user.email, notification.content);
    } else if (notification.type === 'sms') {
      await sendSMS(user.phone, notification.content);
    } else if (notification.type === 'in-app') {
      await sendInApp(user._id, notification.content);
    }
    await Notification.findByIdAndUpdate(notification._id, { status: 'sent' });
    channel.ack(msg);
  } catch (err) {
    console.error('Notification failed:', err);
    const retries = (notification.retries || 0) + 1;
    if (retries < MAX_RETRIES) {
      await Notification.findByIdAndUpdate(notification._id, { status: 'pending', retries });
      channel.nack(msg, false, false); // Remove from queue, will be requeued by app logic
      // Optionally, requeue here
    } else {
      await Notification.findByIdAndUpdate(notification._id, { status: 'failed', retries });
      channel.ack(msg);
    }
  }
}

async function startConsumer() {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });
  channel.consume(QUEUE, (msg) => {
    if (msg !== null) {
      processNotification(msg, channel);
    }
  }, { noAck: false });
}

startConsumer(); 