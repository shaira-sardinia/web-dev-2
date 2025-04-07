const asyncHandler = require("express-async-handler");
const workshopController = require("./workshopController");
const classController = require("./classController");
const organiserController = require("./organiserController");

exports.loadAdminDashboard = asyncHandler(async (req, res, next) => {
  const loadWorkshops = workshopController.load_workshops();
  const loadClasses = classController.load_classes();
  const loadOrganisers = organiserController.load_organisers();

  const [workshops, classes, organisers] = await Promise.all([loadWorkshops, loadClasses, loadOrganisers]);

  res.render("main/admin", {
    title: "Admin Dashboard",
    workshops: workshops,
    classes: classes,
    organisers: organisers,
  });
});
