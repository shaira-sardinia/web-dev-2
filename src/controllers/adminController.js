const asyncHandler = require("express-async-handler");
const workshopController = require("./workshopController");
const classController = require("./classController");

exports.loadAdminDashboard = asyncHandler(async (req, res, next) => {
  const loadWorkshops = workshopController.load_workshops();
  const loadClasses = classController.load_classes();

  const [workshops, classes] = await Promise.all([loadWorkshops, loadClasses]);

  res.render("main/admin", {
    title: "Admin Dashboard",
    workshops: workshops,
    classes: classes,
  });
});
