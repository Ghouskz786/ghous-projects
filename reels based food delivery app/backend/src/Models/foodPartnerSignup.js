const mongoose = require("mongoose");
const FoodPartnerSchema = new mongoose.Schema({
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
  resturantName: { type: String, required: true, unique: true },
  uploads: { type: [String], default: [] },
  items: { type: [String], deault: [] },
});
exports.FoodPartner = mongoose.model("foodpartner", FoodPartnerSchema);
