const Device = require("../models/Device");

// @desc    Get all devices
// @route   GET /api/devices
exports.getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.status(200).json({ success: true, count: devices.length, data: devices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single device by ID
// @route   GET /api/devices/:id
exports.getDeviceById = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }
        res.status(200).json({ success: true, data: device });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new device
// @route   POST /api/devices
exports.createDevice = async (req, res) => {
    try {
        const { name, type, room, status, value } = req.body;
        const device = await Device.create({ name, type, room, status, value });
        res.status(201).json({ success: true, data: device });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update device (status / value / details)
// @route   PUT /api/devices/:id
exports.updateDevice = async (req, res) => {
    try {
        const device = await Device.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!device) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }

        // Broadcast real-time status update to all Socket.io clients
        const io = req.app.get("socketio");
        if (io) {
            io.emit("deviceStatusUpdated", {
                deviceId: device._id,
                name: device.name,
                status: device.status,
                value: device.value,
                updatedAt: device.updatedAt
            });
        }

        res.status(200).json({ success: true, data: device });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete device
// @route   DELETE /api/devices/:id
exports.deleteDevice = async (req, res) => {
    try {
        const device = await Device.findByIdAndDelete(req.params.id);
        if (!device) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }
        res.status(200).json({ success: true, message: "Device removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
