const asyncHandler = require("express-async-handler");
const { AuthenticationError } = require("../errors/customError");
const { verify } = require("../../auth/authController");

exports.setAdminFlag = asyncHandler(async (req, res, next) => {
  res.locals.isAdmin = false;

  try {
    await verify(req, res, () => {});

    if (req.user && req.user.role === "admin") {
      res.locals.isAdmin = true;
    }
  } catch (error) {
    throw new AuthenticationError("Access forbidden.", error.message);
  }
  next();
});
