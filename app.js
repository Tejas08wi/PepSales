const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const notificationsRouter = require('./routes/notifications');
const usersRouter = require('./routes/users');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://tejaswikumar804:QLuqxd6psn1gsAeT@cluster0.qvxxe1b.mongodb.net/pepsales', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/notifications', notificationsRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 