const express = require("express");
const router = express.Router();
const workshopController = require("../controllers/workshopController");
const classController = require("../controllers/classController");
const organiserController = require("../controllers/organiserController");
const { verify, checkRole } = require("../auth/authController");
const { validateWorkshop, validateClass, validateOrganiser } = require("../utils/middlewares/validation");
const { handleValidationErrors } = require("../utils/errors/validationError");

/* Workshops */
router.get("/new-workshop", verify, checkRole(["admin"]), workshopController.new_workshop_entry);

router.post(
  "/new-workshop",
  verify,
  checkRole(["admin"]),
  validateWorkshop,
  handleValidationErrors("forms/workshop-form"),
  workshopController.post_workshop_entry
);

router.post("/delete-workshop/:courseId", verify, checkRole(["admin"]), workshopController.delete_workshop);

router.get("/edit-workshop/:courseId", verify, checkRole(["admin"]), workshopController.edit_workshop);

router.post(
  "/update-workshop/:courseId",
  verify,
  checkRole(["admin"]),
  validateWorkshop,
  handleValidationErrors("forms/workshop-form"),
  workshopController.update_workshop
);

/* Classes */
router.get("/new-class", verify, checkRole(["admin"]), classController.new_class_entry);

router.post(
  "/new-class",
  verify,
  checkRole(["admin"]),
  validateClass,
  handleValidationErrors("forms/class-form"),
  classController.post_class_entry
);

router.post("/delete-class/:classId", verify, checkRole(["admin"]), classController.delete_class);

router.get("/edit-class/:classId", verify, checkRole(["admin"]), classController.edit_class);

router.post(
  "/update-class/:classId",
  verify,
  checkRole(["admin"]),
  validateClass,
  handleValidationErrors("forms/class-form"),
  classController.update_class
);

/* Organiser */
router.get("/new-organiser", verify, checkRole(["admin"]), organiserController.new_organiser_entry);

router.post(
  "/new-organiser",
  verify,
  checkRole(["admin"]),
  validateOrganiser,
  handleValidationErrors("forms/organiser-form"),
  organiserController.post_organiser_entry
);

router.post("/delete-organiser/:orgId", verify, checkRole(["admin"]), organiserController.delete_organiser);

router.get("/edit-organiser/:orgId", verify, checkRole(["admin"]), organiserController.edit_organiser);

router.post(
  "/update-organiser/:orgId",
  verify,
  checkRole(["admin"]),
  validateOrganiser,
  handleValidationErrors("forms/organiser-form"),
  organiserController.update_organiser
);

router.get("/organiser/:orgId/classes", verify, checkRole(["admin"]), organiserController.get_organiser_classes);

module.exports = router;
