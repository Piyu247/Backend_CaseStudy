const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Warning:", error.message);
        console.log("Note: Start local MongoDB or provide a valid MONGO_URI in .env");
    }
};

module.exports = connectDB;
