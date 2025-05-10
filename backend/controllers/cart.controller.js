const CartItemModel = require("../models/cart.model");

exports.getCartItems = async (req, res) => {
  // Get cart items
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "Get all cart items"
    #swagger.description = 'Endpoint to fetch all cart items'
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/CartItemResponse"},
       description: "Fetch cart items successfully"
    }
  */
  try {
    const data = await CartItemModel.find();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No item in cart!" });
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something error occurred while fetching data!" });
  }
};

exports.createCartItem = async (req, res) => {
  // Create new cart item
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "Create a new cart item"
    #swagger.description = 'Endpoint to create a new cart item'
    #swagger.requestBody = {
       required:true,
       content:{
         "application/json":{
           schema:{
             $ref:"#components/schemas/NewCartItem"
           }
         }
       }
    }
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/CartItemResponse"},
       description: "Cart item created successfully"
    }
  */
  const {
    customer,
    productId,
    quantity,
    productName,
    productPrice,
    productImage,
  } = req.body;
  if (
    !customer ||
    !productId ||
    !quantity ||
    !productName ||
    !productPrice ||
    !productImage
  ) {
    return res.status(400).json({ message: "Product information is missing!" });
  }

  try {
    // Existing item in our cart
    const existingItem = await CartItemModel.findOne({ productId, customer });
    if (existingItem) {
      existingItem.quantity += quantity;
      const data = await existingItem.save();
      return res.json(data);
    }

    // add item to cart for first time
    const newCartItem = new CartItemModel({
      customer,
      productId,
      quantity,
      productName,
      productPrice,
      productImage,
    });
    const data = await newCartItem.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred while adding new cart item!",
    });
  }
};

exports.getCartItemsByEmail = async (req, res) => {
  // Get cart items by email
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "Get all cart items by email"
    #swagger.description = 'Endpoint to fetch user all cart items'
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/CartItemResponse"},
       description: "Fetch cart items successfully"
    }
  */
  const { email } = req.params;
  if (!email) {
    return res.status(404).json({ message: "Email is missing!" });
  }
  try {
    const data = await CartItemModel.find({ customer: email });
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No item in cart!" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while fetching data!",
    });
  }
};

exports.updateCartItem = async (req, res) => {
  // Update cart item data
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "Update cart item data"
    #swagger.description = 'Endpoint to update cart item data'
    #swagger.requestBody = {
       required:true,
       content:{
         "application/json":{
           schema:{
             $ref:"#components/schemas/UpdatedCartItem"
           }
         }
       }
    }
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/CartItemResponse"},
       description: "Cart item updated successfully"
    }
  */
  const { id } = req.params;
  try {
    const cartItem = await CartItemModel.findById(id);
    const { quantity } = req.body;
    if (!quantity) {
      return res
        .status(400)
        .json({ message: "Product information is missing!" });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json({ message: "Update cart item successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while updating cart item!",
    });
  }
};

exports.removeAllCartItems = async (req, res) => {
  // Remove all cart items
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "Remove all cart items"
    #swagger.description = 'Endpoint to remove all cart items'
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/CartItemResponse"},
       description: "Remove cart items successfully"
    }
  */
  const { email } = req.params;
  if (!email) {
    return res.status(404).json({ message: "Email is missing!" });
  }
  try {
    const cartItems = await CartItemModel.deleteMany({ customer: email });
    if (cartItems.deletedCount > 1) {
      return res.status(200).json({
        message: "Remove cart items successfully!",
      });
    }
    if (!cartItems) {
      return res.status(404).json({ message: "Cart item not found!" });
    }
    res.status(200).json({ message: "Cart is empty!" });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while removing cart item!",
    });
  }
};

exports.removeCartItem = async (req, res) => {
  // Remove cart item
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "Remove cart item by id"
    #swagger.description = 'Endpoint to remove cart item by id'
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/CartItemResponse"},
       description: "Remove cart item successfully"
    }
  */
  const { id } = req.params;
  try {
    const data = await CartItemModel.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Cart item not found!" });
    }
    await data.deleteOne();
    res.status(200).json({
      message: "Remove cart item successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while removing cart item!",
    });
  }
};
