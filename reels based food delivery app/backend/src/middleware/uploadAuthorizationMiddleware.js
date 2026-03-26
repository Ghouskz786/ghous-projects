exports.uploadAuthorizationMiddleware = async (req, res, next) => {
  if (!req.session.user || !req.session.user.isVerified) {
    return res.json({
      success: false,
      messages: ["please login for uploading content"],
    });
  } else if (!req.session.user.isVerified) {
    res.json({
      success: false,
      messages: ["please verfiy your account first"],
    });
  } else if (req.session.user.role !== "admin") {
    return res.json({
      success: false,
      messages: ["only admins can make an upload"],
    });
  } else {
    next();
  }
};
