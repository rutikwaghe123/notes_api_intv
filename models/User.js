const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, min: 5, max: 30 },
    email: { type: String, unique: true, required: true },
    password: { type: String, min: 5, max: 30, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
