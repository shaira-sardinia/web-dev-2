const { validationResult } = require("express-validator");

const handleValidationErrors = (view) => (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const isEditing = req.path.includes("/update-");

    const templateData = {
      errors: "Please fill in all the required fields.",
      isEditing: isEditing,
      ...(req.params.courseId && { courseId: req.params.courseId }),
      ...(req.params.classId && { classId: req.params.classId }),
      ...(req.params.organiserId && { classId: req.params.organiserId }),
    };

    if (view.includes("workshop")) {
      templateData.workshop = req.body;
    } else if (view.includes("class")) {
      templateData.classes = req.body;
    } else {
      templateData.data = req.body;
    }

    return res.status(400).render(view, templateData);
  }

  next();
};

module.exports = {
  handleValidationErrors,
};
