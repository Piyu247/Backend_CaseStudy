const User = require("../models/User");
const jwt = require("jsonwebtoken");
const admin = require("../firebase");

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        }

        // Create user
        const user = await User.create({ name, email, password, role });

        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        // Check for user (must select password explicitly since select: false in schema)
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Authenticate user with Firebase ID Token
// @route   POST /api/auth/firebase-login
exports.firebaseLogin = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ success: false, message: "Please provide Firebase idToken" });
        }

        // Verify Firebase ID Token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name } = decodedToken;

        // Find existing user or auto-register
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name: name || email.split("@")[0],
                email: email,
                password: Math.random().toString(36).slice(-10) + "Aa1!" // random password for OAuth users
            });
        }

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                firebaseUid: decodedToken.uid
            }
        });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid Firebase Token: " + error.message });
    }
};

// @desc    Get logged in user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        res.status(200).json({ success: true, data: req.user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
