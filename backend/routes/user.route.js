const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// sign user token
router.post("/sign", userController.sign);
// add new user
router.post("/", userController.addUser);

module.exports = router;
