const { application, response } = require("express");
const workshopsDAO = require("../models/workshopModel");
const asyncHandler = require("express-async-handler");
const { ThrowError, DatabaseError } = require("../utils/errors/customError");

const db = new workshopsDAO();

db.init();

exports.admin = asyncHandler(async (req, res) => {
  const list = await db.getAllWorkshops();

  res.render("main/admin", {
    title: "Workshops",
    workshops: list,
  });
});

exports.new_workshop_entry = asyncHandler(async (req, res) => {
  res.render("forms/workshop-form", {
    title: "Add New Workshop",
  });
});

exports.post_workshop_entry = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.numOfSessions || !req.body.description || !req.body.price) {
    res.status(400).render("forms/workshop-form", {
      title: "Please fill in all fields.",
    });
    return;
  }
  db.addWorkshop(req.body.name, req.body.description, req.body.numOfSessions, req.body.price);
  res.redirect("/admin");
});

exports.delete_workshop = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  db.deleteWorkshop(courseId);
  res.redirect("/admin");
});

exports.edit_workshop = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;

  db.findWorkshop(courseId).then((workshop) => {
    res.render("forms/workshop-form", {
      workshop: workshop,
      isEditing: true,
      title: "Edit Workshop",
    });
  });
});

exports.update_workshop = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;

  const updatedData = {
    name: req.body.name,
    description: req.body.description,
    numOfSessions: req.body.numOfSessions,
    price: req.body.price,
  };

  db.updateWorkshop(courseId, updatedData).then(() => {
    console.log(`Workshop ${courseId} update successfully`);
    res.redirect("/admin");
    // add a pop up here to say data updated successfully
  });
});
