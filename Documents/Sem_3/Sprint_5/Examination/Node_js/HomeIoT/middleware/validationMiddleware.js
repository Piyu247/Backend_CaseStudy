// Middleware to check if required fields exist in req.body
const validateFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(
            (field) => req.body[field] === undefined || req.body[field] === ""
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Validation Error: Missing required field(s): ${missingFields.join(", ")}`
            });
        }

        next();
    };
};

module.exports = { validateFields };
