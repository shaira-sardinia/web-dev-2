const { application, response } = require("express");
const workshopsDAO = require("../models/workshopModel");
const organiserDAO = require("../models/organiserModel");
const asyncHandler = require("express-async-handler");
const { validateWorkshop } = require("../utils/middlewares/validation");
const { handleValidationErrors } = require("../utils/errors/validationError");

const workshopModel = new workshopsDAO();
const organiserModel = new organiserDAO();

exports.load_workshops = asyncHandler(async () => {
  const list = await workshopModel.getAllWorkshops();
  return list;
});

exports.new_workshop_entry = asyncHandler(async (req, res, next) => {
  const organisers = await organiserModel.getAllOrganisers();
  console.log("organisers:", organisers);
  res.render("forms/workshop-form", { organisers });
});

exports.post_workshop_entry = [
  validateWorkshop,
  handleValidationErrors("forms/workshop-form"),
  asyncHandler(async (req, res, next) => {
    try {
      await workshopModel.addWorkshop(
        req.body.name,
        req.body.description,
        req.body.numOfSessions,
        req.body.price,
        req.body.orgId
      );
      req.flash("success", "Workshop added successfully!");
      res.redirect("/dashboard");
    } catch (error) {
      req.flash("error", "Failed to add workshop. Please try again.");
      res.redirect("/workshop/new");
    }
  }),
];

exports.delete_workshop = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  try {
    workshopModel.deleteWorkshop(courseId);
    req.flash("success", "Workshop deleted successfully!");
    res.redirect("/dashboard");
  } catch (error) {
    req.flash("error", "Failed to delete Workshop. Please try again.");
  }
});

exports.edit_workshop = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  const workshopData = await workshopModel.findWorkshop(courseId);
  const organisers = await organiserModel.getAllOrganisers();

  if (workshopData && workshopData.orgId) {
    organisers.forEach((org) => {
      if (workshopData.orgId === org.orgId) {
        org.selected = true;
      }
    });
  }

  workshopModel.findWorkshop(courseId).then((workshop) => {
    res.render("forms/workshop-form", {
      workshop: workshop,
      isEditing: true,
      courseId: courseId,
      organisers: organisers,
      title: "Edit Workshop",
    });
  });
});

exports.update_workshop = [
  validateWorkshop,
  handleValidationErrors("forms/workshop-form"),
  asyncHandler(async (req, res, next) => {
    const courseId = req.params.courseId;

    const updatedData = {
      name: req.body.name,
      description: req.body.description,
      numOfSessions: req.body.numOfSessions,
      price: req.body.price,
      orgId: req.body.orgId,
    };

    try {
      await workshopModel.updateWorkshop(courseId, updatedData);
      req.flash("success", "Workshop updated successfully!");
      res.redirect("/dashboard");
    } catch (error) {
      req.flash("error", "Failed to update Workshop. Please try again.");
      res.redirect(`/workshop/edit/${courseId}`);
    }
  }),
];
