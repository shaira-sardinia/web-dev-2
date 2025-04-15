const express = require("express");
const router = express.Router();
const enrolmentController = require("../controllers/enrolmentController");
const { verify, checkRole } = require("../auth/authController");

/* User */
router.post("/class/:classId/enroll", verify, checkRole(["user"]), enrolmentController.enroll_in_class);
router.post("/workshop/:courseId/enroll", verify, checkRole(["user"]), enrolmentController.enroll_in_workshop);
router.post("/class/:classId/unenroll", verify, checkRole(["user"]), enrolmentController.unenroll_from_class);
router.post("/workshop/:courseId/unenroll", verify, checkRole(["user"]), enrolmentController.unenroll_from_workshop);

module.exports = router;
