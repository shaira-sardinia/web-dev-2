const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userDAO = require("../models/userModel");

const userModel = new userDAO();

exports.login = asyncHandler(async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findUser(email);

    if (!user) {
      console.log(`User ${email} not found.`);
      req.flash("error", "Invalid email or password. Please try again.");
      return res.redirect("/login");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.flash("error", "Invalid email or password. Please try again.");
      return res.redirect("/login");
    }

    let payload = {
      email: user.email,
      userId: user.userId,
      name: user.name,
      role: user.role || "user",
    };

    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.cookie("jwt", accessToken);

    req.flash("success", `Welcome, ${user.name}!`);
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    req.flash("error", "An error occurred during login. Please try again.");
    res.redirect("/login");
  }
});

exports.verify = asyncHandler(async (req, res, next) => {
  let accessToken = req.cookies.jwt;

  if (!accessToken) {
    req.flash("error", "Please log in to access this page.");
    return res.redirect("/login");
  }

  try {
    const decodedPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log("Token verified for user:", decodedPayload.email);

    req.user = decodedPayload;
    next();
  } catch (error) {
    req.flash("error", "Your session has expired. Please log in again.");
    res.clearCookie("jwt");
    return res.redirect("/login");
  }
});

exports.checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      req.flash("error", "Please log in to access this page.");
      return res.redirect("/login");
    }

    if (!roles.includes(req.user.role)) {
      req.flash("error", "You don't have permission to access this page.");
      return res.redirect("/dashboard");
    }
    next();
  };
};

exports.logout = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    req.flash("success", "You have been successfully logged out.");
    res.redirect("/");
  } catch (error) {
    console.error("Logout error:", error);
    req.flash("error", "An error occurred during logout.");
    res.redirect("/");
  }
});
