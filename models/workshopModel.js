const nedb = require("gray-nedb");
const { v4: uuidv4 } = require("uuid");

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
          reject(err);
        } else {
          resolve(workshops);
          console.log("function all() returns: ", workshops);
        }
      });
    });
  }

  findWorkshop(courseId) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ courseId: courseId }, (err, entry) => {
        if (err) {
          reject(err);
        } else if (!entry) {
          reject(new Error("Workshop not found"));
        } else {
          resolve(entry);
        }
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
      this.db.insert(entry, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  deleteWorkshop(courseId) {
    return new Promise((resolve, reject) => {
      this.db.remove({ courseId: courseId }, {}, (err, numRemoved) => {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    });
  }

  findWorkshop(courseId) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ courseId: courseId }, (err, entry) => {
        if (err) {
          reject(err);
        } else if (!entry) {
          reject(new Error("Workshop not found"));
        } else {
          resolve(entry);
        }
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
            reject(err);
          } else {
            resolve(numReplaced);
          }
        }
      );
    });
  }
}

module.exports = WorkshopModel;
