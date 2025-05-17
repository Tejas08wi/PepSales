const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.get('/:id/notifications', async (req, res) => {
  const userId = req.params.id;
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
  res.json(notifications);
});

router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'name, email, and phone are required' });
  }
  try {
    const user = await Notification.db.model('User').create({ name, email, phone });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'Email or phone already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

module.exports = router; 