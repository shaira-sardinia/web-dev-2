const authController = require("../../src/auth/authController");
const UserModel = require("../../src/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../../src/models/userModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AuthController", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: { email: "test@example.com", password: "password123" },
      cookies: {},
    };
    res = {
      cookie: jest.fn(),
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      render: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
    next = jest.fn();

    UserModel.mockClear();
    bcrypt.compare.mockClear();
    jwt.sign.mockClear();
  });

  describe("login", () => {
    test("should authenticate valid user and set jwt cookie", async () => {
      const mockUser = { email: "test@example.com", password: "hashedpw", userId: "123", name: "Test", role: "user" };
      UserModel.prototype.findUser = jest.fn().mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mocktoken");

      await authController.login(req, res, next);

      expect(UserModel.prototype.findUser).toHaveBeenCalledWith("test@example.com");
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedpw");
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({ email: "test@example.com" }),
        process.env.ACCESS_TOKEN_SECRET
      );
      expect(res.cookie).toHaveBeenCalledWith("jwt", "mocktoken", expect.anything());
      expect(res.redirect).toHaveBeenCalledWith("/dashboard");
    });

    test("should handle non-existent user", async () => {
      UserModel.prototype.findUser = jest.fn().mockResolvedValue(null);

      await authController.login(req, res, next);

      expect(UserModel.prototype.findUser).toHaveBeenCalledWith("test@example.com");
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.render).toHaveBeenCalledWith("login", expect.objectContaining({ error: expect.any(String) }));
    });

    test("should handle incorrect password", async () => {
      const mockUser = { email: "test@example.com", password: "hashedpw", userId: "123" };
      UserModel.prototype.findUser = jest.fn().mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await authController.login(req, res, next);

      expect(UserModel.prototype.findUser).toHaveBeenCalledWith("test@example.com");
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedpw");
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.render).toHaveBeenCalledWith("login", expect.objectContaining({ error: expect.any(String) }));
    });

    test("should handle database errors during login", async () => {
      const dbError = new Error("Database connection failed");
      UserModel.prototype.findUser = jest.fn().mockRejectedValue(dbError);

      await authController.login(req, res, next);

      expect(UserModel.prototype.findUser).toHaveBeenCalledWith("test@example.com");
      expect(next).toHaveBeenCalledWith(dbError);
    });
  });

  describe("register", () => {
    beforeEach(() => {
      req.body = {
        email: "newuser@example.com",
        password: "securePassword123",
        name: "New User",
        phone: "1234567890",
        address: "123 Test St",
      };
      bcrypt.hash = jest.fn().mockResolvedValue("hashedpassword");
    });

    test("should register a new user successfully", async () => {
      UserModel.prototype.findUser = jest.fn().mockResolvedValue(null);
      UserModel.prototype.createUser = jest.fn().mockResolvedValue({
        userId: "new123",
        email: "newuser@example.com",
        name: "New User",
      });

      await authController.register(req, res, next);

      expect(UserModel.prototype.findUser).toHaveBeenCalledWith("newuser@example.com");
      expect(bcrypt.hash).toHaveBeenCalledWith("securePassword123", expect.any(Number));
      expect(UserModel.prototype.createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "newuser@example.com",
          password: "hashedpassword",
          name: "New User",
          role: "user",
        })
      );
      expect(res.redirect).toHaveBeenCalledWith("/login?registered=true");
    });

    test("should handle existing user during registration", async () => {
      UserModel.prototype.findUser = jest.fn().mockResolvedValue({
        email: "newuser@example.com",
      });

      await authController.register(req, res, next);

      expect(UserModel.prototype.findUser).toHaveBeenCalledWith("newuser@example.com");
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(UserModel.prototype.createUser).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.render).toHaveBeenCalledWith(
        "register",
        expect.objectContaining({
          error: expect.stringContaining("already exists"),
        })
      );
    });

    test("should handle validation errors during registration", async () => {
      req.body.email = "invalid-email";

      await authController.register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.render).toHaveBeenCalledWith(
        "register",
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });

    test("should handle database errors during registration", async () => {
      const dbError = new Error("Database error");
      UserModel.prototype.findUser = jest.fn().mockRejectedValue(dbError);

      await authController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(dbError);
    });
  });

  describe("logout", () => {
    test("should clear cookie and redirect to home page", async () => {
      await authController.logout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith("jwt");
      expect(res.redirect).toHaveBeenCalledWith("/");
    });
  });

  describe("verify", () => {
    test("should verify valid JWT and call next", async () => {
      req.cookies.jwt = "validtoken";
      const decodedToken = { userId: "123", email: "test@example.com", role: "user" };
      jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
        callback(null, decodedToken);
      });

      await authController.verify(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith("validtoken", process.env.ACCESS_TOKEN_SECRET, expect.any(Function));
      expect(req.user).toEqual(decodedToken);
      expect(next).toHaveBeenCalled();
    });

    test("should handle missing JWT cookie", async () => {
      req.cookies = {};

      await authController.verify(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith("/login");
      expect(next).not.toHaveBeenCalled();
    });

    test("should handle invalid JWT token", async () => {
      req.cookies.jwt = "invalidtoken";
      jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
        callback(new Error("Invalid token"), null);
      });

      await authController.verify(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith("invalidtoken", process.env.ACCESS_TOKEN_SECRET, expect.any(Function));
      expect(res.clearCookie).toHaveBeenCalledWith("jwt");
      expect(res.redirect).toHaveBeenCalledWith("/login");
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("checkRole", () => {
    test("should allow access for correct role", () => {
      const checkAdminRole = authController.checkRole("admin");
      req.user = { role: "admin" };

      checkAdminRole(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test("should deny access for incorrect role", () => {
      const checkAdminRole = authController.checkRole("admin");
      req.user = { role: "user" };

      checkAdminRole(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.render).toHaveBeenCalledWith(
        "error",
        expect.objectContaining({
          message: expect.stringContaining("access denied"),
        })
      );
    });
  });
});
