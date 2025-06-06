const { v4: uuidv4 } = require("uuid");
const dbService = require("../utils/services/dbService");
const { DatabaseError, ThrowError } = require("../utils/errors/customError");

const enrolmentDb = dbService.getEnrolmentDb();

class EnrolmentModel {
  createClassEnrolment(userId, classId) {
    return new Promise(async (resolve, reject) => {
      const isEnrolled = await this.checkClassEnrolment(userId, classId);
      if (isEnrolled) {
        return reject(new ThrowError(`User is already enrolled in this class`));
      }

      const entry = {
        enrolmentId: uuidv4(),
        userId: userId,
        type: "Class",
        classId: classId,
        enrolledAt: new Date(),
      };

      enrolmentDb.insert(entry, (err, newEnrolment) => {
        if (err) {
          return reject(new DatabaseError("Failed to enroll in class.", 500, {}));
        }
        resolve(newEnrolment);
      });
    });
  }

  createWorkshopEnrolment(userId, courseId) {
    return new Promise(async (resolve, reject) => {
      const isEnrolled = await this.checkWorkshopEnrolment(userId, courseId);
      if (isEnrolled) {
        return reject(new ThrowError(`User is already enrolled in this workshop.`));
      }

      const entry = {
        enrolmentId: uuidv4(),
        userId: userId,
        type: "Workshop",
        courseId: courseId,
        enrolledAt: new Date(),
      };

      enrolmentDb.insert(entry, (err, newEnrolment) => {
        if (err) {
          return reject(new DatabaseError("Failed to enroll in class.", 500, {}));
        }
        resolve(newEnrolment);
      });
    });
  }

  getEnrolmentsByUser(userId) {
    return new Promise((resolve, reject) => {
      enrolmentDb.find({ userId: userId }, (err, enrolments) => {
        if (err) {
          return reject(new DatabaseError("Failed to retrieve enrolments", 500, {}));
        }
        resolve(enrolments);
      });
    });
  }

  getEnrolmentsByClass(classId) {
    return new Promise((resolve, reject) => {
      enrolmentDb.find(
        {
          type: "Class",
          classId: classId,
        },
        (err, enrolments) => {
          if (err) {
            return reject(new DatabaseError("Failed to retrieve class enrollments", 500, {}));
          }
          resolve(enrolments);
        }
      );
    });
  }

  getEnrolmentsByWorkshop(courseId, userId) {
    return new Promise((resolve, reject) => {
      enrolmentDb.find(
        {
          type: "Workshop",
          courseId: courseId,
        },
        (err, enrolments) => {
          if (err) {
            return reject(new DatabaseError("Failed to retrieve workshop enrollments", 500, {}));
          }
          resolve(enrolments);
        }
      );
    });
  }

  deleteClassEnrolment(userId, classId) {
    return new Promise((resolve, reject) => {
      enrolmentDb.remove(
        {
          userId: userId,
          type: "Class",
          classId: classId,
        },
        {},
        (err, numRemoved) => {
          if (err) {
            return reject(new DatabaseError("Failed to unenroll from class.", 500, {}));
          }
          resolve(numRemoved);
        }
      );
    });
  }

  deleteWorkshopEnrolment(userId, courseId) {
    return new Promise((resolve, reject) => {
      enrolmentDb.remove(
        {
          userId: userId,
          type: "Workshop",
          courseId: courseId,
        },
        {},
        (err, numRemoved) => {
          if (err) {
            return reject(new DatabaseError("Failed to unenroll from workshop.", 500, {}));
          }
          resolve(numRemoved);
        }
      );
    });
  }

  /* Helper Methods */
  checkClassEnrolment(userId, classId) {
    return new Promise((resolve, reject) => {
      enrolmentDb.findOne(
        {
          userId: userId,
          type: "Class",
          classId: classId,
        },
        (err, enrolment) => {
          if (err) {
            return reject(new DatabaseError("Failed to check class enrollment.", 500, {}));
          }
          resolve(enrolment !== null);
        }
      );
    });
  }

  checkWorkshopEnrolment(userId, courseId) {
    return new Promise((resolve, reject) => {
      enrolmentDb.findOne(
        {
          userId: userId,
          type: "Workshop",
          courseId: courseId,
        },
        (err, enrolment) => {
          if (err) {
            return reject(new DatabaseError("Failed to check workshop enrollment.", 500, {}));
          }
          resolve(enrolment !== null);
        }
      );
    });
  }
}

module.exports = EnrolmentModel;
