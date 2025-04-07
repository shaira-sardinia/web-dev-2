const { application, response } = require("express");
const classesDAO = require("../models/classModel");
const organiserDAO = require("../models/organiserModel");
const asyncHandler = require("express-async-handler");
const { validateClass } = require("../utils/middlewares/validation");
const { handleValidationErrors } = require("../utils/errors/validationError");

const classModel = new classesDAO();
const organiserModel = new organiserDAO();

/* Classes */
exports.load_classes = asyncHandler(async () => {
  const list = await classModel.getAllClasses();
  return list;
});

exports.new_class_entry = asyncHandler(async (req, res, next) => {
  const organisers = await organiserModel.getAllOrganisers();
  console.log("organisers:", organisers);
  res.render("forms/class-form", { organisers });
});

exports.post_class_entry = [
  validateClass,
  handleValidationErrors("forms/class-form"),
  asyncHandler(async (req, res, next) => {
    await classModel.addClass(req.body.name, req.body.description, req.body.schedule, req.body.price, req.body.orgId);
    //add pop up to say entry is added successfully
    res.redirect("/admin");
  }),
];

exports.delete_class = asyncHandler(async (req, res, next) => {
  const classId = req.params.classId;
  classModel.deleteClass(classId);
  console.log(`Class ${classId} deleted successfully`);
  //add pop up here to say successful
  res.redirect("/admin");
});

exports.edit_class = asyncHandler(async (req, res, next) => {
  const classId = req.params.classId;
  const organisers = await organiserModel.getAllOrganisers();
  console.log("organisers:", organisers);

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
    };

    await classModel.updateClass(classId, updatedData).then(() => {
      console.log(`Class ${classId} update successfully`);
      res.redirect("/admin");
      // add a pop up here to say data updated successfully
    });
  }),
];
