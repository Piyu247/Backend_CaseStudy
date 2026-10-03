const express = require("express");
const router = express.Router();
const {
    controlDevice,
    getControls,
    updateControl
} = require("../controllers/controlController");

router.route("/")
    .get(getControls)
    .post(controlDevice);

router.route("/:id")
    .put(updateControl);

module.exports = router;
