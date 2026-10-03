const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
    {
        device: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device",
            required: true
        },
        deviceName: {
            type: String
        },
        action: {
            type: String,
            enum: ["ON", "OFF"],
            required: true
        },
        time: {
            type: String, // format "HH:MM", e.g., "22:00"
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
