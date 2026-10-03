const Log = require("../models/Log");

// @desc    Get all activity logs
// @route   GET /api/logs
exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({ createdAt: -1 }).limit(100);
        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get logs for a specific device by Device ID
// @route   GET /api/logs/device/:id
exports.getLogsByDevice = async (req, res) => {
    try {
        const logs = await Log.find({ device: req.params.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create manual log entry
// @route   POST /api/logs
exports.createLog = async (req, res) => {
    try {
        const { device, deviceName, action, triggeredBy, details } = req.body;
        const log = await Log.create({ device, deviceName, action, triggeredBy, details });
        res.status(201).json({ success: true, data: log });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
