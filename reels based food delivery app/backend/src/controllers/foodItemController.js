const { fileNameGenerator } = require("../lib/fileNameGenerator");
const { foodItemModel } = require("../Models/foodItemModel");
const { FoodPartner } = require("../Models/foodPartnerSignup");
const { deleteFile } = require("../service/delete.service");
const { uploadItem } = require("../service/uploadItem");

exports.addFoodItem = async (req, res) => {
  const { itemName, uploadedBy, itemDescription, itemPrice } = JSON.parse(
    req.body.data,
  );
  try {
    const uploadItemRes = await uploadItem(
      req.files.itemContent[0].buffer,
      fileNameGenerator(req.files.itemContent[0].mimetype),
    );

    if (!uploadItemRes) {
      res.json({ success: false, messages: uploadItemRes.messages });
    }
    const item = new foodItemModel({
      itemName,
      uploadedBy,
      itemDescription,
      itemPrice,
      itemId: uploadItemRes.result.fileId,
      url: uploadItemRes.result.url,
    });
    await item.save();
    await FoodPartner.updateOne(
      { email: uploadedBy },
      { $push: { items: item.itemId } },
    );
    res.json({ success: true, messages: ["item added successfully"] });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
exports.getFoodItems = async (req, res) => {
  const { email } = req.body;

  try {
    const resturant = await FoodPartner.aggregate([
      { $match: { email: email } },
      {
        $lookup: {
          from: "fooditems",
          localField: "items",
          foreignField: "itemId",
          as: "items",
        },
      },
    ]);

    res.json({ success: true, resturant: resturant[0] });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
exports.getFoodItemsByResturantName = async (req, res) => {
  const { resturantName } = req.body;

  try {
    const resturant = await FoodPartner.aggregate([
      { $match: { resturantName: resturantName } },
      {
        $lookup: {
          from: "fooditems",
          localField: "items",
          foreignField: "itemId",
          as: "items",
        },
      },
    ]);

    res.json({ success: true, resturant: resturant[0] });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};

exports.deleteFoodItem = async (req, res) => {
  const { itemId, email } = req.body;

  const result = await deleteFile(itemId);

  if (result.success) {
    try {
      await foodItemModel.findOneAndDelete({ itemId: itemId });
      const foodPartner = await FoodPartner.findOneAndUpdate(
        { email },
        { $pull: { items: itemId } },
      );
      await foodPartner.save();
      res.json({ success: true });
    } catch (err) {
      res.json({ success: false, messages: ["an unexpected error occured"] });
    }
  } else {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
