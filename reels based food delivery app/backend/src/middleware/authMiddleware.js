exports.authMiddleware = (req, res, next) => {
  if (!req.session.user || !req.session.user.isVerified) {
    res.json({ success: false, messages: ["login to make comment"] });
  } else if (!req.session.user.isVerified) {
    res.json({
      success: false,
      messages: ["please verfiy your account first"],
    });
  } else {
    next();
  }
};
