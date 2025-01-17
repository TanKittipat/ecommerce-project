const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config();
const secret = process.env.SECRET;
const salt = bcrypt.genSaltSync(10);

// register new user
exports.register = async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields!" });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created.", user: newUser });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred while registering new user!",
    });
  }
};

// login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields!" });
  }
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    // check if password is correct
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password!", accessToken: null });
    }

    // generate token
    jwt.sign(
      { username: user.username, id: user._id },
      secret,
      { expiresIn: 86400 }, // 24 hours
      (err, token) => {
        if (err) {
          return res
            .status(500)
            .json({ message: err.message || "Internal error: Can't login!" });
        }
        res.status(200).json({
          message: "logged in successfully.",
          id: user._id,
          username: user.username,
          accessToken: token,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred while logging in user!",
    });
  }
};
