const express = require("express");
const { uploadItem } = require("../service/uploadItem");
const multer = require("multer");
const {
  addFoodItem,
  getFoodItems,
  deleteFoodItem,
  getFoodItemsByResturantName,
} = require("../controllers/foodItemController");
const itemRoute = express.Router();
const storage = multer.memoryStorage();
itemRoute.use(
  multer({ storage }).fields([{ name: "itemContent", maxCount: 1 }]),
);
itemRoute.post("/add-item", addFoodItem);
itemRoute.post("/get-item", getFoodItems);
itemRoute.post("/delete-item", deleteFoodItem);
itemRoute.post("/get-item-by-resturant-name", getFoodItemsByResturantName);
module.exports = itemRoute;
