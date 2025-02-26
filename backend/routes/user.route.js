const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authJwt = require("../middlewares/auth.middleware");

// sign user token
router.post("/sign", userController.sign);
// add new user
router.post("/", userController.addUser);
// get all users
router.get("/", userController.getAllUsers);
// update user
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.updateUser
);
// delete user
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.deleteUser
);
// make user admin
router.patch(
  "/admin/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.makeAdmin
);
// make admin user
router.patch(
  "/user/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.makeUser
);

module.exports = router;
