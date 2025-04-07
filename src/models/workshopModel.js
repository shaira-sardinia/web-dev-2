const { v4: uuidv4 } = require("uuid");
const dbService = require("../utils/database/dbService");
const { DatabaseError } = require("../utils/errors/customError");

const workshopDb = dbService.getWorkshopDb();
dbService.seedWorkshops();

class WorkshopModel {
  getAllWorkshops() {
    return new Promise((resolve, reject) => {
      workshopDb.find({}, function (err, workshops) {
        if (err) {
          const failToGetWorkshops = new DatabaseError("Failed to retrieve workshops", 500, {
            originalError: err,
          });
          return reject(failToGetWorkshops);
        }
        resolve(workshops);
      });
    });
  }

  findWorkshop(courseId) {
    return new Promise((resolve, reject) => {
      workshopDb.findOne({ courseId: courseId }, (err, entry) => {
        if (err) {
          const failToFindWorkshop = new DatabaseError("Failed to retrieve workshop", 500, {
            originalError: err,
          });
          return reject(failToFindWorkshop);
        }
        resolve(entry);
      });
    });
  }

  addWorkshop(name, description, numOfSessions, price) {
    var entry = {
      courseId: uuidv4(),
      name: name,
      description: description,
      numOfSessions: numOfSessions,
      price: price,
    };
    console.log("entry created", entry);

    return new Promise((resolve, reject) => {
      workshopDb.insert(entry, (err, entry) => {
        if (err) {
          const failToAddWorkshop = new DatabaseError("Failed to add workshop", 500, {
            originalError: err,
          });
          return reject(failToAddWorkshop);
        }
        resolve(entry);
      });
    });
  }

  deleteWorkshop(courseId) {
    return new Promise((resolve, reject) => {
      workshopDb.remove({ courseId: courseId }, {}, (err, numRemoved) => {
        if (err) {
          const failToDeleteWorkshop = new DatabaseError("Failed to delete workshop", 500, {
            originalError: err,
          });
          return reject(failToDeleteWorkshop);
        }
        resolve(numRemoved);
      });
    });
  }

  updateWorkshop(courseId, updatedData) {
    return new Promise((resolve, reject) => {
      workshopDb.update(
        { courseId: courseId },
        {
          $set: {
            name: updatedData.name,
            description: updatedData.description,
            numOfSessions: updatedData.numOfSessions,
            price: updatedData.price,
          },
        },
        { multi: false },
        (err, numReplaced) => {
          if (err) {
            const failToUpdateWorkshop = new DatabaseError("Failed to update workshop", 500, {
              originalError: err,
            });
            return reject(failToUpdateWorkshop);
          }
          resolve(numReplaced);
        }
      );
    });
  }
}

module.exports = WorkshopModel;
