const express = require("express");
const router = express.Router();
const ThrowError = require("../utils/errors/customError");

// Global Error Handling
router.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).render("errors/error", {
    title: `Error ${statusCode}`,
    errorMessage: err.message || "An unexpected error occured",
    errorDetails: err.data || {},
  });
});

module.exports = router;
