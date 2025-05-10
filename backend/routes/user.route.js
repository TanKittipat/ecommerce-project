const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// register new user
router.post("/register", userController.register);

// login user
router.post("/login", userController.login);

module.exports = router;
