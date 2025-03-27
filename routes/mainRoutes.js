const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController.js");
const adminController = require("../controllers/adminController.js");
router.get("/", mainController.homepage);

router.get("/about", mainController.about);

router.get("/classes", mainController.classes);

router.get("/admin", adminController.admin);

router.get("/workshop-form", adminController.new_workshop_entry);
router.post("/workshop-form", adminController.post_workshop_entry);

router.post("/delete-workshop/:courseId", adminController.delete_workshop);

router.get("/edit-workshop/:courseId", adminController.edit_workshop);
router.post("/update-workshop/:courseId", adminController.update_workshop);

router.use(function (req, res) {
  res.status(404);
  res.type("text/plain");
  res.send("404 Not found");
});

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error");
});

module.exports = router;
