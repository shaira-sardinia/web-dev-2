const { application, response } = require("express");
const asyncHandler = require("express-async-handler");
const organiserDAO = require("../models/organiserModel");
const classDAO = require("../models/classModel");
const workshopDAO = require("../models/workshopModel");

const organiserModel = new organiserDAO();
const classModel = new classDAO();
const workshopModel = new workshopDAO();

exports.homepage = asyncHandler(async (req, res, next) => {
  res.render("main/homepage", {
    title: "Home Page",
    user: req.user,
  });
});

exports.offers = asyncHandler(async (req, res, next) => {
  const classes = await classModel.getAllClasses();
  const workshops = await workshopModel.getAllWorkshops();

  res.render("main/offers", {
    title: "Available Courses",
    classes: classes,
    workshops: workshops,
    user: req.user,
  });
});

exports.team = asyncHandler(async (req, res, next) => {
  const organisers = await organiserModel.getAllOrganisers();
  const isAdmin = req.user?.role === "admin";

  res.render("main/team", {
    title: "Meet The Team",
    user: req.user?.name,
    isAdmin: isAdmin,
    organisers: organisers,
  });
});
