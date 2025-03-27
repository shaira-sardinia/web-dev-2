const { application, response } = require("express");

exports.homepage = function (req, res) {
  try {
    res.render("homepage", {
      title: "Home Page",
    });
  } catch (err) {
    console.log("Page not loaded", err);
  }
};

exports.about = function (req, res) {
  res.render("about", {
    title: "About Us",
  });
};

exports.classes = function (req, res) {
  res.render("classes", {
    title: "Classes",
  });
};
