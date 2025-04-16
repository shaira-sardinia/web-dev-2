const { v4: uuidv4 } = require("uuid");
const { DatabaseError } = require("../utils/errors/customError");
const dbService = require("../utils/services/dbService");

const userDb = dbService.getUserDb();

class UserModel {
  getAllUsers() {
    return new Promise((resolve, reject) => {
      userDb.find({}, function (err, users) {
        if (err) {
          const failToGetUsers = new DatabaseError("Failed to retrieve users", 500, {
            originalError: err,
          });
          return reject(failToGetUsers);
        }
        resolve(users);
      });
    });
  }

  findUser(email) {
    return new Promise((resolve, reject) => {
      userDb.findOne({ email: email }, (err, user) => {
        if (err) {
          const failToFindUser = new DatabaseError("Failed to retrieve user", 500, {
            originalError: err,
          });
          return reject(failToFindUser);
        }
        resolve(user);
      });
    });
  }

  findUserById(userId) {
    return new Promise((resolve, reject) => {
      userDb.findOne({ userId, userId }, (err, user) => {
        if (err) {
          const failToFindUser = new DatabaseError("Failed to retrieve user", 500, {
            originalError: err,
          });
          return reject(failToFindUser);
        }
        resolve(user);
      });
    });
  }

  addUser(email, password, name, phone, address) {
    var entry = {
      userId: uuidv4(),
      email: email,
      password: password,
      name: name,
      phone: phone,
      address: address,
      role: "user",
    };
    console.log("entry created", entry);

    return new Promise((resolve, reject) => {
      userDb.insert(entry, (err, entry) => {
        if (err) {
          console.log("NeDB Insert Error:", err);
          const failToAddUser = new DatabaseError("Failed to add user", 500, { originalError: err });
          return reject(failToAddUser);
        }
        resolve(entry);
      });
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      userDb.remove({ userId: userId }, {}, (err, numRemoved) => {
        if (err) {
          const failToDeleteUser = new DatabaseError("Failed to delete user", 500, {
            originalError: err,
          });
          return reject(failToDeleteUser);
        }
        resolve(numRemoved);
      });
    });
  }

  updateUser(userId, updatedData) {
    return new Promise((resolve, reject) => {
      userDb.update(
        { userId: userId },
        {
          $set: {
            name: updatedData.name,
            phone: updatedData.phone,
            address: updatedData.address,
          },
        },
        { multi: false },
        (err, numReplaced) => {
          if (err) {
            const failToUpdateUser = new DatabaseError("Failed to update user", 500, {
              originalError: err,
            });
            return reject(failToUpdateUser);
          }
          resolve(numReplaced);
        }
      );
    });
  }
}

module.exports = UserModel;
