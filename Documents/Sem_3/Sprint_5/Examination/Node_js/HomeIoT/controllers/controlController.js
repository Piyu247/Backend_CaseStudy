const Device = require("../models/Device");
const Log = require("../models/Log");
const Alert = require("../models/Alert");
const Control = require("../models/Control");

// @desc    Control device state (turn ON/OFF or update value)
// @route   POST /api/controls
exports.controlDevice = async (req, res) => {
    try {
        const { deviceId, status, value, command } = req.body;

        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }

        // Apply changes
        if (status) device.status = status;
        if (value !== undefined) device.value = value;
        await device.save();

        // Save Control Record
        const control = await Control.create({
            device: device._id,
            status: device.status,
            value: device.value,
            command: command || `Set status to ${device.status}`
        });

        // Emit real-time WebSocket event
        const io = req.app.get("socketio");
        if (io) {
            io.emit("deviceStateChange", {
                deviceId: device._id,
                name: device.name,
                status: device.status,
                value: device.value,
                updatedAt: device.updatedAt
            });
        }

        // Automatically write activity log
        const logAction = command || `Device '${device.name}' status set to ${device.status} (Value: ${device.value})`;
        await Log.create({
            device: device._id,
            deviceName: device.name,
            action: logAction,
            triggeredBy: req.user ? req.user.name : "User",
            details: `Room: ${device.room}`
        });

        // Threshold Alert trigger check (e.g. Temperature > 40°C)
        if (device.type === "Thermostat" || device.type === "AC") {
            if (device.value > 40) {
                const alert = await Alert.create({
                    device: device._id,
                    title: "High Temperature Warning!",
                    message: `${device.name} in ${device.room} reached ${device.value}°C!`,
                    severity: "HIGH"
                });
                if (io) io.emit("newAlert", alert);
            }
        }

        res.status(200).json({
            success: true,
            message: "Control command executed successfully",
            data: {
                device,
                control
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all control records
// @route   GET /api/controls
exports.getControls = async (req, res) => {
    try {
        const controls = await Control.find().populate("device", "name type room");
        res.status(200).json({ success: true, count: controls.length, data: controls });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a control record by ID
// @route   PUT /api/controls/:id
exports.updateControl = async (req, res) => {
    try {
        const control = await Control.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!control) {
            return res.status(404).json({ success: false, message: "Control record not found" });
        }

        // Also update associated device status/value if applicable
        if (control.device) {
            const device = await Device.findById(control.device);
            if (device) {
                if (req.body.status) device.status = req.body.status;
                if (req.body.value !== undefined) device.value = req.body.value;
                await device.save();
            }
        }

        res.status(200).json({ success: true, data: control });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
