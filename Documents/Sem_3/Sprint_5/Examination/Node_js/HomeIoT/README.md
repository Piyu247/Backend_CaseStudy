# HomeIoT — Backend API

A **Node.js + Express.js** backend for a Smart Home IoT system with real-time device control via **Socket.io**, **JWT** and **Firebase** authentication, **MongoDB** data persistence, and **Firebase Cloud Messaging** push notifications.

---

## Technologies

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB + Mongoose v9 |
| Real-time | Socket.io v4 |
| Auth | JSON Web Token (JWT) + Firebase Auth |
| Notifications | Firebase Admin SDK (FCM) |
| Environment | dotenv |

---

## Features

- Full Device CRUD (Create, Read, Update, Delete)
- Real-time device status broadcasting via Socket.io
- Device control commands with automatic activity logging
- Scheduled device actions (Schedules CRUD)
- Threshold-based alert system with Socket.io push
- Firebase Cloud Messaging push notifications
- Dual authentication: JWT + Firebase ID Token
- Validation middleware for required fields
- Clean modular structure (routes / controllers / models / middleware)

---

## Folder Structure

```
HomeIoT/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── deviceController.js
│   ├── controlController.js
│   ├── scheduleController.js
│   ├── logController.js
│   ├── alertController.js
│   └── notificationController.js
├── middleware/
│   ├── authMiddleware.js       # JWT + Firebase token verification
│   └── validationMiddleware.js # Required-field validator
├── models/
│   ├── User.js
│   ├── Device.js
│   ├── Control.js
│   ├── Schedule.js
│   ├── Log.js
│   └── Alert.js
├── routes/
│   ├── authRoutes.js
│   ├── deviceRoutes.js
│   ├── controlRoutes.js
│   ├── scheduleRoutes.js
│   ├── logRoutes.js
│   ├── alertRoutes.js
│   └── notificationRoutes.js
├── firebase.js                 # Firebase Admin SDK initialization
├── server.js                   # Entry point
├── .env.example                # Environment variable template
└── socketTest.js               # Socket.io manual test script
```

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/HomeIoT.git
cd HomeIoT

# 2. Install dependencies
npm install

# 3. Copy environment template and fill in your values
cp .env.example .env
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/homeiot
JWT_SECRET=your_strong_jwt_secret
PORT=8080
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
```

> ⚠️ Never commit `.env` or Firebase service account JSON files to Git.

---

## MongoDB Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user with read/write access
4. Whitelist your IP (or use `0.0.0.0/0` for development)
5. Copy the **Connection String** and paste it as `MONGO_URI` in `.env`

---

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → **Project Settings** → **Service Accounts**
3. Click **Generate new private key** — download the JSON file
4. Copy `project_id`, `client_email`, and `private_key` into your `.env`
5. To use Firebase Authentication, enable **Email/Password** or **Google** sign-in under **Authentication**

---

## Starting the Server

```bash
# Development (auto-restart with nodemon)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:8080` by default.

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login, returns JWT | No |
| POST | `/api/auth/firebase-login` | Firebase ID token login | No |
| GET | `/api/auth/me` | Get current user profile | JWT |

### Devices

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/devices` | Get all devices | No |
| GET | `/api/devices/:id` | Get device by ID | No |
| POST | `/api/devices` | Create device | No |
| PUT | `/api/devices/:id` | Update device | No |
| DELETE | `/api/devices/:id` | Delete device | No |

### Controls

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/controls` | Send control command to device |
| GET | `/api/controls` | Get all control records |
| PUT | `/api/controls/:id` | Update a control record |

### Schedules

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/schedules` | Create a schedule |
| GET | `/api/schedules` | Get all schedules |
| PUT | `/api/schedules/:id` | Update a schedule |
| DELETE | `/api/schedules/:id` | Delete a schedule |

### Logs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/logs` | Get all activity logs |
| GET | `/api/logs/device/:id` | Get logs for a specific device |

### Alerts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alerts` | Get all alerts |
| POST | `/api/alerts` | Create a manual alert |
| POST | `/api/alerts/check` | Check device thresholds and auto-generate alerts |
| PUT | `/api/alerts/:id/read` | Mark alert as read |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/notifications/send` | Send FCM push notification |

---

## Socket.io — Real-Time Events

The server uses Socket.io for real-time device communication.

**Server URL:** `http://localhost:8080`

### Events emitted by server → client

| Event | When triggered | Payload |
|-------|---------------|---------|
| `deviceStateChange` | After `POST /api/controls` | `{ deviceId, name, status, value, updatedAt }` |
| `deviceStatusUpdated` | After `PUT /api/devices/:id` | `{ deviceId, name, status, value, updatedAt }` |
| `deviceUpdate` | After client emits `deviceControl` | `{ deviceId, status }` |
| `newAlert` | When a threshold alert is triggered | Alert object |

### Events received by server ← client

| Event | Payload | Description |
|-------|---------|-------------|
| `deviceControl` | `{ deviceId, status }` | Client sends device control command |

### Socket.io Test Script

```bash
node socketTest.js
```

---

## Thunder Client — Testing Examples

### Register
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@homeiot.com",
  "password": "Test@12345"
}
```

### Login
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "test@homeiot.com",
  "password": "Test@12345"
}
```

### Create Device
```
POST http://localhost:8080/api/devices
Content-Type: application/json

{
  "name": "Living Room Light",
  "type": "Light",
  "room": "Living Room",
  "status": "OFF",
  "value": 0
}
```

### Control Device
```
POST http://localhost:8080/api/controls
Content-Type: application/json

{
  "deviceId": "<device_id>",
  "status": "ON",
  "value": 75,
  "command": "Turn on Living Room Light"
}
```

### Create Schedule
```
POST http://localhost:8080/api/schedules
Content-Type: application/json

{
  "device": "<device_id>",
  "action": "ON",
  "time": "23:30",
  "isActive": true
}
```

### Check Alerts
```
POST http://localhost:8080/api/alerts/check
Content-Type: application/json

{
  "deviceId": "<device_id>"
}
```

### Send Notification
```
POST http://localhost:8080/api/notifications/send
Content-Type: application/json

{
  "token": "<FCM_DEVICE_TOKEN>",
  "title": "HomeIoT Alert",
  "body": "Living Room Light was turned ON"
}
```

---

## GitHub Setup

```bash
# Initialize git (if not done yet)
git init

# Add remote origin
git remote add origin https://github.com/<your-username>/HomeIoT.git

# Stage all files (respects .gitignore — secrets are excluded)
git add .

# Commit
git commit -m "Initial commit: HomeIoT backend API"

# Push to GitHub
git push -u origin main
```

> ✅ `.env`, Firebase private keys, and service account JSON files are excluded by `.gitignore`.
