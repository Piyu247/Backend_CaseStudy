const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const deviceRoutes = require("./routes/deviceRoutes");
const authRoutes = require("./routes/authRoutes");
const controlRoutes = require("./routes/controlRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const logRoutes = require("./routes/logRoutes");
const alertRoutes = require("./routes/alertRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Attach socketio instance to app context so controllers can use it
app.set("socketio", io);

// Socket.io Connection Event Handler
io.on("connection", (socket) => {
    console.log(`New WebSocket Client Connected: ${socket.id}`);

    // Listen for device control commands from a client
    socket.on("deviceControl", (data) => {
        console.log(`deviceControl received:`, data);

        // Broadcast the update to ALL connected clients
        io.emit("deviceUpdate", data);
        console.log(`deviceUpdate broadcasted:`, data);
    });

    socket.on("disconnect", () => {
        console.log(`Client Disconnected: ${socket.id}`);
    });
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
    res.json({
        message: "HomeIoT Backend & WebSocket Server is Running",
        endpoints: {
            auth: "/api/auth",
            devices: "/api/devices",
            controls: "/api/controls",
            schedules: "/api/schedules",
            logs: "/api/logs",
            alerts: "/api/alerts",
            notifications: "/api/notifications"
        }
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/controls", controlRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`HomeIoT Server running on port ${PORT}`);
});
