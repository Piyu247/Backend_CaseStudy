const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
    {
        device: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device"
        },
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        severity: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
            default: "MEDIUM"
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Alert", alertSchema);
