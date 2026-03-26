const express = require("express");
const { check, body } = require("express-validator");
const { addProject, getProjects } = require("../Controllers/ProjectController");
const { authMiddleware } = require("../Middlewares/authMiddleware");
const projectRoute = express.Router();
projectRoute.get("/get-project", getProjects);
projectRoute.post(
  "/add-project",
  authMiddleware,
  [
    check("title").isString().withMessage("title must be string"),
    check("description").isString("description must be string"),
    check("projectGithub")
      .isString()
      .withMessage("project github link must be string"),
    check("validatingFile")
      .custom((data, { req }) => {
        if (req.file.size <= 1048576) {
          return true;
        } else {
          return false;
        }
      })
      .withMessage("project image must be less than 10mb"),
  ],
  addProject,
);
module.exports = projectRoute;
