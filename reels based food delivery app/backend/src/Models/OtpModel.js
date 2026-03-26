const mongoose = require("mongoose");
const OtpShcema = new mongoose.Schema({
  Otp: { type: String, required: true, length: 6 },
  email: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
    expires: 60 * 60,
  },
});
exports.OtpModel = mongoose.model("otps", OtpShcema);
