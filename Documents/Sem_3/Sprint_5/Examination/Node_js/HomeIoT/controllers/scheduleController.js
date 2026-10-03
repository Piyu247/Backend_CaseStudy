const Schedule = require("../models/Schedule");
const Device = require("../models/Device");

// @desc    Get all schedules
// @route   GET /api/schedules
exports.getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate("device", "name type room status");
        res.status(200).json({ success: true, count: schedules.length, data: schedules });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a schedule
// @route   POST /api/schedules
exports.createSchedule = async (req, res) => {
    try {
        const { deviceId, device, action, time, isActive } = req.body;
        const targetDeviceId = deviceId || device;

        const foundDevice = await Device.findById(targetDeviceId);
        if (!foundDevice) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }

        const schedule = await Schedule.create({
            device: targetDeviceId,
            deviceName: foundDevice.name,
            action,
            time,
            isActive
        });

        res.status(201).json({ success: true, data: schedule });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update a schedule by ID
// @route   PUT /api/schedules/:id
exports.updateSchedule = async (req, res) => {
    try {
        const { deviceId, device, action, time, isActive } = req.body;
        const targetDeviceId = deviceId || device;

        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }

        // If deviceId is provided, verify device exists
        if (targetDeviceId) {
            const foundDevice = await Device.findById(targetDeviceId);
            if (!foundDevice) {
                return res.status(404).json({ success: false, message: "Device not found" });
            }
            schedule.device = targetDeviceId;
            schedule.deviceName = foundDevice.name;
        }

        if (action !== undefined) schedule.action = action;
        if (time !== undefined) schedule.time = time;
        if (isActive !== undefined) schedule.isActive = isActive;

        await schedule.save();

        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete schedule
// @route   DELETE /api/schedules/:id
exports.deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!schedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }
        res.status(200).json({ success: true, message: "Schedule removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
