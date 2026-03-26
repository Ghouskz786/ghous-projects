const { fileNameGenerator } = require("../lib/fileNameGenerator");
const { FoodPartner } = require("../Models/foodPartnerSignup");
const PostModel = require("../Models/PostModel");
const { deleteFile } = require("../service/delete.service");
const { imageUpload } = require("../service/storage");

exports.uploadPost = async (req, res) => {
  const reqData = JSON.parse(req.body.data);

  const uploadRes = await imageUpload(
    req.files.itemContent[0].buffer,
    fileNameGenerator(req.files.itemContent[0].mimetype),
  );

  if (uploadRes.success) {
    const item = new PostModel({
      postTitle: reqData.itemName,
      postDescription: reqData.itemDescription ? reqData.itemDescription : "",
      url: uploadRes.result.url,
      postId: uploadRes.result.fileId,
      uploadedBy: reqData.uploadedBy,
      resturantName: reqData.resturantName,
    });
    await item.save();
    const partner = await FoodPartner.findOne({ email: item.uploadedBy });
    partner.uploads.push(item.postId);
    await partner.save();
    res.json({ success: true, messages: ["item added successfully"] });
  } else {
    res.json({ success: false, messages: [uploadRes.error] });
  }
};
exports.getPost = async (req, res) => {
  const { skippingCount } = req.body;
  try {
    const result = await PostModel.aggregate([
      { $skip: skippingCount },
      { $limit: 10 },
      { $unset: "commentBy" },
    ]);

    res.json({ success: true, result });
  } catch (err) {
    res.json({
      success: false,
      messages: ["some error occured while loading"],
    });
  }
};
exports.commentOnPost = async (req, res) => {
  const { postId, message, email } = req.body;
  try {
    const post = await PostModel.findOne({ _id: postId });
    post.commentBy.push({ message: message, email });
    await post.save();
    res.json({ success: true, comment: post.commentBy });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
exports.makeAndRemoveLike = async (req, res) => {
  const { postId, email } = req.body;

  try {
    const post = await PostModel.findOne({ _id: postId });
    let liked = false;
    post.likedBy.forEach((item) => {
      if (item.email == email) {
        liked = true;
      }
    });

    if (liked) {
      const likes = post.likedBy.filter((item) => {
        if (item.email !== email) {
          return item;
        }
      });
      post.likedBy = likes;
    } else {
      post.likedBy.push({ email: email });
    }
    await post.save();
    res.json({ success: true, likes: post.likedBy });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
exports.getResturantPosts = async (req, res) => {
  const { email } = req.body;
  try {
    const resturant = await FoodPartner.aggregate([
      {
        $match: {
          email: email,
        },
      },

      {
        $lookup: {
          from: "posts",
          localField: "uploads",
          foreignField: "postId",
          as: "posts",
        },
      },
      { $unset: "uploads" },
    ]);
    res.json({ success: true, resturant: resturant[0] });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
exports.deletePost = async (req, res) => {
  const { postId, email } = req.body;
  try {
    const deleteRes = await deleteFile(postId);
    if (deleteRes) {
      await FoodPartner.updateMany(
        { email: email },
        { $pull: { uploads: postId } },
      );
      await PostModel.deleteOne({ postId: postId });
      res.json({ success: true });
    } else {
      res.json({ success: false, messages: deleteRes.messages });
    }
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
exports.getCommentController = async (req, res) => {
  const { postId } = req.body;

  try {
    const post = await PostModel.findOne({ _id: postId });
    res.json({ success: true, comments: post.commentBy });
  } catch (err) {
    res.json({ success: false, messages: ["an unexpected error occured"] });
  }
};
