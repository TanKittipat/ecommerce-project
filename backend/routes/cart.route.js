const express = require("express");
const router = express.Router();
const CartItemController = require("../controllers/cart.controller");

// Create new cart item
router.post("/", CartItemController.createCartItem);
// Get all cart items
router.get("/", CartItemController.getCartItems);
// Get all cart items by email
router.get("/user/:email", CartItemController.getCartItemsByEmail);
// Update cart item
router.put("/:id", CartItemController.updateCartItem);
// Remove all cart items
router.delete("/remove/:email", CartItemController.removeAllCartItems);
// Remove cart item
router.delete("/:id", CartItemController.removeCartItem);

module.exports = router;
