const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const authRoute = require("./Routes/auth.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const projectRoute = require("./Routes/project.js");
const contactRoute = require("./Routes/contact.js");
const resumeRoute = require("./Routes/resume.js");
require("dotenv").config();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGOOSE_URI);
    isConnected = true;
  }
  next();
});
app.use(multer({ storage: multer.memoryStorage() }).single("projectImg"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view-engine", "ejs");
app.set("views", "views");
app.use(express.static("./public"));
app.use("/resume", resumeRoute);
app.use("/contact", contactRoute);
app.use("/project", projectRoute);
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  console.log("This is home page");
});
module.exports = app;
