const express = require("express");
const { downloadResume } = require("../Controllers/resume");
const resumeRoute = express();
resumeRoute.post("/download-resume", downloadResume);
module.exports = resumeRoute;
