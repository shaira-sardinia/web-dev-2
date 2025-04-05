const nedb = require("gray-nedb");
const { v4: uuidv4 } = require("uuid");
const { DatabaseError } = require("../utils/errors/customError");

class WorkshopModel {
  constructor() {
    this.db = new nedb({});
  }

  // initial seeding
  init() {
    this.db.insert({
      courseId: "001",
      name: "Workshop 1",
      description: "This is the first workshop",
      numOfSessions: "5",
      price: "250",
    });
    console.log("db entry Workshop 1 inserted");

    this.db.insert({
      courseId: "002",
      name: "Workshop 2",
      description: "This is the second workshop",
      numOfSessions: "12",
      price: "600",
    });
    console.log("db entry Workshop 2 inserted");
  }

  getAllWorkshops() {
    return new Promise((resolve, reject) => {
      this.db.find({}, function (err, workshops) {
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
      this.db.findOne({ courseId: courseId }, (err, entry) => {
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
      this.db.insert(entry, (err, entry) => {
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
      this.db.remove({ courseId: courseId }, {}, (err, numRemoved) => {
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
      this.db.update(
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
