const { application, response } = require("express");
const asyncHandler = require("express-async-handler");

exports.homepage = asyncHandler(async (req, res, next) => {
  res.render("main/homepage", {
    title: "Home Page",
  });
});

exports.about = asyncHandler(async (req, res, next) => {
  res.render("main/about", {
    title: "Home Page",
  });
});
