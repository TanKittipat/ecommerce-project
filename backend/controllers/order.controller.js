const OrderModel = require("../models/order.model");

exports.getOrders = async (req, res) => {
  try {
    const data = await OrderModel.find();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No order found!" });
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something error occurred while fetching data!" });
  }
};

exports.getOrderByEmail = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  try {
    const data = await OrderModel.find({ email });
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No order found!" });
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something error occurred while fetching data!" });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Id is required!" });
  }
  try {
    const data = await OrderModel.findById(id).populate("products.productId");
    if (!data) {
      return res.status(404).json({ message: "No order found!" });
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something error occurred while fetching data!" });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Id is required!" });
  }
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "No order found!" });
    }
    const { delivery_status } = req.body;
    if (!delivery_status) {
      return res.status(400).json({ message: "Delivery status is required!" });
    }
    order.delivery_status = delivery_status;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something error occurred while updating data!" });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Id is required!" });
  }
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "No order found!" });
    }
    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something error occurred while deleting data!" });
  }
};
