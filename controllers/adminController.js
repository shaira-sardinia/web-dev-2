const { application, response } = require("express");
const workshopsDAO = require("../models/workshops");

const db = new workshopsDAO();

db.init();

exports.admin = function (req, res) {
  db.getAllWorkshops()
    .then((list) => {
      res.render("admin", {
        title: "Workshops",
        workshops: list,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
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

exports.update_workshop = function (req, res) {
  console.log("Processing workshop update");
  const courseId = req.params.courseId;
  db.updateWorkshop(courseId);
  res.redirect("/admin");
};
