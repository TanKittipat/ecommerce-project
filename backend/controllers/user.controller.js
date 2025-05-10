const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config();
const secret = process.env.SECRET;

exports.sign = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Sign token
    const token = jwt.sign({ email: user.email, role: user.role }, secret, {
      expiresIn: "1h",
    });

    const userInfo = {
      token: token,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ userInfo });
  } catch (error) {
    console.error("Error during sign:", error.message); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  try {
    // Log to verify the email
    console.log("Adding user:", email);

    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(200).json({ message: "User already exists!" });
    }

    const user = new UserModel({ email });
    await user.save();

    // Log to confirm the user is saved
    console.log("User added successfully:", user);

    res.status(201).json(user);
  } catch (error) {
    console.error("Error during addUser:", error.message); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res.json({ message: "No user in system!" });
    }
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something error occurred while getting all users!" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { email, role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while updating user!",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ message: "Delete user successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while deleting user!",
    });
  }
};

exports.makeAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.role = "admin";
    user.save();
    res.json({ message: "Update user successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while updating user!",
    });
  }
};

exports.makeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.role = "user";
    user.save();
    res.json({ message: "Update user successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while updating user!",
    });
  }
};

exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({
      message: "Something error occurred while getting all users!",
    });
  }
};
