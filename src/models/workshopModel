const { v4: uuidv4 } = require("uuid");
const dbService = require("../utils/services/dbService");
const { DatabaseError } = require("../utils/errors/customError");

const workshopDb = dbService.getWorkshopDb();
const organiserDb = dbService.getOrganiserDb();

class WorkshopModel {
  getAllWorkshops() {
    return new Promise((resolve, reject) => {
      workshopDb.find({}, function (err, workshops) {
        if (err) {
          return reject(new DatabaseError("Failed to retrieve workshop", 500, { originalError: err }));
        }

        const orgIds = workshops.map((workshopItem) => workshopItem.orgId).filter((id) => id);

        if (orgIds.length === 0) {
          workshops.forEach((workshopItem) => {
            workshopItem.organiser = { name: "Unassigned" };
          });
          return resolve(workshops);
        }

        organiserDb.find({ orgId: { $in: orgIds } }, (err, organisers) => {
          if (err) {
            return reject(new DatabaseError("Failed to retrieve organisers", 500, { originalError: err }));
          }

          const organiserMap = {};
          organisers.forEach((org) => {
            organiserMap[org.orgId] = org;
          });

          workshops.forEach((workshopItem) => {
            if (workshopItem.orgId && organiserMap[workshopItem.orgId]) {
              workshopItem.organiser = organiserMap[workshopItem.orgId];
            } else {
              workshopItem.organiser = { name: workshopItem.orgId ? "Unknown" : "Unassigned" };
            }
          });
        });
        resolve(workshops);
      });
    });
  }

  findWorkshop(courseId) {
    return new Promise((resolve, reject) => {
      workshopDb.findOne({ courseId: courseId }, (err, workshopData) => {
        if (err) {
          const failToFindWorkshop = new DatabaseError("Failed to retrieve workshop", 500, {
            originalError: err,
          });
          return reject(failToFindWorkshop);
        }

        if (!workshopData) {
          resolve(null);
          return;
        }

        if (workshopData.orgId) {
          organiserDb.findOne({ orgId: workshopData.orgId }, (err, organiser) => {
            if (err) {
              return reject(new DatabaseError("Failed to retrieve organiser", 500, { originalError: err }));
            }

            workshopData.organiser = organiser || { name: "Unknown" };
            resolve(workshopData);
          });
        } else {
          workshopData.organiser = { name: "Unassigned" };
          resolve(workshopData);
        }
      });
    });
  }

  addWorkshop(name, description, numOfSessions, price, orgId) {
    var entry = {
      courseId: uuidv4(),
      name: name,
      description: description,
      numOfSessions: numOfSessions,
      price: price,
      orgId: orgId,
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
            orgId: updatedData.orgId,
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

  getWorkshopsByOrganiser(orgId) {
    return new Promise((resolve, reject) => {
      workshopDb.find({ orgId: orgId }, (err, workshops) => {
        if (err) {
          const failToFetchWorkshops = new DatabaseError("Failed to fetch workshops", 500, {
            originalError: err,
          });
          return reject(failToFetchWorkshops);
        }
        resolve(workshops);
      });
    });
  }
}

module.exports = WorkshopModel;
