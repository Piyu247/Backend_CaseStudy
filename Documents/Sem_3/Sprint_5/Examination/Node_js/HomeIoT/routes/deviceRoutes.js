const express = require("express");
const router = express.Router();
const {
    getDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
} = require("../controllers/deviceController");
const { validateFields } = require("../middleware/validationMiddleware");

router.route("/")
    .get(getDevices)
    .post(validateFields(["name", "type", "room"]), createDevice);

router.route("/:id")
    .get(getDeviceById)
    .put(updateDevice)
    .delete(deleteDevice);

module.exports = router;
