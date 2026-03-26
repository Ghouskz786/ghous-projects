exports.authMiddleware = (req, res, next) => {
  if (req.cookies.verification_token) {
    next();
  } else {
    res.json({ success: false, messages: ["unAuthorized"] });
  }
};
