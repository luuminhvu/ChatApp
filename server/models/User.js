const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 255 },
    email: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 255,
      unique: true,
    },
    password: { type: String, required: true, minLength: 6, maxLength: 1024 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
