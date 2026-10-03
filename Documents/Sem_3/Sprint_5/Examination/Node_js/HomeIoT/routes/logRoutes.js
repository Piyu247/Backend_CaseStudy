const express = require("express");
const router = express.Router();
const { getLogs, createLog, getLogsByDevice } = require("../controllers/logController");

router.route("/")
    .get(getLogs)
    .post(createLog);

router.get("/device/:id", getLogsByDevice);

module.exports = router;
