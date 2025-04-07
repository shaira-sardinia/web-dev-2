const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");
const workshopController = require("../controllers/workshopController.js");
const classController = require("../controllers/classController.js");
const organiserController = require("../controllers/organiserController");
const { validateWorkshop, validateClass, validateOrganiser } = require("../utils/middlewares/validation");
const { handleValidationErrors } = require("../utils/errors/validationError.js");

router.get("/", adminController.loadAdminDashboard);

/* Workshops */
router.get("/new-workshop", workshopController.new_workshop_entry);

router.post(
  "/new-workshop",
  validateWorkshop,
  handleValidationErrors("forms/workshop-form"),
  workshopController.post_workshop_entry
);

router.post("/delete-workshop/:courseId", workshopController.delete_workshop);

router.get("/edit-workshop/:courseId", workshopController.edit_workshop);

router.post(
  "/update-workshop/:courseId",
  validateWorkshop,
  handleValidationErrors("forms/workshop-form"),
  workshopController.update_workshop
);

/* Classes */
router.get("/new-class", classController.new_class_entry);

router.post("/new-class", validateClass, handleValidationErrors("forms/class-form"), classController.post_class_entry);

router.post("/delete-class/:classId", classController.delete_class);

router.get("/edit-class/:classId", classController.edit_class);

router.post(
  "/update-class/:classId",
  validateClass,
  handleValidationErrors("forms/class-form"),
  classController.update_class
);

/* Organiser */
router.get("/new-organiser", organiserController.new_organiser_entry);

router.post(
  "/new-organiser",
  validateOrganiser,
  handleValidationErrors("forms/organiser-form"),
  organiserController.post_organiser_entry
);

router.post("/delete-organiser/:orgId", organiserController.delete_organiser);

router.get("/edit-organiser/:orgId", organiserController.edit_organiser);

router.post(
  "/update-organiser/:orgId",
  validateOrganiser,
  handleValidationErrors("forms/organiser-form"),
  organiserController.update_organiser
);

router.get("/organiser/:orgId/classes", organiserController.get_organiser_classes);

module.exports = router;
