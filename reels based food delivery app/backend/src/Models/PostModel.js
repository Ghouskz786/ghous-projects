const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  postTitle: { type: String, required: true },
  postDescription: { type: String },
  postId: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  url: { type: String, required: true },
  likedBy: { type: [{ email: { type: String, required: true } }] },
  resturantName: { type: String, required: true },
  commentBy: {
    type: [
      {
        email: { type: String, required: true },
        message: { type: String, required: true },
        commentedOn: { type: Date, required: true, default: Date.now() },
      },
    ],
  },
});
const PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;
