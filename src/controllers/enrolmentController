const asyncHandler = require("express-async-handler");
const EnrolmentDAO = require("../models/enrolmentModel");
const ClassDAO = require("../models/classModel");
const WorkshopDAO = require("../models/workshopModel");
const userDAO = require("../models/userModel");
const enrolmentService = require("../utils/services/enrolmentService");
const { ThrowError } = require("../utils/errors/customError");

const enrolmentModel = new EnrolmentDAO();
const classModel = new ClassDAO();
const workshopModel = new WorkshopDAO();
const userModel = new userDAO();

/* Show enrolments on user dashboard */
exports.get_user_enrolments = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const userEnrolments = await enrolmentService.getUserEnrolments(userId);

    res.render("main/enrolments", {
      title: "My Enrolments",
      user: req.user.name,
      enrolledClasses: userEnrolments.enrolledClasses,
      enrolledWorkshops: userEnrolments.enrolledWorkshops,
    });
  } catch (error) {
    next(error);
  }
});

/* Class */
exports.enroll_in_class = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const classId = req.params.classId;

  try {
    const newEnrolment = await enrolmentModel.createClassEnrolment(userId, classId);
    req.flash("success", "Successfully enrolled in class!");
    res.redirect("/dashboard");
  } catch (error) {
    req.flash("error", "Sorry unable to enroll. Please try again.");
    res.redirect("/dashboard");
  }
});

exports.unenroll_from_class = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const classId = req.params.classId;

  try {
    const result = await enrolmentModel.deleteClassEnrolment(userId, classId);
    req.flash("success", "Successfully unenrolled from class!");
    res.redirect("/dashboard");
  } catch (error) {
    req.flash("success", "Sorry couldn't unenroll you. Please try again.");
    res.redirect("/dashboard");
  }
});

/* Workshop */
exports.enroll_in_workshop = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const courseId = req.params.courseId;

  try {
    const newEnrolment = await enrolmentModel.createWorkshopEnrolment(userId, courseId);
    req.flash("success", "Successfully enrolled in workshop!");
    res.redirect("/dashboard");
  } catch (error) {
    req.flash("error", "Sorry unable to enroll. Please try again.");
    res.redirect("/dashboard");
  }
});

exports.unenroll_from_workshop = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const courseId = req.params.courseId;

  try {
    const result = await enrolmentModel.deleteWorkshopEnrolment(userId, courseId);
    req.flash("success", "Successfully unenrolled from workshop!");
    res.redirect("/dashboard");
  } catch (error) {
    req.flash("success", "Sorry couldn't unenroll you. Please try again.");
    res.redirect("/dashboard");
  }
});

/* Admin actions */
exports.get_class_enrolments = asyncHandler(async (req, res, next) => {
  const classId = req.params.classId;

  try {
    const classDetails = await classModel.findClass(classId);

    if (!classDetails) {
      throw new ThrowError("Class not found", 404);
    }

    const enrolments = await enrolmentModel.getEnrolmentsByClass(classId);

    const userPromises = enrolments.map((enrollment) => userModel.findUserById(enrollment.userId));
    const users = await Promise.all(userPromises);

    const enrichedEnrolments = enrolments.map((enrollment, index) => ({
      ...enrollment,
      userName: users[index] ? users[index].name : "Unknown User",
    }));

    res.render("lists/class-list", {
      title: `Enrolments for ${classDetails.name}`,
      classDetails,
      enrolments: enrichedEnrolments,
      user: req.user.name,
    });
  } catch (error) {
    req.flash("error", "Sorry failed to retrieve class enrolments. Please try again.");
    next(error);
  }
});

exports.get_workshop_enrolments = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;

  try {
    const workshopDetails = await workshopModel.findWorkshop(courseId);
    if (!workshopDetails) {
      throw new ThrowError("Workshop not found", 404);
    }
    const enrolments = await enrolmentModel.getEnrolmentsByWorkshop(courseId);
    console.log("Enrolments:", enrolments);

    const userPromises = enrolments.map((enrollment) => userModel.findUserById(enrollment.userId));
    const users = await Promise.all(userPromises);

    const enrichedEnrolments = enrolments.map((enrollment, index) => ({
      ...enrollment,
      userName: users[index] ? users[index].name : "Unknown User",
    }));

    res.render("lists/workshop-list", {
      title: `Enrolments for ${workshopDetails.name}`,
      workshopDetails,
      enrolments: enrichedEnrolments,
      user: req.user.name,
    });
  } catch (error) {
    req.flash("error", "Sorry failed to retrieve workshop enrolments. Please try again.");
    next(error);
  }
});
