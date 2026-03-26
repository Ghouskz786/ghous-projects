const ejs = require("ejs");
const { Resend } = require("resend");
const path = require("path");
const { Orders } = require("../Models/OrderModel");
const { FoodPartner } = require("../Models/foodPartnerSignup");
const emailTemplatePath = path.join(
  __dirname,
  "../views",
  "orderEmailTemplate.ejs",
);
exports.orderEmail = async ({ cart, contact, email, address, name }) => {
  const resend = new Resend(process.env.RESEND_KEY);
  let calculate = "";
  cart.forEach((item) => {
    calculate += "+" + item.itemPrice;
  });

  try {
    const res = await resend.emails.send({
      from: "onboarding@resend.dev",
      subject: `An order from food delivery app`,
      to: cart[0].uploadedBy,
      html: await ejs.renderFile(emailTemplatePath, {
        name,
        address,
        contact,
        cart,
        email,
        price: eval(calculate),
      }),
    });
    if (res.error) {
      return {
        success: false,
        messages: ["check your internet connection and try again"],
      };
    }
    const itemIdArray = cart.map((item) => {
      return item.itemId;
    });
    const order = new Orders({
      items: itemIdArray,
      from: email,
      to: cart[0].uploadedBy,
      totalValue: eval(calculate),
      deliveryAddress: address,
    });

    await order.save();

    return { success: true };
  } catch (err) {
    return {
      success: false,
      messages: ["check your internet connection and try again"],
    };
  }
};
