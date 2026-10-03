const admin = require("../firebase");

// @desc    Send push notification via Firebase Cloud Messaging (FCM)
// @route   POST /api/notifications/send
exports.sendNotification = async (req, res) => {
    try {
        const { token, title, body } = req.body;

        if (!token || !title || !body) {
            return res.status(400).json({
                success: false,
                message: "Please provide token, title, and body"
            });
        }

        const messagePayload = {
            notification: {
                title,
                body
            },
            token
        };

        const response = await admin.messaging().send(messagePayload);

        res.status(200).json({
            success: true,
            message: "Notification sent successfully",
            messageId: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send notification: " + error.message
        });
    }
};
