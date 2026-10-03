require("dotenv").config();
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { getMessaging } = require("firebase-admin/messaging");

// Initialize Firebase Admin SDK using environment variables
if (admin.getApps().length === 0) {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey && privateKey.includes("\\n")) {
        privateKey = privateKey.replace(/\\n/g, "\n");
    }

    admin.initializeApp({
        credential: admin.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey
        })
    });
    console.log("Firebase Admin SDK Initialized");
}

// Attach auth() and messaging() helpers for firebase-admin v13+ compatibility
admin.auth = () => getAuth();
admin.messaging = () => getMessaging();

module.exports = admin;
