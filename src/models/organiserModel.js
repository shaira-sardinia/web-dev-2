const { v4: uuidv4 } = require("uuid");
const dbService = require("../utils/services/dbService");
const { DatabaseError } = require("../utils/errors/customError");

const organiserDb = dbService.getOrganiserDb();

class OrganiserModel {
  getAllOrganisers() {
    return new Promise((resolve, reject) => {
      organiserDb.find({}, function (err, organisers) {
        if (err) {
          const failToGetOrganisers = new DatabaseError("Failed to retrieve organisers", 500, {
            originalError: err,
          });
          return reject(failToGetOrganisers);
        }
        resolve(organisers);
      });
    });
  }

  findOrganiser(orgId) {
    return new Promise((resolve, reject) => {
      organiserDb.findOne({ orgId: orgId }, (err, entry) => {
        if (err) {
          const failToFindOrganiser = new DatabaseError("Failed to retrieve organiser", 500, {
            originalError: err,
          });
          return reject(failToFindOrganiser);
        }
        resolve(entry);
      });
    });
  }

  addOrganiser(name, email, phone, bio, role) {
    var entry = {
      orgId: uuidv4(),
      name: name,
      email: email,
      phone: phone,
      bio: bio,
      role: role,
    };
    console.log("entry created", entry);

    return new Promise((resolve, reject) => {
      organiserDb.insert(entry, (err, entry) => {
        if (err) {
          console.log("NeDB Insert Error:", err);
          const failToAddOrganiser = new DatabaseError("Failed to add organiser", 500, {
            originalError: err,
          });
          return reject(failToAddOrganiser);
        }
        resolve(entry);
      });
    });
  }

  deleteOrganiser(orgId) {
    return new Promise((resolve, reject) => {
      organiserDb.remove({ orgId: orgId }, {}, (err, numRemoved) => {
        if (err) {
          const failToDeleteOrganiser = new DatabaseError("Failed to delete organiser", 500, {
            originalError: err,
          });
          return reject(failToDeleteOrganiser);
        }
        resolve(numRemoved);
      });
    });
  }

  updateOrganiser(orgId, updatedData) {
    return new Promise((resolve, reject) => {
      organiserDb.update(
        { orgId: orgId },
        {
          $set: {
            name: updatedData.name,
            email: updatedData.email,
            phone: updatedData.phone,
            bio: updatedData.bio,
          },
        },
        { multi: false },
        (err, numReplaced) => {
          if (err) {
            const failToUpdateOrganiser = new DatabaseError("Failed to update organiser", 500, {
              originalError: err,
            });
            return reject(failToUpdateOrganiser);
          }
          resolve(numReplaced);
        }
      );
    });
  }
}

module.exports = OrganiserModel;
