const nedb = require("@seald-io/nedb");
const path = require("path");

let organiserDb = null;
let workshopDb = null;
let classDb = null;

const dbService = {
  getOrganiserDb() {
    if (!organiserDb) {
      organiserDb = new nedb({
        filename: path.join(__dirname, "../../../data/organisers.db"),
        autoload: true,
      });
    }

    return organiserDb;
  },

  getWorkshopDb() {
    if (!workshopDb) {
      workshopDb = new nedb({
        filename: path.join(__dirname, "../../../data/workshops.db"),
        autoload: true,
      });
    }
    return workshopDb;
  },

  getClassDb() {
    if (!classDb) {
      classDb = new nedb({
        filename: path.join(__dirname, "../../../data/classes.db"),
        autoload: true,
      });
    }
    return classDb;
  },

  seedOrganisers() {
    const organiserDb = this.getOrganiserDb();

    organiserDb.insert({
      orgId: "1",
      name: "Andrew Smith",
      email: "andrew@inspiredmovement.com",
      phone: "099876543",
      bio: "Hip hop",
    });
    console.log("db entry Organiser 1 inserted");

    organiserDb.insert({
      orgId: "2",
      name: "Sarah Jenny",
      email: "sarah@inspiredmovement.com",
      phone: "091234567",
      bio: "Salsa",
    });
    console.log("db entry Organiser 2 inserted");
  },

  seedClasses() {
    classDb.insert({
      classId: "c001",
      name: "Mindful Movement & Stretch",
      description:
        "(For All Levels) This class focuses on cultivating body awareness, improving flexibility, and releasing tension through mindful movement practices. Combining elements of yoga, Pilates, and gentle dance stretches, you'll learn to connect with your body in a new way, enhance your range of motion, and find greater ease in movement. Perfect as a complement to other dance styles or as a stand-alone practice.",
      schedule: "Monday",
      price: "15",
      orgId: "",
    });
    console.log("db entry Class c001 inserted");

    classDb.insert({
      classId: "c002",
      name: "Creative Ballet Foundations",
      description:
        "(Beginner Level) Discover the joy of ballet in a relaxed and encouraging environment. This class focuses on building a strong foundation in classical technique, including basic positions, barre work, and introductory center exercises. Emphasis is placed on developing body awareness, musicality, and a love for movement. No prior ballet experience is necessary – all are welcome!",
      schedule: "Tuesday",
      price: "15",
      orgId: "",
    });
    console.log("db entry Class c002 inserted");

    classDb.insert({
      classId: "c003",
      name: "Contemporary Flow & Expression",
      description:
        "(Intermediate Level) Explore fluid and expressive movement in this dynamic contemporary dance class. We'll delve into release techniques, floor work, improvisation, and connecting breath with movement. This class encourages individual expression and helps dancers develop strength, flexibility, and a deeper understanding of contemporary dance vocabulary. Some prior dance experience is recommended.",
      schedule: "Wednesday",
      price: "15",
      orgId: "",
    });
    console.log("db entry Class c003 inserted");

    classDb.insert({
      classId: "c004",
      name: "Street Jazz Grooves",
      description:
        "(All Levels) Get ready to move and groove! This high-energy class blends the sharp, dynamic movements of street dance with the musicality and stylistic elements of jazz. Learn fun choreography to a variety of upbeat music, focusing on rhythm, performance quality, and building confidence on the dance floor. Modifications will be offered to suit all levels of experience.",
      schedule: "Thursday",
      price: "15",
      orgId: "",
    });
    console.log("db entry Class c004 inserted");
  },

  seedWorkshops() {
    workshopDb.insert({
      courseId: "w001",
      name: "ChoreographyLab: From Idea to Movement",
      description:
        "(1 Hour / Session) Dive into the creative process of choreography in this hands-on workshop. We'll explore various methods for generating movement ideas, developing phrases, structuring dances, and refining your choreographic voice. Participants will have the opportunity to experiment, create short movement studies, and receive constructive feedback. This workshop is ideal for aspiring choreographers or dancers interested in understanding the art of dance making. Brought to you by our friends at ChoreographyLab!",
      numOfSessions: "5",
      price: "250",
      orgId: "",
    });
    console.log("db entry Class w001 inserted");

    workshopDb.insert({
      courseId: "w002",
      name: "Improv for Creative Expression",
      description:
        "(1.5 Hours / Session) Unleash your inner creativity in this playful and explorative improvisation workshop. Through guided exercises and prompts, you'll learn techniques to overcome inhibitions, discover new movement possibilities, and connect with your unique artistic voice. This workshop is open to all levels and dance backgrounds – no prior improvisation experience is required, just a willingness to move and explore!",
      numOfSessions: "3",
      price: "150",
      orgId: "",
    });
    console.log("db entry Class w002 inserted");

    workshopDb.insert({
      courseId: "w003",
      name: "Lift and Connection",
      description:
        "(2 Hours / Session) Explore the exciting world of dance partnering in a safe and supportive environment. This workshop will cover fundamental lifting techniques, weight sharing principles, and clear communication skills essential for successful partnering. Learn how to connect with a partner, build trust, and create dynamic and flowing movements together. Some prior dance experience is recommended, and it's encouraged to sign up with a partner, but individuals are also welcome.",
      numOfSessions: "6",
      price: "220",
      orgId: "",
    });
    console.log("db entry Class w003 inserted");
  },
};

module.exports = dbService;
