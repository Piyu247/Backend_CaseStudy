const Alert = require("../models/Alert");
const Device = require("../models/Device");
const admin = require("../firebase");

// @desc    Get all alerts
// @route   GET /api/alerts
exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: alerts.length, data: alerts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new alert
// @route   POST /api/alerts
exports.createAlert = async (req, res) => {
    try {
        const { device, title, message, severity, fcmToken } = req.body;
        const alert = await Alert.create({ device, title, message, severity });

        // Emit real-time socket event if socket.io instance attached to req.app
        const io = req.app.get("socketio");
        if (io) {
            io.emit("newAlert", alert);
        }

        // Send FCM Push Notification if fcmToken is provided
        if (fcmToken) {
            try {
                await admin.messaging().send({
                    notification: {
                        title: alert.title,
                        body: alert.message
                    },
                    token: fcmToken
                });
            } catch (fcmError) {
                console.error("FCM Notification Warning:", fcmError.message);
                // Continue execution so alert creation is never blocked
            }
        }

        res.status(201).json({ success: true, data: alert });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Check device conditions and trigger alerts if attention needed
// @route   POST /api/alerts/check
exports.checkAlerts = async (req, res) => {
    try {
        const { deviceId, fcmToken } = req.body;
        let devicesToCheck = [];

        if (deviceId) {
            const device = await Device.findById(deviceId);
            if (!device) {
                return res.status(404).json({ success: false, message: "Device not found" });
            }
            devicesToCheck.push(device);
        } else {
            devicesToCheck = await Device.find();
        }

        const generatedAlerts = [];
        const io = req.app.get("socketio");

        for (const dev of devicesToCheck) {
            let shouldAlert = false;
            let title = "";
            let message = "";
            let severity = "MEDIUM";

            // Check condition rules
            if ((dev.type === "Thermostat" || dev.type === "AC") && dev.value > 40) {
                shouldAlert = true;
                title = "High Temperature Warning";
                message = `${dev.name} in ${dev.room} reached ${dev.value}°C`;
                severity = "HIGH";
            } else if (dev.type === "Door Lock" && dev.status === "OFF") {
                shouldAlert = true;
                title = "Security Warning";
                message = `${dev.name} in ${dev.room} is currently UNLOCKED`;
                severity = "CRITICAL";
            } else if (dev.value > 90) {
                shouldAlert = true;
                title = "High Value Warning";
                message = `${dev.name} in ${dev.room} value reached ${dev.value}`;
                severity = "MEDIUM";
            }

            if (shouldAlert) {
                const alert = await Alert.create({
                    device: dev._id,
                    title,
                    message,
                    severity
                });

                if (io) {
                    io.emit("newAlert", alert);
                }

                // Send FCM Push Notification if fcmToken is provided
                if (fcmToken) {
                    try {
                        await admin.messaging().send({
                            notification: {
                                title: alert.title,
                                body: alert.message
                            },
                            token: fcmToken
                        });
                    } catch (fcmError) {
                        console.error("FCM Notification Warning:", fcmError.message);
                    }
                }

                generatedAlerts.push(alert);
            }
        }

        res.status(200).json({
            success: true,
            alertsCreated: generatedAlerts.length,
            data: generatedAlerts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Mark alert as read
// @route   PUT /api/alerts/:id/read
exports.markAsRead = async (req, res) => {
    try {
        const alert = await Alert.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!alert) {
            return res.status(404).json({ success: false, message: "Alert not found" });
        }
        res.status(200).json({ success: true, data: alert });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
