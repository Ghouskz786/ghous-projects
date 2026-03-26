const express = require("express");
const { contactController } = require("../Controllers/contactController");
const { check } = require("express-validator");
const contactRoute = express();
contactRoute.post(
  "/contact-me",
  [
    check("name")
      .isString()
      .withMessage("name must be string")
      .notEmpty()
      .withMessage("name can't be empty"),
    check("email")
      .isString()
      .withMessage("email must be string")
      .matches(/^[a-z0-9A-Z$%*.+]+@[a-z0-9A-Z$%*.+]+\.[a-z]{2,4}/)
      .withMessage("should be email")
      .notEmpty()
      .withMessage("email can't be empty"),
    check("message")
      .isString()
      .withMessage("message should be string")
      .notEmpty()
      .withMessage("message can't be empty"),
  ],
  contactController,
);
module.exports = contactRoute;
