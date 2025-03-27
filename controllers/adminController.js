const { application, response } = require("express");
const workshopsDAO = require("../models/workshopModel");

const db = new workshopsDAO();

db.init();

exports.admin = function (req, res) {
  db.getAllWorkshops().then((list) => {
    res.render("admin", {
      title: "Workshops",
      workshops: list,
    });
    console.log("All Workshops displayed");
  });
};

exports.new_workshop_entry = function (req, res) {
  res.render("workshop-form", {
    title: "Add New Workshop",
  });
};

exports.post_workshop_entry = function (req, res) {
  console.log("Processing post_new_entry controller");
  if (!req.body.name || !req.body.numOfSessions || !req.body.description || !req.body.price) {
    res.status(400).render("workshop-form", {
      title: "Please fill in all fields.",
    });
    return;
  }
  db.addWorkshop(req.body.name, req.body.description, req.body.numOfSessions, req.body.price);
  res.redirect("/admin");
};

exports.delete_workshop = function (req, res) {
  console.log("Processing workshop deletion");
  const courseId = req.params.courseId;
  db.deleteWorkshop(courseId);
  res.redirect("/admin");
};

exports.edit_workshop = function (req, res) {
  console.log("Editing workshop");
  const courseId = req.params.courseId;

  db.findWorkshop(courseId).then((workshop) => {
    res.render("workshop-form", {
      workshop: workshop,
      isEditing: true,
      title: "Edit Workshop",
    });
  });
};

exports.update_workshop = function (req, res) {
  console.log("Processing workshop update");
  const courseId = req.params.courseId;

  const updatedData = {
    name: req.body.name,
    description: req.body.description,
    numOfSessions: req.body.numOfSessions,
    price: req.body.price,
  };

  db.updateWorkshop(courseId, updatedData).then((numReplaced) => {
    console.log("Workshop ${{courseId} update successfully");
    res.redirect("/admin");
  });
};
