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
