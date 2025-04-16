// test/system/user-workflows.test.js
const request = require("supertest");
const app = require("../../index");
const dbService = require("../../src/utils/services/dbService");
const bcrypt = require("bcrypt");

describe("User Workflows", () => {
  let agent;
  let userDb, classDb, workshopDb, enrolmentDb;
  let testUserId, testClassId, testWorkshopId;

  beforeAll(async () => {
    userDb = dbService.getUserDb();
    classDb = dbService.getClassDb();
    workshopDb = dbService.getWorkshopDb();
    enrolmentDb = dbService.getEnrolmentDb();

    await Promise.all([
      new Promise((resolve) => userDb.remove({}, { multi: true }, resolve)),
      new Promise((resolve) => classDb.remove({}, { multi: true }, resolve)),
      new Promise((resolve) => workshopDb.remove({}, { multi: true }, resolve)),
      new Promise((resolve) => enrolmentDb.remove({}, { multi: true }, resolve)),
    ]);

    const hashedPassword = await bcrypt.hash("testPassword123", 10);
    const testUser = {
      userId: "user123",
      email: "testuser@example.com",
      password: hashedPassword,
      name: "Test User",
      phone: "1234567890",
      address: "123 Test St",
      role: "user",
    };
    await new Promise((resolve) => userDb.insert(testUser, resolve));
    testUserId = testUser.userId;

    const testAdmin = {
      userId: "admin123",
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      phone: "0987654321",
      address: "321 Admin St",
      role: "admin",
    };
    await new Promise((resolve) => userDb.insert(testAdmin, resolve));

    const testClass = {
      classId: "class123",
      name: "Yoga Class",
      description: "Beginner yoga class",
      schedule: "Monday 6pm",
      price: "20",
      orgId: "org123",
    };
    await new Promise((resolve) => classDb.insert(testClass, resolve));
    testClassId = testClass.classId;

    const testWorkshop = {
      courseId: "workshop123",
      name: "Hip Hop Workshop",
      description: "Learn dance basics",
      numOfSessions: "4",
      price: "100",
      orgId: "org123",
    };
    await new Promise((resolve) => workshopDb.insert(testWorkshop, resolve));
    testWorkshopId = testWorkshop.courseId;

    agent = request.agent(app);
  });

  describe("Authentication Flow", () => {
    test("should register a new user", async () => {
      const response = await request(app).post("/register").send({
        email: "newuser@example.com",
        password: "newpassword",
        name: "New User",
        phone: "5555555555",
        address: "555 New St",
      });

      expect(response.statusCode).toBe(302);
      expect(response.headers.location).toBe("/login?registered=true");

      const user = await new Promise((resolve) =>
        userDb.findOne({ email: "newuser@example.com" }, (err, doc) => resolve(doc))
      );
      expect(user).toBeTruthy();
      expect(user.name).toBe("New User");
    });

    test("should login and access dashboard", async () => {
      const loginResponse = await agent.post("/login").send({
        email: "testuser@example.com",
        password: "password123",
      });

      expect(loginResponse.statusCode).toBe(302);
      expect(loginResponse.headers.location).toBe("/dashboard");

      const dashboardResponse = await agent.get("/dashboard");
      expect(dashboardResponse.statusCode).toBe(200);
      expect(dashboardResponse.text).toContain("Dashboard");
      expect(dashboardResponse.text).toContain("Test User");
    });
  });

  describe("Class Enrollment Flow", () => {
    test("should enroll user in a class", async () => {
      await agent.post("/login").send({
        email: "testuser@example.com",
        password: "password123",
      });

      const enrollResponse = await agent.post(`/class/${testClassId}/enroll`);

      expect(enrollResponse.statusCode).toBe(302);
      expect(enrollResponse.headers.location).toBe("/dashboard");

      const enrollment = await new Promise((resolve) =>
        enrolmentDb.findOne(
          {
            userId: testUserId,
            classId: testClassId,
            type: "Class",
          },
          (err, doc) => resolve(doc)
        )
      );

      expect(enrollment).toBeTruthy();
    });

    test("should unenroll user from a class", async () => {
      await agent.post("/login").send({
        email: "testuser@example.com",
        password: "password123",
      });

      const unenrollResponse = await agent.post(`/class/${testClassId}/unenroll`);

      expect(unenrollResponse.statusCode).toBe(302);
      expect(unenrollResponse.headers.location).toBe("/dashboard");

      const enrollment = await new Promise((resolve) =>
        enrolmentDb.findOne(
          {
            userId: testUserId,
            classId: testClassId,
            type: "Class",
          },
          (err, doc) => resolve(doc)
        )
      );

      expect(enrollment).toBeNull();
    });
  });

  describe("Admin Workflows", () => {
    beforeEach(async () => {
      await agent.post("/login").send({
        email: "admin@example.com",
        password: "password123",
      });
    });

    test("should access admin dashboard", async () => {
      const response = await agent.get("/dashboard");

      expect(response.statusCode).toBe(200);
      expect(response.text).toContain("Admin Dashboard");
    });

    test("should create a new workshop", async () => {
      const response = await agent.post("/workshop/new").send({
        name: "New Test Workshop",
        description: "Workshop created during testing",
        numOfSessions: "3",
        price: "75",
        orgId: "org123",
      });

      expect(response.statusCode).toBe(302);
      expect(response.headers.location).toBe("/dashboard");

      const workshop = await new Promise((resolve) =>
        workshopDb.findOne({ name: "New Test Workshop" }, (err, doc) => resolve(doc))
      );

      expect(workshop).toBeTruthy();
      expect(workshop.description).toBe("Workshop created during testing");
    });

    test("should view class enrollments", async () => {
      await new Promise((resolve) =>
        enrolmentDb.insert(
          {
            enrolmentId: "test-enroll-123",
            userId: testUserId,
            type: "Class",
            classId: testClassId,
            enrolledAt: new Date(),
          },
          resolve
        )
      );

      const response = await agent.get(`/class/${testClassId}/enrolments`);

      expect(response.statusCode).toBe(200);
      expect(response.text).toContain("Enrolments for");
      expect(response.text).toContain("Test User"); // The enrolled user name
    });
  });

  describe("Error Handling", () => {
    test("should handle 404 errors", async () => {
      const response = await request(app).get("/non-existent-route");

      expect(response.statusCode).toBe(404);
      expect(response.text).toContain("Page not found");
    });

    test("should handle unauthorized access", async () => {
      const response = await request(app).get("/workshop/new");

      expect(response.statusCode).toBe(302);
      expect(response.headers.location).toBe("/login");
    });
  });
});
