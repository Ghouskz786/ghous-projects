const express = require("express");
const {
  signUp,
  VerificationController,
  loginController,
  resendOtpController,
  foodPartnerSignUp,
} = require("../controllers/authController");
const authRouter = express.Router();
authRouter.post("/sign-up", signUp);
authRouter.post("/verification", VerificationController);
authRouter.post("/login", loginController);
authRouter.post("/resend-otp", resendOtpController);
authRouter.post("/food-partner-signup", foodPartnerSignUp);

module.exports = authRouter;
