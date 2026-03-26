const express = require("express");
const {
  makeOrder,
  getOrders,
  changeOrderStatus,
  getOrderById,
  addMessage,
} = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { checkLogin } = require("../middleware/checkLoginMiddleware");
const orderRoute = express.Router();
orderRoute.post("/make-order", authMiddleware, makeOrder);
orderRoute.post("/get-orders", getOrders);
orderRoute.post("/change-order-status", checkLogin, changeOrderStatus);
orderRoute.post("/get-order-by-id", checkLogin, getOrderById);
orderRoute.post("/add-message", checkLogin, addMessage);
module.exports = orderRoute;
