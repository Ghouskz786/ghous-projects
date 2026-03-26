const { Resend } = require("resend");
const ejs = require("ejs");
const path = require("path");
const emailTemplatePath = path.join(
  __dirname,
  "../views",
  "otp-email-template.ejs",
);
const resendEmail = async (email, otp) => {
  const resend = new Resend(process.env.RESEND_KEY);
  try {
    const res = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Request for verification code",
      html: await ejs.renderFile(emailTemplatePath, { otp: otp }),
    });

    if (res.error) {
      return {
        success: false,
        messages: ["check your internet connection and try again"],
      };
    }
    return { success: true, messages: ["Message sent successfully"] };
  } catch (err) {
    return {
      success: false,
      messages: ["check your internet connection and try again"],
    };
  }
};
module.exports = resendEmail;
