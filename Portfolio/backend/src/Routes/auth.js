const express = require("express");
const {
  authController,
  verifyOtp,
  checkIsVerified,
} = require("../Controllers/authController.js");

const authRoute = express.Router();

authRoute.post("/verify", authController);
authRoute.post("/verify-token", verifyOtp);
authRoute.post("/check-is-verified", checkIsVerified);
module.exports = authRoute;
