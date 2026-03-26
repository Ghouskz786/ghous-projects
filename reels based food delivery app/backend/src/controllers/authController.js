const { OtpGenerator } = require("../lib/OtpGenerator");
const resendEmail = require("../lib/Resend");
const { FoodPartner } = require("../Models/foodPartnerSignup");
const { OtpModel } = require("../Models/OtpModel");
const { signUpModel } = require("../Models/signUpModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { userName, email, password, role, contact } = req.body;
  const userObject = await signUpModel.findOne({ email: email });
  const foodPartnerObject = await FoodPartner.findOne({ email: email });
  if (userObject || foodPartnerObject) {
    return res.json({
      success: false,
      messages: ["user already exist with this email login"],
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new signUpModel({
      userName,
      contact,
      email,
      password: hashedPassword,
      isVerified: false,
      role,
    });

    await user.save();
  }

  res.json({ success: true, messages: ["User created successfully"] });
};
exports.foodPartnerSignUp = async (req, res) => {
  const { userName, email, resturantName, password, role, contact } = req.body;
  const userObject = await signUpModel.findOne({ email: email });
  const foodPartnerObject = await FoodPartner.findOne({ email: email });
  if (userObject || foodPartnerObject) {
    return res.json({
      success: false,
      messages: ["user already exist with this email login"],
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = new FoodPartner({
        userName,
        contact,
        email,
        password: hashedPassword,
        isVerified: false,
        role,
        resturantName,
      });

      await user.save();
    } catch (err) {
      res.json({ success: false, messages: [e.message] });
    }
  }

  res.json({ success: true, messages: ["User created successfully"] });
};

exports.VerificationController = async (req, res) => {
  if (req.session.user) {
    const otpObject = await OtpModel.findOne({ email: req.session.user.email });
    if (otpObject) {
      const { otp } = req.body;

      if (otp === otpObject.Otp) {
        req.session.user.isVerified = true;

        const signUpData = (await signUpModel.findOne({
          email: req.session.user.email,
        }))
          ? await signUpModel.findOne({ email: req.session.user.email })
          : await FoodPartner.findOne({ email: req.session.user.email });
        signUpData.isVerified = true;
        await signUpData.save();
        await OtpModel.deleteMany({ email: req.session.user.email });
        await req.session.destroy();
        return res.json({ success: true, messages: ["verified"] });
      } else {
        return res.json({ success: false, messages: ["Enter the right otp"] });
      }
    } else {
      return res.json({ success: false, messages: ["Otp has been expired"] });
    }
  } else {
    return res.json({ success: false, messages: ["session doesn't exists"] });
  }
};
exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  const userObj = (await signUpModel.findOne({ email: email }))
    ? await signUpModel.findOne({ email: email })
    : await FoodPartner.findOne({ email: email });
  if (userObj) {
    if (await bcrypt.compare(password, userObj.password)) {
      if (
        !(await OtpModel.findOne({ email: userObj.email })) &&
        !userObj.isVerified
      ) {
        const otp = OtpGenerator();
        const resObj = await resendEmail(email, otp);

        if (resObj.success) {
          const otpModel = new OtpModel({
            Otp: otp,
            email: email,
          });
          await otpModel.save();
          req.session.user = {
            resturantName: userObj.resturantName && userObj.resturantName,
            userName: userObj.userName,
            email: userObj.email,
            role: userObj.role,
            isVerified: userObj.isVerified,
          };
          await req.session.save();
          return res.json({
            success: false,
            messages: ["user isn't verified"],
          });
        } else {
          return res.json({ success: false, messages: resObj.messages });
        }
      } else if (userObj.isVerified) {
        req.session.user = {
          resturantName: userObj.resturantName && userObj.resturantName,
          userName: userObj.userName,
          email: userObj.email,
          role: userObj.role,
          isVerified: userObj.isVerified,
        };

        await req.session.save();

        return res.json({
          success: true,
          messages: ["user is verified"],
          state: req.session.user,
        });
      } else {
        req.session.user = {
          resturantName: userObj.resturantName && userObj.resturantName,
          userName: userObj.userName,
          email: userObj.email,
          role: userObj.role,
          isVerified: userObj.isVerified,
        };
        await req.session.save();

        return res.json({
          success: false,
          messages: ["user isn't verified"],
        });
      }
    } else {
      return res.json({
        success: false,
        messages: ["invalid email or password"],
      });
    }
  } else {
    return res.json({
      success: false,
      messages: ["invalid email or password"],
    });
  }
};
exports.resendOtpController = async (req, res) => {
  if (!req.session.user) {
    return res.json({
      success: false,
      messages: ["no session exist please login again"],
    });
  }
  const otpObj = await OtpModel.findOne({ email: req.session.user.email });

  if (otpObj) {
    const otp = OtpGenerator();
    const emailRes = await resendEmail(req.session.user.email, otp);
    if (emailRes.success) {
      otpObj.Otp = otp;
      await otpObj.save();

      res.json({ success: true, messages: ["otp sent successfully"] });
    } else {
      return res.json({ success: false, messages: emailRes.messages });
    }
  } else {
    const otp = OtpGenerator();
    const emailRes = await resendEmail(req.session.user.email, otp);
    if (emailRes.success) {
      const createdOtp = new OtpModel({
        email: req.session.user.email,
        otp: otp,
      });
      await createdOtp.save();
      return res.json({ success: true, messages: ["otp sent successfully"] });
    } else {
      return res.json({ success: false, messages: emailRes.messages });
    }
  }
};
