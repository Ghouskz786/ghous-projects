const { orderEmail } = require("../lib/orderEmail");
const { FoodPartner } = require("../Models/foodPartnerSignup");
const { Orders } = require("../Models/OrderModel");
const { signUpModel } = require("../Models/signUpModel");
const mongoose = require("mongoose");

exports.makeOrder = async (req, res) => {
  try {
    const { email, address, cart, price } = req.body;

    const array = [];
    const user = (await FoodPartner.findOne({ email: email }))
      ? await FoodPartner.findOne({ email: email })
      : await signUpModel.findOne({ email: email });
    for (let i = 0; i < cart.length; i++) {
      let present = false;
      for (let j = 0; j < array.length && array.length !== 0; j++) {
        if (array[j][0].uploadedBy == cart[i].uploadedBy) {
          present = true;
          array[j].push(cart[i]);
        }
      }
      if (!present) {
        array.push([cart[i]]);
      }
    }

    const iterationRes = await iterateOverArray(
      array,
      user.contact,
      user.userName,
      email,
      address,
      0,
    );

    if (iterationRes.success) {
      res.json({ success: true });
    } else {
      res.json({ success: false, messages: iterationRes.messages });
    }
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
const iterateOverArray = async (array, contact, name, email, address, idx) => {
  if (idx == array.length) {
    return { success: true };
  }
  const res = await orderEmail({
    cart: array[idx],

    contact,
    email,
    address,
    name,
  });

  if (res.success) {
    return await iterateOverArray(
      array,
      contact,
      name,
      email,
      address,
      idx + 1,
    );
  } else {
    return { success: false, messages: res.messages };
  }
};
exports.getOrders = async (req, res) => {
  try {
    const { email } = req.body;

    const orders = await Orders.aggregate([
      {
        $match: {
          $or: [{ from: email }, { to: email }],
        },
      },
      {
        $lookup: {
          from: "fooditems",
          localField: "items",
          foreignField: "itemId",
          as: "items",
        },
      },
    ]);
    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
exports.changeOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.body;
    const date = new Date();

    await Orders.updateOne(
      { _id: orderId },
      {
        $set: {
          expiresAt: new Date(date.setMonth(date.getMonth() + 1)),
          status: "delivered",
        },
      },
    );
    res.json({ success: true });
  } catch (err) {
    res.json({
      success: false,
      messages: ["an unexpected error occured load"],
    });
  }
};
exports.getOrderById = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Orders.findOne({ _id: orderId });
    res.json({ success: true, order: order });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
exports.addMessage = async (req, res) => {
  const { message, from, to, orderId } = req.body;

  try {
    await Orders.updateOne(
      { _id: orderId },
      { $push: { messages: { from: from, to: to, message: message } } },
    );
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
