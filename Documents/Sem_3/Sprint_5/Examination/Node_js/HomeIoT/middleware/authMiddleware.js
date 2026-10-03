const jwt = require("jsonwebtoken");
const User = require("../models/User");
const admin = require("../firebase");

// Middleware to protect routes via Firebase ID Token OR JWT verification
exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header: "Bearer <token>"
            token = req.headers.authorization.split(" ")[1];

            // 1. Try Firebase Admin ID token verification
            try {
                const decodedFirebaseToken = await admin.auth().verifyIdToken(token);
                let user = await User.findOne({ email: decodedFirebaseToken.email });
                
                if (user) {
                    req.user = user;
                    return next();
                }
            } catch (firebaseErr) {
                // Not a valid Firebase token, fallback to JWT check
            }

            // 2. Fallback to standard JWT verification
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ success: false, message: "User no longer exists" });
            }

            return next();
        } catch (error) {
            return res.status(401).json({ success: false, message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token provided" });
    }
};

// Middleware for Admin role authorization
exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).json({ success: false, message: "Access denied: Admin role required" });
};
