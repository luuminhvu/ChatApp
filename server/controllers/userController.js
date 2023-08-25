const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = require("../utils/genAuthToken.js");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ message: "User already exists" });
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please fill in all fields" });
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Please enter a valid email" });
    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json({ message: "Please enter a strong password" });
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password" });
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
};
