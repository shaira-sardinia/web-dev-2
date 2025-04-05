const nedb = require("gray-nedb");
const { v4: uuidv4 } = require("uuid");
const { DatabaseError } = require("../utils/errors/customError");

class ClassModel {
  constructor() {
    this.db = new nedb({});
  }

  // initial seeding
  init() {
    this.db.insert({
      classId: "c001",
      name: "Class 1",
      description: "This is the first class.",
      schedule: "Monday",
      price: "10",
    });
    console.log("db entry Class 1 inserted");

    this.db.insert({
      classId: "c002",
      name: "Class 2",
      description: "This is the second class",
      schedule: "Tuesday",
      price: "15",
    });
    console.log("db entry Class 2 inserted");
  }

  getAllClasses() {
    return new Promise((resolve, reject) => {
      this.db.find({}, function (err, classes) {
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
      this.db.findOne({ classId: classId }, (err, entry) => {
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

  addClass(name, description, schedule, price) {
    var entry = {
      classId: uuidv4(),
      name: name,
      description: description,
      schedule: schedule,
      price: price,
    };
    console.log("entry created", entry);

    return new Promise((resolve, reject) => {
      this.db.insert(entry, (err, entry) => {
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
      this.db.remove({ classId: classId }, {}, (err, numRemoved) => {
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
      this.db.update(
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
}

module.exports = ClassModel;
