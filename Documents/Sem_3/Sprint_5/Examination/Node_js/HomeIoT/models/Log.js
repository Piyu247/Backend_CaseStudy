const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        device: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device"
        },
        deviceName: {
            type: String
        },
        action: {
            type: String,
            required: true
        },
        triggeredBy: {
            type: String,
            default: "System" // User name, "System", or "Schedule"
        },
        details: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Log", logSchema);
