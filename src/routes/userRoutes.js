const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../auth/authController");
const { validateUser, validateLogin } = require("../utils/middlewares/validation");
const { handleValidationErrors } = require("../utils/errors/validationError");
const { verify } = require("../auth/authController");

router.get("/register", userController.show_register_page);
router.post("/register", validateUser, handleValidationErrors("auth/register"), userController.post_new_user);

router.get("/login", userController.show_login_page);
router.post("/login", validateLogin, handleValidationErrors("auth/login"), authController.login);

router.get("/dashboard", verify, userController.show_dashboard);

router.get("/logout", verify, authController.logout);

module.exports = router;
