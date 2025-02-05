const CartItemModel = require("../models/cart.model");

exports.getCartItems = async (req, res) => {
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
  const { id } = req.params;
  try {
    const cartItem = await CartItemModel.findById(id);
    const { productName, productPrice, productImage } = req.body;
    if (!productName || !productPrice || !productImage) {
      return res
        .status(400)
        .json({ message: "Product information is missing!" });
    }
    cartItem.productName = productName;
    cartItem.productPrice = productPrice;
    cartItem.productImage = productImage;
    await cartItem.save();
    res.status(200).json({ message: "Update cart item successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while updating cart item!",
    });
  }
};

exports.removeAllCartItems = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(404).json({ message: "Email is missing!" });
  }
  try {
    await CartItemModel.deleteMany({ customer: email });
    res.status(200).json({
      message: "Remove cart items successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while removing cart item!",
    });
  }
};

exports.removeCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await CartItemModel.deleteOne({ _id: id });
    res.status(200).json({
      message: "Remove cart item successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while removing cart item!",
    });
  }
};
