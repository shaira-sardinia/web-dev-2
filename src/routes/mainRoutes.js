const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController.js");
const adminController = require("../controllers/adminController.js");

router.get("/", mainController.homepage);

router.get("/about", mainController.about);

router.get("/admin", adminController.admin);

router.get("/workshop-form", adminController.new_workshop_entry);
router.post("/workshop-form", adminController.post_workshop_entry);

router.post("/delete-workshop/:courseId", adminController.delete_workshop);

router.get("/edit-workshop/:courseId", adminController.edit_workshop);
router.post("/update-workshop/:courseId", adminController.update_workshop);

module.exports = router;
