const path = require("path");
const fs = require("fs");
const Datastore = require("nedb");

const testDbDir = path.join(__dirname, "../data/test");
if (!fs.existsSync(testDbDir)) {
  fs.mkdirSync(testDbDir, { recursive: true });
}

const userDb = new Datastore({ filename: path.join(testDbDir, "users.db"), autoload: true });
const classDb = new Datastore({ filename: path.join(testDbDir, "classes.db"), autoload: true });
const workshopDb = new Datastore({ filename: path.join(testDbDir, "workshops.db"), autoload: true });
const organiserDb = new Datastore({ filename: path.join(testDbDir, "organisers.db"), autoload: true });
const enrolmentDb = new Datastore({ filename: path.join(testDbDir, "enrolments.db"), autoload: true });

jest.mock("../utils/services/dbService", () => ({
  getUserDb: () => userDb,
  getClassDb: () => classDb,
  getWorkshopDb: () => workshopDb,
  getOrganiserDb: () => organiserDb,
  getEnrolmentDb: () => enrolmentDb,
}));
