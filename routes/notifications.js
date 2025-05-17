const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { sendToQueue } = require('../queue/producer');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { user, type, content } = req.body;
  if (!user || !type || !content) {
    return res.status(400).json({ error: 'user, type, and content are required' });
  }
  if (!['email', 'sms', 'in-app'].includes(type)) {
    return res.status(400).json({ error: 'Invalid notification type' });
  }
  const userExists = await User.findById(user);
  if (!userExists) {
    return res.status(404).json({ error: 'User not found' });
  }
  const notification = await Notification.create({ user, type, content });
  await sendToQueue(notification);
  res.status(201).json(notification);
});

module.exports = router; 