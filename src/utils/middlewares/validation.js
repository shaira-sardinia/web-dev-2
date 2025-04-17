const { body, validationResult } = require("express-validator");

const validateWorkshop = [
  body("name").trim().notEmpty(),
  body("description").trim().notEmpty(),
  body("numOfSessions").trim().notEmpty().isInt({ min: 1 }),
  body("price").trim().notEmpty().toFloat(),
];

const validateClass = [
  body("name").trim().notEmpty(),
  body("description").trim().notEmpty(),
  body("schedule").trim().notEmpty(),
  body("price").trim().notEmpty().toFloat(),
];

const validateOrganiser = [
  body("name").trim().notEmpty(),
  body("email").trim().notEmpty(),
  body("phone")
    .trim()
    .notEmpty()
    .matches(/^\d{6,15}$/)
    .blacklist(/\D/g),
  body("bio").trim().notEmpty(),
];

const validateUser = [
  body("email").trim().notEmpty(),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  body("name").trim().notEmpty(),
  body("phone")
    .trim()
    .notEmpty()
    .matches(/^\d{6,15}$/)
    .blacklist(/\D/g),
  body("address").trim().notEmpty(),
];

const validateLogin = [body("email").trim().notEmpty(), body("password").trim().notEmpty()];

module.exports = { validateWorkshop, validateClass, validateOrganiser, validateUser, validateLogin };
