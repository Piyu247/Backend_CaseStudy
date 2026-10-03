const mongoose = require("mongoose");

const controlSchema = new mongoose.Schema(
    {
        device: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device"
        },
        status: {
            type: String,
            enum: ["ON", "OFF"]
        },
        value: {
            type: Number
        },
        command: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Control", controlSchema);
