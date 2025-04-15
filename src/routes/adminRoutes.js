const express = require("express");
const router = express.Router();
const workshopController = require("../controllers/workshopController");
const classController = require("../controllers/classController");
const organiserController = require("../controllers/organiserController");
const userController = require("../controllers/userController");
const enrolmentController = require("../controllers/enrolmentController");
const { verify, checkRole } = require("../auth/authController");
const { validateWorkshop, validateClass, validateOrganiser } = require("../utils/middlewares/validation");
const { handleValidationErrors } = require("../utils/errors/validationError");

/* Workshops */
router.get("/workshop/new", verify, checkRole(["admin"]), workshopController.new_workshop_entry);

router.post(
  "/workshop/new",
  verify,
  checkRole(["admin"]),
  validateWorkshop,
  handleValidationErrors("forms/workshop-form"),
  workshopController.post_workshop_entry
);

router.post("/workshop/delete/:courseId", verify, checkRole(["admin"]), workshopController.delete_workshop);

router.get("/workshop/edit/:courseId", verify, checkRole(["admin"]), workshopController.edit_workshop);

router.post(
  "/workshop/update/:courseId",
  verify,
  checkRole(["admin"]),
  validateWorkshop,
  handleValidationErrors("forms/workshop-form"),
  workshopController.update_workshop
);

/* Classes */
router.get("/class/new", verify, checkRole(["admin"]), classController.new_class_entry);

router.post(
  "/class/new",
  verify,
  checkRole(["admin"]),
  validateClass,
  handleValidationErrors("forms/class-form"),
  classController.post_class_entry
);

router.post("/class/delete/:classId", verify, checkRole(["admin"]), classController.delete_class);

router.get("/class/edit/:classId", verify, checkRole(["admin"]), classController.edit_class);

router.post(
  "/class/update/:classId",
  verify,
  checkRole(["admin"]),
  validateClass,
  handleValidationErrors("forms/class-form"),
  classController.update_class
);

/* Organiser */
router.get("/organiser/new", verify, checkRole(["admin"]), organiserController.new_organiser_entry);

router.post(
  "/organiser/new",
  verify,
  checkRole(["admin"]),
  validateOrganiser,
  handleValidationErrors("forms/organiser-form"),
  organiserController.post_organiser_entry
);

router.post("/organiser/delete/:orgId", verify, checkRole(["admin"]), organiserController.delete_organiser);

router.get("/organiser/edit/:orgId", verify, checkRole(["admin"]), organiserController.edit_organiser);

router.post(
  "/organiser/update/:orgId",
  verify,
  checkRole(["admin"]),
  validateOrganiser,
  handleValidationErrors("forms/organiser-form"),
  organiserController.update_organiser
);

/* Users */
router.post("/user/delete/:userId", verify, checkRole(["admin"]), userController.delete_user);

/* Enrolments */
router.get("/class/:classId/enrolments", verify, checkRole(["admin"]), enrolmentController.get_class_enrolments);
router.get("/workshop/:courseId/enrolments", verify, checkRole(["admin"]), enrolmentController.get_workshop_enrolments);

module.exports = router;
