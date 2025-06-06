const { application, response } = require("express");
const classesDAO = require("../models/classModel");
const organiserDAO = require("../models/organiserModel");
const asyncHandler = require("express-async-handler");
const { validateClass } = require("../utils/middlewares/validation");
const { handleValidationErrors } = require("../utils/errors/validationError");

const classModel = new classesDAO();
const organiserModel = new organiserDAO();

exports.load_classes = asyncHandler(async () => {
  const list = await classModel.getAllClasses();
  return list;
});

exports.new_class_entry = asyncHandler(async (req, res, next) => {
  const organisers = await organiserModel.getAllOrganisers();
  res.render("forms/class-form", { organisers });
});

exports.post_class_entry = [
  validateClass,
  handleValidationErrors("forms/class-form"),
  asyncHandler(async (req, res, next) => {
    try {
      await classModel.addClass(req.body.name, req.body.description, req.body.schedule, req.body.price, req.body.orgId);
      req.flash("success", "Class added successfully!");
      res.redirect("/dashboard");
    } catch (error) {}
    req.flash("error", "Failed to add class. Please try again.");
  }),
];

exports.delete_class = asyncHandler(async (req, res, next) => {
  const classId = req.params.classId;
  try {
    classModel.deleteClass(classId);
    req.flash("success", "Class deleted successfully!");
    res.redirect("/dashboard");
  } catch (error) {
    req.flash("error", "Failed to delete class. Please try again.");
  }
});

exports.edit_class = asyncHandler(async (req, res, next) => {
  const classId = req.params.classId;
  const classData = await classModel.findClass(classId);
  const organisers = await organiserModel.getAllOrganisers();

  if (classData && classData.orgId) {
    organisers.forEach((org) => {
      if (classData.orgId === org.orgId) {
        org.selected = true;
      }
    });
  }

  classModel.findClass(classId).then((classes) => {
    res.render("forms/class-form", {
      classes: classes,
      isEditing: true,
      classId: classId,
      organisers: organisers,
      title: "Edit Class",
    });
  });
});

exports.update_class = [
  validateClass,
  handleValidationErrors("forms/class-form"),
  asyncHandler(async (req, res, next) => {
    const classId = req.params.classId;

    const updatedData = {
      name: req.body.name,
      description: req.body.description,
      schedule: req.body.schedule,
      price: req.body.price,
      orgId: req.body.orgId,
    };

    try {
      await classModel.updateClass(classId, updatedData);
      req.flash("success", "Class updated successfully!");
      res.redirect("/dashboard");
    } catch (error) {
      req.flash("error", "Failed to update class. Please try again.");
    }
  }),
];
