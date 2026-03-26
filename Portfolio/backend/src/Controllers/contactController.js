const { validationResult } = require("express-validator");
const { sendContactEmail } = require("../Services/resend");
exports.contactController = async (req, res) => {
  const result = validationResult(req);
  const errorArray = result.array().map((item) => {
    return item.msg;
  });

  if (errorArray.length !== 0) {
    res.json({ success: false, messages: errorArray }).status(502);
  } else {
    const { name, email, message } = req.body;
    const emailResult = await sendContactEmail({ name, email, message });
    if (emailResult.success) {
      res.json({ success: true });
    } else {
      res.json({ success: false, messages: emailResult.messages });
    }
  }
};
