const express = require("express");
const bcrypt = require("bcrypt");
const userDAO = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const workshopController = require("./workshopController");
const classController = require("./classController");
const organiserController = require("./organiserController");
const enrolmentService = require("../utils/services/enrolmentService");

const userModel = new userDAO();

exports.load_users = asyncHandler(async () => {
  const list = await userModel.getAllUsers();
  return list;
});

exports.show_register_page = asyncHandler(async (req, res, next) => {
  res.render("auth/register", { title: "Register" });
});

exports.post_new_user = [
  asyncHandler(async (req, res, next) => {
    try {
      const existingUser = await userModel.findUser(req.body.email);
      if (existingUser) {
        req.flash("error", "Email already registered. Please use a different email or login.");
        return res.redirect("/register");
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await userModel.addUser(req.body.email, hashedPassword, req.body.name, req.body.phone, req.body.address);

      req.flash("success", "Registration successful! You can now log in.");
      res.redirect("/login");
    } catch (error) {
      console.error("Registration error:", error);
      req.flash("error", "Failed to register. Please try again.");
      res.redirect("/register");
    }
  }),
];

exports.delete_user = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  try {
    userModel.deleteUser(userId);
    req.flash("success", "User deleted permanently!");
    res.redirect("/dashboard");
  } catch (error) {
    req.flash("error", "Failed to delete User. Please try again.");
  }
});

exports.show_login_page = asyncHandler(async (req, res, next) => {
  const registered = req.query.registered === "true";
  res.render("auth/login", { title: "Login", message: registered ? "Registration successful! Please log in." : null });
});

exports.show_dashboard = [
  asyncHandler(async (req, res, next) => {
    const loadWorkshops = workshopController.load_workshops();
    const loadClasses = classController.load_classes();

    const role = req.user.role;
    console.log("Logged in as:", role);

    if (role == "user") {
      const [workshops, classes] = await Promise.all([loadWorkshops, loadClasses]);

      const userEnrolments = await enrolmentService.getUserEnrolments(req.user.userId);

      const enrolledClassIds = userEnrolments.enrolledClasses.map((cls) => cls.classId);
      const enrolledWorkshopIds = userEnrolments.enrolledWorkshops.map((ws) => ws.courseId);

      classes.forEach((cls) => {
        cls.isEnrolled = enrolledClassIds.includes(cls.classId);
      });

      workshops.forEach((ws) => {
        ws.isEnrolled = enrolledWorkshopIds.includes(ws.courseId);
      });

      res.render("main/dashboard", {
        title: "Dashboard",
        user: req.user.name,
        classes,
        workshops,
        enrolledClasses: userEnrolments.enrolledClasses,
        enrolledWorkshops: userEnrolments.enrolledWorkshops,
      });
    } else if (role == "admin") {
      const loadOrganisers = organiserController.load_organisers();
      const loadUsers = this.load_users();
      const [workshops, classes, organisers, users] = await Promise.all([
        loadWorkshops,
        loadClasses,
        loadOrganisers,
        loadUsers,
      ]);

      res.render("main/admin", {
        title: "Admin Dashboard",
        workshops: workshops,
        classes: classes,
        organisers: organisers,
        users: users,
        user: req.user.name,
      });
    } else {
      throw new ThrowError("Something went wrong.", 401);
    }
  }),
];
