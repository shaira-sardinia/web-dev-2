const { application, response } = require("express");
const workshopsDAO = require("../models/workshopModel");
const asyncHandler = require("express-async-handler");
const { validateWorkshop } = require("../utils/middlewares/validation");
const { handleValidationErrors } = require("../utils/errors/validationError");

const db = new workshopsDAO();

db.init();

/* Workshops */
exports.load_workshops = asyncHandler(async () => {
  const list = await db.getAllWorkshops();
  return list;
});

exports.new_workshop_entry = asyncHandler(async (req, res, next) => {
  res.render("forms/workshop-form", {});
});

exports.post_workshop_entry = [
  validateWorkshop,
  handleValidationErrors("forms/workshop-form"),
  asyncHandler(async (req, res, next) => {
    await db.addWorkshop(req.body.name, req.body.description, req.body.numOfSessions, req.body.price);
    //add pop up to say entry is added successfully
    res.redirect("/admin");
  }),
];

exports.delete_workshop = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  db.deleteWorkshop(courseId);
  console.log(`Workshop ${courseId} deleted successfully`);
  //add pop up here to say successful
  res.redirect("/admin");
});

exports.edit_workshop = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;

  db.findWorkshop(courseId).then((workshop) => {
    res.render("forms/workshop-form", {
      workshop: workshop,
      isEditing: true,
      courseId: courseId,
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
    };

    await db.updateWorkshop(courseId, updatedData).then(() => {
      console.log(`Workshop ${courseId} update successfully`);
      res.redirect("/admin");
      // add a pop up here to say data updated successfully
    });
  }),
];
