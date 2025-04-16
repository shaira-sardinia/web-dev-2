const dbService = require("./dbService");

function countDocuments(db) {
  return new Promise((resolve, reject) => {
    db.count({}, (err, count) => {
      if (err) reject(err);
      else resolve(count);
    });
  });
}

const databaseInitService = {
  async initializeDatabase() {
    try {
      const shouldSeed = process.env.SEED_DATA === "true";

      if (shouldSeed) {
        console.log("Seeding enabled by environment variable");

        const userDb = dbService.getUserDb();
        const workshopDb = dbService.getWorkshopDb();
        const classDb = dbService.getClassDb();
        const organiserDb = dbService.getOrganiserDb();

        const userCount = await countDocuments(userDb);
        if (userCount === 0) {
          console.log("Seeding users...");
          await dbService.seedUsers();
        }

        const organiserCount = await countDocuments(organiserDb);
        if (organiserCount === 0) {
          console.log("Seeding organisers...");
          await dbService.seedOrganisers();
        }

        const classCount = await countDocuments(classDb);
        if (classCount === 0) {
          console.log("Seeding classes...");
          await dbService.seedClasses();
        }

        const workshopCount = await countDocuments(workshopDb);
        if (workshopCount === 0) {
          console.log("Seeding workshops...");
          await dbService.seedWorkshops();
        }

        console.log("Database seeding complete");
      } else {
        console.log("Database seeding skipped (not enabled in environment)");
      }
    } catch (error) {
      console.error("Error during database initialization:", error);
    }
  },
};

module.exports = databaseInitService;
