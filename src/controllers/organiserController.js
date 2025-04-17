const { application, response } = require("express");
const organiserDAO = require("../models/organiserModel");
const asyncHandler = require("express-async-handler");
const { validateOrganiser } = require("../utils/middlewares/validation");
const { handleValidationErrors } = require("../utils/errors/validationError");

const organiserModel = new organiserDAO();

exports.load_organisers = asyncHandler(async () => {
  const list = await organiserModel.getAllOrganisers();
  return list;
});

exports.new_organiser_entry = asyncHandler(async (req, res, next) => {
  res.render("forms/organiser-form", {});
});

exports.post_organiser_entry = [
  validateOrganiser,
  handleValidationErrors("forms/organiser-form"),
  asyncHandler(async (req, res, next) => {
    try {
      await organiserModel.addOrganiser(req.body.name, req.body.email, req.body.phone, req.body.bio);
      req.flash("success", "Organiser added successfully!");
      res.redirect("/dashboard");
    } catch (error) {
      req.flash("error", "Failed to add Organiser. Please try again.");
    }
  }),
];

exports.delete_organiser = asyncHandler(async (req, res, next) => {
  const orgId = req.params.orgId;
  try {
    organiserModel.deleteOrganiser(orgId);
    console.log(`Organiser  ${orgId} deleted successfully`);
    req.flash("success", "Organiser deleted successfully!");
    res.redirect("/dashboard");
  } catch (error) {
    req.flash("error", "Failed to delete Organiser. Please try again.");
  }
});

exports.edit_organiser = asyncHandler(async (req, res, next) => {
  const orgId = req.params.orgId;

  organiserModel.findOrganiser(orgId).then((organiser) => {
    res.render("forms/organiser-form", {
      organiser: organiser,
      isEditing: true,
      orgId: orgId,
      title: "Edit Organiser Details",
    });
  });
});

exports.update_organiser = [
  validateOrganiser,
  handleValidationErrors("forms/organiser-form"),
  asyncHandler(async (req, res, next) => {
    const orgId = req.params.orgId;
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      bio: req.body.bio,
    };

    try {
      await organiserModel.updateOrganiser(orgId, updatedData);
      req.flash("success", "Organiser updated successfully!");
      res.redirect("/dashboard");
    } catch (error) {
      req.flash("error", "Failed to update Organiser. Please try again.");
    }
  }),
];
