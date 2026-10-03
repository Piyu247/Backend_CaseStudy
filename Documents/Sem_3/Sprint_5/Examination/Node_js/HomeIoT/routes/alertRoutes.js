const express = require("express");
const router = express.Router();
const {
    getAlerts,
    createAlert,
    checkAlerts,
    markAsRead
} = require("../controllers/alertController");

router.route("/")
    .get(getAlerts)
    .post(createAlert);

router.post("/check", checkAlerts);
router.put("/:id/read", markAsRead);

module.exports = router;
