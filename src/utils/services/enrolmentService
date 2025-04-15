const EnrolmentModel = require("../../models/enrolmentModel");
const ClassModel = require("../../models/classModel");
const WorkshopModel = require("../../models/workshopModel");
const { ThrowError } = require("../errors/customError");

const enrolmentModel = new EnrolmentModel();
const classModel = new ClassModel();
const workshopModel = new WorkshopModel();

async function getUserEnrolments(userId) {
  try {
    console.log(`Getting enrolments for user ID: ${userId}`);

    if (!userId) {
      console.error("User ID not provided to get user enrolments");
    }
    const enrolments = await enrolmentModel.getEnrolmentsByUser(userId);
    const classEnrolments = enrolments.filter((enrol) => enrol.type === "Class");
    const workshopEnrolments = enrolments.filter((enrol) => enrol.type === "Workshop");

    const classPromises = classEnrolments.map((enrol) => classModel.findClass(enrol.classId));

    const workshopPromises = workshopEnrolments.map((enrol) => workshopModel.findWorkshop(enrol.courseId));

    const [enrolledClasses, enrolledWorkshops] = await Promise.all([
      Promise.all(classPromises),
      Promise.all(workshopPromises),
    ]);

    return { enrolledClasses, enrolledWorkshops };
  } catch (error) {
    console.error("Error retrieving user enrolments:", error);
    throw new ThrowError("Failed to retrieve enrolments", 500);
  }
}

module.exports = { getUserEnrolments };
