const { Resend } = require("resend");
const path = require("path");
require("dotenv").config();
const resend = new Resend(process.env.RESEND_SECRET);
const ejs = require("ejs");

exports.sendOtp = async ({ otp }) => {
  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL,
      subject: "update portfolio otp request",
      html: await ejs.renderFile(
        path.join(__dirname, "../views/otp-template.ejs"),
        { otp: otp },
      ),
    });

    if (result.error) {
      return {
        success: false,
        messages: ["check your internet connection and try again"],
      };
    } else {
      return { success: true };
    }
  } catch (err) {
    return {
      success: false,
      messages: ["check your internet connection and try again"],
    };
  }
};
exports.sendContactEmail = async ({ name, email, message }) => {
  try {
    const res = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL,
      subject: "Email from contact me form",
      html: await ejs.renderFile(
        path.join(__dirname, "../views/contact-template.ejs"),
        { name, email, message },
      ),
    });
    if (res.error) {
      return {
        success: false,
        messages: ["check your internet connection and try again"],
      };
    } else {
      return { success: true };
    }
  } catch (err) {
    return { success: false, messages: ["an unexpected error occured"] };
  }
};
