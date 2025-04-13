const express = require("express");
const router = express.Router();
const { ThrowError } = require("../utils/errors/customError");

/* 404 handler */
router.use((req, res, next) => {
  const error = new ThrowError(`Page not found`, 404);
  next(error);
});

// Global Error Handling
router.use(function (err, req, res, next) {
  console.error("--- ERROR START ---");
  console.error("Error Name:", err.name);
  console.error("Error Message:", err.message);
  if (err.stack) {
    console.error("Error Stack:", err.stack);
  }
  if (err.data) {
    console.error("Error Data:", err.data);
  }
  console.error("--- ERROR END ---");

  /* Authentication Error Handling */
  if (err.name === "AuthenticationError") {
    req.flash("error", err.message || "Authentication required");
    return res.redirect("/login");
  }

  /* Database Error Handling */
  if (err.name === "DatabaseError" && req.get("Referrer")) {
    req.flash("error", err.message || "Database error occurred");
    return res.redirect(req.get("Referrer"));
  }

  if (statusCode === 404) {
    return res.status(404).render("errors/404");
  }

  const statusCode = err.statusCode || 500;

  /* All other errors */
  res.status(statusCode).render("errors/error", {
    errorTitle: `Error ${statusCode}`,
    errorMessage: err.message || "An unexpected error occured",
    errorDetails: err.data || {},
  });
});

module.exports = router;
