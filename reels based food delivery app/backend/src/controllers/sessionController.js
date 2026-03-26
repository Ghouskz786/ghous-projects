exports.getSession = (req, res) => {
  if (req.session.user && req.session.user.isVerified) {
    res.json({ success: true, state: req.session.user });
  } else {
    res.json({ success: false });
  }
};
exports.deleteSession = async (req, res) => {
  await req.session.destroy();

  res.clearCookie("connect.sid").json({ success: true });
};

exports.getSessionWithoutLogin = async (req, res) => {
  if (req.session.user && !req.session.user.isVerified) {
    res.json({ success: true, state: req.session.user });
  } else {
    res.json({ success: false, messages: ["no session exists"] });
  }
};
