const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Device name is required"],
            trim: true
        },
        type: {
            type: String,
            required: [true, "Device type is required (e.g., Light, AC, Door Lock)"],
            enum: ["Light", "AC", "Fan", "Door Lock", "Thermostat", "Camera", "Other"]
        },
        room: {
            type: String,
            required: [true, "Room location is required"],
            trim: true
        },
        status: {
            type: String,
            enum: ["ON", "OFF"],
            default: "OFF"
        },
        value: {
            type: Number,
            default: 0 // e.g., temperature (24°C) or brightness (80%)
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Device", deviceSchema);
