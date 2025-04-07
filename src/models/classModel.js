const { v4: uuidv4 } = require("uuid");
const dbService = require("../utils/database/dbService");
const { DatabaseError } = require("../utils/errors/customError");

const classDb = dbService.getClassDb();
const organiserDb = dbService.getOrganiserDb();
dbService.seedClasses();

class ClassModel {
  getAllClasses() {
    return new Promise((resolve, reject) => {
      classDb.find({}, function (err, classes) {
        if (err) {
          const failToGetClasses = new DatabaseError("Failed to retrieve classes", 500, {
            originalError: err,
          });
          return reject(failToGetClasses);
        }
        resolve(classes);
      });
    });
  }

  findClass(classId) {
    return new Promise((resolve, reject) => {
      classDb.findOne({ classId: classId }, (err, entry) => {
        if (err) {
          const failToFindClass = new DatabaseError("Failed to retrieve class", 500, {
            originalError: err,
          });
          return reject(failToFindClass);
        }
        resolve(entry);
      });
    });
  }

  addClass(name, description, schedule, price, orgId) {
    var entry = {
      classId: uuidv4(),
      name: name,
      description: description,
      schedule: schedule,
      price: price,
      orgId: orgId,
    };
    console.log("entry created", entry);

    return new Promise((resolve, reject) => {
      classDb.insert(entry, (err, entry) => {
        if (err) {
          const failToAddClass = new DatabaseError("Failed to add class", 500, {
            originalError: err,
          });
          return reject(failToAddClass);
        }
        resolve(entry);
      });
    });
  }

  deleteClass(classId) {
    return new Promise((resolve, reject) => {
      classDb.remove({ classId: classId }, {}, (err, numRemoved) => {
        if (err) {
          const failToDeleteClass = new DatabaseError("Failed to delete class", 500, {
            originalError: err,
          });
          return reject(failToDeleteClass);
        }
        resolve(numRemoved);
      });
    });
  }

  updateClass(classId, updatedData) {
    return new Promise((resolve, reject) => {
      classDb.update(
        { classId: classId },
        {
          $set: {
            name: updatedData.name,
            description: updatedData.description,
            schedule: updatedData.schedule,
            price: updatedData.price,
          },
        },
        { multi: false },
        (err, numReplaced) => {
          if (err) {
            const failToUpdateClass = new DatabaseError("Failed to update class", 500, {
              originalError: err,
            });
            return reject(failToUpdateClass);
          }
          resolve(numReplaced);
        }
      );
    });
  }

  getClassesByOrganiser(orgId) {
    return new Promise((resolve, reject) => {
      classDb.find({ orgId: orgId }, (err, classes) => {
        if (err) {
          const failToFetchClasses = new DatabaseError("Failed to fetch class", 500, {
            originalError: err,
          });
          return reject(failToFetchClasses);
        }
        resolve(classes);
      });
    });
  }
}

module.exports = ClassModel;
