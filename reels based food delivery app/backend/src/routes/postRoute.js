const express = require("express");
const multer = require("multer");
const {
  uploadPost,
  getPost,
  commentOnPost,
  makeAndRemoveLike,
  getResturantPosts,
  deletePost,
  getCommentController,
} = require("../controllers/postController");
const {
  uploadAuthorizationMiddleware,
} = require("../middleware/uploadAuthorizationMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");

const postRoute = express.Router();
const storage = multer.memoryStorage();
postRoute.use(
  multer({ storage }).fields([{ name: "itemContent", maxCount: 1 }]),
);
postRoute.post("/get-post", getPost);
postRoute.post(
  "/get-resturant-post",
  uploadAuthorizationMiddleware,
  getResturantPosts,
);
postRoute.post("/toggle-like", authMiddleware, makeAndRemoveLike);
postRoute.post("/make-comment", authMiddleware, commentOnPost);
postRoute.post("/get-comments", getCommentController);
postRoute.post("/upload-post", uploadAuthorizationMiddleware, uploadPost);
(postRoute.post("/delete-post", uploadAuthorizationMiddleware, deletePost),
  (module.exports = postRoute));
