const express = require("express");
const userControllers = require("../../controllers/user.controller");
const router = express.Router();

router.route("/user/all").get(userControllers.getAllUser);

module.exports = router;
