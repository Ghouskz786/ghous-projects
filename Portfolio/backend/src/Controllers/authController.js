const { OtpGenerator } = require("../lib/OtpGenerator");
const { sendOtp } = require("../Services/resend");
const jwt = require("jsonwebtoken");

exports.authController = async (req, res) => {
  if (!req.cookies.otp_secret || !req.cookies.verification_token) {
    const otp = OtpGenerator();

    const result = await sendOtp({ otp: otp });

    if (result.success) {
      const otp_secret = jwt.sign({ otp: otp }, process.env.JWT_SECRET, {
        expiresIn: 120,
      });

      res.cookie("otp_secret", otp_secret, { maxAge: 120 * 1000 });
      res.json({ success: true });
    } else {
      res.json({ success: false, messages: result.messages });
    }
  } else {
    res.json({ success: true });
  }
};
exports.verifyOtp = (req, res) => {
  const { otp } = req.body;
  if (req.cookies.otp_secret) {
    try {
      const result = jwt.verify(req.cookies.otp_secret, process.env.JWT_SECRET);

      if (otp.toString() === result.otp.toString()) {
        const verificationResult = jwt.sign(
          { verified: true },
          process.env.JWT_SECRET,
          { expiresIn: 1800 },
        );
        res.cookie("verification_token", verificationResult, {
          maxAge: 180 * 10000,
        });
        res.json({ success: true });
      } else {
        res.json({ success: false, messages: ["Enter the right otp"] });
      }
    } catch (err) {
      res.json({ success: false, messages: ["no token exists"] });
    }
  } else {
    res.json({ success: false, messages: ["session have been expired"] });
  }
};
exports.checkIsVerified = (req, res) => {
  if (req.cookies.verification_token) {
    try {
      const result = jwt.verify(
        req.cookies.verification_token,
        process.env.JWT_SECRET,
      );

      if (result.verified) {
        res.json({ success: true });
      }
    } catch (err) {
      res.json({ success: false, messages: ["not verified"] });
    }
  } else {
    res.json({ success: false, messages: ["no token exists"] });
  }
};
