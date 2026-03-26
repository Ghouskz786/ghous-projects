const mongoose = require("mongoose");
const signUpSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  contact: { type: String, required: true, length: 12 },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
});
exports.signUpModel = mongoose.model("signup", signUpSchema);
