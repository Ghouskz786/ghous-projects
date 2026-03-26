const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  items: { type: [String], required: true },
  deliveryAddress: { type: String, required: true },
  totalValue: { type: String, required: true },
  status: { type: String, enum: ["pending", "delivered"], default: "pending" },
  expiresAt: { type: Date, index: { expireAfterSeconds: 0 } },
  messages: {
    type: [{ from: String, to: String, message: String }],
    default: [],
  },
});
exports.Orders = mongoose.model("orders", orderSchema);
