const mongoose = require("mongoose");
const foodItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemPrice: { type: String, required: true },
  url: { type: String, required: true },
  itemDescription: { type: String, required: true },
  itemId: { type: String, required: true },
  uploadedBy: { type: String, required: true },
});
exports.foodItemModel = mongoose.model("fooditems", foodItemSchema);
