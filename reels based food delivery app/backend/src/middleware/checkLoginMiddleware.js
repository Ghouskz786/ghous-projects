exports.checkLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else if (!req.session.user || !req.session.user.isVerified) {
    res.json({ success: false, messages: ["login please"] });
  }
};
