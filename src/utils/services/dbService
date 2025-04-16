const nedb = require("@seald-io/nedb");
const path = require("path");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

let organiserDb = null;
let workshopDb = null;
let classDb = null;
let userDb = null;
let enrolmentDb = null;

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

  getUserDb() {
    if (!userDb) {
      userDb = new nedb({
        filename: path.join(__dirname, "../../../data/users.db"),
        autoload: true,
      });
    }
    return userDb;
  },

  getEnrolmentDb() {
    if (!enrolmentDb) {
      enrolmentDb = new nedb({
        filename: path.join(__dirname, "../../../data/enrolment.db"),
        autoload: true,
      });
    }
    return enrolmentDb;
  },

  seedOrganisers() {
    const organiserDb = this.getOrganiserDb();

    organiserDb.insert({
      orgId: uuidv4(),
      name: "Alex Smith",
      email: "alex@inspiredmovement.com",
      phone: "099876543",
      bio: "With a background in both dance therapy and yoga, Alex believes in the power of gentle movement to heal and connect us to our inner selves. Their approach is informed by extensive study in somatic practices and a deep understanding of the body's innate wisdom. Their classes focus on mindful exploration and releasing tension through fluid sequences. They also encourage students to explore their individual movement language and connect breath with motion. Their classes foster creativity and a deeper understanding of contemporary vocabulary.",
      role: "",
    });
    console.log("db entry Organiser 1 inserted");

    organiserDb.insert({
      orgId: uuidv4(),
      name: "Sarah Jenny",
      email: "sarah@inspiredmovement.com",
      phone: "091234567",
      bio: "Sarah's passion for ballet is infectious. With a background that includes training in some of Europe's most esteemed institutions, they bring a wealth of knowledge and artistry to their teaching. They create a welcoming and encouraging space for beginners to discover the beauty and discipline of classical technique, emphasizing body awareness and musicality.",
    });
    console.log("db entry Organiser 2 inserted");

    organiserDb.insert({
      orgId: uuidv4(),
      name: "Maria Sanchez",
      email: "maria@inspiredmovement.com",
      phone: "099887766",
      bio: "Maria's vibrant energy and passion for Latin dance are contagious. Born and raised in the heart of Buenos Aires, Argentina, Maria's early years were immersed in the rich cultural heritage of tango, salsa, and milonga. With years of experience performing and teaching across South America, Maria brings a deep authenticity and fire to their classes. They are dedicated to sharing the joy and connection of Latin rhythms with students of all levels.",
    });
    console.log("db entry Organiser 3 inserted");

    organiserDb.insert({
      orgId: uuidv4(),
      name: "Dalia Ivanova",
      email: "dalia@inspiredmovement.com",
      phone: "091234567",
      bio: "Dalia is a dynamic and versatile hip-hop instructor with a background in street dance styles from New York City. His classes are high-energy and focus on developing rhythm, musicality, and personal expression. With a performance career that spans music videos, stage shows, and international dance battles, David is passionate about sharing his knowledge and love for hip-hop culture with his students.",
    });
    console.log("db entry Organiser 4 inserted");
  },

  seedClasses() {
    classDb.insert({
      classId: uuidv4(),
      name: "Mindful Movement & Stretch",
      description:
        "(For All Levels) This class focuses on cultivating body awareness, improving flexibility, and releasing tension through mindful movement practices. Combining elements of yoga, Pilates, and gentle dance stretches, you'll learn to connect with your body in a new way, enhance your range of motion, and find greater ease in movement. Perfect as a complement to other dance styles or as a stand-alone practice.",
      schedule: "Monday",
      price: "15",
      orgId: "",
    });
    console.log("db entry Class inserted");

    classDb.insert({
      classId: uuidv4(),
      name: "Creative Ballet Foundations",
      description:
        "(Beginner Level) Discover the joy of ballet in a relaxed and encouraging environment. This class focuses on building a strong foundation in classical technique, including basic positions, barre work, and introductory center exercises. Emphasis is placed on developing body awareness, musicality, and a love for movement. No prior ballet experience is necessary – all are welcome!",
      schedule: "Tuesday",
      price: "15",
      orgId: "",
    });
    console.log("db entry Class inserted");

    classDb.insert({
      classId: uuidv4(),
      name: "Contemporary Flow & Expression",
      description:
        "(Intermediate Level) Explore fluid and expressive movement in this dynamic contemporary dance class. We'll delve into release techniques, floor work, improvisation, and connecting breath with movement. This class encourages individual expression and helps dancers develop strength, flexibility, and a deeper understanding of contemporary dance vocabulary. Some prior dance experience is recommended.",
      schedule: "Wednesday",
      price: "15",
      orgId: "",
    });
    console.log("db entry Class inserted");

    classDb.insert({
      classId: uuidv4(),
      name: "Street Jazz Grooves",
      description:
        "(All Levels) Get ready to move and groove! This high-energy class blends the sharp, dynamic movements of street dance with the musicality and stylistic elements of jazz. Learn fun choreography to a variety of upbeat music, focusing on rhythm, performance quality, and building confidence on the dance floor. Modifications will be offered to suit all levels of experience.",
      schedule: "Thursday",
      price: "15",
      orgId: "",
    });
    console.log("db entry Class inserted");
  },

  seedWorkshops() {
    workshopDb.insert({
      courseId: uuidv4(),
      name: "ChoreographyLab: From Idea to Movement",
      description:
        "(1 Hour / Session) Dive into the creative process of choreography in this hands-on workshop. We'll explore various methods for generating movement ideas, developing phrases, structuring dances, and refining your choreographic voice. Participants will have the opportunity to experiment, create short movement studies, and receive constructive feedback. This workshop is ideal for aspiring choreographers or dancers interested in understanding the art of dance making. Brought to you by our friends at ChoreographyLab!",
      numOfSessions: "5",
      price: "250",
      orgId: "",
    });
    console.log("db entry Class inserted");

    workshopDb.insert({
      courseId: uuidv4(),
      name: "Improv for Creative Expression",
      description:
        "(1.5 Hours / Session) Unleash your inner creativity in this playful and explorative improvisation workshop. Through guided exercises and prompts, you'll learn techniques to overcome inhibitions, discover new movement possibilities, and connect with your unique artistic voice. This workshop is open to all levels and dance backgrounds – no prior improvisation experience is required, just a willingness to move and explore!",
      numOfSessions: "3",
      price: "150",
      orgId: "",
    });
    console.log("db entry Workshop inserted");

    workshopDb.insert({
      courseId: uuidv4(),
      name: "Lift and Connection",
      description:
        "(2 Hours / Session) Explore the exciting world of dance partnering in a safe and supportive environment. This workshop will cover fundamental lifting techniques, weight sharing principles, and clear communication skills essential for successful partnering. Learn how to connect with a partner, build trust, and create dynamic and flowing movements together. Some prior dance experience is recommended, and it's encouraged to sign up with a partner, but individuals are also welcome.",
      numOfSessions: "6",
      price: "220",
      orgId: "",
    });
    console.log("db entry Workshop inserted");
  },

  async seedUsers() {
    const adminEmail = "admin@inspired-movement.com";
    try {
      const adminPassword = await bcrypt.hash("adminPassword123", 10);
      console.log("Hashed admin password:", adminPassword);

      const adminUser = {
        orgId: uuidv4(),
        email: adminEmail,
        password: adminPassword,
        name: "Administrator",
        phone: "000000000",
        address: "Admin Office",
        role: "admin",
      };

      await userDb.insert(adminUser);
      console.log("Admin user inserted successfully");
    } catch (e) {
      console.error("Error seeding admin user:", error);
    }
  },
};

module.exports = dbService;
