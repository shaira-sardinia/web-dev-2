const express = require("express");
const router = express.Router();
const { ThrowError } = require("../utils/errors/customError");

router.use((req, res, next) => {
  const error = new ThrowError(`Sorry something went wrong on the server.`, 404);
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

  if (err.name === "AuthenticationError") {
    // show error here
    return res.redirect("/login");
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).render("errors/error", {
    errorTitle: `Error ${statusCode}`,
    errorMessage: err.message || "An unexpected error occured",
    errorDetails: err.data || {},
  });
});

module.exports = router;
