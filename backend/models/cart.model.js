const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartItemSchema = new Schema(
  {
    customer: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productImage: { type: String, required: true },
  },
  { timestamps: true }
);

const CartItemModel = model("CartItem", cartItemSchema);
module.exports = CartItemModel;
