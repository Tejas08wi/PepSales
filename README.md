# 🚀 PepSales Notification System (Backend)

A **MERN-based backend system** to send notifications (Email, SMS, In-app) to users, using **MongoDB Atlas** for storage and **RabbitMQ** for queue-based processing with retry logic.

---

## 📦 Requirements

- **Node.js**
- **MongoDB Atlas** (with your connection string)
- **RabbitMQ** (running on `amqp://localhost`)

---

## 🛠️ Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure MongoDB**
   In `app.js`, replace with your MongoDB connection string:
   ```js
   mongoose.connect('mongodb+srv://<username>:<password>@<cluster-url>/<dbname>', {...})
   ```

3. **Start MongoDB Atlas cluster and RabbitMQ server**

4. **Start the Express server**
   ```bash
   npm start
   ```

5. **Start the notification consumer** (in a new terminal window)
   ```bash
   npm run consumer
   ```

---

## 💡 Assumptions

- Email and SMS are **simulated** (logged to console, not actually sent)
- In-app notifications are **stored in MongoDB**
- Users must be **created via API before sending notifications**
- No **authentication** on API endpoints (for demo/testing)
- **RabbitMQ** must be running locally

---

## 📚 API Documentation

### ➕ Create User

**POST** `/users`

#### Body:
```json
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phone": "9876543210"
}
```

#### Response:
```json
{
  "_id": "<USER_ID>",
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phone": "9876543210"
}
```

---

### 📨 Send Notification

**POST** `/notifications`

#### Body:
```json
{
  "user": "<USER_ID>",
  "type": "email", "sms" or "in-app"
  "content": "Hello!"
}
```

#### Response:
```json
{
  "_id": "<NOTIFICATION_ID>",
  "user": "<USER_ID>",
  "type": "email",
  "content": "Hello!",
  "status": "pending"
}
```

---

### 📥 Get User Notifications

**GET** `/users/<USER_ID>/notifications`

#### Response:
```json
[
  {
    "_id": "<NOTIFICATION_ID>",
    "user": "<USER_ID>",
    "type": "email",
    "content": "Hello!",
    "status": "sent"
  }
]
```

---

## 🔔 Notification Types

- `email` (simulated)
- `sms` (simulated)
- `in-app` (stored in MongoDB)

---

## ⚠️ Notes

- Failed notifications are **retried up to 3 times** by the consumer.
- Monitor the queue via RabbitMQ UI: [http://localhost:15672/](http://localhost:15672/)

---

## 🚫 Deployment

_No deployed version provided. Please run locally using the instructions above._
